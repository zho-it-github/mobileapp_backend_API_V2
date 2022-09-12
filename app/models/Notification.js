let mongoose = require("mongoose");
const mongooseLeanVirtual = require('mongoose-lean-virtuals');

let schema = mongoose.Schema({
        msg: {
            type: String,
            default: "",
            trim: true
        },
        msgar: {
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

const collectionname = "notification"


schema.statics.Translate =  function (data,lang) {
    if(lang=="ar" && data.msgar && data.msgar.length>0){
        data.msg = data.msgar;
    }
    return data;
};
schema.statics.AddNoti = async function (msg,user,msgar="") {

    //console.log("arabic version msgar",msgar)
    let data = new Notification()
    data.msg = msg;
    data.msgar = msgar;
    if(user){
        data.user = user;
    }

    await data.save();
    return data._id;
};
module.exports = mongoose.model(collectionname, schema, collectionname);
