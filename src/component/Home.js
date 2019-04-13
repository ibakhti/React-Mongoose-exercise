import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import axios from '../config/axios';

class Home extends Component {
    state = {
        tasks: [],
        word: ['Okay', 'Good Job', 'Nice Work', 'Proud Of You!']
    }

    componentDidMount () {
        this.getTasks();
    }

    getTasks = async () => {
        try {
            const res = await axios.get(`/tasks/${this.props.id}`)
            this.setState({tasks: res.data})
        } catch (e) {
            console.log(e);
        }
    }

    onDouble = async (taskid) => {
        await axios.delete('/tasks',{data: {taskid: taskid, userid: this.props.id}})
        this.getTasks()
    }

    renderList = () => {
        
        return this.state.tasks
            .sort((a, b) => {
                if(a.completed){
                    return 1
                }else {
                    return -1
                }
            })
            .map ((task, i) => {
                if(!task.completed) {
                    return (
                        <li onDoubleClick={() => {this.onDouble(task._id)}} className="list-group-item d-flex justify-content-between row-hl" key={task._id}>
                        <span className="item-hl">{task.description}</span>
                        
                        <span className="item-hl">
                        <button className='btn btn-outline-primary' onClick={() => {this.doneTask(task._id, this.props.id)}}>Done</button>
                        </span>
                        </li>
                    );
                }else {
                    i = i >= 4 ? Math.floor(Math.random() * 3) : i 
                    return (
                        <li onDoubleClick={() => {this.onDouble(task._id)}} className="list-group-item d-flex justify-content-between row-hl bg-dark text-white" key={task._id}>
                        <span className="item-hl">{task.description}</span>
                        <span className="ml-auto mr-3">{this.state.word[i]}</span>
                        <span className="item-hl">
                        <button className='btn btn-outline-danger' onClick={()=>{this.unDoneTask(task._id, this.props.id)}}>Undone</button>
                        </span>
                        </li>
                    );
                }
            })
    }

    addTask = async (userid) => {
        const description = this.task.value

        try {
            await axios.post(`/tasks/${userid}`,{
                description
            })
            this.getTasks()
        } catch (e) {
            console.log(e);
            
        }

    }

    doneTask = async (taskid, userid) => {
        // const index = Math.floor((Math.random() * 3))
        try {
           await axios.patch(`/tasks/${taskid}/${userid}`, {
               completed: true
           })
           this.getTasks()
        } catch (e) {
            console.log(e);
        }
    }

    unDoneTask = async (taskid, userid) => {
        // const index = Math.floor((Math.random() * 3))
        try {
           await axios.patch(`/tasks/${taskid}/${userid}`, {
               completed: false
           })
           this.getTasks()
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        if(this.props.name){
            return (
                <div className='container'>
                    <h1 className="display-4 text-center animated bounce delay-1s">List Tasks</h1>
                        <ul className="list-group list-group-flush mb-5">{this.renderList()}</ul>
                        <form className="form-group mt-5">
                            <input type="text" className="form-control" placeholder="What do you want to do ?" ref={input => this.task = input}/>
                        </form>
                        <button type="submit" className="btn btn-block btn-primary mt-3" onClick={() => this.addTask(this.props.id)}>Up !</button>
                </div>
            )
        }else {
            return <Redirect to='/login'/>
        }
    }
}

const mapStateToProps = state => {
    return {name: state.auth.name, id: state.auth.id}
}

export default connect(mapStateToProps)(Home)