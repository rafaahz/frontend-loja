import React, {useState, useEffect} from 'react';

import global from '../global';
import NfeInfo from './nfeInfo/nfeInfo';
import Tabela from './tabela/Tabela';
import {sendTable} from '../helper/jsAjax';

import { formatarCNPJ, upperCaseF } from '../helper/inputText';

export default function JuncaoCobranca() {

    document.title = "JUNÇÃO DE COBRANÇA";

    const [email, setEmail] = useState('');

    const [numCalendario, setNumCalendario] = useState(1)
    const [calendario, setCalendario] = useState([]);
    const [datas, setDatas] = useState([]);

    const [cnpj, setCnpj] = useState('');
    const [razao, setRazao] = useState('');

    const [nf1, setNf1] = useState({numero: '', valor: ''});
    const [nf2, setNf2] = useState({numero: '', valor: ''});

    const [tabela, setTabela] = useState('');


    const selectHandleChange = (e) => {
        if (isNaN(e.target.value)) {
            setEmail(e.target.value);
        } else {
            setNumCalendario(e.target.value);
        }
    }

    function alteraNF(propriedade, nf, event){

        if(nf === 1){
            let clone = JSON.parse(JSON.stringify(nf1));
            clone[propriedade] = event.target.value;
            setNf1(clone);
        } else if(nf === 2){
            let clone = JSON.parse(JSON.stringify(nf2));
            clone[propriedade] = event.target.value;
            setNf2(clone);
        }

    }

    useEffect(() => {
        let daataas = [].concat(datas);
        let m = daataas.map( i=> i.split("-").reverse().join("/") )
        while(numCalendario<m.length){
            m.pop();
        }
        setDatas(m);
    }, [selectHandleChange, calendarioChange])

    function montaTabela(){
        return(
            setTabela(<Tabela razaoSocial={razao} cnpj={cnpj} nf1={nf1} nf2={nf2} datas={datas}/>)
        );
    }

    function calendarioChange(e){
        let calendarios = document.getElementById("divdata").children;
        let dat = [];
        for(let i=0; i<calendarios.length; i++){
            dat.push(calendarios[i].value)
        }
        setDatas(dat);
    }


    useEffect(() => {
        let i = 0;
        let cal = [];
        while(i<numCalendario){
            cal.push(<input key={i} type="date" id={i} className="form-control m-auto" style={{width: (100/numCalendario - 3)+"%"}}
            onChange={calendarioChange} />);
            i++
        }

        setCalendario(cal)
      }, [numCalendario]);


    const enviarTabela = (e) =>{
        let HTMLTable = document.getElementById("areatabela").innerHTML;

        sendTable(HTMLTable, email, "JUNÇÃO DE COBRANÇA");

    }

    return (
        <div className="container-fluid">

            <ul className="nav nav-tabs">
                <li className="row w-100 align-baseline">
                    <button type="button" className="btn btn-primary col-md-2 m-1"
                        onClick={enviarTabela}>
                        ENVIAR E-MAIL
                    </button>

                    <select value={"SELECIONAR DESTINATARIO"} onChange={selectHandleChange} className="btn btn-primary m-1 col-md-3">
                        <option disabled>{"SELECIONAR DESTINATARIO"}</option>
                        {global.EMAILS.map((item, i) => {
                            return <option key={i} value={item.email}> {item.nome} </option>
                        })}
                    </select>

                    <select value={numCalendario} onChange={selectHandleChange} onChangeCapture={calendarioChange} className="btn btn-primary m-1 col-md-1">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>

                    {email.length ? <sub className="col-md-5 d-flex justify-content-end align-items-center" >destinatário: {email} </sub> : ''}
                </li>
            </ul>

            <div className="col-11 m-auto mt-3 row">
                
                <NfeInfo numero={1} handleChange={(propriedade, nf, event)=> alteraNF(propriedade, nf, event)}/>

                <NfeInfo numero={2} handleChange={(propriedade, nf, event)=> alteraNF(propriedade, nf, event)} />

                <div className="col-10 m-auto border-top row justify-content-center border-bottom p-2">
                    <h3 className="font-italic text-center col-12">Informações do cliente</h3>
                    <div className="col-12 row justify-content-center">
                        <label className="m-auto">CNPJ:
                            <input className="form-control" type="text" maxLength="18" onChangeCapture={formatarCNPJ} onChange={(e)=> setCnpj(e.target.value)}/>
                        </label>

                        <label className="m-auto">RAZAO SOCIAL: 
                            <input className="form-control" type="text" onChangeCapture={upperCaseF} onChange={(e)=> setRazao(e.target.value)} />
                        </label>
                    </div>
                        <button className="btn btn-info mb-1" onClick={montaTabela} >Criar Tabela</button>
                </div>

                <div id="divdata" className="input-group mt-2">
                    {calendario}
                </div>

                <div id="areatabela" className="p-2 mt-2">
                    {tabela}
                </div>

            </div>

        </div>
    );
}
