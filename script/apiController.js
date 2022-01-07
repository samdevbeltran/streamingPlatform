export  function getApiInfo(api,key,id){

    return api[key].filter(element => element.id == id);
}

export function getElementById(id){
    
    return document.getElementById(id);
}



