const corridaID = sessionStorage.getItem("id");
const corrida = pegueRecordeCorrida(corridaID);

document.addEventListener("DOMContentLoaded", async () => {


    const detalhes = document.querySelector("#detalhes");
    const mapa = document.createElement("div");
    mapa.id = "mapa";
    const cidade = document.createElement("div");
    const velMax = document.createElement("div");
    const distancia = document.createElement("div");
    const duracao = document.createElement("div");
    const dataDeInicio = document.createElement("div");

    detalhes.appendChild(mapa);
    detalhes.appendChild(cidade);
    detalhes.appendChild(velMax);
    detalhes.appendChild(distancia);
    detalhes.appendChild(duracao);
    detalhes.appendChild(dataDeInicio);

    const deletar = document.querySelector("#deletar");
    deletar.addEventListener("click", () => {
        localStorage.removeItem(corridaID);
        window.location.href = "../index.html";
    })

    const primeiraPos = corrida.dados[0];
    cidade.innerText = await pegueMinhaPos(primeiraPos.latitude, primeiraPos.longitude);
    cidade.style.fontSize = "16px";

    velMax.innerText = `Max: ${velocidadeMaxima(corrida.dados)} Km/h`;
    velMax.style.fontWeight = "700";
    velMax.style.fontSize = "24px";


    distancia.innerText = `Distância: ${distanciaTotal(corrida.dados)} Km`;
    distancia.style.fontWeight = "600";

    duracao.innerText = `Duração: ${tempoDeCorrida(corrida.tempoInicial, corrida.tempoFinal)}`;
    duracao.style.fontWeight = "600";


    dataDeInicio.innerHTML = dataEmFormatoNormal(corrida.tempoInicial);
    dataDeInicio.style.color = "#abebf7"
    dataDeInicio.style.textTransform = "capitalize"
    dataDeInicio.style.fontSize = "14px"




    const map = L.map("mapa", {
        attributionControl: false
    });
    map.setView([primeiraPos.latitude, primeiraPos.longitude], 15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: 10,
        maxZoom: 19,
    }).addTo(map);

    const posNoArray = corrida.dados.map(pos => {
        return [pos.latitude, pos.longitude]
    })

    const linhaP = L.polyline(posNoArray, { color: "#F00" }).addTo(map);

    map.fitBounds(linhaP.getBounds())

});