import React, { Component } from 'react';
import AuthService from '../AuthService'
import Sidebar from './SideBar';
import Navbar from './NavBar';
import Mytable from './Mytable';
import Modal from './Modal';
import UserRole from '../UserRole';
import {ic_add_circle} from 'react-icons-kit/md/ic_add_circle'
import SvgIcon from 'react-icons-kit';
import TextField from '@material-ui/core/TextField';

import './Dashboard.css';

class Employees extends Component {
    constructor(){
        super();
        this.Auth = new AuthService()
        this.user = this.Auth.getUser()
        this.state = {
            data: []
        };
        this.labels = ['Nome', 'Nome de usuário', 'Email', 'Função'];
        this.keys = ['name', 'username', 'email', 'role'];
        this.url = '/users';
        this.toggleModal = this.toggleModal.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    toggleModal = () => {
      this.setState({
          isModalOpen: !this.state.isModalOpen
      });
    } 

    handleCreate(e){
        e.preventDefault();
        const name = this.state.user_name;
        const email = this.state.user_email;
        const username = this.state.user_username;
        const role = this.state.user_role;
        this.Auth.fetch( this.url , {
            method: 'POST',
            body: JSON.stringify({
                name,
                email,
                username,
                role
            })
        })
        .then(res =>{
            window.location= this.url;
        })
    }

    handleChange(e){
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }

    render() {
        const { data } = this.state
        const onlyView = (this.user.role !== UserRole.sysAdmin.name)
        return(
            <div className="App-main">
                <div className="Page-container">
                    <Sidebar role={this.user.role} employees={'active'}/>
                    <Navbar user={this.user.username} />
                    <div className="App-intro">
                        <Mytable tablename={'Funcionários'} onlyView={onlyView} url={this.url} labels={this.labels} keys={this.keys} data={data}/>
                    </div>
                    { !onlyView && (
                    <span className="New-btn" onClick={this.toggleModal}><SvgIcon className="Nav-icon"size={50} icon={ic_add_circle}/></span>
                    )}
                    <Modal show={this.state.isModalOpen} onClose={this.toggleModal}>
                        <fieldset>
                            <legend>Novo Usuário</legend>
                            <form>
                                <TextField label="Nome" name="user_name" onChange={this.handleChange} />
                                <TextField label="Nome de usuário" name="user_username" onChange={this.handleChange} />
                                <TextField type='email' label="Email do usuário" name="user_email" onChange={this.handleChange} />
                                <TextField className='User-select' label="Função do usuário" select value={this.state.user_role || ''} name="user_role" onChange={this.handleChange}>
                                    {Object.entries(UserRole).map( ([_, role]) => (
                                        <option key={role.id} value={role.id}>
                                            {role.name}
                                        </option>
                                    ))}
                                </TextField>
                                <button onClick={this.handleCreate}>Confirmar</button>
                                <button onClick={this.toggleModal}>Cancelar</button>
                            </form>
                        </fieldset>
                    </Modal>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.Auth.fetch( this.url , {
            method: 'GET',
        })
        .then(data => {
            this.setState({ data })
        })
    }
}

export default Employees;
