let mongoose = require("mongoose");
const mongooseLeanVirtual = require('mongoose-lean-virtuals');
let schema = mongoose.Schema({
        title: {
            type: String,
            default: "",
            trim: true
        },
        picture: {
            type: String,
            default: ""
        },
        status: {
            type: Number,
            default: 1
        }
    }, {
        versionKey: false,
        timestamps: true
    }
);

const tblname = "banner";



schema.virtual('fullpicture').get(function() {
    let fullpicture = "";
    if (this.picture && this.picture.length > 1){
        fullpicture = _config("app.imageurl")+"/"+this.picture;
    }
    return fullpicture;
});




schema.set('toObject', { getters: true,virtuals:true });
schema.set('toJSON', { getters: true,virtuals:true });
// Plugin must be *after* virtuals
schema.plugin(mongooseLeanVirtual);


module.exports = mongoose.model(tblname, schema, tblname);
