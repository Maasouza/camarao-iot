import React, { Component } from 'react';
import AuthService from '../AuthService'
import SvgIcon from 'react-icons-kit';

import {ic_delete} from 'react-icons-kit/md/ic_delete'
import {ic_remove_red_eye} from 'react-icons-kit/md/ic_remove_red_eye'
import {ic_mode_edit} from 'react-icons-kit/md/ic_mode_edit'
import './Mytable.css'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Modal from './Modal';
import TextField from '@material-ui/core/TextField';

class Mytable extends Component {
    constructor(){
        super();
        this.Auth = new AuthService()
        this.handleChange = this.handleChange.bind(this);
        this.user = this.Auth.getUser()
        this.state = {
            isModalOpen: false,
            selected_item: null,
            view: null
        }
    };

    toggleModal = (id, view) => {
        if (!this.state.isModalOpen) {
            this.Auth.fetch( this.props.url + '/' + id , {
                method: 'GET',
            })
            .then(response => {
                this.setState({
                  selected_item: response,
                  prod_name: response.name,
                  prod_client: response.client,
                  prod_requestedAmount: response.requestedAmount,
                  prod_estimatedAmount: response.estimatedAmount,
                  prod_shrimpClass: response.shrimpClass,
                  prod_startDate: response.startDate,
                  prod_endDate: response.endDate,
                  isModalOpen: !this.state.isModalOpen,
                  view: view
                })
            })
        }else{
          this.setState({
            isModalOpen: !this.state.isModalOpen,
            view: view
          });
        }
    }

    handleDelete(id,name){
        const confirm = window.confirm("Deseja remover <"+name+"> de "+this.props.tablename+"?");
        if(confirm){
            this.Auth.fetch(this.props.url + '/' + id, {
                method: 'DELETE',
            })
            .then(data => {
                window.location = this.props.url
            }).catch((e)=>{
                window.confirm(e)
            })
        }
    }

    handleUpdate(e){
        e.preventDefault();
        const confirm = window.confirm("Deseja editar a produção <"+this.state.selected_item.name+"> ?");
        if(confirm){
            const name = this.state.prod_name
            const client = this.state.prod_client
            const requestedAmount = parseFloat(this.state.prod_requestedAmount)
            const estimatedAmount = parseFloat(this.state.prod_estimatedAmount)
            const shrimpClass = this.state.prod_shrimpClass
            const startDate = this.state.prod_startDate
            const endDate = this.state.prod_endDate
            var sendData = {}

            if(name !== null && name !== undefined){
              sendData.name = name
            }
            if(client !== null && client !== undefined){
              sendData.client = client
            }
            if(requestedAmount !== null && requestedAmount !== undefined){
              sendData.requestedAmount = requestedAmount
            }
            if(estimatedAmount !== null && estimatedAmount !== undefined){
              sendData.estimatedAmount = estimatedAmount
            }
            if(shrimpClass !== null && shrimpClass !== undefined){
              sendData.shrimpClass = shrimpClass
            }
            if(startDate !== null && startDate !== undefined){
              sendData.startDate = startDate
            }
            if(endDate !== null && endDate !== undefined){
              sendData.endDate = endDate
            }
            this.Auth.fetch( this.props.url + '/' + this.state.selected_item.id , {
                method: 'PUT',
                body: JSON.stringify(sendData)
            })
            .then(res =>{
                window.location = this.props.url;
            })
        }
    }

    handleClick = (path) => {
        window.location = path
    }

    handleChange(e){
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }

    render() {
        const {selected_item} = this.state;
        return(
            <div>
            <div className="Table">
                <span className="Table-name">{this.props.tablename}</span>
                <Table className="Main-Table">
                    <TableHead>
                        <TableRow>
                            {this.props.labels.map((label, id) => {
                                return (
                                    <TableCell key={id}>{label}</TableCell>
                                );
                            })}
                            {(!this.props.onlyView || this.props.showEye) && (
                            <TableCell style={{textAlign: 'center'}} key = {this.props.labels.length}>Opções</TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.data.map(row => {
                            return (
                            <TableRow key={row.id} className="Table-header">
                                {this.props.keys.map((jsonKey, id) => {
                                    return (
                                    <TableCell key={id} >{row[jsonKey]}</TableCell>
                                    )
                                })}
                                <TableCell key = {this.props.keys.length} style={{textAlign: 'center'}}>
                                    {this.props.showEye && (
                                        <span title="Visualizar"className='DeleteButton' onClick={this.toggleModal.bind(this,row.id,true)}>
                                            <SvgIcon className="Nav-icon"size={20} icon={ic_remove_red_eye}/>
                                        </span>
                                    )}
                                    {(!this.props.onlyView && this.props.showEdit) && (
                                      <span title="Editar" className='DeleteButton' onClick={this.toggleModal.bind(this,row.id,false)}>
                                          <SvgIcon className="Nav-icon"size={20} icon={ic_mode_edit}/>
                                      </span>
                                    )}
                                    {(!this.props.onlyView && this.props.showRemove) && (
                                      <span title="Excluir" className='DeleteButton' onClick={this.handleDelete.bind(this,row.id,row.name)}>
                                          <SvgIcon className="Nav-icon"size={20} icon={ic_delete}/>
                                      </span>
                                    )}
                                </TableCell>
                            </TableRow>
                        )})}
                    </TableBody>
                </Table>
            </div>

                {selected_item&& (<Modal show={this.state.isModalOpen} onClose={this.toggleModal}>
                        <fieldset>
                            <legend>{this.state.view?(" Produção "+selected_item.name+" "):(" Editar Produção "+selected_item.name+" ")}</legend>
                            <form>
                                <TextField disabled label="Nome" name="prod_name" defaultValue={selected_item.name} onChange={this.handleChange} />
                                <TextField disabled label="Cliente" disabled name="prod_client" defaultValue={selected_item.client} onChange={this.handleChange} />
                                <TextField disabled={this.state.view} label="Classe do Camarão" name="prod_shrimpClass" defaultValue={selected_item.shrimpClass} onChange={this.handleChange} />
                                <TextField disabled={this.state.view} type='number'label="Quantidade de camarão requerida (Kg)" name="prod_requestedAmount" defaultValue={selected_item.requestedAmount} onChange={this.handleChange} />
                                <TextField disabled type='number'label="Quantidade de camarão atual estimada (Kg)" name="prod_estimatedAmount" defaultValue={selected_item.estimatedAmount} onChange={this.handleChange} />
                                <TextField disabled type='date' label="Data de início" name="prod_startDate" defaultValue={selected_item.startDate} onChange={this.handleChange} />
                                <TextField disabled={this.state.view} type='date' label="Data de despesca" name="prod_endDate" defaultValue={selected_item.endDate} onChange={this.handleChange} />
                                {!this.state.view && (
                                  <button onClick={this.handleUpdate.bind(this)}>Confirmar</button>
                                )}
                                <button onClick={this.toggleModal}>{this.state.view?("Ok"):("Cancelar")}</button>
                            </form>
                        </fieldset>
                    </Modal>)}

            </div>
        );
    }
}

export default Mytable;
