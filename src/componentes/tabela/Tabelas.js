import React, { Component } from 'react';
import Tabela from './Tabela';
import ModalAdicionar from './modal-adicionar/ModalAdicionar';
import Request from '../helper/jsAjax';
import global from '../global';

export default class Tabelas extends Component {

  constructor() {
    super();    
    this.state = {cidades: [], transportadoras: [], ativa:[], 
        array: [], nome:'TRANSPORTADORAS',info:'TELEFONE',
        mensagem: "'(99) 99999-9999' para 1 telefone  ou '(99) 99999-9999 | (99) 9999-9999' para 2 telefones",
        showModal: false
    };
    this.setTable = this.setTable.bind(this);
    this.change = this.change.bind(this);
}

  componentDidMount(){ 
    document.title = "TABELA TRANSPORTADORAS";

    Request(null, "GET", global["CIDADES"], function(res, err){
            let resposta = JSON.parse(res);
            let cidades = resposta[0];
            let transportadoras = resposta[1];
        
            this.setState({cidades});
            this.setState({transportadoras});
            this.setState({array: resposta});
            this.setState({ativa: this.state.transportadoras});
    }.bind(this) )

    }    

    setTable(e){
        this.setState({nome:e.target.value});
        if(e.target.value === "CIDADES"){
            this.setState({
                info:"ESTADO",
                ativa: this.state.cidades,
                mensagem: "Adicione no formato de sigla 'SP', 'MG'..."
            });
        } else { 
            this.setState({
                info:"TELEFONE",
                ativa: this.state.transportadoras,
                mensagem: "'(99) 99999-9999' para 1 telefone  ou '(99) 99999-9999 | (99) 9999-9999' para 2 telefones"
            })
        }
    }

    change(a){
        this.setState({
            array:  JSON.parse([a]),
            cidades:    JSON.parse([a])[0],
            transportadoras:    JSON.parse([a])[1],
        })

        if(this.state.info === "ESTADO"){
            this.setState({ativa: JSON.parse([a])[0]})
        } else {
            this.setState({ativa: JSON.parse([a])[1]})
        }
    }


    render() {
        return (
            <div className="table-responsive-sm container-fluid">
                <ul className="nav nav-tabs">
                    <li>
                        <button type="button" className="btn btn-primary" onClick={()=>this.setState({showModal: true})} >
                        ADICIONAR
                        </button>
                        <select value={this.state.nome} onChange={this.setTable} className="btn btn-primary m-1">
                            <option value="CIDADES">TABELA DE CIDADES</option>
                            <option value="TRANSPORTADORAS">TABELA DE TRANSPORTADORAS</option>
                        </select>
                    </li>
                </ul>

                <ModalAdicionar show={this.state.showModal} close={()=> this.setState({showModal:false})}
                nome={this.state.nome} info={this.state.info} mensagem={this.state.mensagem} atualiza={(a)=> this.change(a) }
                />

                <Tabela array={this.state.ativa} nome={this.state.nome} info={this.state.info} 
                cidades={this.state.cidades} lista={this.state.array} 
                atualiza={(a)=> this.change(a) }/>

            </div>
        );
    }
};