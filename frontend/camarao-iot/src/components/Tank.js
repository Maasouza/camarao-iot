import React, { Component } from 'react';
import AuthService from '../AuthService';
import Sidebar from './SideBar';
import Navbar from './NavBar';
import Thermometer from 'react-thermometer-component'
import ReactChartkick, { LineChart } from 'react-chartkick'
import Chart from 'chart.js'
import UserRole from '../UserRole'
import Modal from './Modal';
import TextField from '@material-ui/core/TextField';
import Card from "./Card";
import './Dashboard.css';
import './Tank.css';

ReactChartkick.addAdapter(Chart)

class Tank extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.Auth = new AuthService()
        this.user = this.Auth.getUser()
        var client = require('emitter-io').connect();

        client.subscribe({
          key: "Lxdppx1WtAsSHTYWP5c5N-AT5gjR2yyf",
          channel: "camarao-iot-test"
        });

        this.state = {
            client: client,
            data: {
              samples:0,
              temperature:[],
              turbidity:[],
              salinity:[],
              waterlevel:[]
            },
            free_buoys: [],
            prods: [],
            tank_data: [],
            buoy_associated: 0,
            prod_associated: 0,
            emitterKey: 'Lxdppx1WtAsSHTYWP5c5N-AT5gjR2yyf',
            emitterChannel: 'camarao-iot-test',
            isModalOpen: false
        }
        this.url = '/tanks/'+this.props.match.params.id;
    }

    handleChange(e){
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }

    toggleModal = () => {
        if (!this.state.isModalOpen && (this.user.role === UserRole.sysAdmin.name || this.user.role === UserRole.manager.name )) {
            this.Auth.fetch( '/buoys/free' , {
                method: 'GET',
            })
            .then(response => {
                var free = response
                if (this.state.buoy_associated !== 0 && this.state.buoy_associated !== null) {
                    const curBuoy = {
                        id: this.state.buoy_associated,
                        name: 'Bóia Atual'
                    }
                    free.push(curBuoy)
                }

                this.setState({ free_buoys: free })
            })

            this.Auth.fetch( '/productions' , {
                method: 'GET',
            })
            .then(response => {
                this.setState({ prods: response })
            })
        }

        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleBuoyRemove(){
      const confirm = window.confirm("Deseja desassociar a boia atual?");
        if(confirm){
            this.Auth.fetch( this.url , {
                method: 'PUT',
                body: JSON.stringify({
                  buoy:0
                })
            })
            .then(res =>{
                window.location = this.url;
            })
        }
    }

    handleProductionRemove(){
      const confirm = window.confirm("Deseja desassociar a produção atual?");
        if(confirm){
            this.Auth.fetch( this.url , {
                method: 'PUT',
                body: JSON.stringify({
                  production:0
                })
            })
            .then(res =>{
                window.location = this.url;
            })
        }
    }
    handleDelete(url,name){
        const confirm = window.confirm("Deseja remover o tanque <"+name+"> ?");
        if(confirm){
            this.Auth.fetch(url, {
                method: 'DELETE',
            })
            .then(data => {
                window.location = '/tanks'
            }).catch((e)=>{
                window.confirm(e)
            })
        }
    }

    handleUpdate(e){
        e.preventDefault();
        const confirm = window.confirm("Deseja editar o tanque <"+this.state.tank_data.name+"> ?");
        if(confirm){
            const name = this.state.tank_name
            const temperature = parseFloat(this.state.tank_temperature)
            const waterLevel = parseFloat(this.state.tank_waterLevel)
            const salinity = parseFloat(this.state.tank_salinity)
            const turbidity = parseFloat(this.state.tank_turbidity)
            const buoy = parseInt(this.state.buoy_associated, 10)
            const production = parseInt(this.state.prod_associated, 10)
            const qtyShrimps = parseFloat(this.state.tank_qtyShrimps)
            const capacity = parseFloat(this.state.tank_capacity)
            var sendData = {}

            if(name!== null && name!== undefined){
              sendData.name = name
            }

            if(temperature!== null && temperature!== undefined){
              sendData.temperature = temperature
            }

            if(waterLevel!== null && waterLevel!== undefined){
              sendData.waterLevel = waterLevel
            }

            if(salinity!== null && salinity!== undefined){
              sendData.salinity = salinity
            }

            if(turbidity!== null && turbidity!== undefined){
              sendData.turbidity = turbidity
            }

            if(buoy!== null && buoy!== undefined){
              sendData.buoy = buoy
            }

            if(production!== null && production!== undefined){
              sendData.production = production
            }

            if(qtyShrimps!== null && qtyShrimps!== undefined){
              sendData.qtyShrimps = qtyShrimps
            }

            if(capacity!== null && capacity!== undefined){
              sendData.capacity = capacity
            }

            this.Auth.fetch( this.url , {
                method: 'PUT',
                body: JSON.stringify(sendData)
            })
            .then(res =>{
                window.location = this.url;
            })
        }
    }

    render() {

        const {tank_data, data, free_buoys, prods, buoy_associated, prod_associated} = this.state;
        const curTemp = data.temperature.length === 0 ? 0 : data.temperature[data.temperature.length-1][1];
        const curWaterLevel = data.waterlevel.length === 0 ? 0 : data.waterlevel[data.waterlevel.length-1][1];
        const curWaterLevelLabel = curWaterLevel === 0 ? 'Baixo' : 'Normal'
        const tempMax = tank_data.temperature === undefined ? 50 : tank_data.temperature*2

        var defaultData = {
            temperature:[],
            waterlevel:[]
        }
        var alertDataH = {
            temperature:[]
        }
        var riskDataH = {
            temperature:[]
        }
        var alertDataL = {
            temperature:[]
        }
        var riskDataL = {
            temperature:[]
        }

        for(var i=0; i < data.temperature.length;i++){
            defaultData.temperature.push([data.temperature[i][0],tank_data.temperature])
            defaultData.waterlevel.push([data.temperature[i][0],1])
            alertDataH.temperature.push([data.temperature[i][0],tank_data.temperature*1.1])
            riskDataH.temperature.push([data.temperature[i][0],tank_data.temperature*1.25])
            alertDataL.temperature.push([data.temperature[i][0],tank_data.temperature*0.9])
            riskDataL.temperature.push([data.temperature[i][0],tank_data.temperature*0.75])
        }
        return(
            <div className='App-main'>
                <div className='Page-container'>
                    <Sidebar role={this.user.role} tanks={'active'}/>
                    <Navbar user={this.user.username} />
                    <div className='App-intro'>
                        <div className='TankInfos'>
                            <div className='TitleBar'>
                                <span className='TankName'>Tanque {tank_data.name}</span>
                            </div>
                            <div className='conf-container'>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td colSpan={4} style={{fontSize: "25px", padding: "10px"}}> Configuração Ideal </td>
                                        </tr>
                                        <tr>
                                            <td>Temperatura</td>
                                            <td>Nivel d'Água</td>
                                            <td>Salinidade</td>
                                            <td>Turbidez</td>
                                        </tr>
                                        <tr>
                                            <td><span >{tank_data.temperature}</span></td>
                                            <td><span >{tank_data.waterLevel}</span></td>
                                            <td><span >{tank_data.salinity}</span></td>
                                            <td><span >{tank_data.turbidity}</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                                {(this.user.role === UserRole.sysAdmin.name || this.user.role === UserRole.manager.name || this.user.role === UserRole.biologist.name )&&(
                                    <button onClick={this.toggleModal.bind(this)}> Editar tanque</button>
                                )}
                                {(this.user.role === UserRole.sysAdmin.name || this.user.role === UserRole.manager.name )&&(
                                    <button onClick={this.handleDelete.bind(this, this.url, tank_data.name)}> Remover tanque</button>
                                )}
                            </div>
                        </div>
                        {tank_data.buoy &&(
                                <div className='Card'>
                                    <div className='Card-Title'>
                                        Bóia
                                    </div>
                                    <div className='Card-msg'>
                                        {tank_data.buoy}
                                    </div>
                                    {(this.user.role === UserRole.sysAdmin.name || this.user.role === UserRole.manager.name )&&(
                                      <button onClick={this.handleBuoyRemove.bind(this)}> Desassociar Bóia </button>
                                    )}
                                </div>
                        )
                        }
                        {!tank_data.buoy &&(
                                <Card url={'/buoys'} title='Boia' msg={"Sem bóia"}/>
                        )
                        }

                        {tank_data.production &&(
                          <div className='Card'>
                                <div className='Card-Title'>
                                        Produção
                                    </div>
                                    <div className='Card-msg'>
                                        {tank_data.production}
                                    </div>
                                    {(this.user.role === UserRole.sysAdmin.name || this.user.role === UserRole.manager.name )&&(
                                      <button onClick={this.handleProductionRemove.bind(this)}> Desassociar Produção </button>
                                    )}
                                </div>
                        )
                        }
                        {!tank_data.production &&(
                                <Card url={'/productions/'+tank_data.production} title='Produção' msg={'Sem produção'}/>
                        )
                        }

                        {tank_data.qtyShrimps &&(
                                <Card title='Qtd. Camarão' msg={tank_data.qtyShrimps+' Kg'}/>
                        )
                        }
                        {!tank_data.qtyShrimps &&(
                                <Card title='Qtd. Camarão' msg={'Indisponivel'}/>
                        )
                        }

                        {tank_data.capacity &&(
                                <Card title='Capacidade' msg={tank_data.capacity+' L'}/>
                        )
                        }
                        {!tank_data.capacity &&(
                                <Card title='Capacidade' msg={'Indisponivel'}/>
                        )
                        }


                        <div className='Thermometer'>
                            <div className='TitleBar'>
                                <span className='spanTitle'>Temperatura atual</span>
                            </div>
                            <Thermometer
                            theme="light"
                            value={curTemp}
                            max={tempMax}
                            steps="2"
                            format="°C"
                            size="normal"
                            height="200"
                            />
                        </div>
                        <div className='Chart-Temperature'>
                            <LineChart
                                data={
                                    [{
                                        'name':'Temperatura Ideal',
                                        'data': defaultData.temperature
                                    },{
                                        'name':'Temperatura Medida',
                                        'data': data.temperature
                                    },{
                                        'name':'Temperatura Alerta',
                                        'data': alertDataH.temperature
                                    },{
                                        'name':'Temperatura Risco',
                                        'data': riskDataH.temperature
                                    },{
                                        'name':'Temperatura Alerta',
                                        'data': alertDataL.temperature
                                    },{
                                        'name':'Temperatura Risco',
                                        'data': riskDataL.temperature
                                    }]}
                                min={0}
                                max={tempMax}
                                download={true}
                                suffix="°C"
                                xtitle="Hora"
                                ytitle="Temperatura(°C)"
                                legend={false}
                                label="Temperatura"
                                colors={["#90e2a0", "#90afe2","#ffe284","#d35454","#ffe284","#d35454"]}
                                pointRadius={0}
                            />
                        </div>

                        <div className='Card'>
                            <div className='Card-Title'>
                                Nível d'Água
                            </div>
                            <div className='Card-msg'>
                                {curWaterLevelLabel}
                            </div>
                        </div>
                        <div className='Chart-Temperature'>
                            <LineChart
                                data={
                                    [{
                                        'name':"Nível d'Água Normal",
                                        'data': defaultData.waterlevel
                                    },{
                                        'name':"Nível d'Água Medido",
                                        'data': data.waterlevel
                                    }]}
                                min={-1}
                                max={2}
                                download={true}
                                xtitle="Hora"
                                ytitle="Nível d'Água"
                                legend={false}
                                label="Nível d'Água"
                                colors={["#90e2a0", "#90afe2"]}
                                curve={false}
                                pointRadius={0}
                            />
                        </div>

                    </div>
                    <div style={{zIndex:'30'}}>
                      <Modal show={this.state.isModalOpen} onClose={this.toggleModal}>
                          <fieldset>
                              <legend>Editar Tanque</legend>
                              <form>
                                  <TextField disabled label="Nome" name="tank_name" defaultValue={tank_data.name} onChange={this.handleChange} />
                                  <TextField type='number' label="Temperatura Ideal" name="tank_temperature" defaultValue={tank_data.temperature} onChange={this.handleChange} />
                                  <TextField type='number' label="Nível d'Água Ideal" name="tank_waterLevel" defaultValue={tank_data.waterLevel} onChange={this.handleChange} />
                                  <TextField type='number' label="Salinidade Ideal" name="tank_salinity" defaultValue={tank_data.salinity} onChange={this.handleChange} />
                                  <TextField type='number' label="Turbidez Ideal" name="tank_turbidity" defaultValue={tank_data.turbidity} onChange={this.handleChange} />
                                  <TextField disabled={!(this.user.role === UserRole.sysAdmin.name || this.user.role === UserRole.manager.name )}className='User-select' label="Bóia associada" select value={buoy_associated || 0} name="buoy_associated" onChange={this.handleChange}>
                                      {free_buoys.map( buoys => (
                                          <option key={buoys.id} value={buoys.id}>
                                              {buoys.name}
                                          </option>
                                      ))}
                                  </TextField>
                                  <TextField disabled={!(this.user.role === UserRole.sysAdmin.name || this.user.role === UserRole.manager.name )} className='User-select' label="Produção associada" select value={prod_associated || 0} name="prod_associated" onChange={this.handleChange}>
                                      {prods.map( prod => (
                                          <option key={prod.id} value={prod.id}>
                                              {prod.name}
                                          </option>
                                      ))}
                                  </TextField>
                                  <TextField type='number' label="Quantidade de Camarão (Kg)" name="tank_qtyShrimps" defaultValue={tank_data.qtyShrimps} onChange={this.handleChange} />
                                  <TextField type='number' label="Capacidade (L)" name="tank_capacity" defaultValue={tank_data.capacity} onChange={this.handleChange} />
                                  <button onClick={this.handleUpdate.bind(this)}>Confirmar</button>
                                  <button onClick={this.toggleModal}>Cancelar</button>
                              </form>
                          </fieldset>
                      </Modal>
                    </div>
                </div>
            </div>
        );
    }
    componentDidMount() {
        this.Auth.fetch( this.url , {
            method: 'GET',
        })
        .then(response => {
            this.setState(
              {
                tank_data: response,
                buoy_associated: response.buoy,
                prod_associated: response.production,
                tank_name: response.name,
                tank_temperature: response.temperature,
                tank_waterLevel: response.waterLevel,
                tank_salinity: response.salinity,
                tank_turbidity: response.turbidity,
                tank_buoy: response.buoy,
                tank_production: response.production,
                tank_qtyShrimps: response.qtyShrimps,
                tank_capacity: response.capacity
              })
        })

        var {client} = this.state;
        client.on('message', msg => {
            var {buoy_associated, data} = this.state
            var info = msg.asObject()
            var curTime = new Date()
            if(info.buoy_id === buoy_associated){
              data.temperature.push([curTime, info.temperature])
              data.salinity.push([curTime, info.salinity])
              data.turbidity.push([curTime, Math.max(info['red'], info['green'], info['blue'])])
              data.waterlevel.push([curTime, info.water_level])
              data.samples+=1
              if(data.samples > 60){
                data.temperature.shift()
                data.salinity.shift()
                data.turbidity.shift()
                data.waterlevel.shift()
                data.samples-=1
              }
            }
            console.log(info.buoy_id)
            console.log(data)

            this.setState({data})
        });
    }
}

export default Tank;
