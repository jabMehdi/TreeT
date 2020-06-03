const express = require('express');
const router = express.Router();
const Factory = require('../models/Factory');

var jwt = require('jsonwebtoken');
const Sensor = require('../models/Sensor');

function verifyToken(req, res, next) {
    let payload;
    if (req.query.token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    try {
        payload = jwt.verify(req.query.token, 'tawfik');
    } catch (e) {
        return res.status(400).send('Invalid User');
    }
    if (!payload) {
        return res.status(401).send('Unauthorized request');
    }

    decoded = jwt.decode(req.query.token, {complete: true});
    req.id = decoded.payload.id;

    next()
}

router.put('/factory/add', verifyToken, async (req, res) => {
    let factory = new Factory({

        userId: req.id,
        name: req.body.name,
        description: req.body.description,
        lng: req.body.lng,
        lat: req.body.lat,

    });
    try {
        const NewFactory = await Factory.find({_id: req.body.id, name: req.body.name});
        if (NewFactory == undefined || NewFactory.length == 0) {
            factory = await factory.save();
        } else {
            factory = await Factory.findOneAndUpdate({
                userId: req.id,
                name: req.body.name,
                description: req.body.description,
                lng: req.body.lng,
                lat: req.body.lat,
                nbrSensor: req.body.nbrSensor,
                sensorsId: [{
                    _id: req.body.sensorsId.id,

                }],
            });
        }
        res.json(factory);
        return;


        res.json({status: "err", message: 'factory already existe'});
    } catch (err) {
        res.json({status: 'err', message: err.message});
    }

});

router.post('/factory/all', verifyToken, async (req, res) => {


    try {

        const s = await Factory.find({userId: req.id});
        res.json(s);

    } catch (err) {
        res.json({message: err.message});

    }

});

router.post('/factory/ByUser', verifyToken, async (req, res) => {

    try {

        const s = await Factory.find({userId: req.id}
        );

        res.json(s);

    } catch (err) {
        res.json({message: err.message});

    }

});

router.delete('/factory/delete/:id', async (req, res) => {
    console.log('ana houné');

    Sensor.findOne({factoryId: req.params.id}, async function (err, foundObject) {
        console.log(foundObject.name)
        foundObject.factoryId = null;
        foundObject.userId = null;
        foundObject.factoryName = '';
        foundObject.save();
        Factory.findByIdAndRemove(req.params.id)
            .then(sensor => {
                if (!sensor) {
                    return res.status(404).send({
                        message: "sensor not found with code " + req.params.id
                    });
                }
            });
    });
});

router.post('/factory/update/', verifyToken, async (req, res) => {
    console.log('d5al');
    const fac = await Factory.findById({_id: req.body.id});

    if (req.body.name != null) {
        fac.name = req.body.name;
    }
    if (req.body.description != null) {
        fac.description = req.body.description;

    }
    fac.save();
    await res.json(fac);

});

router.post('/factory/addPlace', verifyToken, async (req, res) => {
    console.log(req.body);
    try {

        const updateTemp = await Factory.findOneAndUpdate({_id: req.body.id},
            {
                $addToSet: {
                    place: {$each: [req.body.place],},

                }
            }, {new: true});


        res.json({status: "ok", message: 'saved'});
    } catch (err) {
        res.json({status: 'err', message: err.message});
    }

});
router.post('/factory/placeByFactory', verifyToken, async (req, res) => {

    try {
        console.log(req.body);
        const s = await Factory.find({userId: req.id, _id: req.body.id}
        );

        res.json(s);

    } catch (err) {
        res.json({message: err.message});

    }

});
router.post('/factory/updateZone/', verifyToken, async (req, res) => {
    console.log('d5al', req.body);

    const fac = await Factory.findById({_id: req.body.id});

    if (req.body.name != null) {
        fac.name = req.body.name;
    }
    if (req.body.place != null) {
        fac.place = req.body.place;

    }
    fac.save();
    await res.json(fac);

});

module.exports = router;
