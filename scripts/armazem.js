// cria um ID unico para o registro atual e salve nesse id as infos necessarias
function corridaEmAndamento(){
    const corridaID = Date.now(); 
    const corridaRecorde = {
        dados:[],
        tempoInicial: corridaID,
        tempoFinal: null,
    }
    ArmazenandoTudo(corridaID, corridaRecorde);
    return corridaID;
};

function pegandoTodasAsCorridas(){
    return Object.entries(localStorage).filter(([id]) => /^\d+$/.test(id));
}

// guarda no storage o obejeto "corridaRecorde" em string
function ArmazenandoTudo(corridaID, corridaRecorde){
    localStorage.setItem(corridaID, JSON.stringify(corridaRecorde));
}

// pega do storege o objeto "corridaRecorde" ja em formato de objeto novamente
function pegueRecordeCorrida(corridaID){
    return  JSON.parse(localStorage.getItem(corridaID));
}

// adiciona a posição atual e outras infos no storage
function addPosition(corridaID, position){
    const corridaRecorde = pegueRecordeCorrida(corridaID);
    const newDados = {
        accuracy: position.coords.accuracy,
        altitude: position.coords.altitude,
        altitudeAccuracy: position.coords.altitudeAccuracy,
        heading: position.coords.heading,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        speed: position.coords.speed,
        timesTamp: position.timestamp,
    };
    corridaRecorde.dados.push(newDados);
    ArmazenandoTudo(corridaID, corridaRecorde);
};

// adicionando o tempo de parada da corrida
function fimDaCorrida(corridaID){
    const corridaRecorde = pegueRecordeCorrida(corridaID);
    corridaRecorde.tempoFinal = Date.now();
    ArmazenandoTudo(corridaID, corridaRecorde);
}