let mongoose = require("mongoose");
const mongooseLeanVirtual = require('mongoose-lean-virtuals');
let schema = mongoose.Schema({
        name: {
            type: String,
            default: "",
            trim: true
        },
    email: {
        type: String,
        default: "",
        trim: true
    },
        message: {
            type: String,
            default: ""
        },
        phone: {
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

const tblname = "contact"

schema.set('toObject', { getters: true,virtuals:true });
schema.set('toJSON', { getters: true,virtuals:true });
// Plugin must be *after* virtuals
schema.plugin(mongooseLeanVirtual);
module.exports = mongoose.model(tblname, schema, tblname);
