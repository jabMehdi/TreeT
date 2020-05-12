// GET route for reading data
const express = require('express');
const router =express.Router();
const User  = require('../models/User');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
const kafka = require('kafka-node');
router.get('/', function (req, res, next) {
    return res.sendFile(path.join(__dirname + '/templateLogReg/index.html'));
  });

// consomation des données par le kafka

/*
try {
  Consumer = kafka.Consumer,
      client = new kafka.KafkaClient({kafkaHost: process.env.kafka_ip}),
      consumer = new Consumer(
          client,
          [
            {topic: 'TestTopic', partition: 0}
          ],
          {
            autoCommit: true
          }
      );
  consumer.on('message', function (message) {
    console.log(message);
  });
  consumer.on('error', function (err) {
    console.log('error', err);
  });
}
catch(e) {
  console.log(e);
}

*/

  //POST route for updating data
  router.post('/', function (req, res, next) {
    // confirm that user typed same password twice
    if (req.body.password !== req.body.passwordConf) {
      var err = new Error('Passwords do not match.');
      err.status = 400;
      res.send("passwords dont match");
      return next(err);
    }
  
    if (req.body.email &&
      req.body.username &&
      req.body.password &&
      req.body.passwordConf) {
  
      var userData = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      }
  
      User.create(userData, function (error, user) {
        if (error) {
          return next(error);
        } else {
          req.session.userId = user._id;
          return res.redirect('/profile');
        }
      });
  
    } else if (req.body.logemail && req.body.logpassword) {
      User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
        if (error || !user) {
          var err = new Error('Wrong email or password.');
          err.status = 401;
          return next(err);
        } else {
          req.session.userId = user._id;
          return res.redirect('/profile');
        }
      });
    } else {
      var err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }
  })


  
  // GET for logout logout
  router.get('/logout', function (req, res, next) {
    if (req.session) {
      // delete session object
      req.session.destroy(function (err) {
        if (err) {
          return next(err);
        } else {
          return res.redirect('/');
        }
      });
    }
  });




router.post('/login',async (req, res) =>
{
  try{
    const NewUser =await User.find({ email : req.body.email  }).limit(1);
    console.log(NewUser.length);
    if (NewUser.length < 1)
    {
      await res.json({status: "err", message: 'Email Does not Exists'});
      return ;
    }
    if (NewUser[0].password !== req.body.password )
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
  let user=new User({
    username : req.body.username,
    email :req.body.email,
    password :req.body.password,
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

// password change request
router.post('/request',async (req,res) => {
  try {
    const NewUser = await User.find({ email : req.body.email  });
    console.log(NewUser);
    if (NewUser.length < 1)
    {
      await res.json({status: "err", message: 'Email Does not Exists'});
    }
    else {
      code = makecode(6);
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
        subject: "bras omek ekteb code",
        text: code,
      };

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
  console.log("d5al lel code") ;
  try {
    if (req.body.code){}

  } catch (err) {
    res.json({message: err})

  }
});



  module.exports=router;