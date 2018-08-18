'use strict'
let mongoose = require('mongoose');

let clienteSchema = mongoose.Schema({
    primerNombre: { type: String, required: true },
    segundoNombre: { type: String, required: true },
    primerApellido: { type: String, required: true },
    segundoApellido: { type: String, required: true },
    cedula: { type: Number, required: true },
    fechaNacimiento: { type: String, required: true },
    sexo: { type: String, required: true },
    latitud: { type: String, required: true },
    longitud: { type: String, required: true },
    provincia: { type: String, required: true },
    canton: { type: String, required: true },
    distrito: { type: String, required: true },
    dirExacta: { type: String, required: true },
    foto: { type: String, required: true },
    contrasena: { type: String, required: true },
    activado: { type: String, required: true }
});

module.exports = mongoose.model('Cliente', clienteSchema);