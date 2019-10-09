
import React from 'react';
import { IoMdSettings } from "react-icons/io";

export default function GerarTabela(props) {

  const editarLinha = (arg, event) => {

    //console.log(arg, event.currentTarget)
    if (event.currentTarget.parentElement.innerHTML.indexOf("input") < 0) {
      props.editaLinha(arg, event);
    } else {
      return
    }

  }

  if (props.titulo.length > 0){
    return (
      <table cellSpacing="0" cellPadding="0" border="0" align="center" style={{maxWidth: "900px", width: "100%", fontFamily: 'Verdana'}}
        bgcolor="#FFFFFF" id="tabela">
        <tbody>
          <tr>
            <td align="center" valign="top" style={{ padding: "10px" }}>
              <table cellSpacing="0" cellPadding="0" border="1" align="center"
                style={{ width: "100%", boxShadow: "3px 4px 14px 2px #adadad"}}>
                <tbody>
                  <tr bgcolor="#343a40">
                    <td align="center" className="EDT" width="25px" valign="top" style={{ padding: "10px", color: "#ffffff", fontWeight: "bold", width: "25px", borderRight: "1px solid", textAlign: "center" }}>
                      {(props.corpo.length > 0) ? "EDITAR" : ""}
                    </td>
                    {props.titulo.map((col, i) => {
                      return <td align="center" valign="top" style={{ padding: "10px", color: "#ffffff", fontWeight: "bold" }} key={i}>{col}</td>
                    })}
                  </tr>
                  {props.corpo.sort().map((linha, i) => {
                    return (
                      <tr key={i} id={"linha" + i} bgcolor={i % 2 === 0 ? "d8d8d8" : "#ffffff"} style={{ border: "none" }} onDoubleClick={props.deletaLinha}>
                        <td align="center" valign="top" style={{
                          width: "25px", borderRight: "1px solid",
                          textAlign: "center", cursor: "pointer", padding: "10px"
                        }}
                          onClick={editarLinha.bind(this, i)} className="EDT">
                          <IoMdSettings />
                        </td>
                        {linha.map((item, id) => {
                          return <td key={id} align={id === 0 ? "left" : "center"} valign="top" style={{ padding: "10px", fontWeight: "bold", border: "none" }}>{item}</td>
                        })}
                      </tr>

                    )
                  })}
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    );
  } else {
    return "";
  }
}