import React, { Component } from 'react';
import AuthService from '../AuthService'
import Sidebar from './SideBar';
import Navbar from './NavBar';
import Mytable from './Mytable'
import {ic_add_circle} from 'react-icons-kit/md/ic_add_circle'
import SvgIcon from 'react-icons-kit';
import './Dashboard.css';
import Modal from './Modal';
import TextField from '@material-ui/core/TextField';

class Buoys extends Component {
    constructor(){
        super();
        this.Auth = new AuthService()
        this.user = this.Auth.getUser()
        this.state = {
            data: []
        };
        this.labels = ['Apelido', 'Endereço MAC', 'Tanque Associado'];
        this.keys = ['name', 'macAddress', 'tank'];
        this.url = '/buoys';
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
        const name = this.state.buoys_name
        const macAddress = this.state.buoys_macAddress
        this.Auth.fetch( this.url , {
            method: 'POST',
            body: JSON.stringify({
                name,
                macAddress
            })
        })
        .then(res =>{
            window.location = this.url
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
        return(
            <div className="App-main">
                <div className="Page-container">
                    <Sidebar role={this.user.role} buoys={'active'}/>
                    <Navbar user={this.user.username} />
                    <div className="App-intro">
                        <Mytable tablename={'Bóias'} showRemove url={this.url} labels={this.labels} keys={this.keys} data={data}/>
                    </div>
                    <span className="New-btn" onClick={this.toggleModal}><SvgIcon className="Nav-icon"size={50} icon={ic_add_circle}/></span>
                    <Modal show={this.state.isModalOpen} onClose={this.toggleModal}>
                        <fieldset>
                            <legend>Nova Bóia</legend>
                            <form>
                                <TextField label="Nome" name="buoys_name" onChange={this.handleChange} />
                                <TextField label="Endereço MAC" name="buoys_macAddress" onChange={this.handleChange} />
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
        this.Auth.fetch(this.url, {
            method: 'GET',
        })
        .then(data => {
            this.setState({ data })
        })
    }
}

export default Buoys;
