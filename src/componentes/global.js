var url = process.env.REACT_APP_API_URL;

const global = {
    CIDADES : url+"/cidades",
    ITEM : url+"/item",
    TRANSPORTADORAS : url+"/transportadoras",
    ENVIAREMAIL : url+"/htmlemail",
    LOGIN : url+"/login",
    VERIFICATOKEN: url+"/verificaToken",
	EMAILS: [],
}

export function atualizaEmails(){
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url+"/users" , true);
	xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
	xhr.setRequestHeader('x-access-token', localStorage.getItem("token") );
	
	xhr.onload = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			global.EMAILS = JSON.parse(xhr.response);
			xhr.abort();
		} else {
			alert(xhr.responseText);
			global.EMAILS = [{nome: "LOGUIN REQUIRIDO", email: "####"}];
			xhr.abort();
		}
	}
	xhr.onerror = function () {
		alert(xhr.response || "Sem resposta do servidor");
	}
	xhr.send( null );
}

atualizaEmails();

export default global;