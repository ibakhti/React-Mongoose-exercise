import React, { Component } from 'react'
import {Button} from 'reactstrap';
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'

import axios from '../config/axios'
import { onLogout, onEditAccount } from './../actions'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: Math.floor(Math.random() * 1000000000000000000000),
            flag: true
        }
    }
    
    setStateIndex = () => {
      const i = Math.floor(Math.random() * 1000000000000000000000)
      this.setState({index: i})
    }

    fileUpload = async () => {
        const formData = new FormData()
        var imagefile = this.gambar
        
        formData.append('avatar', imagefile.files[0])

        try {
            await axios.post(`/users/${this.props.id}/avatar`, formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            })

            console.log("berhasil upload file");
            this.setStateIndex()    

        } catch (e) {
            console.log(e); 
        }
        
    }

    fileDelete = async () => {
      try {
        await axios.delete('/users/avatar', {data:{id: this.props.id}})
        this.setStateIndex()
      } catch (e) {
        console.log("error from filedelete: " + e)
      }
    }

    deleteAccount = async () => {
      try {
        await axios.delete('/users', {data: {id: this.props.id}})
        this.props.onLogout()
      } catch (e) {
        console.log("error from deleteAcount: " + e)
      }
    }

    editAccount = () => {
      this.setState({flag: false})
    }

    cancelEdit = () => {
      this.setState({flag: true})
    }

    submitEditAccount = () => {
      const id = this.props.id
      const name = this.name.value
      const age = parseInt(this.age.value)

            // console.log(id, name, age)
      this.props.onEditAccount(id, name, age)
      this.cancelEdit()
    }

    profilDisplay = () => {
      if(this.state.flag) {
        return (
          <div>
            <div className="my-3">
              <h2 className="display-4">{this.props.name}</h2>
            </div>
            <div className="my-1">
              <h2>{this.props.age}</h2>
            </div>
            <Button onClick={() => this.editAccount()} style={{display: "inline"}} color="secondary">
                Edit Account
              </Button>
              <Button onClick={() => this.deleteAccount()} className="btn btn-outline-warning my-5 mx-5">
                  Delete Account
              </Button>
          </div>
        );
      }else {
        return (
          <div>
              <form className="form-group my-3">
                  <input type="text" className="form-control" defaultValue={this.props.name} ref={input => this.name = input}/>
                  <input type="number" className="form-control" defaultValue={this.props.age} ref={input => this.age = input}/>
              </form>
              <Button onClick={() => this.submitEditAccount()} style={{display: "inline"}} color="secondary">
                Submit
              </Button>
              <Button onClick={() => this.cancelEdit()} className="btn btn-outline-danger my-5 mx-5">
                  Cancel
              </Button>
          </div>
        )
      }
    }

    render() {
        if(this.props.name) {
          return (
            <div className="container my-5">
              <div className="row pt-5">
                <img
                  src={`http://localhost:2009/users/${
                    this.props.id
                  }/avatar/${this.state.index}`}
                  alt="Plese Choose Your Profie Pict"
                  className="mb-5"
                />
                <div className="custom-file">
                  <input
                    type="file"
                    id="myfile"
                    ref={input => (this.gambar = input)}
                  />
                </div>
                <Button color="primary" onClick={() => this.fileUpload()} style={{display: "inline"}}>
                  Upload
                </Button>
                <Button color="danger" onClick={() => this.fileDelete()} style={{display: "inline"}} className="ml-3">
                  Delete
                </Button>
              </div>
              {this.profilDisplay()}
            </div>
          );
        }else {
          return <Redirect to='/login'/>
        }
    }
}

const mps = state => {
    return {
      id: state.auth.id,
      name: state.auth.name,
      age: state.auth.age
    }
}

export default connect(mps, { onLogout, onEditAccount })(Profile)