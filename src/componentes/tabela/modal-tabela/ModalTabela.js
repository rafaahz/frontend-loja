import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { IoIosSettings, IoMdCheckmark, IoMdClose } from "react-icons/io";

import global from '../../global';
import {deleta, atualizaItem} from './request';
import Corpo from './Corpo';
import EditaModal from './EditaModal';
import {filtroTabela} from '../../helper/inputText';
import InfoModal from './InfoModal';


export default class ModalTabela extends Component{

  constructor(props){
    super(props);
    this.state = {
      input: '',
      ativo: '',
      modal: null,
      editTitle: "SPAN",
      iconModal: <IoIosSettings/>,
      titulo: '',
      subInfo: ''
    }

    this.modalTitulo = this.modalTitulo.bind(this);
    this.editaTitulo = this.editaTitulo.bind(this);
    this.fecha = this.fecha.bind(this);
    this.compara = this.compara.bind(this);
  }

  componentWillReceiveProps(){
    this.setState({modal:null})
    this.setState({ativo: "EDITA"})
  }

  inputChange(item, event){
    this.setState({[item]: event.target.value.toUpperCase()});

    setTimeout(() => {
      this.compara()
    }, 50);
  }

  compara(){
    if(this.state.titulo !== this.props.titulo || this.state.subInfo !== this.props.subInfo){
      this.setState({iconModal: <IoMdCheckmark/>});
    } else {
      this.setState({iconModal: <IoMdClose/>});
    }
  }

  inputHandleChange(event){
    this.setState({input: event.target.value.toUpperCase()});
    filtroTabela(event, "results", 0)
  }

  modalBody(){
    if(this.state.ativo === "CORPO"){
        this.setState({ativo:"EDITA"})
    } else {
      this.setState({ativo:"CORPO"})
    }

    if(this.state.ativo ===  "CORPO"){
        this.setState({modal: <Corpo corpo={InfoModal(this.props.titulo, this.props.array, this.props.nome)} array={this.props.array}/>})
    } else {
        this.setState({modal: <EditaModal id={this.props.id} lista={this.props.array} corpo={InfoModal(this.props.titulo, this.props.array, this.props.nome)} nome={this.props.nome} titulo={this.props.titulo} atualiza={(a)=>{ this.props.atualiza(a) }}/>})
    }
  }

  modalTitulo(elemento){
    if(elemento !== "INPUT"){
      return(
        <>
          <span>{this.props.titulo}</span> — <span>{this.props.subInfo}</span>
        </>
      )
    } else {
      return(
        <>
          <input type="text" style={{width: "40%"}} className="text-dark" placeholder={this.props.titulo} value={this.state.titulo} onChange={this.inputChange.bind(this, "titulo")}/>
          <span className="ml-3 mr-3">—</span>
          <input type="text" style={{width: "40%"}} className="text-dark" placeholder={this.props.subInfo} value={this.state.subInfo} onChange={this.inputChange.bind(this, "subInfo")}/>
        </>
      )
    }
  }

  editaTitulo(){
    // iguala o stado de titulo e subinfo com as props para comparar -----
    this.setState({titulo: this.props.titulo, subInfo: this.props.subInfo})

    this.state.editTitle === "INPUT" ? this.setState({editTitle: "SPAN"}) : this.setState({editTitle: "INPUT"});
    //this.state.iconModal.type.name === "IoIosSettings" ? this.setState({iconModal: <IoMdClose/>}) : this.setState({iconModal: <IoIosSettings/>});

    if(this.state.iconModal.type.name === "IoIosSettings"){
      this.setState({iconModal: <IoMdClose/>})
    }
    if(this.state.iconModal.type.name === "IoMdClose"){
      this.setState({iconModal: <IoIosSettings/>})
    }
    if(this.state.iconModal.type.name === "IoMdCheckmark"){

      atualizaItem(this.props.nome, this.props.titulo, 
        this.props.subInfo,(global.ITEM + "/atualiza"),  this.props.id, 
        this.state.titulo, this.state.subInfo, (res)=>{
          this.fecha();
          this.props.atualiza(res);
        } )

      this.setState({iconModal: <IoIosSettings/>})
    }
  }

  // Volta as informaçoes padros do modal antes de fecha-lo
  fecha(){
    this.props.onHide();
    this.setState({editTitle: "SPAN"})
    this.setState({iconModal: <IoIosSettings/>})
  }

  render(){
    return (
      <div>
        <Modal
        show={this.props.show}
        onHide={()=> this.fecha()}
        size="xl"
        >
          <Modal.Header closeButton className="bg-dark text-white">
            <Modal.Title id="example-custom-modal-styling-title" className="text-center w-100">
              {this.modalTitulo(this.state.editTitle)}
              <button type="button" className="close" onClick={this.editaTitulo} ><span aria-hidden="true">{this.state.iconModal}</span></button>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-dark text-white">
              <table className="table table-dark table-striped table-hover" id="results">
                <thead>
                      <tr>
                        <th colSpan="2" scope="col">
                          <input type="text" onChange={this.inputHandleChange.bind(this)}
                          id="filter" className="form-control mb-2 text-center" 
                          placeholder="filtrar" value={this.state.input}
                          />
                          <Button variant="secondary" className="w-50 rounded-0 border-right" onClick={()=> this.modalBody()}>EDITAR {this.props.nome.substr(0, this.props.nome.length-1)}</Button>
                          <Button variant="danger" onClick={()=> deleta(this.props.id, global[this.props.nome], this.props.nome, this.props.cidades, this.props.titulo, (res)=>{
                            this.fecha();
                            this.props.atualiza(res);
                          } )}
                          className="w-50 rounded-0 border-left">APAGAR {this.props.nome.substr(0, this.props.nome.length-1)}</Button>
                        </th>
                      </tr>
                  </thead>
                  <tbody>
                    {
                      (this.state.modal || <Corpo corpo={InfoModal(this.props.titulo, this.props.array, this.props.nome)} array={this.props.array}/>)
                    }
                  </tbody>
              </table>
          </Modal.Body>
        </Modal>
      </div>
    );
  }

}



