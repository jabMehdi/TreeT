const express = require('express');
const router = express.Router();

const Alert = require('../models/Alert');
var jwt = require('jsonwebtoken');
const Sensor = require('../models/Sensor');
const User = require('../models/User');
var nodemailer = require('nodemailer');

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

function sendEmail(receiver, minmax, status) {
    var result = '';
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'iottreetronixt@gmail.com',
            pass: 'IOT26116986'
        }
    });

    var mailOptions = {
        from: 'iottreetronixt@gmail.com',
        to: receiver,
        subject: status + 'Notification from IOt-Factory',
        text: 'the fact of sending this notification is to test my ability to doing that skill :D,' + minmax,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    return result;
}

router.post('/alert/add', verifyToken, async (req, res) => {

    let alert = new Alert({
        userId: req.id,
        deviceId: req.body.device._id,
        data: req.body.data,
        max: req.body.Vmax,
        min: req.body.Vmin,
        status: req.body.status,
        Nsms: req.body.Nsms,
        Nemail: req.body.Nemail,
        Ntoast: req.body.Ntoast,
        deviceName: req.body.device.name,
    });

    try {

        a = await alert.save();
        res.json({status: "ok", message: 'alert add to data base'});
        return;
        res.json({status: "err", message: 'alert already existe'});
    } catch (err) {
        res.json({message: err.message});
    }

});

router.get('/alert/getByUser', verifyToken, async (req, res) => {
    try {
        const a = await Alert.find({userId: req.id});
// hedha kol el aleret
        sensor = await Sensor.find({userId: req.id});
        user = await User.findById(req.id);

        a.forEach(item => {
            sensor.forEach(s => {
                console.log(item.deviceId)
                if (s.id == item.deviceId) {

                    if (item.data == 'Humidity') {
                        console.log('data si ' + item.data + 'Humidity' + item.deviceId);
                        console.log('hani d5aly ntasti fi humidité ');
                        if ((s.humValues[s.humValues.length - 1] < item.min) || (s.humValues[s.humValues.length - 1] > item.max)) {
                            if (item.Nemail == true) {

                                console.log(+s.humValues[s.humValues.length - 1] + '>' + item.min);
                                console.log(+s.humValues[s.humValues.length - 1] + '<' + item.max);
                                console.log('notif with email avec les coordoné sont  stauts =' + item.status + 'device name = ' + item.deviceName + 'user is is ' + item.userId);
                                console.log('hedha el user mte3na ' + user.email);
                              //  sendEmail(user.email, 25, "danger") ;

                            }
                            if (item.Nsms == true) {
                                console.log('notif with Sms ');
                            }
                            if (item.Ntoast == true) {
                                console.log('notif with toast ');
                            }
                            console.log('el valeur' + s.tempValues[s.tempValues.length - 1]);
                            console.log('max ' + item.max);
                            console.log('jawna behi 3ale5er');
                        }
                    }


                }

            });
        });
        res.json(a);
        console.log(a);

    } catch (err) {
        res.json({message: err.message});

    }

});

router.delete('/alert/delete/:id', (req, res) => {
    console.log('ana houné');
    Alert.findByIdAndRemove(req.params.id)
        .then(alert => {
            if (!alert) {
                return res.status(404).send({
                    message: "alert not found with code " + req.params.id
                });
            }
        })
});


module.exports = router;