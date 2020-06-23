// GET route for reading data
const express = require('express');
const router =express.Router();
const User  = require('../models/User');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const kafka = require('kafka-node');

router.get('/kafka/test',async (req , res)=>{
  // console.log('body :',req.body);
  Producer = kafka.Producer,
      client = new kafka.KafkaClient({kafkaHost: process.env.kafka_ip}),
      producer = new Producer(client);
  payloads = [
    { topic: 'TestTopic', messages: JSON.stringify(req.body), partition: 0 },
  ];
  producer.on('ready', function () {
    producer.send(payloads, function (err, data) {
      // console.log(data);
    });
  });
  return res.status(200).json({status: "ok", message: 'hello world'});
});


router.post('/login',async (req, res) =>
{
  try{

    const NewUser =await User.find({ email : req.body.email  }).limit(1);
    const decryptedString = cryptr.decrypt(NewUser[0].password);
    if (NewUser.length < 1)
    {
      await res.json({status: "err", message: 'Email Does not Exists'});
      return ;
    }
    if (decryptedString !== req.body.password )
    {
      await res.json({status:"err" , message: 'Wrong Paswword'});

      return ;
    }
    if (NewUser[0].enabled === 0 )
    {
      await res.json({status:"err" , message: 'User is Disabled'});
      return ;
    }
    var payload = {
      id: NewUser[0]._id,
    }
    let token = jwt.sign(payload,'tawfik');
      res.json({status:"ok" , message: 'Welcome Back', UserData : NewUser , token});
  }catch (err) {
    res.header("Access-Control-Allow-Headers", "*");
    res.json({ message:err.message });
  }

});

// register


router.post('/register',async (req,res) =>
{
  console.log(req.body);
  const encryptedPWD = cryptr.encrypt(req.body.password);
  let user=new User({

    username : req.body.username,
    email :req.body.email,
    password :encryptedPWD,
    numTel :req.body.numTel ,
  });
  try{
    const NewUser =await User.find({ email : req.body.email });
    if (NewUser === undefined || NewUser.length == 0 )
    {
      user=await user.save();
      res.json({status:"ok" , message: 'Account Create ! You can now Login'});
      return ;
    }

    res.json({status:"err" , message: 'Email Already Exists'});
  }catch (err) {
    res.header("Access-Control-Allow-Headers", "*");
    res.json({ message:err.message });
  }

})

//find by email
router.get('/users/:email',async (req,res) => {
  try {
    const post = await User.findById(req.params.email) ;
    res.json(post) ;
  } catch (err) {
    res.json({message: err})

  }
})

// password send email 
router.post('/request',async (req,res) => {
  try {
    const NewUser = await User.find({ email : req.body.email  });
    if (NewUser.length < 1)
    {
      await res.json({status: "err", message: 'Email Does not Exists'});
    }
    else {
      const decryptedString = cryptr.decrypt(NewUser[0].password);
      var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'iottreetronixt@gmail.com',
          pass: 'IOT26116986'
        }
      });

      var mailOptions = {
        from: 'iottreetronixt@gmail.com',
        to: req.body.email,
        subject: "Paramètres du compte",
        text: ' Bonjour ' + NewUser[0].username +  ' ,\n' +
            '      Login:' + NewUser[0].email + '\n' +
            '      Pwd:' + decryptedString + '\n' +
            '      Cordialement.\n' +
            '      Treetronix team.\n' +
            '      N.B: ceci est un mail automatique merci de ne pas répondre.' ,
      };
    res.json(NewUser) ;
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    }
  } catch (err) {
    res.json({ status: "ok",message: err})

  }

});
function makecode(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
router.post('/code',async (req,res) => {
  try {
    NewUser = await User.find({ email : req.body.email  });
    if (req.body.code === NewUser.code) {
      res.json({status:"ok" , message: 'you can reset'});
    }
    res.json({status:"err" , message: 'wrong code'});


  } catch (err) {
    res.json({message: err})

  }
});


  module.exports=router;
