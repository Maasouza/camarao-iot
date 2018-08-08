import React from "react";
import logo from '../assets/logo.png';

class Logo extends React.Component{

    render(){
        return (
            <div className="Logo">
                <img src = {logo} alt="Camarão IoT"/>
                <br/>
                <br/>
                <div className="Logo-name" style={{fontSize: this.props.fontsize || 28  }}> Camarão IoT </div>
                <div className="Logo-phrase"> {this.props.msg}</div>
            </div>
        )
    }
}

export default Logo;
