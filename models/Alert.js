
const mongoose = require("mongoose");

var Alert = mongoose.model(
    "Alert",SensorShema =
        new mongoose.Schema({
    userId: String,
    deviceId: mongoose.Schema.Types.ObjectId,
    min: Number,
    max: Number,
    status: String,
    data: String,
    Nsms: Boolean,
    Nemail: Boolean,
    Ntoast: Boolean,
            deviceName :String ,

        })
);

module.exports = Alert;