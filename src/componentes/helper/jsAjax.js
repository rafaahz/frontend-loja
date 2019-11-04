import global from '../global';

export default async function Request(objeto, metodo, url, resposta){

	let token = localStorage.getItem("token");
	
	let loading = document.querySelector("#loading");
	loading.style.visibility = "visible";

	var xhr = new XMLHttpRequest();
	xhr.open( metodo , url , true);
	xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
	xhr.setRequestHeader('x-access-token', token );

	xhr.onload = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			loading.style.visibility = "hidden";
			resposta( xhr.response )
			xhr.abort();
		} else {
			loading.style.visibility = "hidden";
			resposta(xhr.responseText, "FAÇA LOGIN PARA ACESSAR AS INFORMAÇÕES DO SERVIDOR");
			xhr.abort();
		}
	}
	xhr.onerror = function () {
		loading.style.visibility = "hidden";
		alert(xhr.response || "Sem resposta do servidor");
	}
	xhr.onprogress = function (event) {
		
	};

	xhr.send( objeto ? JSON.stringify(objeto) : null);
	
}

//FUNÇÃO PARA ENVIAR AS TABELAS HTML PARA ALGUM EMAIL
export function sendTable(tabela, remetente, titulo){

	if(remetente.length <5){alert("INFORME O E-MAIL"); return Error("INFORME O ENDEREÇO DE EMAIL")}
	if(!window.confirm("ENVIAR TABELA PARA O EMAIL: '" + remetente + "' ?")) return;

	let data = {remetente, tabela, titulo};

	Request(data, "POST", global["ENVIAREMAIL"], (res)=>{ alert(res) })
}

//FUNÇÃO DE AUTENTICAÇÃO LOGIN
export function Autentica(email, senha, resposta){
	let data = {email, senha }
	Request(data, "POST", global["LOGIN"], resposta);
}
