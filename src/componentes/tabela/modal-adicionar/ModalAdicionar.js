import React, {Component} from 'react';
import { Modal, Button } from 'react-bootstrap';

import global from '../../global';
import {adiciona} from '../modal-tabela/request';

export default class ModalAdicionar extends Component {

    constructor(){
        super()
        this.state = {
            titulo: '',
            info: ''
        }
    }

    trocaInfo(item, event){
        this.setState({[item]:event.target.value.toUpperCase()});
    }


    render(){
        return(
            <>
                <Modal show={this.props.show} onHide={this.props.close}>
                    <Modal.Header closeButton>
                    <Modal.Title>ADICIONAR {this.props.nome.substr(0, this.props.nome.length-1)}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    {this.props.nome.substr(0, this.props.nome.length-1)}: <input type="text" value={this.state.titulo} onChange={this.trocaInfo.bind(this, "titulo")} className="form-control"/>
                    {this.props.info}: <input type="text" value={this.state.info} onChange={this.trocaInfo.bind(this, "info")} className="form-control"/>
                    <sub>{this.props.mensagem}</sub>

                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.close}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={()=>adiciona(this.props.nome, global.ITEM, this.state.titulo, this.state.info, (res)=>{
                        this.setState({
                            titulo: '',
                            info: ''
                        });
                        this.props.close();
                        this.props.atualiza(res);
                    })}>
                        Gravar
                    </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }

}