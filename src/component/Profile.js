import React, { Component } from 'react'
import {Button} from 'reactstrap';
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'

import axios from '../config/axios'
import { onLogout } from './../actions'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.i = Math.floor(Math.random() * 1000000000000000000000)
        this.state = {
            index: this.i
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
              <div className="my-3">
                <h2 className="display-4">{this.props.name}</h2>
              </div>
              <Button onClick={() => this.deleteAccount()} style={{display: "inline"}} className="btn btn-outline-warning my-5">
                  Delete Account
              </Button>
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
      name: state.auth.name
    }
}

export default connect(mps, { onLogout })(Profile)