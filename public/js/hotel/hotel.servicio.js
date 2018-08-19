'use strict'
function registrarHotel(hotel) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrarHotel',
        type: 'post',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            nombre: hotel[0],
            telServicio: hotel[1],
            correo: hotel[2],
            telReserv: hotel[3],
            correoReserv: hotel[4],
            provincia: hotel[5],
            canton: hotel[6],
            distrito: hotel[7],
            latitude: hotel[8],
            longitude: hotel[9],
            foto: hotel[10],
        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });


    peticion.fail(function (response) {

    });

    console.log(respuesta);
    return respuesta;
}

function actualizarHotel(id_user, hotel) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/actualizarHotel',
        type: 'post',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            _id: id_user,
            nombre: hotel[0],
            telServicio: hotel[1],
            correo: hotel[2],
            telReserv: hotel[3],
            correoReserv: hotel[4],
            provincia: hotel[5],
            canton: hotel[6],
            distrito: hotel[7],
            latitude: hotel[8],
            longitude: hotel[9],
            foto: hotel[10],
        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });


    peticion.fail(function (response) {

    });

    console.log(respuesta);
    return respuesta;
}


function obtenerListaHoteles() {
    let listaHotel = [];

    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/listarHotel',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {

        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {

    });

    return respuesta;

    return listaHotel;
}


function filtrarHotel(cTipo, cValor) {
    let listaHotel = [];

    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/filtrarHotel',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            tipo: cTipo,
            valor: cValor
        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {

    });

    return respuesta;

    return listaHotel;
}

function obtenerHotelPorId(pid) {
    let hotel = '';

    let peticion = $.ajax({
        url: 'http://localhost:4000/api/buscarHotelId',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            id: pid
        }
    });

    peticion.done(function (response) {
        hotel = response;
    });

    peticion.fail(function (response) {

    });
    return hotel;
};
function borrarHotelPorId(pid) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/borrarHotel',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            _id: pid
        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {

    });

    return respuesta;
}