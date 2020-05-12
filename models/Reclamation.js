
const mongoose = require("mongoose");

var Reclamation = mongoose.model(
    "Reclamation",ReclamationShema=
        new mongoose.Schema({
            userId: {
                type: String,

            },

            code: {
                type: String,
                autoIncrement : true ,
            },

            subject: {
                type: String,
                required: true,

            },
            message: {
                type: String,
            },
            status :{
                type: String,
                default :'In progress'
            },

        })
);

module.exports = Reclamation;