import React, { Component } from 'react';
import ModalTabela from './modal-tabela/ModalTabela';

import {filtroTabela} from '../helper/inputText';

export default class Tabela extends Component {

    constructor(props){
        super(props);
        this.state = {
            titulo: '',
            subInfo: '',
            id: '',
            showModal: false,
            input: ''
        };
        this.alteraState = this.alteraState.bind(this);
    }

    alteraState(a,b,id){
        this.setState({titulo: a});
        this.setState({subInfo: b});
        this.setState({id: id})
        this.setState({showModal: true});
    }

    inputHandleChange(event){
        this.setState({input: event.target.value.toUpperCase()});
        filtroTabela(event, "table", 0)
      }
    

    render(){
        return(
            <div>
                <table className="table table-striped table-hover col-12 m-auto" id="table">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col" className="text-center">{this.props.nome}<br/>
                        <input type="text"
                        id="busca"
                        onChange={this.inputHandleChange.bind(this)} value={this.state.input}
                        className="form-control bg-secondary text-warning border border-light rounded text-center"
                        placeholder={("Filtrar " + this.props.nome).toString()}
                        />
                        
                        </th>

                        <th scope="col" className="text-center">{this.props.info}</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.array.map( item=>{
                                let A = item[Object.keys(item)[0]];
                                let B = item[Object.keys(item)[1]];
                                return (<tr key={item.id} 
                                    onClick={()=> this.alteraState(A,B, item.id)} 
                                    style={{cursor:'pointer'}}>
                                    <td>{A}</td>
                                    <td className="text-center">{B}</td>
                                    </tr>)
                            })
                        }
                    </tbody>
                </table>

                <ModalTabela 
                titulo={this.state.titulo}
                subInfo={this.state.subInfo}
                id={this.state.id}
                show={this.state.showModal}
                onHide={()=> this.setState({showModal: false})}
                array={this.props.lista}
                nome={this.props.nome}
                cidades={this.props.cidades}
                atualiza={(a)=>{ this.props.atualiza(a) }}
                />

            </div>
        );
    }
}