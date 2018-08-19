const express = require('express');
const router = express.Router();
const clientes = require('./cliente.api');

router.route('/registrarCliente')
    .post(function (req, res) {
        clientes.registrar(req, res);
    });

router.route('/listarCliente')
    .get(function (req, res) {
        clientes.listar(req, res);
    });

router.route('/filtrarCliente')
    .post(function (req, res) {
        clientes.filtrar(req, res);
    });

router.route('/actualizarCliente')
    .post(function (req, res) {
        clientes.actualizar(req, res);
    });

module.exports = router;