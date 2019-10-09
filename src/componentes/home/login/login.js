import React, { useState } from 'react';

import { Autentica } from '../../helper/jsAjax';



export default function Login(props) {

    document.title = "Login - APP";

    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem]= useState('');

    function logar(){

      Autentica(login, senha, (res)=>{

        if(JSON.parse(res).token){
          let r = JSON.parse(res);
          localStorage.removeItem("token");
          localStorage.setItem("token", r.token);      
          setMensagem(["OK, Acesso liberado.", "alert-success"]);
            setTimeout(() => {
              props.alteraTela(r.usuario);
            }, 1000);
        } else {
          setMensagem(["Login ou senha invalida!", "alert-danger"])
        }
      })
    }

    

    return (
      <div className="d-flex container-fluid p-5 justify-content-center align-items-center">

        <div className="col-md-11 col-xl-8 col-sm-12 border bg-secondary d-flex flex-column justify-content-center align-items-center rounded shadow" style={{padding: "9em 2em 9em 2em"}}>
            <span className={"alert " + mensagem[1] }> {mensagem[0]} </span>
            <input className="form-control w-50 m-2 text-center" value={login} placeholder="Login" type="email" name="email" onChange={(e)=> setLogin(e.target.value)} />
            <input className="form-control w-50 m-2 text-center" value={senha} placeholder="Senha" type="password" name="senha" onChange={(e)=> setSenha(e.target.value)} />
            <button className="form-control w-25 m-2 btn-dark btn" style={{fontWeight: "bolder"}} onClick={logar}>Login</button>
        </div>

      </div>
    );

  }