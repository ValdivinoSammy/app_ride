# app_ride

Um projeto desenvolvido para praticar programação web utilizando **HTML, CSS e JavaScript**.

A ideia do projeto é registrar uma corrida utilizando a localização do dispositivo, mostrando informações como velocidade, distância percorrida, tempo de corrida e localização.

## Funcionalidades

- Obtenção da localização através da **Geolocation API**
- Acompanhamento da velocidade durante a corrida
- Cálculo da distância percorrida
- Registro do tempo de corrida
- Registro da velocidade máxima atingida
- Identificação da cidade e país através de uma API de localização
- Utilização do **Leaflet** para trabalhar com mapas
- Armazenamento e exibição dos dados das corridas

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Geolocation API
- Fetch API
- Leaflet
- API de Reverse Geocoding

## Como executar

Clone o repositório:

```bash
git clone https://github.com/ValdivinoSammy/app_ride.git
```

Depois, abra a pasta do projeto no seu editor de código e execute o `index.html` utilizando um servidor local, como o **Live Server** do VS Code.

> É recomendado utilizar um servidor local porque o projeto utiliza recursos do navegador relacionados à localização.

## Geolocalização

O projeto utiliza a `navigator.geolocation.watchPosition()` para acompanhar a posição do dispositivo durante uma corrida.

A velocidade fornecida pela API é convertida de **m/s para km/h** e atualizada durante o acompanhamento.

Também são armazenadas as posições obtidas durante a corrida para posteriormente calcular a distância percorrida e outras informações.

## Cálculos

O JavaScript possui funções responsáveis por calcular:

- Velocidade máxima
- Distância total percorrida
- Tempo de corrida
- Data e horário da corrida

A distância é calculada utilizando as coordenadas de latitude e longitude registradas durante o percurso.

## Localização

Após obter latitude e longitude, o projeto utiliza uma API de **reverse geocoding** para transformar as coordenadas em informações de localização, como cidade e código do país.

## Objetivo

Este projeto foi desenvolvido principalmente como forma de **praticar programação e aprender a trabalhar com APIs do navegador, geolocalização, JavaScript e manipulação de dados**.

Durante o desenvolvimento, foram utilizados conceitos como:

- Funções assíncronas
- `fetch()` e `async/await`
- APIs do navegador
- Manipulação do DOM
- Eventos
- Arrays e objetos
- Geolocalização
- Cálculos utilizando coordenadas geográficas

## Autor

**Valdivino Sammy**

Projeto desenvolvido para fins de estudo.
