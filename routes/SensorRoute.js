const express = require('express');
const router = express.Router();

const Sensor = require('../models/Sensor');
var jwt = require('jsonwebtoken');

const F = require('../models/Factory');


function verifyToken(req, res, next) {
    let payload;
    console.log(req.query.token);
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

router.post('/sensor', verifyToken, async (req, res) => {
    console.log(req.body);
    let sensor = new Sensor({
        userId: null,
        code: req.body.code,
        name: req.body.name,
        tempValues: req.body.tempValues,
        humValues: req.body.humValues,
        type: req.body.type,
        isAffected: false,
        factoryId: null,
        createdAt: [],
        factoryName: req.body.factoryName,
        state: req.body.state,
        batteryLevel : req.body.batteryLevel ,
    });
    try {
        console.log('hedha actioneur ' + sensor) ;
        sensor = await sensor.save();
        console.log(sensor);
        res.json({status: "ok", message: 'sensor add to data base'});
        return;
        res.json({status: "err", message: 'sensor already existe'});
    } catch (err) {
        res.json({message: err.message});
    }

})

// find by code
router.post('/sensor/findByCode', verifyToken, async (req, res) => {

    try {

        const s = await Sensor.find({code: req.body.code});

        if (s.length < 1) {
            await res.json({status: "err", message: 'not found'});
            return;
        }
        res.json(s);
        console.log(s);


    } catch (err) {
        res.json({message: err.message});

    }

});

// find by type
router.post('/sensor/findByType', verifyToken, async (req, res) => {

    try {
        console.log("d5al hné");
        const s = await Sensor.find({type: req.body.type, userId: req.id});
        res.json(s);
        console.log(s)


    } catch (err) {
        res.json({message: err.message});

    }

});

// fin d by user
router.post('/sensor/findByUser', verifyToken, async (req, res) => {

    try {
        s = await Sensor.find({userId: req.id});
        res.json(s);
        console.log(s);

    } catch (err) {
        res.json({message: err.message});

    }

});

router.post('/sensor/updateSensor/', verifyToken, async (req, res) => {

    Sensor.findOne({code: req.body.code}, async function (err, foundObject) {

        if (err) {
            console.log(err);
            res.json({status: "err", message: 'not found'});
        } else {
            if (!foundObject) {
                res.json({status: "err", message: 'ba7 zeda'});
            } else {

                if (foundObject.factoryId == req.body.factoryId._id) {
                    console.log('kif kfi les id factory')
                    res.json({status: "err", message: 'id factory already exist'});
                    return;
                }

                if (foundObject.factoryId != null) {
                    console.log('d5al houni');
                    const deleteIdSensor = await F.findOneAndUpdate(
                        {_id: foundObject.factoryId},
                        {$pull: {sensorsId: {$in: [foundObject.id]}}}, false
                    );


                }
                foundObject.name = req.body.name;
                foundObject.userId = req.id;
                foundObject.factoryId = req.body.factoryId._id;
                foundObject.isAffected = req.body.isAffected;
                foundObject.factoryName = req.body.factoryId.name;
                console.log('look at me know' + req.body.factoryId.name);

                const update = await F.findByIdAndUpdate(
                    req.body.factoryId._id,

                    {
                        $addToSet: {
                            sensorsId: {$each: [foundObject.id]},

                        }
                    },
                    {new: true}
                );

                console.log('factory updated ' + update);
                foundObject.save();
                res.json(foundObject);
            }


        }


    });
});

router.post('/sensor/updateValues', verifyToken, async (req, res) => {
    console.log(req.body.code);
    date = new Date;
    now = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear() + ',' + date.getHours() + ':' + date.getMinutes();
    console.log(now);
    if (req.body.tempValues != null) {
        const updateTemp = await Sensor.findOneAndUpdate({code: req.body.code},
            {
                $addToSet: {
                    tempValues: {$each: [req.body.tempValues],},
                    createdAt: {$each: [now],}
                }
            }, {new: true});
        await res.json(updateTemp);
    }
    if (req.body.humValues != null) {
        const updateHum = await Sensor.findOneAndUpdate({code: req.body.code},
            {
                $addToSet: {
                    humValues: {$each: [req.body.humValues],},

                }
            }, {new: true});
        await res.json(updateHum);
    }

    if (req.body.otherVal != null) {
        const updateOther = await Sensor.findOneAndUpdate({code: req.body.code},
            {
                $addToSet: {
                    otherVal: {$each: [req.body.otherVal],},

                }
            }, {new: true});

        await res.json(updateOther);
    }


});

router.delete('/sensor/delete/:id', (req, res) => {
    console.log('ana houné');
    console.log(req.body);
    Sensor.findByIdAndRemove(req.params.id)
        .then(sensor => {
            if (!sensor) {
                return res.status(404).send({
                    message: "sensor not found with code " + req.params.id
                });
            }
        })
});

router.post('/sensor/all', verifyToken, async (req, res) => {

    try {
        console.log('this is value all' + req.body.value);
        const s = await Sensor.find({type: req.body.type, userId: req.id});
        res.json(s);
        console.log(s);

    } catch (err) {
        res.json({message: err.message});

    }

});

// find and update (tna7i user id w factory id)
router.post('/sensor/updateUserAndFactory/:code', verifyToken, async (req, res) => {

    try {
        const foundobject = await Sensor.findOne({code: req.params.code});
        console.log('dal houni ' + foundobject);
        foundobject.userId = null;
        foundobject.factoryId = null;
        foundobject.save();


    } catch (err) {
        res.json({message: err.message});

    }

});

// service change state in data base of actioneur !

router.post('/sensor/updateState', verifyToken, async (req, res) => {
    console.log(req.body.code);
   // date = new Date;
   // now = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear() + ',' + date.getHours() + ':' + date.getMinutes();


    const updateState = await Sensor.findOneAndUpdate({code: req.body.code},
        {
            $addToSet: {
                state: req.body.state,

            }
        }, {new: false});

    await res.json(updateState);


});
// affiche all actioneurs states
router.post('/sensor/actuator/', verifyToken, async (req, res) => {
    try {
    console.log("hedha oumour  actuator code " + req.body.code);
    console.log("hedha oumour  actuator code " + req.body.state);

  s = Sensor.findOne({code: req.body.code}, async function (err, foundObject) {

        foundObject.state = req.body.state ;
        foundObject.save() ;

    });
        res.json(s)
} catch (err) {
    res.json({message: err.message});

}


});


module.exports = router;