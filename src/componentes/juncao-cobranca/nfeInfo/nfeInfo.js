import React from 'react';
import { somenteNumero, virgulaParaPonto } from '../../helper/inputText';

export default function NfeInfo(props) {


    return (
        <div className={(props.numero === 1) ? "col-6 border-right border-top p-2" : "col-6 border-left border-top p-2"}>
            <h3 className="font-italic text-center">Nota Fiscal {props.numero}</h3>

            <div className="row">

                <label className="col-6">NF Numero:
                            <input className="form-control" type="text" onChangeCapture={(e)=>{virgulaParaPonto(e); somenteNumero(e) }}
                            onChange={props.handleChange.bind(this, "numero", props.numero)} />
                </label>

                <label className="col-6">NF Valor:
                            <input className="form-control" type="text" onChangeCapture={(e)=>{virgulaParaPonto(e); somenteNumero(e) } } 
                            onChange={props.handleChange.bind(this, "valor", props.numero)} />
                </label>

            </div>

        </div>
    )
}