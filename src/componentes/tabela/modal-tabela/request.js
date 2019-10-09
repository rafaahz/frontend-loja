import {getItensArray} from '../../helper/getElements';
import Request from '../../helper/jsAjax';

export function deleta(id, endereco, local, array, titulo, callback){
    let data = {};
    data.id = id;

    if(local === "TRANSPORTADORAS"){
        
        var filtrados = array.filter( item=>{
            return item.array.split("-/-").indexOf(id.toString()) >0;
            //return JSON.stringify(item).indexOf(titulo) >= 0;
        })

        var atualiza = filtrados.map( item=>{

            let remove = item.array.split("-/-").filter( a=>{
                            return a.indexOf(id.toString()) < 0;
                        });
            item.array = remove.join("-/-");
            return item;
        })

        data.atualiza = atualiza;
    }

    if( window.confirm(`DESEJA APAGAR A ${local.substr( 0 ,(local.length -1))} "${titulo}" ?`)){
        Request(data, "DELETE", endereco, callback)
    }else{
        callback( array );
        return false;
    }
}

//local = cidades ou transportadoras / titulo = elemento a ser editado / itensAlterados = itens que foram modificados na edição
//endereco = link da requisição / array = lista completa da requisição inicial (array de cidades e transportadoras)
// divDireito e divEsquerdo = elementos na area de edição do modal, direito são os itens em cinza e direito em verde.
export async function atualiza(id, local, titulo , itensAlterados, divEsquerdo, divDireito, endereco, array, callback){
    array = array.flat();
    let info = {};

    if(local === "TRANSPORTADORAS"){
        //pegando os elementos no lado direito que não são verde para editar a array de transportadoras desses itens (itens adicionados no lado verde)
        let add = divDireito.filter( el=>{
            return el.className.indexOf("secondary") >=0
        }).map( el=>{
            return el.textContent;
        })

        // ajusta a array dos itens cinza que estão no lado direito, array dos itens recebe um push com o "titulo"
        let adicionados = getItensArray(add, array).map(el=>{
            let list;
            if(el.array){
                list = el.array.split("-/-");
            } else {
                list = [];
            }
            list.push(id);
            el.array = list.join("-/-");
            return el;
        });

        //pegando os elementos no lado esquerdo que não são cinza para editar a array de transportadoras desses itens (itens removidos do lado verde)
        let remove = divEsquerdo.filter( el=>{
            return el.className.indexOf("success") >=0;
        }).map( el=>{
            return el.textContent;
        })

        let removidos = getItensArray(remove, array).map(el=>{
            let list = el.array.split("-/-");
            list.splice(list.indexOf( id.toString() ), 1);
            el.array = list.join("-/-");
            return el;
        })


        info.Transportadora = true;
        info.lista = adicionados.concat(removidos).flat().map( el=>{
            return [el.array, el.id];
        })
        

    } else if(local === "CIDADES"){
        info.lista = [info.lista = divDireito.map( el=>{
                    for(let i=0; i<array.length; i++){
                        if(array[i].nome === el.textContent){
                            return array[i].id
                        }
                    }
                }).join("-/-"), getItensArray([titulo], array)[0].id]
    }

    if( window.confirm(`DESEJA ALTERAR A ${local.substr( 0 ,(local.length -1))} "${titulo}" ?`)){
        Request(info, "PUT", endereco, callback);
    }else{
        callback( false );
        return false;
    }
        
}

export function atualizaItem(local, titulo, subInfo ,endereco, id, tituloAtualizado, subInfoAtualizado, callback){
   
    let info = {
        id,
        titulo: tituloAtualizado,
        subInfo: subInfoAtualizado,
        local
    }

    if( window.confirm(`DESEJA ALTERAR A ${local.substr( 0 ,(local.length -1))} "${titulo}" - "${subInfo}" para "${tituloAtualizado}" - "${subInfoAtualizado}" ?`)){
        Request(info, "PUT", endereco, callback);
    }else{
        return false;
    }
}

export function adiciona(local, link, titulo, subInfo, callback){

    let info = {
        titulo,
        subInfo,
        local: local.toLowerCase(),
    }

    if( window.confirm(`DESEJA ADICIONAR A ${local.substr( 0 ,(local.length -1))}: "${titulo}" - "${subInfo}"  ?`)){
        Request(info, "POST", link, callback)
    }else{
        return false;
    }
}

