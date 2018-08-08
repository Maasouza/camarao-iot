import React from "react";
import Logo from './Logo';
import SvgIcon from 'react-icons-kit';

import './SideBar.css'
import UserRole from '../UserRole';

import {ic_settings} from 'react-icons-kit/md/ic_settings'
import {inbox_out} from 'react-icons-kit/ikons/inbox_out'
import {ic_history} from 'react-icons-kit/md/ic_history'
import {users} from 'react-icons-kit/icomoon/users'
import {lifebuoy} from 'react-icons-kit/icomoon/lifebuoy'
import {thermometer} from 'react-icons-kit/entypo/thermometer'

const SeparatorTitle = props => {
  return (
      <div className="Separator">
          {props.children}
          <hr style={{ border: 0, borderTop: '2px solid #ea7a6d' }} />
      </div>
  );
};

class Sidebar extends React.Component{
    handleClick = (path) => {
      window.location = path
    }
    render(){
        return (
          <div className="Sidebar">
            <Logo fontsize={22}/>
            <SeparatorTitle/>
            <span className={this.props.tanks || ''} onClick={this.handleClick.bind(this,'/tanks')}>
              <SvgIcon className="Nav-icon"size={20} icon={thermometer}/>
              Tanques
            </span>
            <span className={this.props.temporal || ''} onClick={this.handleClick.bind(this,'/temporal')}>
              <SvgIcon className="Nav-icon"size={20} icon={ic_history}/>
              Consultas Temporais
            </span>
            {this.props.role !== UserRole.tankCaretaker.name && (
            <span className={this.props.productions || ''} onClick={this.handleClick.bind(this,'/productions')}>
              <SvgIcon className="Nav-icon"size={20} icon={inbox_out}/>
              Produções
            </span>
            )}
            {(this.props.role === UserRole.sysAdmin.name || this.props.role === UserRole.manager.name) && (
            <span className={this.props.employees || ''} onClick={this.handleClick.bind(this,'/users')}>
              <SvgIcon className="Nav-icon"size={20} icon={users}/>
              Funcionários
            </span>
            )}
            {this.props.role === UserRole.sysAdmin.name && (
            <span className={this.props.buoys || ''} onClick={this.handleClick.bind(this,'/buoys')}>
              <SvgIcon className="Nav-icon"size={20} icon={lifebuoy}/>
              Bóias
            </span>
            )}
            <span className={this.props.settings || ''} onClick={this.handleClick.bind(this,'/settings')}>
              <SvgIcon className="Nav-icon"size={20} icon={ic_settings}/>
              Configurações
            </span>
          </div>
        )
    }
}

export default Sidebar;
