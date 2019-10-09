
import React from 'react';
import {GetInput} from './geradorInput';

export default function InputsDeTexto(props) {


    if (props.isTitle) {
        return (
            <GetInput quantidade={props.col} msg={"TITULO DA TABELA"} id={"titulo"} altera={(a)=> props.alteraTitulo(a)} class={""} />
        )
    } else {
        return (
            <GetInput quantidade={props.col} msg={"ITENS DA TABELA"} id={"corpo"} altera={(a)=> props.alteraLinhas(a)} class={"corpo"}/>
        )
    }


}