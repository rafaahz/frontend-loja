
import React from 'react';

export default function Tabela(props){

    return(
        <table cellSpacing="0" cellPadding="0" border="0" align="center" style={{ maxWidth: "900px", width: "100%", fontFamily: 'Verdana'}}
        bgcolor="#FFFFFF" id="tabela">
        <tbody>
          <tr>
            <td align="center" valign="top" style={{ padding: "10px" }}>
              <table cellSpacing="0" cellPadding="0" border="1" align="center"
                style={{ width: "100%", boxShadow: "3px 4px 14px 2px #adadad" }}>
                <tbody>
    
                <tr bgcolor="#443f1b">
                    <td align="center" colSpan={(props.datas.length + 2)} valign="top" style={{ padding: "10px", color: "#ffffff", fontWeight: "bold", textAlign: "center" }}>
                      {props.razaoSocial} | {props.cnpj}
                    </td>
                  </tr>

                  <tr bgcolor="#343a40">
                    <td align="center"  valign="center" style={{ padding: "10px", color: "#ffffff", fontWeight: "bold", textAlign: "center" }}>
                      {"NOTA FISCAL"}
                    </td>
                    <td align="center" colSpan={props.datas.length} valign="center" style={{ padding: "10px", color: "#ffffff", fontWeight: "bold" }}>
                        {props.datas.length > 1 ? "DUPLICATAS" : "DUPLICATA"}
                    </td>
                    <td align="center" valign="center" style={{ padding: "10px", color: "#ffffff", fontWeight: "bold" }}>
                        {"VALOR TOTAL"}
                    </td>
                  </tr>

                  <tr bgcolor="#343a40">
                    <td align="center"  valign="center" style={{color: "#343a40", padding: "10px"}}>—</td>
                    {props.datas.map( (elemento, i)=>{
                        return <td align="center" key={i} valign="center" style={{ padding: "10px", color: "#ffb610", fontWeight: "bold", textAlign: "center" }}> {elemento} </td>
                    })}
                    <td align="center"  valign="center" style={{color: "#343a40", padding: "10px"}}>—</td>
                  </tr>

                  <tr bgcolor="#343a40">
                    <td align="center"  valign="center" style={{ padding: "10px", color: "#ffffff", fontWeight: "bold", textAlign: "center" }}>
                        {parseFloat(props.nf1.numero).toLocaleString()}
                    </td>
                    
                    {props.datas.map( (elemento, i)=>{
                        return <td align="center" key={i} valign="center" style={{ padding: "10px", color: "#ffffff", fontWeight: "bold", textAlign: "center" }}>{(props.nf1.valor / props.datas.length).toFixed(2).replace(".",",")} </td>
                    })}

                    <td align="center"  valign="center" style={{ padding: "10px", color: "#ffffff", fontWeight: "bold", textAlign: "center" }}>
                        {parseFloat(props.nf1.valor).toLocaleString()}
                    </td>
                  </tr>

                  <tr bgcolor="#343a40">
                    <td align="center"  valign="center" style={{ padding: "10px", color: "#ffffff", fontWeight: "bold", textAlign: "center" }}>
                        {parseFloat(props.nf2.numero).toLocaleString()}
                    </td>
                    
                    {props.datas.map( (elemento, i)=>{
                        return <td align="center" key={i} valign="center" style={{ padding: "10px", color: "#ffffff", fontWeight: "bold", textAlign: "center" }}>{(props.nf2.valor / props.datas.length).toFixed(2).replace(".",",")} </td>
                    })}

                    <td align="center" valign="center" style={{ padding: "10px", color: "#ffffff", fontWeight: "bold" }}>
                        {parseFloat(props.nf2.valor).toLocaleString()}
                    </td>
                  </tr>

                  <tr bgcolor="#443f1b">
                    <td align="center"  valign="center" style={{ padding: "10px", color: "#ffffff", fontWeight: "bold", textAlign: "center" }}>
                      {"VALORES FINAIS"}
                    </td>


                    {props.datas.map( (elemento, i)=>{
                        return (<td align="center" key={i} valign="center" style={{ padding: "10px", color: "#ffb610", fontWeight: "bold", textAlign: "center" }}>
                           {( ( parseFloat(props.nf1.valor) + parseFloat(props.nf2.valor) ) / props.datas.length  ).toFixed(2) }
                          </td>)
                    })}


                    <td align="center" valign="center" style={{ padding: "10px", color: "#ffffff", fontWeight: "bold" }}>
                        {((parseFloat(props.nf1.valor) + parseFloat(props.nf2.valor)).toFixed(2) ).toLocaleString()}
                    </td>
                  </tr>

                 
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    );

}