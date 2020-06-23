
const mongoose = require("mongoose");

    var Sensor = mongoose.model(
    "Sensor",SensorShema =
    new mongoose.Schema({
        userId : mongoose.Schema.Types.ObjectId ,
        code: String ,
        name: String,
        data : [] ,
        Countersdata : [] ,
        type : String ,
        factoryId : mongoose.Schema.Types.ObjectId ,
        factoryName :String ,
        state : Boolean ,
        batteryLevel : String ,
        area : String ,
    })
);

module.exports = Sensor;
