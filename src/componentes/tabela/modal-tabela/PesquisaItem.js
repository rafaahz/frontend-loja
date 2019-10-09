
var PesquisaItem = function(item, array){
    array = array.flat(2);
    
    return array.map( i =>{
                if(i[Object.keys(i)[0]] === item){
                    return i[Object.keys(i)[1]];
                }
                return null;
            })
}

export default PesquisaItem;