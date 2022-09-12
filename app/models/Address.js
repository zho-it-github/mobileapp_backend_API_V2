let mongoose = require("mongoose");
const mongooseLeanVirtual = require('mongoose-lean-virtuals');

let schema = mongoose.Schema({
        title: {
            type: String,
            default: "",
            trim: true
        },
    address1: {
        type: String,
        default: "",
        trim: true
    },
    savex: {
        type: Boolean,
        default: true,
    },
    city: {
        type: String,
        default: "",
        trim: true
    },
    lat: {
        type: String,
        default: "",
        trim: true
    },
    long: {
        type: String,
        default: "",
        trim: true
    },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
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

schema.statics.findOneAddress = async function (userid,addressvalue ) {
    console.log("findOneAddress ",addressvalue)
    if(!addressvalue || addressvalue.length<2){
        return null;
    }
    // RegExp('^' + name.replace(/[-/\^$*+?.()|[]{}]/g, '\$&') + '$', 'i')
   // addressvalue = addressvalue.replace(/[-/\^$*+?.()|[]{}]/g, '\$&')
    let addressfound = await Address.findOne({
        $or: [
            { user:userid,'address1': { $regex : new RegExp(addressvalue, "i") } },
            { user:userid,'title': { $regex : new RegExp(addressvalue, "i") } },
            { user:userid,'address1': addressvalue},
            { user:userid,'title': addressvalue},
        ]
    }).exec();
    return addressfound;
};
const collectionname = "address"
module.exports = mongoose.model(collectionname, schema, collectionname);
