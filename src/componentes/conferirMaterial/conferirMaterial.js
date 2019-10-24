
import React, { useState, useEffect } from 'react';

import InputsDeTexto from './inputs/inputsDeTexto';
import ModalEditLinha from "./modalEditLinha/ModalEditLinha";

import { Collapse, Button } from 'react-bootstrap';

import global, {atualizaEmails} from '../global';
import GerarTabela from './tabela/gerarTabela';
import { sendTable } from '../helper/jsAjax';


export default function ConferirMaterial() {

    document.title = 'CONFERIR MATERIAL';

    
    const [email, setEmail] = useState('');
    const [col, setCol] = useState(2);
    const [maiorColuna, setMaiorColuna] = useState(2);
    const [titulo, setTitulo] = useState([]);
    const [linhas, setLinhas] = useState([]);
    
    const [open, setOpen] = useState(false);
    const [notificacao, setNotificacao] = useState([]);
    
    const [show, setShow] = useState(false);
    const [indiceEdit, setIndiceEdit] = useState(0);
    
    useEffect(()=>{
        atualizaEmails();
        console.log(global);
    }, [])

    function selectHandleChange(e) {
        if (isNaN(e.target.value)) {
            setEmail(e.target.value);
        } else {
            setCol(e.target.value);
        }
    }

    const handleClose = () => {
        setShow(false);
    }

    const alteraTitulo = (a) => {
        let numero = parseInt(a.target.id.replace("titulo", ""));
        let b = [].concat(titulo);
        b[numero] = a.target.value.toUpperCase();
        while (b[b.length - 1] === "") {
            b.pop();
        }
        setTitulo(b);
    }

    const alteraLinhas = (a) => {
        if (a.keyCode === 13) {
            let itens = document.getElementsByClassName("corpo");
            let valores = [];

            let notif = [];

            let l = [].concat(linhas);
            for (let i = 0; i < itens.length; i++) {
                valores.push(itens[i].value.toUpperCase())
                notif.push(itens[i].value.toUpperCase())
                if (i !== 0) {
                    itens[i].value = "";
                }
            }

            setNotificacao( notif );
            setOpen(true);

            l.push(valores);
            l.forEach(item => {
                if (item.length > maiorColuna) {
                    setMaiorColuna(item.length)
                }
            })
            l.forEach(item => {
                while (item.length < maiorColuna) {
                    item.push("-");
                }
            })

            setLinhas(l);
            itens[0].select();

            setTimeout(() => {
                setOpen(false);
            }, 4000);
        }
    }


    const modalEditLinha = (indice, event) => {
        setShow(true);
        setIndiceEdit(indice);
    }

    const editLinha = (event) => {
        let a = linhas;
        a[indiceEdit][event.target.id] = event.target.value;
        setLinhas(a)
    }

    const deletaLinha = (e) => {

        let num = e.currentTarget.id.replace("linha", "");
        if (!window.confirm("DELETAR LINHA " + (parseInt(num) + 1) + " ?")) return;
        let array = [].concat(linhas);
        array.splice(num, 1);
        setLinhas(array);
    }

    const enviarTabela = (e) => {

        if (email !== "") {
            let a = document.getElementsByClassName("EDT");
            while (a.length > 0) { a[0].remove() }
            let tabHTML = document.getElementById("tabela").innerHTML;
            sendTable(tabHTML, email, "MATERIAL CONFERIDO");
        } else {
            alert("INFORME O DESTINATARIO");
        }
    }

    return (
        <div className="table-responsive-sm container-fluid">

            <ul className="nav nav-tabs">
                <li className="row w-100 align-baseline">
                    <button type="button" className="btn btn-primary col-md-2 m-1"
                        onClick={enviarTabela}>
                        ENVIAR E-MAIL
                    </button>

                    <select value={"SELECIONAR DESTINATARIO"} onChange={selectHandleChange} className="btn btn-primary m-1 col-md-3">
                        <option disabled>{"SELECIONAR DESTINATARIO"}</option>
                        {console.log(global)}
                        {global.EMAILS.map((item, i) => {
                            return <option key={i} value={item.email}> {item.nome} </option>
                        })}
                    </select>

                    <select value={col} onChange={selectHandleChange} className="btn btn-primary m-1 col-md-1">
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                    </select>

                    {email.length ? <sub className="col-md-5 d-flex justify-content-end align-items-center" >destinatário: {email} </sub> : ''}
                </li>
            </ul>

            <div className="row">
                <InputsDeTexto maiorColuna={maiorColuna} col={col} isTitle={true} alteraTitulo={(a) => alteraTitulo(a)} />
            </div>

            <div className="row mb-3">
                <InputsDeTexto maiorColuna={maiorColuna} col={col} isTitle={false} alteraLinhas={(a) => alteraLinhas(a)} />
            </div>

            <div style={{display: `${linhas.length>1 ? "block": "none"}`}}>
                    <Button variant="danger" onClick={(e)=> setOpen(!open)} style={{float: 'right'}}>
                        Mostrar ultima linha adicionada
                    </Button>
            </div>

            <Collapse in={open}>
                <div id="info" className="p-2">
                    <span style={{display: "inline-block"}} className="bg-danger text-light m-2 p-3 rounded font-weight-bold">Ultima linha adicionada</span> <br/>
                    {notificacao.map( (item, indx)=>{
                        return(
                            <span key={indx} className="bg-danger text-light m-2 p-1 rounded font-weight-bold"> {item} </span>
                        )
                    } )}
                </div>
            </Collapse>

            <div id="tabela">
                <GerarTabela titulo={titulo} corpo={linhas.sort()}
                    editaLinha={(a, ev) => modalEditLinha(a, ev)}
                    deletaLinha={(e) => deletaLinha(e)} />
            </div>

            <ModalEditLinha show={show} close={handleClose}
                linhaEditada={indiceEdit} linhas={linhas} maiorColuna={maiorColuna}
                alteraLista={(event) => editLinha(event)}
            />

        </div>
    );
}
