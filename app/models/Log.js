let mongoose = require("mongoose");
const mongooseLeanVirtual = require('mongoose-lean-virtuals');

let schema = mongoose.Schema({
        name: {
            type: String,
            default: "",
            trim: true
        },
    msg: {
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

const collectionname = "log"

schema.statics.AddLog = async function (name ,msg,user) {
    let data = new Log()
    data.name = name;
    data.msg = msg;
    if(user){
        data.user = user;
    }

    await data.save();
    return data._id;
};
module.exports = mongoose.model(collectionname, schema, collectionname);
