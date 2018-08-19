'use strict';

const baseUrl = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
const Salir = document.querySelector('#salir');

const nombre = document.querySelector('#nombre');
const telServicio = document.querySelector('#telServicio');
const correo = document.querySelector('#correo');
const telReserv = document.querySelector('#telReserv');
const correoReserv = document.querySelector('#correoReserv');
const provincia = document.querySelector('#Provincia');
const canton = document.querySelector('#Cantón');
const distrito = document.querySelector('#Distrito');
const latitude = document.querySelector('#latitude');
const longitude = document.querySelector('#longitude');
const foto = document.querySelector('#foto');
const btnRegistrar = document.querySelector('#registrar');

const editNombre = document.querySelector('#nombre');
const editTelServicio = document.querySelector('#telServicio');
const editCorreo = document.querySelector('#correo');
const editTelReserv = document.querySelector('#telReserv');
const editCorreoReserv = document.querySelector('#correoReserv');
const editProvincia = document.querySelector('#Provincia');
const editCanton = document.querySelector('#Cantón');
const editDistrito = document.querySelector('#Distrito');
const editLatitude = document.querySelector('#latitude');
const editLongitude = document.querySelector('#longitude');
const editFoto = document.querySelector('#foto');
const editId = document.querySelector('#editId');
const btnEditar = document.querySelector('#btnEditar');
const btnCancelar = document.querySelector('#Cancelar');

const Buscar = document.querySelector('#buscar');
const btnBuscar = document.querySelector('#btnBuscar');

// btnRegistrar.addEventListener('click',registrarHotel);
// btnEditar.addEventListener('click',editarFormularioHotel);

Comprobar();
imprimirListaHoteles();


function Comprobar() {
    let tipo = sessionStorage.getItem("tipo");

    if (tipo != 0) {
        window.location.assign(baseUrl + '/public/logIn.html');
    }
}

function cerrarSesionHotel() {
    sessionStorage.clear();
    window.location.assign(baseUrl + '/public/logIn.html');
}

function registrar() {
    let hotel = [];
    hotel.push(
        nombre.value,
        telServicio.value,
        correo.value,
        telReserv.value,
        correoReserv.value,
        provincia.value,
        canton.value,
        distrito.value,
        latitude.value,
        longitude.value,
        foto.value
    );

    let validar = validarFormulario();

    if (validar) {
        toastr.warning('Por favor llene los campos');
    } else {
        let respuesta = registrarHotel(hotel);
        if (respuesta.success == false) {
            toastr.error(respuesta.msj);
        } else {
            toastr.success(respuesta.msj);
            limpiarFormulario();
            imprimirListaHoteles();
        }
    }

}

function validarFormulario() {

    let regexSoloLetras = /^[a-z A-ZáéíóúÁÉÍÓÚñÑ]+$/;
    let regexSoloNumeros = /^ ([0 - 9]) * $ /;
    let regexCedula = /^[1-9]-?\d{4}-?\d{4}$/;
    let regexTelefono = /^([0-9]+){9}$/;
    let regexCorreo = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    let regexFecha = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
    let regexFoto = /.(gif|jpeg|jpg|png)$/;
    let respuesta = false;

    if (nombre.value == '' || (regexSoloLetras.test(nombre.value) == false)) {
        nombre.classList.add('error_input');
        toastr.error('Campo Nombre no puede estar vacio y solo acepta letras');
        respuesta = true;
    } else {
        nombre.classList.remove('error_input');
    }

    if (cedula.value == null || (regexCedula.test(cedula.value) == false)) {
        cedula.classList.add('error_input');
        toastr.error('Campo Cedula no puede estar vacio y solo acepta numeros');
        respuesta = true;
    } else {
        cedula.classList.remove('error_input');
    }

    /*if (telefono.value == null || (regexTelefono.test(telefono.value) == false)) {
        telefono.classList.add('error_input');
        respuesta = true;
    } else {
        telefono.classList.remove('error_input');
    }*/

    if (correo.value == null || (regexCorreo.test(correo.value) == false)) {
        correo.classList.add('error_input');
        toastr.error('Campo Correo no puede estar vacio');
        respuesta = true;
    } else {
        let revisarCorreo = comprobarCorreo(correo.value);
        if (revisarCorreo['_result']) {
            toastr.error('Correo se encuentra ya registrado');
        } else {
            correo.classList.remove('error_input');
        }
    }

    if (contactoNombre.value == '' || (regexSoloLetras.test(contactoNombre.value) == false)) {
        contactoNombre.classList.add('error_input');
        toastr.error('Campo Nombre Contacto no puede estar vacio y solo acepta letras');
        respuesta = true;
    } else {
        contactoNombre.classList.remove('error_input');
    }

    /*if (contactoTel.value == '' || (regexSoloNumeros.test(contactoTel.value) == false)) {
        contactoTel.classList.add('error_input');
        respuesta = true;
    } else {
        contactoTel.classList.remove('error_input');
    }*/

    if (contactoEmail.value == null || (regexCorreo.test(contactoEmail.value) == false)) {
        contactoEmail.classList.add('error_input');
        respuesta = true;
    } else {
        contactoEmail.classList.remove('error_input');
    }

    /*if (foto.value == null || (regexFoto.test(foto.value) == false)) {
        foto.classList.add('error_input');
        respuesta = true;
    } else {
        foto.classList.remove('error_input');
    }*/

    return respuesta;
}

