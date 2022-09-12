let mongoose = require("mongoose");
const mongooseLeanVirtual = require('mongoose-lean-virtuals');

let schema = mongoose.Schema({
        name: {
            type: String,
            default: "",
            trim: true // monday
        },
    city: [ { type: mongoose.Schema.ObjectId, ref: 'city',default: []}],
    timeslots: [ { type: mongoose.Schema.ObjectId, ref: 'timeslots',default: []}],
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


schema.statics.checkifcontainetimes =  function (dayname,data) {

    const d = new Date();
    var local = d.getTime();
    var offset = d.getTimezoneOffset() * (60 * 1000);
    var utc = new Date(local + offset);
    var riyadh = new Date(utc.getTime() + (3 * 60 * 60 * 1000));
    let hour = riyadh.getHours();
    var days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
    if (days.includes(dayname)){
        if(hour>=9){
            data = data.filter((x=>x.name!="09:00 - 12:00"))
        }
        if(hour>=12){
            data = data.filter((x=>x.name!="12:00 - 01:00"))
            data = data.filter((x=>x.name!="12:00 - 13:00"))
            data = data.filter((x=>x.name!="12:00 - 15:00"))
        }
        if(hour>=15){
            data = data.filter((x=>x.name!="15:00 - 16:00"))
            data = data.filter((x=>x.name!="15:00 - 18:00"))
        }
    }
    return data.length;
};


const collectionname = "day"
module.exports = mongoose.model(collectionname, schema, collectionname);
