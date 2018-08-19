'use strict';

const baseUrl = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
const Salir = document.querySelector('#salir');

const primerNombre = document.querySelector('#primerNombre');
const segundoNombre = document.querySelector('#segundoNombre');
const primerApellido = document.querySelector('#primerApellido');
const segundoApellido = document.querySelector('#primerNombre');
const cedula = document.querySelector('#cedula');
const fechaNacimiento = document.querySelector('#fechaNacimiento');
const correo = document.querySelector('#correo');
const sexo = document.querySelector('#sexo');
const contrasena = document.querySelector('#contrasena');
const confirmarContrasena = document.querySelector('#confirmarContrasena');
const foto = document.querySelector('#foto');
const btnRegistrar = document.querySelector('#registrar');


const editPrimerNombre = document.querySelector('#primerNombre');
const editSegundoNombre = document.querySelector('#segundoNombre');
const editPrimerApellido = document.querySelector('#primerApellido');
const editSegundoApellido = document.querySelector('#primerNombre');
const editCedula = document.querySelector('#cedula');
const editFechaNacimiento = document.querySelector('#fechaNacimiento');
const editCorreo = document.querySelector('#correo');
const editSexo = document.querySelector('#sexo');
const editContrasena = document.querySelector('#contrasena');
const editConfirmarContrasena = document.querySelector('#confirmarContrasena');
const editFoto = document.querySelector('#foto');
const editId = document.querySelector('#editId');
const btnEditar = document.querySelector('#btnEditar');
const btnCancelar = document.querySelector('#Cancelar');


const Buscar = document.querySelector('#buscar');
const btnBuscar = document.querySelector('#btnBuscar');



btnRegistrar.addEventListener('click', registrarCliente);
btnBuscar.addEventListener('click', buscarCliente);
btnEditar.addEventListener('click', editarFormulario);
btnCancelar.addEventListener('click', cancelar);
Salir.addEventListener('click', cerrarSesion);


Comprobar();
imprimirListaClientes();


function Comprobar() {
    let tipo = sessionStorage.getItem("tipo");

    if (tipo != 0) {
        window.location.assign(baseUrl + '/public/logIn.html');
    }
}

function cerrarSesion() {
    sessionStorage.clear();
    window.location.assign(baseUrl + '/public/logIn.html');
}

