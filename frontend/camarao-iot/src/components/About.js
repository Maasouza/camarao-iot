import React, { Component } from 'react';
import AuthService from '../AuthService'
import Sidebar from './SideBar';
import Navbar from './NavBar';
import './Dashboard.css';

class About extends Component {
    constructor(){
        super();
        this.Auth = new AuthService()
        this.user = this.Auth.getUser()
    }
    render() {
        return(
            <div className="App-main">
                <div className="Page-container">
                    <Sidebar role={this.user.role} about={'active'}/>
                    <Navbar user={this.user.username} />
                    <div className="App-intro">
                        <span></span>
                        <span>Este projeto</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default About;