function imprimirListaHoteles() {
    let listaHoteles = obtenerListaHoteles();
    let tbody = document.querySelector('#table-users tbody');
    tbody.innerHTML = '';

    for (let i = 0; i < listaHoteles.length; i++) {
        let fila = tbody.insertRow();

        let cNombre = fila.insertCell();
        let ctelServicio = fila.insertCell();
        let ccorreo = fila.insertCell();
        let ctelReserv = fila.insertCell();
        let ccorreoReserv = fila.insertCell();
        let cprovincia = fila.insertCell();
        let ccanton = fila.insertCell();
        let cdistrito = fila.insertCell();
        let clatitude = fila.insertCell();
        let clongitude = fila.insertCell();
        let editar = fila.insertCell();

        cNombre.innerHTML = listaHoteles[i]['nombre'];
        ctelServicio.innerHTML = listaHoteles[i]['telServicio'];
        ccorreo.innerHTML = listaHoteles[i]['correo'];
        ctelReserv.innerHTML = listaHoteles[i]['telReserv'];
        ccorreoReserv.innerHTML = listaHoteles[i]['correoReserv'];
        cprovincia.innerHTML = listaHoteles[i]['provincia'];
        ccanton.innerHTML = listaHoteles[i]['canton'];
        cdistrito.innerHTML = listaHoteles[i]['distrito'];
        clatitude.innerHTML = listaHoteles[i]['latitude'];
        clongitude.innerHTML = listaHoteles[i]['longitud'];
        editar.innerHTML = '<button type="button" class="editButton" id="' + listaHoteles[i]['_id'] + '"><i class="fas fa-edit"></i></button>';

        document.getElementById(listaHoteles[i]['_id']).onclick = function () {
            let clientes = filtrarClientes("3", this.id);
            editNombre.value = clientes[0]['nombre'];
            editTelServicio.value = clientes[0]['telServicio'];
            editCorreo.value = clientes[0]['correo'];
            editTelReserv.value = clientes[0]['telReserv'];
            editCorreoReserv.value = clientes[0]['correoReserv'];
            editProvincia.value = clientes[0]['provincia'];
            editCanton.value = clientes[0]['canton'];
            editDistrito.value = clientes[0]['distrito'];
            editLatitude.value = clientes[0]['latitude'];
            editLongitude.value = clientes[0]['longitude'];
            editFoto.value = clientes[0]['foto'];
            document.querySelector('#editFotoShow').src = editFoto.value;
            $('.tab').slideUp();
            $('.edit-box').slideDown();
        }

    }

};

