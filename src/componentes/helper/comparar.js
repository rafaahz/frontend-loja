
export function compararArray(um, dois){

    if(um.sort().toString() !== dois.sort().toString()){
        return true;
    } else{
        return false;
    }
}