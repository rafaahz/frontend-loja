import React from 'react';
import { Modal } from 'react-bootstrap';
import { somenteNumero, virgulaParaPonto } from '../../helper/inputText'

export default function Ajustes(props){

    var materiais = JSON.parse( JSON.stringify(props.itens) );
    


    function alteraValor(v, ev){
      let m = materiais;
      m[v].preco = parseFloat(ev.target.value);

      props.setItens(m);
    }


    function trocarPadrao(e){
      let bol = e.target.value.indexOf("4") >= 0;

      materiais.policarbonato.preco = bol ? materiais.espessura4.policarbonato : materiais.espessura6.policarbonato;
      materiais.policarbonato.espessura = bol ? materiais.espessura4.espessura : materiais.espessura6.espessura;

      materiais.meioPolicarbonato.preco = bol ? materiais.espessura4.meioPolicarbonato : materiais.espessura6.meioPolicarbonato;
      materiais.meioPolicarbonato.espessura = bol ? materiais.espessura4.espessura : materiais.espessura6.espessura;

      materiais.poliM2.preco = bol ? materiais.espessura4.poliM2 : materiais.espessura6.poliM2;
      materiais.poliM2.espessura = bol ? materiais.espessura4.espessura : materiais.espessura6.espessura;

      materiais.perfilU.preco = bol ? materiais.espessura4.perfilU : materiais.espessura6.perfilU;
      materiais.perfilU.espessura = bol ? materiais.espessura4.espessura : materiais.espessura6.espessura;
      
      props.setItens(materiais);

    }

    return(
        <Modal
        size="lg"
        show={props.modalShow}
        onHide={props.setModalShow}
        >
        <Modal.Header closeButton>
          <Modal.Title >
            Ajustes
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>

            <div className="form-control d-flex justify-content-around mb-3 shadow">
              <span className="w-25">
                AJUSTE PADRAO
              </span>

              <select value={"SELECIONAR VALOR PADRÃO"} onChange={trocarPadrao} className="text-center border rounded font-weight-light w-50" >
                <option defaultChecked disabled>SELECIONAR VALOR PADRÃO</option>
                <option>Policarbonato 4MM</option>
                <option>Policarbonato 6MM</option>
              </select>
            </div>
            
            {/* POLICARBONATO 2100X6000 */}
            <div className="form-control d-flex justify-content-around mb-3 shadow">
              <span className="w-25">
                Policarbonato {props.itens.policarbonato.espessura}MM
              </span>

              <input 
                type="text" 
                value={props.itens.policarbonato.preco}
                className="text-center  border-top-0 border-right-0 border-left-0  w-50"
                onChangeCapture={(e)=>{ virgulaParaPonto(e); somenteNumero(e)} }
                onChange={alteraValor.bind(this, "policarbonato")} />
            </div>

            {/* POLICARBONATO 1050X6000 */}
            <div className="form-control d-flex justify-content-around mb-3 shadow">
              <span className="w-25">
                ½ Policarbonato {props.itens.meioPolicarbonato.espessura}MM
              </span>

              <input 
                type="text" 
                value={props.itens.meioPolicarbonato.preco}
                className="text-center  border-top-0 border-right-0 border-left-0  w-50"
                onChangeCapture={(e)=>{ virgulaParaPonto(e); somenteNumero(e)} }
                onChange={alteraValor.bind(this, "meioPolicarbonato")} />
            </div>

            {/* POLICARBONATO M² */}
            <div className="form-control d-flex justify-content-around mb-3 shadow">
              <span className="w-25">
                Policarbonato {props.itens.poliM2.espessura}MM M²
              </span>

              <input 
                type="text" 
                value={props.itens.poliM2.preco}
                className="text-center  border-top-0 border-right-0 border-left-0  w-50"
                onChangeCapture={(e)=>{ virgulaParaPonto(e); somenteNumero(e)} }
                onChange={alteraValor.bind(this, "poliM2")} />
            </div>

            {/* PERFIL BARRA CHATA */}
            <div className="form-control d-flex justify-content-around mb-3 shadow">
              <span className="w-25">
                Perfil barra chata
              </span>

              <input 
                type="text" 
                value={props.itens.perfilBarraChata.preco}
                className="text-center  border-top-0 border-right-0 border-left-0  w-50"
                onChangeCapture={(e)=>{ virgulaParaPonto(e); somenteNumero(e)} }
                onChange={alteraValor.bind(this, "perfilBarraChata")} />
            </div>

            {/* PERFIL U */}
            <div className="form-control d-flex justify-content-around mb-3 shadow">
              <span className="w-25">
                Perfil U {props.itens.perfilU.espessura}MM
              </span>

              <input 
                type="text" 
                value={props.itens.perfilU.preco}
                className="text-center  border-top-0 border-right-0 border-left-0  w-50" 
                onChangeCapture={(e)=>{ virgulaParaPonto(e); somenteNumero(e)} }
                onChange={alteraValor.bind(this, "perfilU")}/>
            </div>

            {/* FITA ALUMINIO */}
            <div className="form-control d-flex justify-content-around mb-3 shadow">
              <span className="w-25">
                Fita aluminio
              </span>

              <input 
                type="text" 
                value={props.itens.fitaAluminio.preco}
                className="text-center border-top-0 border-right-0 border-left-0  w-50"
                onChangeCapture={(e)=>{ virgulaParaPonto(e); somenteNumero(e)} }
                onChange={alteraValor.bind(this, "fitaAluminio")} />
            </div>


        </Modal.Body>

      </Modal>
    )
}