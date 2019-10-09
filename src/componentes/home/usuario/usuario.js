
import React, { useState, useEffect } from 'react';



export default function Usuario(props) {


  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');

  document.title = `${usuario} - React APP`;

  useEffect(() => {
    let user = props.usuario[0];
    setUsuario(user.nome);
    setEmail(user.email);
    setId(user.id);

  }, []);

  return (
    <>
      <div className="m-auto text-center">
        <label className="border p-5 shadow">
          <span className="d-block alert">Nome</span>
          <br />
          <span className="alert alert-info"> {usuario}  </span>
        </label>
      </div>

      <div className="m-auto text-center">
        <label className="border p-5 shadow">
          <span className="d-block alert">Email</span>
          <br />
          <span className="alert alert-info"> {email}  </span>
        </label>
      </div>

      <div className="m-auto text-center">
        <label className="border p-5 shadow">
          <span className="d-block alert alert-warning" style={{cursor: "pointer"}}>Editar inf.</span>
          <br />
          <span className="alert alert-info" style={{cursor: "pointer"}}> SAIR  </span>
        </label>
      </div>
    </>
  )

}