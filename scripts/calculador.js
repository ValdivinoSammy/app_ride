// requisitando a merda do lugar pra API

async function pegueMinhaPos(latitude, longitude) {
    const url = `https://api-bdc.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`;
    const resposta = await fetch(url);
    const respostaFinal = await resposta.json();
    return (respostaFinal.city) + " - " + (respostaFinal.countryCode);
}

// pegando a velocidade maxima atingida durante a corrida

function velocidadeMaxima(vels) {
    let velMax = 0;
    vels.forEach((vel) => {
        if (vel.speed != null && vel.speed > velMax) {
            velMax = vel.speed
        }
    })

    return (velMax * 3.6).toFixed(1);
}

// Codido do krl, quem foi o fdp que fez isso a primeira vez, ta de parabéns

function distanciaTotal(pos) {
    const raioDaTerra = 6371;
    let distanciaTotal = 0;
    for (let i = 0; i < pos.length - 1; i++) {
        const p1 = {
            latitude: pos[i].latitude,
            longitude: pos[i].longitude
        }
        const p2 = {
            latitude: pos[i + 1].latitude,
            longitude: pos[i + 1].longitude
        }

        const deltaLatitude = paraRadiano(p2.latitude - p1.latitude);
        const deltaLongitude = paraRadiano(p2.longitude - p1.longitude);

        const a = Math.sin(deltaLatitude / 2) *
            Math.sin(deltaLatitude / 2) +
            Math.sin(deltaLongitude / 2) *
            Math.sin(deltaLongitude / 2) *
            Math.cos(paraRadiano(p1.latitude)) *
            Math.cos(paraRadiano(p2.latitude))

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        const distancia = raioDaTerra * c;

        distanciaTotal += distancia;

    }

    function paraRadiano(graus) {
        return graus * Math.PI / 180
    }

    return distanciaTotal.toFixed(2);

}

// apenas o tempo que durou a corrida

function tempoDeCorrida(inicio, fim){

    function formato(numero, digitos){
        return String(numero.toFixed(0)).padStart(2 , "0");
    }

    const intervalo = (fim - inicio) / 1000;

    const hora = (Math.trunc(intervalo / 60)) / 60;
    const minutos = (Math.trunc(intervalo / 60)) % 60;
    const segundos = intervalo % 60;

    return formato(hora)+":"+formato(minutos)+":"+ formato(segundos);
}

// e data de quando aquela corriga foi Feita

function dataEmFormatoNormal(data) {
    const dataNova = new Date(data);

    const hora = dataNova.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
    })

    const mes = dataNova.toLocaleDateString("pt-BR", {
        month: "long"
    })

    const dia = String(dataNova.getDate()).padStart(2, "0");
    const ano = dataNova.getFullYear();


    return (`${hora} - ${mes} ${dia}, ${ano}`);
}