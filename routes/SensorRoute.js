const express = require('express');
const router = express.Router();
const Sensor = require('../models/Sensor');
var jwt = require('jsonwebtoken');
const F = require('../models/Factory');
const kafka = require('kafka-node');
const {spawn} = require('child_process');

// decryptage compteur

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

// lel  mnehel edhaw
router.post('/AddSensorData', async (req, res) => {
    try {
        Sens = await Sensor.findOne({code: req.body.code});
        delete req.body.code;
        req.body.time = Date.now();
        Sens.Countersdata.push(req.body);
        // console.log(Sens.data);
        await Sens.save();
        return res.status(200).json({status: "ok", message: "updated"});
    } catch (e) {
        console.log('error AddSensorData', e);
    }
});

router.post('/sensor', verifyToken, async (req, res) => {
    let sensor = new Sensor({
        userId: null,
        code: req.body.code,
        name: req.body.name,
        factoryId: null,
        batteryLevel: req.body.batteryLevel,
        type: req.body.type,
        state  : false ,
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

// affectation
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

//database udpdate lel sensors
router.post('/sensor/updateData', async (req, res) => {
    try {
        Sens = await Sensor.findOne({code: req.body.code});

        delete req.body.code;
        req.body.time = Date.now();
        Sens.data.push(req.body);
        await Sens.save();
        updateClients_Soket(req.body, Sens);

        return res.status(200).json({status: "ok", message: Sens});
    } catch (e) {
    }
});

// kafka

try {
    console.log('d5al kafla')
    Consumer = kafka.Consumer,
        client = new kafka.KafkaClient({kafkaHost: '193.95.76.211:9092'}),
        consumer = new Consumer(client, [{topic: 'AS.Treetronix.v1', partition: 0}],
            {autoCommit: true}
        );
    consumer.on('message', function (msg) {

        const obj = JSON.parse(msg.value);

        check(obj);
        console.log('hedha objec ', obj);

    });
    consumer.on('error', function (err) {
        console.log('error', err);
    });
} catch (e) {
    console.log(e);
}

async function check(obj) {
    try {
    device = await Sensor.findOne({code: obj.DevEUI_uplink.DevEUI});
    console.log('device ta3 nami', device);
    if (device === null) {
        console.log('device null');
    } else {
        console.log('device', device.type);
        if (device.type === 'Sensor') {
            CryptXtree(obj.DevEUI_uplink.payload_hex, obj.DevEUI_uplink.DevEUI, obj.DevEUI_uplink.Time);
        }
        if (device.type === 'mono' || device.type === 'triphase' || device.type === 'Gas' || device.type === 'GasMeter') {
            compteurCrypt(obj.DevEUI_uplink.payload_hex, obj.DevEUI_uplink.DevEUI);
        }

    }

} catch (e) {
    console.log(e);
}
}

async function CryptXtree(data, DevEUI, time) {
    console.log(data);
    console.log(DevEUI);
    temp = (parseInt(data.substring(0, 4), 16) / 100);
    hum = (parseInt(data.substring(4, 8), 16) / 100);
    v = (parseInt(data.substring(8, 10), 16));
    batterie = ((v-30)/12) * 100 ;
    tm = Date.parse(time);
    console.log(' hedhi el temp' ,temp);
    console.log('hedhi el hum' , hum);
    console.log('hedhi el batterie' , batterie);
    tram = {
        "lightValues": 5,
        "energy": 6,
        "type": "Sensor",
        "state": "",
        "time": +tm,
        "humValues": +hum,
        "tempValues": +temp,
        "batteryLevel": +batterie,
    }
    device = await Sensor.findOne({code: DevEUI});
    device.data.push(tram);
    await device.save();
    updateClients_Soket(tram , device);
}

async function compteurCrypt(Crypteddata, DevEUI) {
    console.log('data compteur ', Crypteddata);
    console.log('dev ui', DevEUI);

    var dataToSend;
    const python = await spawn('python', ['routes/decrypt.py', Crypteddata, 'python']);
    python.stdout.on('data', function (data) {
        dataToSend = data.toString();
    });
    python.on('close', (code) => {
        //  console.log(`child process close all stdio with code ${code}`);

        console.log(dataToSend)
        const datatram = JSON.parse(dataToSend);
        //console.log(datatram);
        UpdateCounters(datatram, DevEUI);
        // console.log(obj.Address);

    });
}

async function UpdateCounters(val, code) {
    Sens = await Sensor.findOne({code: code});
    delete val.code;
    val.time = Date.now();
    Sens.Countersdata.push(val);
    await Sens.save();
     updateClients_Soket(val , Sens);
}


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
// affiche all actioneurs states
router.post('/sensor/actuator/', verifyToken, async (req, res) => {
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
SocketClients = [];
const chat = io
    .of('/Sensor/UpdateValue')
    .on('connection', (socket) => {
        socket.on('getChartdata', async (message) => {
            if (SocketClients.length === 0) {
                let clientInfo = {};
                clientInfo.socketId = socket.id;
                clientInfo.token = message.Accesstoken;
                SocketClients.push(clientInfo);
            } else {
                let exist = false;
                SocketClients.forEach(item => {
                    if (item.socketId === socket.id) {
                        if (item.token === message.Accesstoken) {
                            {
                                exist = true;
                                console.log('SocketClients ', SocketClients);
                            }
                        }
                    }
                });
                if (exist === false) {
                    //console.log('create 2');
                    let clientInfo = {};
                    clientInfo.socketId = socket.id;
                    clientInfo.token = message.Accesstoken;
                    SocketClients.push(clientInfo);
                }
            }
            console.log('Socket Clients', SocketClients);
        });
        socket.on('getData', (message) => {
        });
        socket.on('disconnect', (message) => {

            let i = 0;
            SocketClients.forEach(item => {
                if (item.socketId === socket.id)
                    SocketClients.splice(i, 1);
                i++;
            })
        });
    });

async function updateClients_Soket(data, Sensor) {
    console.log('SocketClients', SocketClients);
    SocketClients.forEach(item => {
        state = io.of('/Sensor/UpdateValue').to(item.socketId).emit('setChartdata', {
            SensId: Sensor._id,
            newData: data
        });

    });
}


module.exports = router;
