const container = document.querySelector(".container");
const todasCorridas = pegandoTodasAsCorridas();

todasCorridas.forEach(async ([id, valor]) => {
    const corrida = JSON.parse(valor);
    corrida.id = id;



    // div dentro do container que segura a div mapa e div lista
    const divItens = document.createElement("div");
    divItens.id = corrida.id;
    divItens.classList.add("item");
    divItens.addEventListener("click", () => {
        sessionStorage.setItem("id", divItens.id);
        window.location.href = `../paginas/detalhe.html`
    })
    container.appendChild(divItens);

    // divs que estão dentro da divItens
    const mapID = `map${corrida.id}`;
    const mapaDiv = document.createElement("div");
    mapaDiv.classList.add("map");
    mapaDiv.id = mapID;

    const listaDiv = document.createElement("ul");

    // filhos entrando em pais

    divItens.appendChild(mapaDiv);
    divItens.appendChild(listaDiv);

    // mapa e conteudo da lista


    const cidade = document.createElement("li");
    const velMax = document.createElement("li");
    const distancia = document.createElement("li");
    const duracao = document.createElement("li");
    const dataDeInicio = document.createElement("li");


    // mapa e cada LI dentro do ul

    listaDiv.appendChild(cidade);
    listaDiv.appendChild(velMax);
    listaDiv.appendChild(distancia);
    listaDiv.appendChild(duracao);
    listaDiv.appendChild(dataDeInicio);

    // adicionando textos na ul
    const primeiraPos = corrida.dados[0];
    cidade.innerText = await pegueMinhaPos(primeiraPos.latitude, primeiraPos.longitude);
    cidade.style.fontSize = "14px";
    cidade.style.color = " rgb(15, 184, 128)";

    velMax.innerText = `Max: ${velocidadeMaxima(corrida.dados)} Km/h`;
    velMax.style.fontWeight = "600";
    velMax.style.fontSize = "20px";

    distancia.innerText = `Distância: ${distanciaTotal(corrida.dados)} Km`;


    duracao.innerText = `Duração: ${tempoDeCorrida(corrida.tempoInicial, corrida.tempoFinal)}`;


    dataDeInicio.innerHTML = dataEmFormatoNormal(corrida.tempoInicial);
    dataDeInicio.style.color = "#444"
    dataDeInicio.style.textTransform = "capitalize"
    dataDeInicio.style.fontSize = "14px"







    const map = L.map(mapID, {
        zoomControl: false,
        dragging:false,
        attributionControl:false,
        scrollWheelZoom:false
    });
    map.setView([primeiraPos.latitude, primeiraPos.longitude], 15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: 10,
        maxZoom: 19,
    }).addTo(map);

    L.marker([primeiraPos.latitude, primeiraPos.longitude]).addTo(map);
});