function buscarHotel() {
    let listaHoteles = filtrarHotel("1", Buscar.value);
    let tbody = document.querySelector('#table-users tbody');
    tbody.innerHTML = '';

    for (let i = 0; i < listaHoteles.length; i++) {
        let fila = tbody.insertRow();

        let cNombre = fila.insertCell();
        let ctelServicio = fila.insertCell();
        let ccorreo = fila.insertCell();
        let ctelReserv = fila.insertCell();
        let ccorreoReserv = fila.insertCell();
        let cprovincia = fila.insertCell();
        let ccanton = fila.insertCell();
        let cdistrito = fila.insertCell();
        let clatitude = fila.insertCell();
        let clongitude = fila.insertCell();
        let editar = fila.insertCell();

        cNombre.innerHTML = listaHoteles[i]['nombre'];
        ctelServicio.innerHTML = listaHoteles[i]['telServicio'];
        ccorreo.innerHTML = listaHoteles[i]['correo'];
        ctelReserv.innerHTML = listaHoteles[i]['telReserv'];
        ccorreoReserv.innerHTML = listaHoteles[i]['correoReserv'];
        cprovincia.innerHTML = listaHoteles[i]['provincia'];
        ccanton.innerHTML = listaHoteles[i]['canton'];
        cdistrito.innerHTML = listaHoteles[i]['distrito'];
        clatitude.innerHTML = listaHoteles[i]['latitude'];
        clongitude.innerHTML = listaHoteles[i]['longitud'];
        editar.innerHTML = '<button type="button" class="editButton" id="' + listaHoteles[i]['_id'] + '"><i class="fas fa-edit"></i></button>';

        document.getElementById(listaHoteles[i]['_id']).onclick = function () {
            let clientes = filtrarClientes("3", this.id);
            editNombre.value = clientes[0]['nombre'];
            editTelServicio.value = clientes[0]['telServicio'];
            editCorreo.value = clientes[0]['correo'];
            editTelReserv.value = clientes[0]['telReserv'];
            editCorreoReserv.value = clientes[0]['correoReserv'];
            editProvincia.value = clientes[0]['provincia'];
            editCanton.value = clientes[0]['canton'];
            editDistrito.value = clientes[0]['distrito'];
            editLatitude.value = clientes[0]['latitude'];
            editLongitude.value = clientes[0]['longitude'];
            editFoto.value = clientes[0]['foto'];
            document.querySelector('#editFotoShow').src = editFoto.value;
            $('.tab').slideUp();
            $('.edit-box').slideDown();
        }

    }

};

function editarFormularioHotel() {
    let Cliente = [];
    Cliente.push(
        editNombre.value,
        editTelServicio.value,
        editCorreo.value,
        editTelReserv.value,
        editCorreoReserv.value,
        editProvincia.value,
        editCanton.value,
        editDistrito.value,
        editLatitude.value,
        editLongitude.value,
        editFoto.value,
    );

    let validar = validarFormulario();

    if (validar) {
        toastr.warning('Por favor llene los campos');
    } else {
        let respuesta = actualizarHotel(editId.value, hotel);
        if (respuesta.success == false) {
            toastr.error(respuesta.msj);
            $('.edit-box').slideUp();
            $('.tab').slideDown();
        } else {
            toastr.success(respuesta.msj);
            imprimirlistaHoteles();
            limpiarFormulario();
            $('.edit-box').slideUp();
            $('.tab').slideDown();
        }
    }

}

function cancelarHotel() {
    toastr.warning('Editar cancelado');
    $('.edit-box').slideUp();
    $('.tab').slideDown();
}

function limpiarFormulario() {
    nombre.value = '';
    telServicio.value = '';
    correo.value = '';
    telReserv.value = '';
    correoReserv.value = '';
    provincia.value = '';
    canton.value = '';
    distrito.value = '';
    latitude.value = '';
    longitude.value = '';
    foto.value = '';

    editNombre.value = '';
    editTelServicio.value = '';
    editCorreo.value = '';
    editTelReserv.value = '';
    editCorreoReserv.value = '';
    editProvincia.value = '';
    editCanton.value = '';
    editDistrito.value = '';
    editLatitude.value = '';
    editLongitude.value = '';
}

function borrarHotel() {
    let id = this.dataset._id;
    borrarHotelPorId(id);
    listaHotel = obtenerlistaHoteles();
    imprimirlistaHoteles();

}