
function filtro(tabela, input, col){
	var nomeFiltro = input.value.toUpperCase();
	 for (var i = 1; i < tabela.rows.length; i++) {
        var conteudoCelula = tabela.rows[i].cells[col].innerText;
        var corresponde = conteudoCelula.toUpperCase().indexOf(nomeFiltro) >= 0;
        tabela.rows[i].style.display = corresponde ? 'table-row' : 'none';
    }
}