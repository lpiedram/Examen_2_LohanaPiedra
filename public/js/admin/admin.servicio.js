'use strict';

function registrarHotel(hotel) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrarHotel',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            nombre: hotel[0],
            longitud: hotel[1],
            latitud: hotel[2],
            provincia: hotel[3],
            canton: hotel[4],
            distrito: hotel[5],
            direccion: hotel[6],
            telServicio: hotel[7],
            correoServicio: hotel[8],
            telReser: hotel[9],
            correoReser: hotel[10]
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
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            _id: id_user,
            nombre: hotel[0],
            longitud: hotel[1],
            latitud: hotel[2],
            provincia: hotel[3],
            canton: hotel[4],
            distrito: hotel[5],
            direccion: hotel[6],
            telServicio: hotel[7],
            correoServicio: hotel[8],
            telReser: hotel[9],
            correoReser: hotel[10]
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



function obtenerListaHotel() {
    let listarHotel = [];

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

    return listarHotel;
}


function filtrarHotel(cNombre, cUbicacion) {
    let listaHotel = [];

    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/filtrarHotel',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            nombre: cNombre,
            ubicacion: cUbicacion
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


function registrarCliente(cliente) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrarCliente',
        type: 'post',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            primerNombre: cliente[0],
            segundoNombre: cliente[1],
            primerApellido: cliente[2],
            segundoApellido: cliente[3],
            cedula: cliente[4],
            fechaNacimiento: cliente[5],
            sexo: cliente[6],
            latitud: cliente[7],
            longitud: cliente[8],
            provincia: cliente[9],
            canton: cliente[10],
            distrito: cliente[11],
            dirExacta:cliente[12],
            foto: cliente[13],
            contrasena: cliente[14]
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


function actualizarCliente(id_user, cliente) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/actualizarCliente',
        type: 'post',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            _id: id_user,
            primerNombre: cliente[0],
            segundoNombre: cliente[1],
            primerApellido: cliente[2],
            segundoApellido: cliente[3],
            cedula: cliente[4],
            fechaNacimiento: cliente[5],
            sexo: cliente[6],
            latitud: cliente[7],
            longitud: cliente[8],
            provincia: cliente[9],
            canton: cliente[10],
            distrito: cliente[11],
            dirExacta: cliente[12],
            foto: cliente[13],
            contrasena: cliente[14]
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


function obtenerListaClientes() {
    let listaClientes = [];

    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/listarClientes',
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

    return listaClientes;
}


function filtrarClientes(cTipo, cValor) {
    let listaClientes = [];

    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/filtrarClientes',
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

    return listaClientes;
}
