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

function sendEmail(receiver, value, status, data) {
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
        subject: status + ' Notification from IOt-Factory',
        text: 'the ' + data + ' is = ' + value + '',
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

        res.json(a);

    } catch (err) {
        res.json({message: err.message});

    }

});

router.delete('/alert/delete/:id', (req, res) => {
    try {
        Alert.findByIdAndRemove(req.params.id)
            .then(alert => {
                if (!alert) {
                    return res.status(404).send({
                        message: "alert not found with code " + req.params.id
                    });
                }
            });
    } catch (e) {
    }
});

router.post('/alert/ToastNotification', verifyToken, async (req, res) => {
    try {
        const a = await Alert.find({userId: req.id, Ntoast: true, deviceId: req.body.code});
        res.json(a);
    } catch (err) {
        res.json({message: err.message});
    }
});
// email notification
router.post('/alert/email', verifyToken, async (req, res) => {
    try {
        const b = await Alert.find({userId: req.id, Nemail: true, deviceId: req.body.code});
        res.json(b);
        console.log('hedhi heya data mta3 email', b);
    } catch (err) {
        res.json({message: err.message});
    }
});

router.post('/alert/SendEmail', verifyToken, async (req, res) => {
    try {
        const user = await User.findOne({_id: req.id});
        console.log(user.email);

        // sendEmail(user.email, req.body.value, req.body.status, req.body.data);
        console.log('Emmail teb3ath zaghrou ya nsewin ');
        console.log(user.email ) ;
        console.log(req.body.value) ;
        console.log(req.body.status ) ;
        console.log(req.body.data ) ;
        res.json({status: "ok", message: 'email sended'});

    } catch (err) {
        res.json({message: err.message});
    }
});

router.post('/alert/update/', verifyToken, async (req, res) => {

    const alert = await Alert.findById({_id: req.body.id});
    var min = parseInt(req.body.min);
    var max = parseInt(req.body.max);

    if (min != null) {
        alert.min = req.body.min ;
    }
    if (max!= null) {
        alert.max = req.body.max;
    }
    if (req.body.status!= null) {
        alert.status = req.body.status;
    }


    alert.save() ;

    await res.json(alert);
});
module.exports = router;
