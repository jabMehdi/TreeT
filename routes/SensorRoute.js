const express = require('express');
const router = express.Router();
const Sensor = require('../models/Sensor');
var jwt = require('jsonwebtoken');

const F = require('../models/Factory');


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

router.post('/sensor', verifyToken, async (req, res) => {
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
        batteryLevel: req.body.batteryLevel,
        area: req.body.area,
    });
    try {

        sensor = await sensor.save();
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
    } catch (err) {
        res.json({message: err.message});

    }

});

// find by type
router.post('/sensor/findByType', verifyToken, async (req, res) => {

    try {
        const s = await Sensor.find({type: req.body.type, userId: req.id, factoryId: req.body.factoryId});
        const s1 = await Sensor.find({type: req.body.type, userId: req.id});
        if (s.length > 0) {
            await res.json(s);
            return;
        }
        if (s.length < 1) {
            await res.json(s1);
            return;
        }


    } catch (err) {
        res.json({message: err.message});

    }

});

// fin d by user
router.post('/sensor/findByUser', verifyToken, async (req, res) => {

    try {
        s = await Sensor.find({userId: req.id});
        res.json(s);

    } catch (err) {
        res.json({message: err.message});

    }

});

router.post('/sensor/updateSensor/', verifyToken, async (req, res) => {

    Sensor.findOne({code: req.body.code}, async function (err, foundObject) {

        if (err) {
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
                    const deleteIdSensor = await F.findOneAndUpdate(
                        {_id: foundObject.factoryId},
                        {$pull: {sensorsId: {$in: [foundObject.id]}}}, false
                    );


                }
                foundObject.area = req.body.area;
                foundObject.name = req.body.name;
                foundObject.userId = req.id;
                foundObject.factoryId = req.body.factoryId._id;
                foundObject.isAffected = req.body.isAffected;
                foundObject.factoryName = req.body.factoryId.name;


                const update = await F.findByIdAndUpdate(
                    req.body.factoryId._id,

                    {
                        $addToSet: {
                            sensorsId: {$each: [foundObject.id]},

                        }
                    },
                    {new: true}
                );
                foundObject.save();
                res.json(foundObject);
            }


        }


    });
});

router.post('/sensor/updateValues', verifyToken, async (req, res) => {
    date = new Date;
    updateClient();
    now = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear() + ',' + date.getHours() + ':' + date.getMinutes();
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

// new update
router.post('/sensor/updateData', async (req, res) => {
    try {
        /*
        * send data like this
        *              {
     "code" : "93" ,
     "state": "" ,
     "batteryLevel" : " 33" ,
     "time"  : "" ,
     "humValues" : "33" ,
     "tempValues" : "33" ,
     "lightValues" : "33" ,
     "energy" : ""  ,
     "type" : "Sensor"

     }
        * */
        Sens = await Sensor.findOne({code: req.body.code});
        delete req.body.code;
        req.body.time =  Date.now() ;
        Sens.data.push(req.body);
        await Sens.save();
       // AlertClients(req.body, Sens);
        return res.status(200).json({status: "ok", message: Sens});
    } catch (e) {
    }
});










router.delete('/sensor/delete/:id', (req, res) => {

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

        const s = await Sensor.find({type: req.body.type, userId: req.id});
        res.json(s);

    } catch (err) {
        res.json({message: err.message});

    }

});

// find and update (tna7i user id w factory id)
router.post('/sensor/updateUserAndFactory/:code', verifyToken, async (req, res) => {

    try {
        const foundobject = await Sensor.findOne({code: req.params.code});
        foundobject.userId = null;
        foundobject.factoryId = null;
        foundobject.save();


    } catch (err) {
        res.json({message: err.message});

    }

});

// service change state in data base of actioneur !

router.post('/sensor/updateState', verifyToken, async (req, res) => {
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
masterouter.post('/sensor/actuator/', verifyToken, async (req, res) => {
    try {


        s = Sensor.findOne({code: req.body.code}, async function (err, foundObject) {

            foundObject.state = req.body.state;
            foundObject.save();

        });
        res.json(s)
    } catch (err) {
        res.json({message: err.message});

    }


});

// update device
router.post('/sensor/update/', verifyToken, async (req, res) => {

        const dev = await Sensor.findById({_id: req.body.id});

        if (req.body.name != null) {
            dev.name = req.body.name;
        }
        if (req.body.area != null) {
            dev.area = req.body.area;
        }
    dev.save();

        await res.json(dev);
});

//******************************************Socket io****************************************************//
//Sensor/UpdateValue
/*
SocketClients = [];
try {
    const chat = io
        .of('/Sensor/UpdateValue')
        .on('connection', (socket) => {
            socket.on('news', async (message) => {
                console.log('data', socket.id);
                console.log('SocketClients length ', SocketClients.length);
                if (SocketClients.length === 0)
                {
                    console.log('create 1');
                    let clientInfo = {};
                    clientInfo.socketId = socket.id;
                    clientInfo.token = message.Accesstoken;
                    SocketClients.push(clientInfo);
                } else
                {
                    let exist = false;
                    SocketClients.forEach(item => {
                        if (item.socketId === socket.id)
                        {
                            if (item.token === message.Accesstoken)
                            {

                            }
                        }
                    });
                    if (exist === false)
                    {
                        console.log('create 2');
                        let clientInfo = {};
                        clientInfo.socketId = socket.id;
                        clientInfo.token = message.Accesstoken;
                        SocketClients.push(clientInfo);
                    }
                }
                console.log('Socket Clients' , SocketClients);
            });

            socket.on('disconnect', (message) => {
                //console.log('disconnect' , message);
                let i = 0;
                SocketClients.forEach(item => {
                    if (item.socketId === socket.id)
                        SocketClients.splice(i,1);
                    i++;
                })
            });
        });
} catch (e) {
    console.log('error', e.toString())
}
*/
module.exports = router;
