import React, { useState, useEffect } from 'react';

import Login from  './login/login';
import Usuario from './usuario/usuario';

import global from '../global';
import Request from '../helper/jsAjax';

export default function Home(props) {

    document.title = "Home - React APP";

    const [pagina, setPagina] = useState(<Login alteraTela={(user)=> setPagina(<Usuario usuario={user} att={()=> setPagina(pagina) } />) } />);

    useEffect(() => {
        Request({}, "GET", global["VERIFICATOKEN"], (res)=>{
          let r = JSON.parse(res);
          r.token ? setPagina(<Usuario usuario={r.usuario} att={()=> setPagina(pagina) } />) : setPagina(<Login alteraTela={(user)=> setPagina(<Usuario usuario={user} />) } />);
      })

    }, []);

    return (
      pagina
    );

  }