let mongoose = require("mongoose");
const mongooseLeanVirtual = require('mongoose-lean-virtuals');


let schema = mongoose.Schema({

        full_name: {
            type: String,
            default: "",
            trim: true
        },
        email: {
            type: String,
            lowercase: true,
            trim: true
        },
    phone: {
        type: String,
        default: "",
        trim: true
    },
    dialcode: {
        type: String,
        default: "",
        trim: true
    },
    company: {
        type: String,
        default: "",
        trim: true
    },
    idtxt: {
        type: String,
        default: "",
        trim: true
    },

        activationcode: {
            type: Number,
            default: 0 //
        },
        status: {
            type: Number,
            default: 1 // 0 not verified , 1 verified
        },
        lang: {
            type: String,
            default: 'en'
        },
        lastlogin: {
            type: Date,
        },
        push: {
            token: {
                type: String,
                default: ""
            },
            silent: {
                type: Boolean,
                default: false
            },
            enabled: {
                type: Boolean,
                default: true
            },
        },

    }, {
        versionKey: false,
        timestamps: true
    }
);



schema.virtual('fullpicture').get(function() {
    let fullpicture = "";
     if (this.picture && this.picture.length > 2){
         fullpicture = _config("app.imageurl")+"/"+this.picture;
    }
    return fullpicture;
});



// Plugin must be *after* virtuals
schema.plugin(mongooseLeanVirtual);

schema.set('toObject', { getters: true,virtuals:true });
schema.set('toJSON', { getters: true,virtuals:true });

const collectionname = "user"
module.exports = mongoose.model(collectionname, schema, collectionname);
