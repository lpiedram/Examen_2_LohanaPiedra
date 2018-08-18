const express = require('express');
const router = express.Router();
const hotel = require('./hotel.api');

router.route('/registrarHotel')
    .post(function (req, res) {
        hotel.registrar(req, res);
    });

router.route('/listarHotel')
    .get(function (req, res) {
        hotel.listar(req, res);
    });

router.route('/filtrarHotel')
    .post(function (req, res) {
        hotel.filtrar(req, res);
    });

router.route('/actualizarHotel')
    .post(function (req, res) {
        hotel.actualizar(req, res);
    });

module.exports = router;