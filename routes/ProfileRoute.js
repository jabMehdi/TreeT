const express = require('express');
const router = express.Router();
const U = require('../models/User');
var jwt = require('jsonwebtoken');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

const encryptedString = cryptr.encrypt('123456');
const decryptedString = cryptr.decrypt(encryptedString);

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

router.post('/getProfile', verifyToken, async (req, res) => {
    try {

        const UserProfile = await U.findOne({_id: req.id});
        res.json(UserProfile);
        console.log(UserProfile);
    } catch (err) {
        res.header("Access-Control-Allow-Headers", "*");
        res.json({status: 'err', message: err.message});
    }

});


router.post('/update', verifyToken, async (req, res) => {

    const us = await U.findById({_id: req.id});

    if (req.body.username != null) {
        us.username = req.body.username ;
    }
    if (req.body.numTel != null) {
        us.numTel = req.body.numTel ;
    }
    if (req.body.password != null) {
        const encryptedString = cryptr.encrypt(req.body.password);
        us.password = encryptedString ;
    }
    if (req.body.email != null) {
        us.email = req.body.email;

    }
    us.save() ;

    await res.json(us);
});

module.exports = router;
