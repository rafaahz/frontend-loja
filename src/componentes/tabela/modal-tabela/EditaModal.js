import React, {Component} from 'react';
import { Button } from 'react-bootstrap';

import global from '../../global';
import {filtroDiv} from '../../helper/inputText';
import {atualiza} from './request';
import {getElements} from '../../helper/getElements';
import {compararArray} from '../../helper/comparar';

export default class EditaModal extends Component {

    constructor(props){
        super(props)

        this.state = {
            inputUm: '',
            inputDois: '',
            salva: null,
            alterados: [],
            resposta: ''
        }
        this.change = this.change.bind(this);
    }

    componentWillMount(){
        this.naoContem = [];
        this.copia = [].concat(this.props.corpo);
        this.setState({salva: null})
        var indice;
        
        // FAZ UM IF PARA VER SE VAI MEXER EM CIDADES OU TRANSPORTADORAS
        (this.props.nome === "CIDADES") ? indice  = 1 : indice = 0;
        //*************************************************************/
        this.props.lista[indice].forEach(e => {
            if(this.props.corpo.toString().indexOf(e[Object.keys(e)[0]]) < 0){
                this.naoContem.push(e[Object.keys(e)[0]]);
            }
        })
    }

    //CAMPOS DE IMPUT TEXT QUE FILTRAM OS RESULTADOS NA TELA DE EDIÇÃO
    inputUmHandleChange(event){
        this.setState({inputUm: event.target.value.toUpperCase()});
        filtroDiv(event, "esquerdo")
    }
    inputDoisHandleChange(event){
        this.setState({inputDois: event.target.value.toUpperCase()});
        filtroDiv(event, "direito")
    }
    //***************************************************************/

    change(e){
        // ADICIONA OU REMOVE OS ITENS CLICADOS EM UMA LISTA PARA PASSAR AO BACK-END A LISTA DE QUAIS FORAM ALTERADOS
        let v = e.target.textContent;
        if(this.state.alterados.indexOf(v) <0){
            let a = this.state.alterados.concat(v);
            this.setState({alterados:a})
        } else {
            let a = this.state.alterados.filter( function(val){ return val.indexOf(v)<0 } )
            this.setState({alterados: a});
        }
        // *********************************************************************************************************

        //MUDA O ITEM DE LADO AO SER CLICADO
        if(e.target.parentNode.id === "esquerdo"){
            document.getElementById("direito").appendChild(e.target);
            this.copia.push(e.target.textContent);
        } else {
            document.getElementById("esquerdo").appendChild(e.target);
            this.copia.splice(this.copia.indexOf(e.target.textContent), 1);
        }
        //***********************************/

        //CONFERE AS DUAS LISTA PARA VER SE HOUVE MUDANÇA, SE SIM: MOSTRA O BOTÃO DE SALVAR
        if(compararArray(this.props.corpo, this.copia)){
            this.setState({
                salva:<Button variant="info" onClick={()=> {
                let esquerdo = getElements("esquerdo", 1);
                let direito = getElements("direito", 1);
                atualiza(this.props.id,this.props.nome, this.props.titulo,this.state.alterados, esquerdo, direito, global.CIDADES, this.props.lista, function( res, atualizado ){
                    if(res){
                        this.setState({resposta:[res]})
                        this.props.atualiza(res);
                    }
                }.bind(this))
            } }
            className="w-75 d-block mt-3 mb-3 ml-auto mr-auto">SALVAR</Button>})
        } else { 
            this.setState({salva:null})
        }
        //*********************************************************************************/

    }

    
    render(){
        return(
            <div>
                {this.state.salva}
                <div className="d-flex">
                    <div className="w-50" id="esquerdo">

                        <input type="text" onChange={this.inputUmHandleChange.bind(this)}
                            className="form-control text-center w-75 m-auto" 
                            placeholder="filtrar" value={this.state.inputUm}
                        />

                        {
                            this.naoContem.sort().map( (item, i)=>{
                                return(
                                    <Button key={i} variant="secondary" className="w-75 d-block ml-auto mr-auto mt-2" onClick={this.change}>
                                        {item}
                                    </Button>
                                )
                            })
                        }
                    </div>
                    <div className="w-50" id="direito">
                        <input type="text" onChange={this.inputDoisHandleChange.bind(this)}
                            className="form-control text-center w-75 m-auto" 
                            placeholder="filtrar" value={this.state.inputDois}
                        />
                        {this.props.corpo.sort().map( (item, i)=>{
                            return (
                                <Button key={i} variant="success" className="w-75 d-block ml-auto mr-auto mt-2" onClick={this.change}>
                                    {item}
                                </Button>
                            )
                        })}    
                    </div>                
                </div>
            </div>
        );
    }
}