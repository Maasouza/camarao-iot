import React from 'react';
import './TankContainer.css'

import SvgIcon from 'react-icons-kit';
import {ic_report_problem} from 'react-icons-kit/md/ic_report_problem'  // warning
import {ic_new_releases} from 'react-icons-kit/md/ic_new_releases'      // danger
import {wifi} from 'react-icons-kit/feather/wifi'
import {wifiOff} from 'react-icons-kit/feather/wifiOff'
import {ic_opacity} from 'react-icons-kit/md/ic_opacity'
import {thermometer2} from 'react-icons-kit/fa/thermometer2'
import Salt from './SaltShaker'
// import Thermometer from 'react-thermometer-component'
import {iosAnalytics} from 'react-icons-kit/ionicons/iosAnalytics'
const TankStatus = {
    ok : 'ok',
    warning : 'warning',
    danger : 'danger',
    noBuoy : 'noBuoy',
    noProduction : 'noProduction'
};

class TankContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            status: '',
            data: []
        }
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleClick = (path) => {
      window.location = path
    }

    capitalize(str){
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    render(){

        const data = this.props.data
        console.log(data)
        var tankStatus = data.production !== null ? TankStatus.ok : TankStatus.noProduction
        const wifiIcon = (data.buoy !== 0 && data.buoy !== null) ? wifi : wifiOff
        const bouy_numbers = (data.buoy !== 0 && data.buoy !== null) ? 1 : '-'
        const iconClass = {
            temperature: 'icon-'+TankStatus.ok,
            turbidity: 'icon-'+TankStatus.ok,
            salinity:'icon-'+TankStatus.ok,
            waterlevel: 'icon-'+TankStatus.ok
        }
        if (tankStatus !== TankStatus.noProduction) {
            if (this.props.temperature > data.temperature*1.25 || this.props.temperature < data.temperature*0.75) {
                iconClass.temperature = 'icon-'+TankStatus.danger
                tankStatus = TankStatus.danger
            } else if (this.props.temperature > data.temperature*1.10 || this.props.temperature < data.temperature*0.90) {
                iconClass.temperature = 'icon-'+TankStatus.warning
                tankStatus = TankStatus.warning
            }

            if (this.props.waterlevel === 'Baixo'){
                iconClass.waterlevel = 'icon-'+TankStatus.danger
                tankStatus = TankStatus.danger
            }

            if (this.props.turbidity === 'Baixa'){
                iconClass.turbidity = 'icon-'+TankStatus.danger
                tankStatus = TankStatus.danger
            }

            if (this.props.salinity > data.salinity*1.25 || this.props.salinity < data.salinity*0.75) {
                iconClass.salinity = 'icon-'+TankStatus.danger
                tankStatus = TankStatus.danger
            } else if (this.props.salinity > data.salinity*1.10 || this.props.salinity < data.salinity*0.90) {
                iconClass.salinity = 'icon-'+TankStatus.warning
                tankStatus = tankStatus === TankStatus.danger? TankStatus.danger : TankStatus.warning
            }
        }

        const icon = tankStatus === TankStatus.danger? ic_new_releases : ic_report_problem

        if (bouy_numbers === '-') {
            tankStatus = TankStatus.noBuoy
        }

        if (data.production === null) {
            tankStatus = TankStatus.noProduction
        }

        if (tankStatus === TankStatus.noBuoy || tankStatus === TankStatus.noProduction) {
            iconClass.temperature = 'icon-'+tankStatus
            iconClass.turbidity  = 'icon-'+tankStatus
            iconClass.salinity  = 'icon-'+tankStatus
            iconClass.waterlevel = 'icon-'+tankStatus
        }

        return (
          <div className='Tanque' onClick={this.handleClick.bind(this,"/tanks/"+this.props.tank_id)}>
            <div className={tankStatus}>
            {
                (tankStatus !== TankStatus.ok && tankStatus !== TankStatus.noBuoy && tankStatus !== TankStatus.noProduction) ? (
                    <span >
                        <SvgIcon size={30} icon={icon}/>
                    </span>
                ):(
                    <span>
                        { tankStatus === TankStatus.noProduction && (
                            <span>Sem Produção</span>
                        )}
                    </span>
                )
            }
            </div>
            <span className='tankName'>{this.props.name}</span><br/>
                <div>
                    <div className='icon-container'>
                        <table>
                            <tbody>
                                <tr>
                                    <td><span title={'Temperatura - '+this.props.temperature+'°C'}><SvgIcon className={iconClass.temperature} size={32}  icon={thermometer2}/></span></td>
                                    <td><span title={'Nivel de Agua - '+this.props.waterlevel}><SvgIcon className={iconClass.waterlevel} size={32}  icon={ic_opacity}/></span></td>
                                    <td><span title={'Salinidade - '+this.props.salinity}><Salt fill={iconClass.salinity} size={44} /></span></td>
                                    <td><span title={'Turbidez -'+this.props.turbidity}><SvgIcon className={iconClass.turbidity} size={32}  icon={iosAnalytics}/></span></td>
                                </tr>
                                <tr>
                                    <td><span >{this.props.temperature+'°C'}</span></td>
                                    <td><span >{this.props.waterlevel}</span></td>
                                    <td><span >{this.props.salinity}</span></td>
                                    <td><span >{this.props.turbidity}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            <div className='Buoys'>
                <span>{bouy_numbers}</span>
                <SvgIcon className='Buoys-icon' size={18} icon={wifiIcon}/>
            </div>
          </div>
        )
    }


    handleLogout(){
        this.Auth.logout()
        window.location = '/'
    }
}

export default TankContainer;
