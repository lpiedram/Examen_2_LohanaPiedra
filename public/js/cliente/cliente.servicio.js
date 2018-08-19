'use strict'
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
            correo: cliente[6],
            sexo: cliente[7],
            foto: cliente[8],
            contrasena: cliente[9],
            confirmarContrasena: cliente[10]
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
            correo: cliente[6],
            sexo: cliente[7],
            foto: cliente[8],
            contrasena: cliente[9]
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
        url: 'http://localhost:4000/api/listarCliente',
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
        url: 'http://localhost:4000/api/filtrarCliente',
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

function obtenerClientePorId(pid) {
    let cliente = '';

    let peticion = $.ajax({
        url: 'http://localhost:4000/api/buscarClienteId',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            id: pid
        }
    });

    peticion.done(function (response) {
        cliente = response;
    });

    peticion.fail(function (response) {

    });
    return cliente;
};

function borrarClientePorId(pid) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/borrarCliente',
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