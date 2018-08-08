import React from 'react';
import AuthService from '../AuthService'
import './NavBar.css'

class Navbar extends React.Component{
    constructor(){
        super();
        this.handleLogout = this.handleLogout.bind(this);
        this.Auth = new AuthService()
    }

    capitalize(str){
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    render(){
        return (
          <div className='Navbar'>
              <div className='Dropdown'>
                  <span className='Btn'>{this.capitalize(this.props.user)}
                      <i style={{marginLeft:10}} className="fa fa-caret-down"></i>
                  </span>
                  <div className='Dropdown-content'>
                      <span  onClick={this.handleLogout}> Logout </span>
                  </div>
              </div>
          </div>
        )
    }

    handleLogout(){
        this.Auth.logout()
        window.location = '/'
    }
}

export default Navbar;
