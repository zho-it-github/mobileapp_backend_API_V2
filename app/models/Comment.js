let mongoose = require("mongoose");
const mongooseLeanVirtual = require('mongoose-lean-virtuals');
const timeZone = require('mongoose-timezone');

let schema = mongoose.Schema({
        body: {
            type: String,
            default: "",
            trim: true
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },

        post:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post',
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

const collectionname = "comment"
module.exports = mongoose.model(collectionname, schema, collectionname);
