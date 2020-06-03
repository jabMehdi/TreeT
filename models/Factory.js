
const mongoose = require("mongoose");

var Factory = mongoose.model(
    "Factory",FactoryShema=
    new mongoose.Schema({

        userId : mongoose.Schema.Types.ObjectId ,
        name: {type : String,
                required: true},
        nbrSensor : Number,
        sensorsId: [mongoose.Schema.Types.ObjectId],

        lng : {type : String,
            required: true},
        lat : {type : String,
            required: true},
        description :{type : String,
            required: true},
        place : [String] ,
    })
);

module.exports = Factory;
