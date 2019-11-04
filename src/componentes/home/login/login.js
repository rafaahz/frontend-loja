import React, { useState, useEffect } from 'react';

import { Autentica } from '../../helper/jsAjax';



export default function Login(props) {

    document.title = "Login - APP";

    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem]= useState('');

    function logar(){
      let checkLogin = document.getElementById("checkLogin");

      if(checkLogin.checked){
        localStorage.setItem("email", login);
      }  else {
        localStorage.removeItem("email");
      }

      Autentica(login, senha, (res)=>{

        if(JSON.parse(res).token){
          let r = JSON.parse(res);
          localStorage.removeItem("token");
          localStorage.setItem("token", r.token);      
          props.alteraTela(r.usuario);
        } else {
          setMensagem(["Login ou senha invalida!", "alert-danger"])
        }
      })
    }

    useEffect(()=>{
      let checkLogin = document.getElementById("checkLogin");
      var email = localStorage.getItem("email");
      if(email){
        setLogin(email);
        checkLogin.checked = true;
      };

    }, [])

    return (
      <div className="d-flex container-fluid p-5 justify-content-center align-items-center">

        <form onSubmit={(e)=> e.preventDefault()} className="col-md-11 col-xl-8 col-sm-12 border bg-dark d-flex flex-column justify-content-center align-items-center rounded shadow" style={{padding: "9em 2em 9em 2em"}}>
        <div className="w-75 d-flex flex-column justify-content-center align-items-center">
            <span className={"alert " + mensagem[1] }> {mensagem[0]} </span>
            <input className="form-control w-50 m-2 text-center" value={login} placeholder="Email" type="email" name="email" onChange={(e)=> setLogin(e.target.value)} />
            <input className="form-control w-50 m-2 text-center" value={senha} placeholder="Senha" type="password" name="senha" onChange={(e)=> setSenha(e.target.value)} />
            <label className="w-50 m-2 text-white d-flex align-items-center">
              <input type="checkbox" id="checkLogin"/>
              Lembrar email
            </label>
            <button className="form-control w-25 m-2 btn-primary btn" style={{fontWeight: "bolder"}} onClick={logar}>Login</button>
        </div>
        </form>

      </div>
    );

  }