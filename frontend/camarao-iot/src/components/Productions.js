import React, { Component } from 'react';
import AuthService from '../AuthService'
import Sidebar from './SideBar';
import Navbar from './NavBar';
import Mytable from './Mytable'
import Modal from './Modal';
import './Dashboard.css';
import {ic_add_circle} from 'react-icons-kit/md/ic_add_circle'
import SvgIcon from 'react-icons-kit';
import UserRole from '../UserRole'

import TextField from '@material-ui/core/TextField';

class Productions extends Component {
    constructor(){
        super();
        this.Auth = new AuthService()
        this.user = this.Auth.getUser()
        this.state = {
            data: [],
            isModalOpen: false
        };
        this.labels = ['Nome', 'Quantidade solicitada (Kg)', 'Data de Início', 'Cliente'];
        this.keys = ['name', 'requestedAmount', 'startDate', 'client'];
        this.url = '/productions'
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
        const name = this.state.prod_name
        const client = this.state.prod_client
        const requestedAmount = parseFloat(this.state.prod_requestedAmount)
        const endDate = this.state.prod_endDate;
        const shrimpClass = this.state.prod_shrimpClass;
        this.Auth.fetch( this.url , {
            method: 'POST',
            body: JSON.stringify({
                name,
                client,
                requestedAmount,
                endDate,
                shrimpClass
            })
        })
        .then(res =>{
            window.location = this.url;
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
        const { data } = this.state;
        const onlyView = (this.user.role !== UserRole.sysAdmin.name) && (this.user.role !== UserRole.manager.name)

        return(
            <div className="App-main">
                <div className="Page-container">
                    <Sidebar role={this.user.role} productions={'active'}/>
                    <Navbar user={this.user.username} />
                    <div className="App-intro">
                        <Mytable tablename={'Produções'} showEye showEdit showRemove onlyView={onlyView} url={this.url} labels={this.labels} keys={this.keys} data={data}/>
                    </div>
                    <span className="New-btn" onClick={this.toggleModal}><SvgIcon className="Nav-icon"size={50} icon={ic_add_circle}/></span>
                    <Modal show={this.state.isModalOpen} onClose={this.toggleModal}>
                        <fieldset>
                            <legend>Nova Produção</legend>
                            <form>
                                <TextField label="Nome" name="prod_name" onChange={this.handleChange} />
                                <TextField label="Cliente" name="prod_client" onChange={this.handleChange} />
                                <TextField label="Classe do Camarão" name="prod_shrimpClass" onChange={this.handleChange} />
                                <TextField type='number'label="Quantidade de camarão (Kg)" name="prod_requestedAmount" onChange={this.handleChange} />
                                <TextField type='date' defaultValue='2000-01-01' label="Data de despesca" name="prod_endDate" onChange={this.handleChange} />
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
            this.setState({
               data
              })
        })
    }
}

export default Productions;
