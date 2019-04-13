import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {onRegister} from '../actions'
import {connect} from 'react-redux'

class Register extends Component {
    onButtonClick = () => {
        const name = this.name.value
        const age = this.age.value
        const email = this.email.value
        const pass = this.password.value
        // console.log(this.props)
        this.props.onRegister(name, age, email, pass)
    }

    render() {
        return (
            <div>
                <div className="mt-5 row">
                    <div className="col-sm-3 mx-auto card">
                        <div className="card-body">
                            <div className="border-bottom border-secondary card-title">
                                <h1>Register</h1>
                            </div>
                            <div className="card-title mt-1">
                                <h4>Name</h4>
                            </div>
                            <form className="input-group"><input ref={input => this.name = input} className="form-control" type="text" /></form>
                            <div className="card-title mt-1">
                                <h4>Age</h4>
                            </div>
                            <form className="input-group"><input ref={input => this.age = input} className="form-control" type="number" /></form>
                            <div className="card-title mt-1">
                                <h4>Email</h4>
                            </div>
                            <form className="input-group"><input ref={input => this.email = input} className="form-control" type="text" /></form>
                            <div className="card-title mt-1">
                                <h4>Password</h4>
                            </div>
                            <form className="input-group"><input ref={input => this.password = input} className="form-control" type="password" /></form>
                            <div className="d-flex justify-content-center my-3">
                                <button className="btn btn-success btn-block" onClick={this.onButtonClick}>Register</button>
                            </div>
                            {/* {this.onErrorRegister()} */}
                            <p className="lead">Do you have account ? <Link to="/login">Sign In!</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null,{onRegister})(Register)