function registrarCliente() {
    let cliente = [];
    cliente.push(
        primerNombre.value,
        segundoNombre.value,
        primerApellido.value,
        segundoApellido.value,
        cedula.value,
        fechaNacimiento.value,
        // correo.value,
        sexo.value,
        contrasena.value,
        // foto.value
    );

    let validar = validarFormulario();

    if (validar) {
        toastr.warning('Por favor llene los campos');
    } else {
        let respuesta = registrarCliente(cliente);
        if (respuesta.success == false) {
            toastr.error(respuesta.msj);
        } else {
            toastr.success(respuesta.msj);
            imprimirListaClientes();
            limpiarFormulario();
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

    if (primerNombre.value == '' || (regexSoloLetras.test(primerNombre.value) == false)) {
        primerNombre.classList.add('error_input');
        toastr.error('Campo Nombre no puede estar vacio y solo acepta letras');
        respuesta = true;
    } else {
        primerNombre.classList.remove('error_input');
    }

    if (segundoNombre.value == '' || (regexSoloLetras.test(segundoNombre.value) == false)) {
        segundoNombre.classList.add('error_input');
        toastr.error('Campo Nombre no puede estar vacio y solo acepta letras');
        respuesta = true;
    } else {
        segundoNombre.classList.remove('error_input');
    }

    if (primerApellido.value == '' || (regexSoloLetras.test(primerApellido.value) == false)) {
        primerApellido.classList.add('error_input');
        toastr.error('Campo Nombre no puede estar vacio y solo acepta letras');
        respuesta = true;
    } else {
        primerApellido.classList.remove('error_input');
    }

    if (segundoApellido.value == '' || (regexSoloLetras.test(segundoApellido.value) == false)) {
        segundoApellido.classList.add('error_input');
        toastr.error('Campo Nombre no puede estar vacio y solo acepta letras');
        respuesta = true;
    } else {
        segundoApellido.classList.remove('error_input');
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

function imprimirListaClientes() {
    let listaClientes = obtenerListaClientes();
    let tbody = document.querySelector('#table-users tbody');
    tbody.innerHTML = '';

    for (let i = 0; i < listaClientes.length; i++) {
        let fila = tbody.insertRow();

        let cprimerNombre = fila.insertCell();
        let csegundoNombre = fila.insertCell();
        let cprimerApellido = fila.insertCell();
        let csegundoApellido = fila.insertCell();
        let ccedula = fila.insertCell();
        let cfechaNacimiento = fila.insertCell();
        let ccorreo = fila.insertCell();
        let csexo = fila.insertCell();
        let ccontrasena = fila.insertCell();
        let cconfirmarContrasena = fila.insertCell();
        let editar = fila.insertCell();

        cprimerNombre.innerHTML = listaClientes[i]['primerNombre'];
        csegundoNombre.innerHTML = listaClientes[i]['segundoNombre'];
        cprimerApellido.innerHTML = listaClientes[i]['primerApellido'];
        csegundoApellido.innerHTML = listaClientes[i]['segundoApellido'];
        ccedula.innerHTML = listaClientes[i]['cedula'];
        cfechaNacimiento.innerHTML = listaClientes[i]['fechaNacimiento'];
        ccorreo.innerHTML = listaClientes[i]['correo'];
        csexo.innerHTML = listaClientes[i]['sexo'];
        ccontrasena.innerHTML = listaClientes[i]['contrasena'];
        cconfirmarContrasena.innerHTML = listaClientes[i]['confrimacionContrasena'];
        editar.innerHTML = '<button type="button" class="editButton" id="' + listaClientes[i]['_id'] + '"><i class="fas fa-edit"></i></button>';

        document.getElementById(listaClientes[i]['_id']).onclick = function () {
            let clientes = filtrarClientes("3", this.id);
                editPrimerNombre.value = clientes[0]['primer_nombre']; 
                editSegundoNombre.value = clientes[0]['segundo_nombre'];
                editPrimerApellido.value = clientes[0]['primer_apellido'];
                editSegundoApellido.value = clientes[0]['segundo_apellido'];
                editCedula.value = clientes[0]['cedula'];
                editFechaNacimiento.value = clientes[0]['fecha_nacimiento'];
                editCorreo.value = clientes[0]['correo'];
                editSexo.value = clientes[0]['sexo'];
                editContrasena.value = clientes[0]['contrasena'];
                editFoto.value = clientes[0]['foto'];
                document.querySelector('#editFotoShow').src = editFoto.value;
            $('.tab').slideUp();
            $('.edit-box').slideDown();
        }

    }

};

function buscarCliente() {
    let listaClientes = filtrarClientes("1", Buscar.value);
    let tbody = document.querySelector('#table-users tbody');
    tbody.innerHTML = '';

    for (let i = 0; i < listaClientes.length; i++) {
        let fila = tbody.insertRow();

        let cprimerNombre = fila.insertCell();
        let csegundoNombre = fila.insertCell();
        let cprimerApellido = fila.insertCell();
        let csegundoApellido = fila.insertCell();
        let ccedula = fila.insertCell();
        let cfechaNacimiento = fila.insertCell();
        let ccorreo = fila.insertCell();
        let csexo = fila.insertCell();
        let ccontrasena = fila.insertCell();
        let cconfirmarContrasena = fila.insertCell();
        let editar = fila.insertCell();

        cprimerNombre.innerHTML = listaClientes[i]['primer_nombre'];
        csegundoNombre.innerHTML = listaClientes[i]['segundo_nombre'];
        cprimerApellido.innerHTML = listaClientes[i]['primer_apellido'];
        csegundoApellido.innerHTML = listaClientes[i]['segundo_apellido'];
        ccedula.innerHTML = listaClientes[i]['cedula'];
        cfechaNacimiento.innerHTML = listaClientes[i]['fecha_nacimiento'];
        ccorreo.innerHTML = listaClientes[i]['correo'];
        csexo.innerHTML = listaClientes[i]['sexo'];
        ccontrasena.innerHTML = listaClientes[i]['contrasena'];
        cconfirmarContrasena.innerHTML = listaClientes[i]['confrimacion_contrasena'];
        editar.innerHTML = '<button type="button" class="editButton" id="' + listaClientes[i]['_id'] + '"><i class="fas fa-edit"></i></button>';

        document.getElementById(listaClientes[i]['_id']).onclick = function () {
            let clientes = filtrarClientes("3", this.id);
            editPrimerNombre.value = clientes[0]['primer_nombre'];
            editSegundoNombre.value = clientes[0]['segundo_nombre'];
            editPrimerApellido.value = clientes[0]['primer_apellido'];
            editSegundoApellido.value = clientes[0]['segundo_apellido'];
            editCedula.value = clientes[0]['cedula'];
            editFechaNacimiento.value = clientes[0]['fecha_nacimiento'];
            editCorreo.value = clientes[0]['correo'];
            editSexo.value = clientes[0]['sexo'];
            editContrasena.value = clientes[0]['contrasena'];
            editFoto.value = clientes[0]['foto'];
            document.querySelector('#editFotoShow').src = editFoto.value;
            $('.tab').slideUp();
            $('.edit-box').slideDown();
        }

    }

};


function editarFormulario() {
    let Cliente = [];
    Cliente.push(
        editPrimerNombre.value,
        editSegundoNombre.value,
        editPrimerApellido.value,
        editSegundoApellido.value,
        editCedula.value,
        editFechaNacimiento.value,
        editCorreo.value,
        editSexo.value,
        editContrasena.value,        
        editFoto.value,
    );

    let validar = validarFormulario();

    if (validar) {
        toastr.warning('Por favor llene los campos');
    } else {
        let respuesta = actualizarCliente(editId.value, Cliente);
        if (respuesta.success == false) {
            toastr.error(respuesta.msj);
            $('.edit-box').slideUp();
            $('.tab').slideDown();
        } else {
            toastr.success(respuesta.msj);
            imprimirListaClientes();
            limpiarFormulario();
            $('.edit-box').slideUp();
            $('.tab').slideDown();
        }
    }

}

function cancelar() {
    toastr.warning('Editar cancelado');
    $('.edit-box').slideUp();
    $('.tab').slideDown();
}

function limpiarFormulario(){
    primerNombre.value = '';
    segundoNombre.value = '';
    primerApellido.value = '';
    segundoApellido.value = '';
    cedula.value = '';
    fechaNacimiento.value = '';
    correo.value = '';
    sexo.value = '';
    contrasena.value = '';
    confirmarContrasena.value = '';
    foto.value = '';

    editPrimerNombre.value = '';
    editSegundoNombre.value = '';
    editPrimerApellido.value = '';
    editSegundoApellido.value = '';
    editCedula.value = '';
    editFechaNacimiento.value = '';
    editCorreo.value = '';
    editSexo.value = '';
    editContrasena.value = '';
    editFoto.value = '';
}

function borrarCliente() {
    let id = this.dataset._id;
    borrarClientePorId(id);
    listaCliente = obtenerListaClientes();
    imprimirListaClientes();

}