import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import {onLogin} from '../actions'

class Login extends Component {

    onButtonClick = () => {
        const email = this.email.value
        const password = this.password.value
        this.props.onLogin(email, password)
    }

    render() {
        const {user} = this.props
        if(user.name === ''){
            return (
                <div className="mt-5 row">
                    <div className="col-sm-3 mx-auto card">
                        <div className="card-body">
                            <div className="border-bottom border-secondary card-title">
                                <h1>Login</h1>
                            </div>
                            <div className="card-title mt-1">
                                <h4>Email</h4>
                            </div>
                            <form className="input-group"><input ref={input => this.email = input} className="form-control" type="email"/></form>
                            <div className="card-title mt-1">
                                <h4>Password</h4>
                            </div>
                            <form className="input-group"><input ref={input => this.password = input} className="form-control" type="password"/></form>
                            <div className="d-flex justify-content-center my-3">
                                <button className="btn btn-success btn-block" onClick={this.onButtonClick}>Login</button>
                            </div>
                            {/* {this.onErrorLogin()} */}
                            <p className="lead">Don't have account ? <Link to="/register">Sign Up!</Link></p>
                        </div>
                    </div>
                </div>
            )
        }
        
        return <Redirect to='/'/>
    }
}
const mapStateToProps = state => {
    return {user: state.auth}
}
export default connect(mapStateToProps, {onLogin})(Login)