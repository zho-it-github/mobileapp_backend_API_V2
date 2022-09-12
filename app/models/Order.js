let mongoose = require("mongoose");
const mongooseLeanVirtual = require("mongoose-lean-virtuals");
let schema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user", // no need for user if its a system msg
        },
        doctype: {
            type: String,
            default: ""
        },
        discountnumber: {
            type: String,
            default: "0"
        },
        selecteddate: {
            type: String,
            default: ""
        },
        nobox: {
            type: String,
            default: ""
        },
        declaredvalue: {
            type: String,
            default: ""
        },
        description: {
            type: String,
            default: ""
        },
        district: {
            type: String,
            default: ""
        },
        promocode: {
            type: String,
            default: ""
        },
        sendername: {
            type: String,
            default: ""
        },
        senderphone: {
            type: String,
            default: ""
        },
        selectedtime: {
            type: String,
            default: ""
        },
        selecteddaystring: {
            type: String,
            default: ""
        },
        senderemail: {
            type: String,
            default: ""
        },
        rawsendercity: {
            type: String,
            default: ""
        },
        sendercity: {
            type: String,
            default: ""
        },
        senderaddress: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'address',
        },

        recivername: {
            type: String,
            default: ""
        },
        reciverphone: {
            type: String,
            default: ""
        },
        recivercity: {
            type: String,
            default: ""
        },
        reciveraddress: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'address',
        },
        awbnumber: {
            type: String,
            default: ""
        },
        price: {
            type: String,
            default: ""
        },
        oldprice: {
            type: String,
            default: "" // price before discount
        },
        payfortid: {
            type: String,
            default: ""
        },
        device_id: {
            type: String,
            default: ""
        },
        sdk_token: {
            type: String,
            default: ""
        },
        paymenttype: {
            type: String,
            default: ""
        },
        pdflink: {
            type: String,
            default: ""
        },
        invoicelink: {
            type: String,
            default: ""
        },
        withextrabox: {
            type: Boolean,
            default: false
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


module.exports = mongoose.model("order", schema, "order");
