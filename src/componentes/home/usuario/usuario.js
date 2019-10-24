
import React, { useState, useEffect } from 'react';



export default function Usuario(props) {


  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [id, setId] = useState('');

  document.title = `${usuario} - React APP`;

  useEffect(() => {
    let user = props.usuario[0];
    setUsuario(user.nome);
    setEmail(user.email);
    setTelefone(user.telefone);
    setId(user.id);

  }, []);

  const logout = ()=>{
    localStorage.removeItem("token");
    props.att();
  }

  return (
    <>
      <div className="ml-auto mr-auto col-xl-5 col-lg-7 col-sm-12 bg-dark text-light font-weight-bold mt-5 rounded p-2 shadow">
        
        <div className="p-2 m-4 border-left rounded-left" style={{borderRight: "outset", borderBottom: "inset"}}>
            <label>
              <span className="text-warning">Usuario</span> <br/>
              <span>{usuario.toUpperCase()}</span>
            </label>
        </div>

        <div className="p-2 m-4 border-left rounded-left" style={{borderRight: "outset"}}>
            <label>
              <span className="text-warning">Email</span> <br/>
              <span>{email}</span>
            </label>
        </div>

        <div className="p-2 m-4 border-left rounded-left" style={{borderRight: "outset", borderTop: "groove"}}>
            <label>
              <span className="text-warning">Telefone</span> <br/>
              <span>{telefone}</span>
            </label>
        </div>

        <div className="p-3 ml-auto mr-auto mt-3 mb-3 text-center border-top w-50">
          <button className="btn btn-light"
          onClick={logout} >
            Logout
          </button>
        </div>

      </div>
    </>
  )

}