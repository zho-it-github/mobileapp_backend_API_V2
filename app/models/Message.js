let mongoose = require("mongoose");
const mongooseLeanVirtual = require("mongoose-lean-virtuals");
const timeZone = require('mongoose-timezone');
let schema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user", // no need for user if its a system msg
        },
        room: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "room",
            required: true
        },
        sent: {
            type: Boolean,
            default: true
        },
        received: {
            type: Boolean,
            default: false
        },
        read: {
            type: Boolean,
            default: false
        },
        system: {
            type: Boolean,
            default: false
        },
        text: {
            type: String,
            default: ""
        },
        filename: {
            type: String,
            default: "" // file name image or voice
        },
        type: {
            type: String,
            default: "text" // image / voice
        },

        status: {
            type: Number,
            default: 0 // not assgined to ticket yet, 1 assigned
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

// Plugin must be *after* virtuals
schema.plugin(mongooseLeanVirtual);

schema.plugin(timeZone, { paths: ['date', 'subDocument.subDate'] });

schema.statics.Clear = async function () {
    Message.deleteMany().exec();
};

schema.statics.createLoadMore = async function (room) {
    let newloadmore = new Message();
    newloadmore.room = room;
    newloadmore.type = "loadmore";
    newloadmore.text = "load more";
    newloadmore.status = 1;
    newloadmore.id = "loadmoreid";
    newloadmore.user={};
    return newloadmore;
};


schema.virtual('dataurl').get(function() {
    let data = "";
    if (this.filename && this.filename.length > 2){
        data = _config("app.imageurl")+"/"+this.filename;
    }
    return data;
});
module.exports = mongoose.model("message", schema, "message");
