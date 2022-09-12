let mongoose = require("mongoose");
const mongooseLeanVirtual = require('mongoose-lean-virtuals');


let schema = mongoose.Schema({

        user:{ // user who rate
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
        countofstars:{
            type: String,
            default: "",
            trim: true
        },
        comments:{
            type: String,
            default: "",
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

const collectionname = "rate"
module.exports = mongoose.model(collectionname, schema, collectionname);
