import React, { Component } from 'react';
import './Login.css';
import Logo from './Logo';
import AuthService from '../AuthService';
import { Link } from 'react-router-dom';

class Recovery extends Component {
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.Auth = new AuthService();
    }
    render() {
        return (
            <div className="App">
                <div className="Div-default">
                    <Logo msg={'Insira seu email para recuperar sua senha'}/>
                    <br/>
                    <form onSubmit={this.handleSubmit}>
                        <input
                            placeholder="Email"
                            name="email"
                            type="email"
                            onChange={this.handleChange}
                        />
                        <input
                            value="Enviar"
                            type="submit"
                        />
                    </form>
                    <br/>
                    <br/>
                    <Link to={'/'} > Voltar </Link>
                </div>
            </div>
        );
    }

    handleChange(e){
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }

    handleSubmit(e){
        e.preventDefault();

    }

    componentWillMount(){
        if (this.Auth.isAuthenticated())
            this.props.history.replace('/');
    }
}

export default Recovery;
