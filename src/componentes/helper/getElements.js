
// "oque" = item que vai ser colocado no retorno, EXEMPLO = getElementsById("aa")[OQUE]
export function getElements(id, inicial = 0, oque){

    let elPai = document.getElementById(id);
    let lista = elPai.children;
    let elementos = [];

    for(let i = inicial; i<lista.length; i++){

        oque ? elementos.push(lista[i][oque]) : elementos.push(lista[i]);
        
    }

    return elementos;
} 

export function getItensArray(nome, array){

    //pega a lista "nome" e verifica se o objeto[posicao 1] existe nessa lista de "nome" e retorna
    //esse objeto na lista caso encontrar
    return array.filter( el=>{
        return nome.indexOf(el[Object.keys(el)[0]]) >=0;
    })
}