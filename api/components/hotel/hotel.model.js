'use strict';
//DEPENDENCIA
let mongoose = require('mongoose');

let hotelSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    telServicio: { type: Number, required: true },
    correoServicio: { type: String, required: true },
    telReser: { type: Number, required: true },
    correoReser: { type: String, required: true },
    provincia: {type: String, required: true},
    canton: {type: String, required: true},
    distrito: {type: String, required: true},
    // direccion: {type: String, required: true},
    longitud: { type: String, required: true },
    latitud: { type: String, required: true },
    foto: { type: String, required: true },
    activado: { type: String, required: true}
});

module.exports = mongoose.model('Hotel', hotelSchema);