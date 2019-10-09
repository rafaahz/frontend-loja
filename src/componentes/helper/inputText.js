export function upperCaseF(a){
    a.target.value = a.target.value.toUpperCase();
}

export function somenteNumero(b){
	let a = b.target.value;
	let val = [];
	for(let i=0; i<a.length; i++){
		if(!isNaN(a[i]) && a[i] !== " " || a[i] === "."){
			val.push(a[i])
		}
	}
	b.target.value =  val.join("");
}

export function somenteTelefone(b){
	let a = b.target.value;
	let val = [];
	for(let i=0; i<a.length; i++){
		if(!isNaN(a[i]) || a[i] === "("  || a[i] === ")"  || a[i] === "-" || a[i] === "|"){
			val.push(a[i])
		}
	}
	a = val.join("");
	return a;
}

export function virgulaParaPonto(b){
		let a = b.target.value;
        let val = [];
		for(let i=0; i<a.length; i++){
			if(a[i] === ","){
				val.push(".");
			} else {
				val.push(a[i]);
				}
		}
		b.target.value = val.join("");
}

export function filtroTabela(e, tabela, col){
	var nomeFiltro = e.target.value.toUpperCase();
	tabela = document.getElementById(tabela);
	 for (var i = 1; i < tabela.rows.length; i++) {
        var conteudoCelula = tabela.rows[i].cells[col].innerText;
        var corresponde = conteudoCelula.toUpperCase().indexOf(nomeFiltro) >= 0;
        tabela.rows[i].style.display = corresponde ? 'table-row' : 'none';
    }
}

// evento, elemento pai a ser aplicado o filtro
export function filtroDiv(e, el){
	var nomeFiltro = e.target.value.toUpperCase();
	var elemento = document.getElementById(el);
	 for (var i = 1; i < elemento.children.length; i++) {
        var conteudo = elemento.children[i].innerText;
		var corresponde = conteudo.toUpperCase().indexOf(nomeFiltro) >= 0;
		elemento.children[i].setAttribute( "style",  corresponde ? 'display:block!important' : 'display:none!important');
    }
}

export function formatarCNPJ(e){
		let cnpj = e.target;

		if(cnpj.value.length === 14){
			cnpj.value = cnpj.value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
			cnpj.style.border = "1px solid #ced4da";
		} else {
			cnpj.style.border = "1px solid #dc3545";
		}
		if(cnpj.value.length === 14 || cnpj.value.length === 18){
			cnpj.style.border = "1px solid #ced4da";
		}

}

export function limpaCampos(...campos){
	for(let i=0; i<campos.length; i++){
		campos[i].value = null;
	}
}