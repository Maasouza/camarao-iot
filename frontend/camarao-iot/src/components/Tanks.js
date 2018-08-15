import React, { Component } from 'react';
import AuthService from '../AuthService';
import Sidebar from './SideBar';
import Navbar from './NavBar';
import {ic_add_circle} from 'react-icons-kit/md/ic_add_circle'
import SvgIcon from 'react-icons-kit';
import UserRole from '../UserRole'
import TankContainer from './TankContainer';
import Modal from './Modal';
import TextField from '@material-ui/core/TextField';
import Config from '../ProjectConfig';

import './Dashboard.css';

class Tanks extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.Auth = new AuthService()
        this.user = this.Auth.getUser()
        var socket = require('socket.io-client')(Config.SOCKET_URL);
        socket.emit('subscribe', Config.SOCKET_TIMER)

        this.state = {
            socket: socket,
            register: {},
            tanks_data: [],
            free_buoys: [],
            buoy_associated: 0,
            isModalOpen: false
        }
        this.url = '/tanks';
    }

    handleCreate(e){
        e.preventDefault();
        const name = this.state.tank_name
        const capacity = parseFloat(this.state.tank_capacity)
        const buoy = parseInt(this.state.buoy_associated,10)
        const sendData = {
            name: name,
            capacity: capacity
        }
        if(buoy !== 0){
            sendData.buoy = buoy
        }

        this.Auth.fetch( this.url , {
            method: 'POST',
            body: JSON.stringify(sendData)
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

    toggleModal = () => {
        if (!this.state.isModalOpen) {
            this.Auth.fetch( '/buoys/free' , {
                method: 'GET',
            })
            .then(response => {
                console.log(response)
                this.setState({ has_free_buoys: response.length !== 0 })
                if (!this.state.has_free_buoys) {
                    const confirm = window.confirm('Não existem bóias disponíveis. Deseja continuar com a criação de um tanque?')
                    if (!confirm) {
                        this.setState({ isModalOpen: false })
                    }
                }
                this.setState({ free_buoys: response })
            })
        }

        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }


    render() {
        const {tanks_data, register, free_buoys, has_free_buoys} = this.state;
        return(
            <div className='App-main'>
                <div className='Page-container'>
                    <Sidebar role={this.user.role} tanks={'active'}/>
                    <Navbar user={this.user.username} />
                    <div className='App-intro' >
                        {tanks_data.map((tank,id) =>{
                            return !(register[tank.buoy] === undefined) ?
                              (
                                <TankContainer key={tank.id} tank_id={tank.id} data={tank} name={tank.name} salinity={register[tank.buoy].salinity} turbidity={register[tank.buoy].turbidity} waterlevel={register[tank.buoy].waterlevel} temperature={register[tank.buoy].temperature}/>
                              ):
                              (
                                <TankContainer key={tank.id} tank_id={tank.id} data={tank} name={tank.name} salinity='-' turbidity='-' waterlevel='-' temperature='-' />
                              );
                        })}
                        {this.user.role === UserRole.sysAdmin.name && (
                        <div className='New-btn-tank'>
                            <span onClick={this.toggleModal}><SvgIcon className="Nav-icon"size={80} icon={ic_add_circle}/></span>
                        </div>
                        )}
                    </div>
                    <Modal show={this.state.isModalOpen} onClose={this.toggleModal}>
                        <fieldset>
                            <legend>Novo Tanque</legend>
                            <form>
                                <TextField label="Nome" name="tank_name" onChange={this.handleChange} />
                                <TextField type='number' label="Capacidade (L)" name="tank_capacity" onChange={this.handleChange} />
                                { has_free_buoys && (
                                    <TextField className='User-select' label="Bóia associada" select value={this.state.buoy_associated || 0} name="buoy_associated" onChange={this.handleChange}>
                                        {free_buoys.map( buoys => (
                                            <option key={buoys.id} value={buoys.id}>
                                                {buoys.name}
                                            </option>
                                        ))}
                                    </TextField>
                                )}
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
        var {socket, register} = this.state;
        var info =  undefined;

        this.Auth.fetch( this.url , {
            method: 'GET',
        })
        .then(response => {
            this.setState({ tanks_data: response })
        })
        socket.on('message', data => {
            info = JSON.parse(data)
            console.log("Recebe")
            const res = {
              turbidity: (Math.max(info['red'], info['green'], info['blue']) > 2500) ? 'Alta' : 'Baixa',
              temperature: info['temperature'],
              waterlevel: info['water_level'] === 1 ? 'Normal': 'Baixo',
              salinity: info['salinity']
            }
            register[info['buoy_id']] = res;
            this.setState({register})
          });
    }

    componentWillUnmount() {

    }
}

export default Tanks;
