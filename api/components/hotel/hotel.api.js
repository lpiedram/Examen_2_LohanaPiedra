'use strict'

const HotelModel = require('./hotel.model');

module.exports.registrar = function (req, res) {
    let nuevoHotel = new HotelModel({
        nombre: req.body.nombre,
        telServicio: req.body.telServicio,
        correo: req.body.correo,
        telReserv: req.body.telReserv,
        correoReserv: req.body.correoReserv,
        provincia: req.body.provincia,
        canton: req.body.canton,
        distrito: req.body.distrito,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        foto: req.body.foto
    });
};

module.exports.listar = function (req, res) {
    HotelModel.find().then(
        function (hotel) {
            res.send(hotel);
        }
    );
};

module.exports.filtrar = function (req, res) {
    switch (req.body.tipo) {
        case "1":
            HotelModel.find(
                {
                    "nombre": {
                        $regex: new RegExp(req.body.valor, "ig")
                    }
                }
            ).then(
                function (hotel) {
                    res.send(hotel);
                });
            break;

        case "2":
            HotelModel.find(
                {
                    "ubicacion": {
                        $regex: new RegExp(req.body.valor, "ig")
                    }
                }
            ).then(
                function (hotel) {
                    res.send(hotel);
                });
            break;

        case "3":
            HotelModel.find(
                {
                    "_id": req.body.valor
                }
            ).then(
                function (hotel) {
                    res.send(hotel);
                });
            break;
    }
};

module.exports.actualizar = function (req, res) {
    HotelModel.findByIdAndUpdate(req.body._id, { $set: req.body },
        function (err, user) {
            if (err) {
                res.json({ success: false, msj: 'No se ha actualizado: ' + handleError(err) });

            } else {
                res.json({ success: true, msj: 'Se ha actualizado correctamente.' });
            }
        });
};