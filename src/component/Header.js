import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import { onLogout } from './../actions'
import {
    Button,
    Collapse,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarBrand,
    Navbar,
    NavbarToggler, 
    Nav,
    NavItem,
    UncontrolledDropdown
    } from 'reactstrap';

class Header extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          dropdownOpen: false
        };
    }
    
      toggle() {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
      }
    render() {
        const {user} = this.props
        if(user.name === ''){
            return ( // register, login
                <div>
                    <Navbar color="light" light expand="md">
                        <div className="container">
                            <Link className="navbar-brand" to="/">ReactMongoose</Link>
                            <NavbarToggler onClick={this.toggle} />
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <Link className="nav-link" to="/">Tasks</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link to="/register"><Button className="mx-3" color="primary">Register</Button></Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link to="/login"><Button color="success">Login</Button></Link>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                        </div>
                    </Navbar>
                </div>
            )
        } 

        return(
            <div>
                <Navbar color="light" light expand="md">
                    <div className="container">
                        <NavbarBrand href="/">ReactMongoose</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <Link className="nav-link" to="/">Tasks</Link>
                                </NavItem>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        Hallo {user.name}
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                    <Link className="dropdown-item" to="/profile">
                                        <DropdownItem>Profile</DropdownItem>
                                    </Link>
                                    <DropdownItem divider />
                                    <Button className="dropdown-item" onClick={this.props.onLogout}>
                                        Log out
                                    </Button>
                                    
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {user: state.auth}
}

export default connect(mapStateToProps, { onLogout })(Header)