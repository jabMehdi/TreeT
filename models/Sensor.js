
const mongoose = require("mongoose");

    var Sensor = mongoose.model(
    "Sensor",SensorShema =
    new mongoose.Schema({
        userId : mongoose.Schema.Types.ObjectId ,
        code: String ,
        name: String,
        tempValues :[Number],
        humValues :[Number],
        ligValues :[Number],
        otherVal :[Number] ,
        type : String ,
        isAffected : Boolean ,
        factoryId : mongoose.Schema.Types.ObjectId ,
        createdAt : [] ,
        factoryName :String ,
        state : Boolean ,
        batteryLevel : String ,
    })
);

module.exports = Sensor;