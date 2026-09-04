const BtoIniciar = document.querySelector(".iniciar");
const BtoParar = document.querySelector(".parar");
const velocidadeElemento = document.querySelector("#velocidade");

let wpID = null;
let corridaRolando = null;

BtoIniciar.addEventListener("click" , ()=>{
    if(wpID){return};
    
    function pegarPos(position){
        addPosition(corridaRolando, position);
        velocidadeElemento.innerText = position.coords.speed? (position.coords.speed * 3.6).toFixed(1) : 0;
    };

    function pegarErro(error){
        error.msg
    };

    const options = {enableHighAccuracy: true};

    corridaRolando = corridaEmAndamento();
    wpID = navigator.geolocation.watchPosition(pegarPos, pegarErro, options);

    

    BtoIniciar.style.display = "none";
    BtoParar.style.display = "initial";

});

BtoParar.addEventListener("click" , ()=>{
    if(!wpID){return}

    navigator.geolocation.clearWatch(wpID);
    wpID = null;
    fimDaCorrida(corridaRolando);
    corridaRolando = null;
    
    BtoIniciar.style.display = "";
    BtoParar.style.display = "none";
    window.location.href="../index.html";
})

