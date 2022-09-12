let mongoose = require("mongoose");
const mongooseLeanVirtual = require('mongoose-lean-virtuals');

let schema = mongoose.Schema({
        name: {
            type: String,
            default: "",
            trim: true
        },
        pincode: {
            type: String,
            default: "",
            trim: true
        },
    servingcity: {
        type: String,
        default: "",
        trim: true
    },
    googlearabic: {
        type: String,
        default: "",
        trim: true
    },
    googleenglish: {
        type: String,
        default: "",
        trim: true
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
        country:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'country',
        },
    lat: {
        type: Number,
        default: 0.1
    },
    long: {
        type: Number,
        default: 0.1
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

schema.statics.findOneCity = async function (cityname ) {
    if(!cityname || cityname.length<1){
        return null
    }
    let cityfound = await City.findOne({googlearabic:cityname}).exec();
    if(!cityfound){
        cityfound = await City.findOne({
            $or: [
                { 'name': { $regex : new RegExp(cityname, "i") } },
                //  { 'servingcity': { $regex : new RegExp(cityname, "i") } },
                { 'googleenglish': { $regex : new RegExp(cityname, "i") }},
                { 'googlearabic':{ $regex : new RegExp(cityname, "i") } }
            ]
        }).exec();
    }

    return cityfound;
};
const collectionname = "city"
module.exports = mongoose.model(collectionname, schema, collectionname);
