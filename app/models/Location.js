let mongoose = require("mongoose");
const mongooseLeanVirtual = require('mongoose-lean-virtuals');

let schema = mongoose.Schema({
        name: {
            type: String,
            default: "",
            trim: true
        },

    location: {
        type: { type: String },
        coordinates: []
    },

    branchcode: {
        type: String,
        default: "",
        trim: true
    },
    zajilmap: {
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
schema.index({ location: "2dsphere" })
schema.set('toObject', { getters: true,virtuals:true });
schema.set('toJSON', { getters: true,virtuals:true });


schema.statics.findOneLocation = async function (name ) {
    if(!name || name.length<1){
        return null
    }
    let cityfound = await Location.findOne({name:name}).exec();
    if(!cityfound){
        cityfound = await Location.findOne({
            $or: [
                { 'name': { $regex : new RegExp(name, "i") } },
                { 'branchcode': { $regex : new RegExp(name, "i") }},
                { 'zajilmap':{ $regex : new RegExp(name, "i") } }
            ]
        }).exec();
    }

    return cityfound;
};
const collectionname = "location"
module.exports = mongoose.model(collectionname, schema, collectionname);
