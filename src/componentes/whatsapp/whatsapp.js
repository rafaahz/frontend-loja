import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

import { somenteNumero } from '../helper/inputText';


export default function Whatsapp() {

    
    function gerar(){
            let telefone = document.getElementById("telefone");
            let mensagem = document.getElementById("mensagem");
            let a = document.getElementById("link");
			let tel = telefone.value.split("-").join("").split(" ").join("");
			
			if(tel.length < 11) {
				alert("Telefone em formato incorreto 'menos de 11 caracteres'");
				return
			}			
			a.setAttribute("href", "https://api.whatsapp.com/send?phone=55"+tel+"&text="+mensagem.value);
			a.style.display = "flex"; 
		}


    return (
        <div className="container">

            <div className="form-group">
                <label className="w-100">Numero de telefone com DDD
                    <input type="text" className="form-control" onKeyDownCapture={somenteNumero} id="telefone" aria-describedby="emailHelp" placeholder="Telefone com DDD" />
                </label>
                <small id="emailHelp" className="form-text text-muted">Exemplo: '1691234567'</small>
            </div>
            <div className="form-group">
                <label className="w-100">Mensagem inicial
                    <input type="text" className="form-control" id="mensagem" placeholder="Mensagem" />
                </label>
                <small id="emailHelp" className="form-text text-muted">Exemplo: 'Oi boa tarde'</small>
            </div>
            <input type="button" className="btn btn-primary w-100 bold" value="Gerar link" onClick={gerar} />
            <a href="#" id="link" target="_blank" style={{display: "none", width: "80%", margin: "auto", justifyContent: "center"}} >
                <FaWhatsapp style={{height: "14em", width: "14em", marginTop: "1em", color: "#26a526", 
                border: "1px solid",borderBottomRightRadius: "20px", borderTopLeftRadius: "20px", boxShadow: "1px 8px 20px 1px #77ab71"}} />
            </a>
        </div>
            )
}