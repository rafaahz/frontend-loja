

var InfoModal = function(nome, lista, item){

    let informacao = [];

    if(item === "CIDADES" && lista.length !== 0){
       let search = [];

        lista[0].forEach( i=>{
            if(i.cidade === nome){
                if(i.array !== null){
                    search = i.array.split("-/-");
                }
            }
        })
        

        lista[1].forEach( i=>{
            if(search.indexOf( i.id.toString() ) >= 0) informacao.push(i.nome);
        })


    } else if(item === "TRANSPORTADORAS" && lista.length !== 0){
        
        let id = "";
        let arr = [];

        lista[1].forEach( i=>{
            if(i.nome === nome){
                id = i.id;
            }
        })

        lista[0].forEach( i=>{
            if(i.array !== null){
              arr = i.array.split("-/-");
            }
            arr.forEach( el=>{
                if(el.toString() === id.toString()){
                    informacao.push(i.cidade);
                }
            })
        })


    }
    return informacao;
}

export default InfoModal;