const express = require('express');
const router =express.Router();
const Reclamation = require('../models/Reclamation');
const U = require('../models/User');

var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');

function verifyToken(req, res, next) {
    let payload;
    if(req.query.token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    try{payload = jwt.verify(req.query.token,   'tawfik');} catch (e) {
        return res.status(400).send('Invalid User');
    }
    if(!payload) {
        return res.status(401).send('Unauthorized request');
    }

    decoded=jwt.decode(req.query.token, {complete: true});
    req.id = decoded.payload.id;

    next()
}

router.post('/Reclamation/add', verifyToken, async (req, res) => {
    console.log(req.body);
    let reclamation = new Reclamation({
        userId: req.id,
        message: req.body.message,
        subject :req.body.subject,

    });
    const User = await U.findOne({_id :req.id}) ;
    console.log('hedha el email mta3 user'+User.email) ;
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'iottreetronixt@gmail.com',
                pass: 'IOT26116986'
            }
        });

        var mailOptions = {
            from: 'iottreetronixt@gmail.com',
            to: 'tawfikmili3@gmail.com' ,
            subject: 'treetronix platform : ' + req.body.subject,
            text: 'user is ' + User.name     + req.body.message ,
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });


    try {
        reclamation = await reclamation.save();
        console.log(reclamation);
        res.json({status: "ok", message: 'reclamation add to data base'});
    } catch (err) {
        res.json({status:'err',message: err.message});
    }

});

router.get('/all',verifyToken,async (req,res) =>
{

    try{
        const s = await Reclamation.find( { userId : req.id}
        );
        console.log(s) ;
        res.json(s) ;

    }catch (err) {
        res.json({ message:err.message });

    }

}) ;




router.delete('/Reclamation/delete/:id',(req, res) => {
    console.log('ana houné');
    console.log(req.body);
    Reclamation.findByIdAndRemove(req.params.id)
        .then(reclamation => {
            if(!reclamation) {
                return res.status(404).send({
                    message: "sensor not found with code " + req.params.id
                });
            }
        })
} );
module.exports=router;
