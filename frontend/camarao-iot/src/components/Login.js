import React, { Component } from 'react';
import './Login.css';
import AuthService from '../AuthService';
import { Link } from 'react-router-dom';
import Logo from './Logo';

class Login extends Component {
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.Auth = new AuthService();
        this.state = {
            username: null,
            password: null
        }
    }
    render() {
        return (
          <div className="App">
            <div className="Div-default">
                <div className="card">
                    <Logo msg={'Bem vindo à plataforma de produção camarão!'}/>
                    <form onSubmit={this.handleSubmit}>
                        <input
                            placeholder="Usuário"
                            name="username"
                            type="text"
                            onChange={this.handleChange}
                        />
                        <input
                            placeholder="Senha"
                            name="password"
                            type="password"
                            onChange={this.handleChange}
                        />
                        <input
                            value="Login"
                            type="submit"
                        />
                    </form>
                    <br/>
                    <Link to={'/recovery'} activeclassname="Link-recovery"> Esqueceu sua senha?</Link><br/><br/><br/>
                    <Link to={'/about'} className='about' activeclassname="Link-about"> Sobre o Camarão IoT</Link>
                </div>
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

        if (this.state.username === null || this.state.password === null) {
            alert('Todos os campos são obrigatórios.')
            return
        }

        this.Auth.login(this.state.username, this.state.password)
            .then(res =>{
               this.props.history.replace('/');
            })
            .catch(err =>{
                alert(err);
            })
    }

    componentWillMount(){
        if(this.Auth.isAuthenticated())
            this.props.history.replace('/');
    }
}

export default Login;
