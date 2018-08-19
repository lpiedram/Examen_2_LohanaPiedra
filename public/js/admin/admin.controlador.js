'use strict'

// const baseUrl = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
const Salir = document.querySelector('#salir');


Salir.addEventListener('click', cerrarSesion);

Comprobar();
imprimirListaHoteles();

function Comprobar() {
    let tipo = sessionStorage.getItem("tipo");

    if (tipo != 0) {
        window.location.assign(baseUrl + '/public/logIn.html');
    } else {
        userName.textContent = sessionStorage.getItem("nombre");
        currentFoto.src = sessionStorage.getItem("foto");
        cantidades();
    }
}

function cerrarSesion() {
    sessionStorage.clear();
    window.location.assign(baseUrl + '/public/logIn.html');
}

function imprimirListaHoteles() {
    let listaHotel = obtenerListaHoteles();
    let tbody = document.querySelector('#table-users tbody');
    tbody.innerHTML = '';

    let comenzar = 0;
    if (listaHotel.length > 6) {
        comenzar = listaHotel.length - 6;
    }

    for (let i = comenzar; i < listaHotel.length; i++) {
        let fila = tbody.insertRow();

        let cnombre = fila.insertCell();
        let cubicacion = fila.insertCell();
        let ctelefonoServicio = fila.insertCell();
        let ccorreoServicio = fila.insertCell();
        let ctelefonoReserv = fila.insertCell();
        let ccorreoReserv = fila.insertCell();

        cnombre.innerHTML = listaHotel[i]['nombre'];
        cubicacion.innerHTML = listaHotel[i]['ubicacion'];
        ctelefonoServicio.innerHTML = listaHotel[i]['telServicio'];
        ccorreoServicio.innerHTML = listaHotel[i]['correoServicio'];
        ctelefonoReserv.innerHTML = listaHotel[i]['telReser'];
        ccorreoReserv.innerHTML = listaHotel[i]['correoReser'];
    }
};

function cantidades() {
    let clientes = obtenerListaClientes();
    let hoteles = obtenerListaHoteles();

    document.querySelector('#Clientes').innerHTML = "<span>" + clientes.length + "</span>Clientes";
    document.querySelector('#Hoteles').innerHTML = "<span>" + hoteles.length + "</span>Hoteles";
}