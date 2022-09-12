let mongoose = require("mongoose");
const mongooseLeanVirtual = require('mongoose-lean-virtuals');

let schema = mongoose.Schema({
    extrabox: { //
            type: String,
            default: "0",
            trim: true
        },
    servicetype: {
        type: String,
        default: "",
        trim: true
    },
    chargefirstprice: {
        type: String,
        default: "0",
        trim: true
    },
    chargemoreprice: {
        type: String,
        default: "0",
        trim: true
    },
        status: {
            type: Number,
            default: 1
        },
    }, {
        versionKey: false,
        timestamps: true
    }
);



// Plugin must be *after* virtuals
schema.plugin(mongooseLeanVirtual);

schema.set('toObject', { getters: true,virtuals:true });
schema.set('toJSON', { getters: true,virtuals:true });

const collectionname = "shipping"
module.exports = mongoose.model(collectionname, schema, collectionname);
