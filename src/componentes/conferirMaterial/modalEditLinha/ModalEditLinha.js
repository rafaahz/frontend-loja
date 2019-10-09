
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import {upperCaseF} from '../../helper/inputText';

export default function ModalEditLinha(props) {

    return (
        <Modal show={props.show} onHide={props.close} size="xl">
            <Modal.Header closeButton>
                <Modal.Title className="text-center">EDITANDO A LINHA {props.linhaEditada + 1}</Modal.Title>
            </Modal.Header>

            <Modal.Body className="row">
                {props.linhas.length>0 ? props.linhas[props.linhaEditada].map( (item, i)=>{
                    return <input key={i} type="text" defaultValue={item} 
                    className={"form-control"}
                    style={{width: (100/props.maiorColuna - 3)+"%", margin: "auto"}}
                    id={i}
                    onChangeCapture={upperCaseF}
                    onKeyUpCapture={props.alteraLista}
                    />
                }) : ''}
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={props.close}>
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}