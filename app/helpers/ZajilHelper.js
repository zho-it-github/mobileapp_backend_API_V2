const axios = require("axios");
var crypto = require('crypto');
const PDFDocument = require('pdfkit');
const fs = require('fs');
let Utils = require("../helpers/Utils");


module.exports = {

    createpdf:function(invoiceorderid,finalprice=0,oldprice=0,tracknumber="xx",invoicenumber ="4",invoicedate="12/02/1989",firstprice=0,secondprice=0,thirdprice=0,extrarow=false,extraamount = 0,nobox=1){

       // console.log("createpdf",finalprice,oldprice,tracknumber)
// Create a document
        const doc = new PDFDocument();

// Pipe its output somewhere, like to a file or HTTP response
// See below for browser usage
        doc.pipe(fs.createWriteStream('public/'+invoiceorderid+'.pdf'));

        doc.image('topheader.png',  {
           width: 500,
            align: 'center'
        });


        let col1LeftPos = 70;
        let colTop = 170;
        let colWidth = 360;
        let col2LeftPos = colWidth + col1LeftPos + 20;
        let totalsecondprice = 0;
        let totlathirdprice = 0;

        doc
            .font('Jomhuria-Regular.ttf').fontSize(17).text('Invoice Number '+invoicenumber, col1LeftPos, colTop, {width: colWidth})
            .font('Jomhuria-Regular.ttf').fontSize(17).text(` رقم الفاتورة${Utils.reverseString(invoicenumber)}`, col2LeftPos, colTop, {features: ['rtla'],width: colWidth})



        colTop = 190;
        colWidth = 300;
        col2LeftPos = colWidth + col1LeftPos + 40;
        const tinnumber = "300571958200003"

        doc
            .font('Jomhuria-Regular.ttf').fontSize(17).text('TIN Number '+tinnumber, col1LeftPos, colTop, {width: colWidth})
            .font('Jomhuria-Regular.ttf').fontSize(17).text(` الرقم الضريبي ${Utils.reverseString(tinnumber)}`, col2LeftPos, colTop, {features: ['rtla'],width: colWidth})


        colTop = 210;
        colWidth = 300;
        col2LeftPos = colWidth + col1LeftPos + 40;

        let arinvoicedate = Utils.reverseString(invoicedate);

        doc
            .font('Jomhuria-Regular.ttf').fontSize(17).text(`Invoice Issue Date ${invoicedate}`, col1LeftPos, colTop, {width: colWidth})
            .font('Jomhuria-Regular.ttf').fontSize(17).text(`  تاريخ اصدار الفاتورة ${arinvoicedate} `, col2LeftPos, colTop, {features: ['rtla'],width: colWidth})


        colTop = 230;
        colWidth = 300;
        col2LeftPos = colWidth + col1LeftPos + 40;

        doc
            .font('Jomhuria-Regular.ttf').fontSize(17).text(`Tracking number ${tracknumber}`, col1LeftPos, colTop, {width: colWidth})
            .font('Jomhuria-Regular.ttf').fontSize(17).text(`  رقم التتبع ${Utils.reverseString(tracknumber)} `, col2LeftPos, colTop, {features: ['rtla'],width: colWidth})


        doc.image('middle.png',  {
              fit: [150, 150],
            width: 500,
            x: 60,
            y: 260,
            align: 'left'
        })



        colTop = 340;
        colWidth = 120;
        col2LeftPos = colWidth + col1LeftPos + 40;

        // Charge for first piece

        doc
            .font('Jomhuria-Regular.ttf').fontSize(17).text('خدمة الاستلام والتوصيل Pickup and Delivery Service', col1LeftPos, colTop, {features: ['rtla'],width: colWidth})
            .font('Jomhuria-Regular.ttf').fontSize(17).text(firstprice+' SAR', col2LeftPos, colTop, {width: colWidth})
            .font('Jomhuria-Regular.ttf').fontSize(17).text('1', col2LeftPos+120, colTop, {width: colWidth})
            .font('Jomhuria-Regular.ttf').fontSize(17).text(firstprice+' SAR', col2LeftPos+240, colTop, {width: colWidth})


        let extra = 0
        if(extrarow){
            extra = 50;
            colTop +=extra

            let qty = nobox-1;

            totalsecondprice = (secondprice*qty)
            doc
                .font('Jomhuria-Regular.ttf').fontSize(12).text('خدمة الاستلام والتوصيل للقطع الإضافية  Pickup and delivery services for Extra boxes', col1LeftPos, colTop, {features: ['rtla'],width: colWidth+20})
                .font('Jomhuria-Regular.ttf').fontSize(17).text(secondprice+' SAR', col2LeftPos, colTop, {width: colWidth})
                .font('Jomhuria-Regular.ttf').fontSize(17).text(qty, col2LeftPos+120, colTop, {width: colWidth})
                .font('Jomhuria-Regular.ttf').fontSize(17).text(totalsecondprice+' SAR', col2LeftPos+240, colTop, {width: colWidth})
        }

        let thirdline = 415;
        if(thirdprice>0){
            extra = 70;
            colTop +=40
            thirdline = 405

            let qty = nobox;

            totlathirdprice = (thirdprice*qty)
            doc
                .font('Jomhuria-Regular.ttf').fontSize(17).text('توفيرصناديق الشحن Packaging service', col1LeftPos, colTop, {features: ['rtla'],width: colWidth+10})
                .font('Jomhuria-Regular.ttf').fontSize(17).text(thirdprice+' SAR', col2LeftPos, colTop, {width: colWidth})
                .font('Jomhuria-Regular.ttf').fontSize(17).text(qty, col2LeftPos+120, colTop, {width: colWidth})
                .font('Jomhuria-Regular.ttf').fontSize(17).text(totlathirdprice+' SAR', col2LeftPos+240, colTop, {width: colWidth})


        }

        doc.image('line.png',  {
            fit: [150, 150],
            width: 500,
            x: 60,
            y: thirdline+extra,
            align: 'left'
        })


        colTop = 450+(extra/2);
        colWidth = 200;
        col2LeftPos = colWidth + col1LeftPos + 40;

        const totaltaxableamount = ((parseFloat(firstprice)+parseFloat(totalsecondprice)+parseFloat(totlathirdprice))/1.15).toFixed(2)

        doc
            .font('Jomhuria-Regular.ttf').fontSize(17).text('Total Taxable Amount', col1LeftPos, colTop, {width: colWidth})
            .font('Jomhuria-Regular.ttf').fontSize(17).text('الاجمالي الخاضع للضريبة', col2LeftPos, colTop, {features: ['rtla'],width: colWidth})
            .font('Jomhuria-Regular.ttf').fontSize(17).text(totaltaxableamount+' SAR', col2LeftPos+160, colTop, {width: colWidth})


        colTop = 500+(extra/2);

        const totaltva = (totaltaxableamount * 0.15).toFixed(2)

        doc
            .font('Jomhuria-Regular.ttf').fontSize(17).text('Total VAT', col1LeftPos, colTop, {width: colWidth})
            .font('Jomhuria-Regular.ttf').fontSize(17).text('مجموع ضريبة القيمة المضافة', col2LeftPos, colTop, {features: ['rtla'],width: colWidth})
            .font('Jomhuria-Regular.ttf').fontSize(17).text(parseFloat(totaltva)+' SAR', col2LeftPos+160, colTop, {width: colWidth})


        colTop = 550+(extra/2);

        doc
            .font('Jomhuria-Regular.ttf').fontSize(17).text('Total Amount Due', col1LeftPos, colTop, {width: colWidth})
            .font('Jomhuria-Regular.ttf').fontSize(17).text('إجمالي المبلغ المستحق', col2LeftPos, colTop, {features: ['rtla'],width: colWidth})
            .font('Jomhuria-Regular.ttf').fontSize(17).text(parseFloat(oldprice).toFixed(2)+' SAR', col2LeftPos+160, colTop, {width: colWidth})
            //.font('Jomhuria-Regular.ttf').fontSize(17).text(parseFloat(parseFloat(firstprice)+parseFloat(totalsecondprice)+parseFloat(totlathirdprice)).toFixed(2)+' SAR', col2LeftPos+160, colTop, {width: colWidth})


        if(parseFloat(finalprice)<parseFloat(oldprice)){
            colTop = 600+(extra/2);

            doc
                .font('Jomhuria-Regular.ttf').fontSize(15).text('Total Amount Due after Discount', col1LeftPos, colTop, {width: colWidth})
                .font('Jomhuria-Regular.ttf').fontSize(14).text('إجمالي المبلغ المستحق بعد الخصم', col2LeftPos, colTop, {features: ['rtla'],width: colWidth})
                .font('Jomhuria-Regular.ttf').fontSize(17).text(parseFloat(finalprice).toFixed(2)+' SAR', col2LeftPos+160, colTop, {width: colWidth})

        }
        doc.image('line.png',  {
            fit: [150, 150],
            width: 500+extra,
            x: 60,
            y: 650,
            align: 'left'
        })

        doc.image('qr.jpg',  {
            fit: [150, 150],
            width: 500+extra,
            x: 60,
            y: 670,
            align: 'left'
        })

        doc.end();
    },

    createsig:function(device_id ="0690A419-9A95-4D5D-9E79-0AC6C3A2CB39"){

        // dev
        let  access_code ="GlU3ilRTptrqchpfQtR5";
        let merchant_identifier = "19cb37d7";
        let passphrase = "NKjU.Np2p0mZN.VXepLE";

        // production
         access_code ="bsrOcgkP1B9u3BqDSg5I";
         merchant_identifier = "HcTWLMKA";
         passphrase = "927t2qAL7B6Gn7n6paLORy_*";
        let result =passphrase+"access_code="+access_code+"device_id="+device_id+"language=enmerchant_identifier="+merchant_identifier+"service_command=SDK_TOKEN"+passphrase;
        const hash = crypto.createHash('sha256').update(result).digest('hex');
        return hash;
    },




    paymentApi: async function (device_id,signature,service_command="SDK_TOKEN") {
        // Sending ...
        console.log("paymentApi..",device_id)

        // dev
        let access_code = "GlU3ilRTptrqchpfQtR5";
        let merchant_identifier = "19cb37d7"
        let url = "https://sbpaymentservices.payfort.com/FortAPI/paymentApi"

        // production
        access_code ="bsrOcgkP1B9u3BqDSg5I";
        merchant_identifier = "HcTWLMKA";
        url = "https://paymentservices.payfort.com/FortAPI/paymentApi"
        let data =  {
            "service_command": service_command,
            "access_code": access_code,
            "merchant_identifier": merchant_identifier,
            "device_id":device_id,
            "signature":signature,
            "language":"en"
        }

        return await axios.post(url,data)
    },


    createsigapple:function(device_id ="0690A419-9A95-4D5D-9E79-0AC6C3A2CB39"){
        // dev

        let  access_code ="Wt0gGkJt04D3cgNkuIP2";
        let merchant_identifier = "19cb37d7";
        let passphrase = ".h0hZvZVP9tWfgjfZJQn";

        // production
          access_code ="a3vjyrSpJjT5wqUTWuPi";
         merchant_identifier = "HcTWLMKA";
         passphrase = "17g8TFOnyWNxs2GNkpfAmn{[";



        let result =passphrase+"access_code="+access_code+"device_id="+device_id+"language=enmerchant_identifier="+merchant_identifier+"service_command=SDK_TOKEN"+passphrase;
        const hash = crypto.createHash('sha256').update(result).digest('hex');
        return hash;
    },
    paymentApiApple: async function (device_id,signature) {
        // Sending ...
        console.log("paymentApiApple..",device_id)

        // dev
        let access_code = "Wt0gGkJt04D3cgNkuIP2";
        let merchant_identifier = "19cb37d7"
        let url = "https://sbpaymentservices.payfort.com/FortAPI/paymentApi"

        access_code ="a3vjyrSpJjT5wqUTWuPi";
        merchant_identifier = "HcTWLMKA";
         url = "https://paymentservices.payfort.com/FortAPI/paymentApi"
        let data =  {
            "service_command": "SDK_TOKEN",
            "access_code":access_code,
            "merchant_identifier": merchant_identifier,
            "device_id":device_id,
            "signature":signature,
            "language":"en"
        }

        // production https://paymentservices.payfort.com/FortAPI/paymentApi
        return await axios.post(url,data)
    },
    /**
     * Send emails
     * @param pincode
     * @param name
     * @param phone
     * @param address_line_1
     * @param address_line_2
     * @param city
     * @param country
     * @param load_type
     * @param total_items
     * @param total_weight
     * @param start
     * @param end
     * @param date
     */
    createpickup: async function (latitude,longitude,nobox,price,userid,temp,selecteddate,customer_reference_number,paymenttype,pincode,name,phone,address_line_1,address_line_2,cityname,start,end) {
        // Sending ...

        let data = {
            "pickup_type": "RETAIL",
            "pickup_address": {
                "pincode": pincode,
                "name": name,
                "phone": phone,
                "address_line_1":address_line_1,
                "address_line_2":address_line_2,
                "city": cityname,
                "country": "Saudi Arabia",
                "latitude":latitude,
                "longitude": longitude
            },
            "load_type": "NON-DOCUMENT", // type of documents
            "total_items": nobox,
            "total_weight": "112",
            "pickup_slot": {
                "start": start && start.trim(),
                "end": end && end.trim(),
                "date": selecteddate && selecteddate.trim()
            },
            "payment_type": paymenttype && paymenttype.includes("cashsender")?"pickup":"Delivery",
            "reference_number_list": [customer_reference_number],
            "shipping_charges": paymenttype && paymenttype.includes("cashsender")?price:"0" // shipping charge
        }

       // console.log("createpickup.."+temp,data)
        if(temp=="true"){
            data.shipping_charges = price;
            data.payment_type = "pickup";
        }
        if(paymenttype && paymenttype.includes("cashsender")){
            data.payment_type = "pickup";
            data.shipping_charges = price;
        }
        if(paymenttype && paymenttype.includes("cashreciver")){
            data.payment_type = "Delivery";
            data.shipping_charges = "0";
        }

        Log.AddLog("createpickup",JSON.stringify(data),userid)
        try{
            const response = await axios.post(_config("app.zajilapi")+"/api/customer/integration/pickup/create",
                data,
                { headers: { "api-key": _config("app.CREATEPICKUPAPI") } }
            );
            if(response){
                console.log("sucesss")

                return response.data;
            }

        }catch (e) {
            //console.log("xxxx ",e.response.data.error.message)
            return {error:true,msg:e.response.data.error.message};
        }

    },
    addconsignment: function (userid,reference_number,pickup_id) {
        // Sending ...
        console.log("addconsignment..")
        let data = [
            {
                "reference_number":reference_number,
                "pickup_id": pickup_id
            }
        ]
        Log.AddLog("addconsignment",JSON.stringify(data),userid)
        axios.post(_config("app.zajilapi")+"/api/customer/integration/pickup/addconsignment",
            data,
            { headers: { "api-key":  _config("app.CREATEPICKUPAPI") } }
        )
            .then((res) => {
                console.log("sucesss")
                console.log(res.data); // { status: 'OK', data: { pickupId: '233583' } }
                if(res.data.data.pickupId){
                    console.log(res.data.data.pickupId);
                }
            })
            .catch((err) => {
                console.log(err);
            });

    },
    cancelshipmenet: async function (AWBNo = "TT400170") {
        console.log("cancelshipmenet..",AWBNo)
        let data = {
            "customerCode": "MOBAPP",
            "AWBNo": [
                AWBNo
            ]
        }
        return await axios.post(_config("app.zajilapi")+"/api/client/integration/consignment/cancellation",
            data,
            { headers: { "Authorization":"Basic "+_config("app.CANCELAPI") } }
        )
    },

    cancelshipmenetfreshdesk: async function (AWBNo = "TT400170") {
        console.log("cancelshipmenetfreshdesk..",AWBNo)
        let data = {
            'subject': 'App Refund',
            'description': 'Dear Zajil, please refund for my cancelled order with reference number '+AWBNo,
            'email': 's.rushdi@zajil-express.com',
            'priority': 1,
            'status': 2,
            'type': 'Complaint',
            'custom_fields':{
                "cf_region":"Central",
                "cf_department": "Finance department"
            },

        }

        return await axios.post("https://zajil-express.freshdesk.com/api/v2/tickets",
            data,
            { headers: { "Authorization":"Basic "+_config("app.FRESHDESKAPI") } }
        )
    },

    track: async function (referencenumber = "TT400210") {
        // Sending ...
        console.log("track...."+referencenumber)


        let resx = {};
        try{
            if(_config("app.service_type_id")=="SUPER"){
                // old api
               // resx = await axios.get(_config("app.zajilapi")+'/api/customer/integration/consignment/track?reference_number='+referencenumber,
               //     { headers: { "api-key": _config("app.CREATEPICKUPAPI") } }
               // );
                // new api
                resx = await axios.get("https://app.shipsy.in/api/client/integration/consignment/track?reference_number="+referencenumber,
                    { headers: { "Authorization": "Basic OTAxMTRmYzU0NDM2ODJhMWUzMTFiZmFhM2IwNjg0Og==" } }
                );

            }else{
                resx = await axios.get('https://demodashboardapi.shipsy.in/api/customer/integration/consignment/track?reference_number='+referencenumber,
                    { headers: { "api-key": _config("app.CREATEPICKUPAPI") } }
                );
            }

        }catch (e) {
console.log("error")
        }

        return resx;
    },

    trackchipsy: async function (referencenumber = "132139190153") {
        // Sending ...
        console.log("track...."+referencenumber)
        let resx = {}
        try{
             resx = await axios.get("https://api.zajil-express.org/shipment?hwb_no="+referencenumber,
                { headers: { "api-key": _config("app.CREATEPICKUPAPI") } });
        }catch (e) {
            return null
        }


        return resx;
    },


    getConsignmentEventsFromPhone: async function (referencenumber = "0500000000") {
        // Sending ...
        console.log("getConsignmentEventsFromPhone.."+referencenumber)

        try{
            let resx = await axios.get(_config("app.getConsignmentEventsFromPhone")+'?phone='+referencenumber,
                { headers: { "Authorization": "Basic "+_config("app.CANCELAPI") } }
            );
            return resx;
        }catch (e) {

            console.log("e",e)
            return [];
        }


    },

    getConsignmentEventsFromPhone2: async function (referencenumber = "0500000000") {
        // Sending ...
        console.log("getConsignmentEventsFromPhone.."+referencenumber)

        let resx = {};
        try{
            // http://api.zajil-express.com/api/client/integration/getConsignmentEventsFromPhone?phone=0500051029'
             resx = await axios.get('http://api.zajil-express.com/api/client/integration/getConsignmentEventsFromPhone?phone='+referencenumber,
                { headers: { "Authorization": "Basic OTAxMTRmYzU0NDM2ODJhMWUzMTFiZmFhM2IwNjg0Og==" } }
            );
        }catch (e) {
            console.log("e",e)
        }

        return resx;
    },
    labelgenerator: async function (referencenumber = "TT400210") {
        // Sending ...
        console.log("labelgenerator..",referencenumber)
        let res = await axios.get(_config("app.zajilapi")+'/api/customer/integration/consignment/shippinglabel/link?reference_number='+referencenumber,
            { headers: { "api-key": _config("app.CREATEPICKUPAPI") } }
        );

        return res;


    },

     toEnglishDigits:function(str) {

    // convert persian digits [۰۱۲۳۴۵۶۷۸۹]
    var e = '۰'.charCodeAt(0);
    str = str.replace(/[۰-۹]/g, function(t) {
        return t.charCodeAt(0) - e;
    });

    // convert arabic indic digits [٠١٢٣٤٥٦٧٨٩]
    e = '٠'.charCodeAt(0);
    str = str.replace(/[٠-٩]/g, function(t) {
        return t.charCodeAt(0) - e;
    });
    return str;
},
    createshipment: async function (agree1,oldprice,promocode,discountnumber,userid,temp,load_type="NON-DOCUMENT",paymenttype,cod_amount,nobox,description,declared_value,customer_reference_number,origin_details,destination_details) {
        // Sending ...
        console.log("createshipment.."+temp)

        let data = {
            "consignments": [{
                "customer_code": _config("app.customer_code"), // MOBILEAPP
                "service_type_id": _config("app.service_type_id"), // SUPER
                "load_type": load_type,
                "description": description,
                "cod_favor_of": "",
                "dimension_unit": "cm",
                "length": "50",
                "width": "30",
                "height": "10",
                "weight_unit": "kg",
                "weight": "4.050",
                "declared_value": this.toEnglishDigits(declared_value),
                "declared_price": "",
                "cod_amount": temp=="true"?"0":cod_amount, // must 0 before payment and on suscess update amount payment api plz
                "cod_collection_mode": temp=="true"?"":"cash", // Cash aw Card
                "prepaid_amount": "",
                "num_pieces": this.toEnglishDigits(nobox),
                "customer_reference_number": customer_reference_number,
                "is_risk_surcharge_applicable": true,
                "origin_details": origin_details,
                "destination_details":destination_details,
                "pieces_detail": [
                    {
                        "description": "Mobile",
                        "declared_value": "500",
                        "weight": "0.55",
                        "height": "5",
                        "length": "15",
                        "width": "7"
                    }
                ],

                "high_value_details": {
                    "hv_id_num": "",
                    "hv_name": "",
                    "hv_id_expiry": "",
                    "hv_issue_place": "",
                    "hv_nationality": "",
                    "hv_phone": "",
                    "hv_amount": "",
                    "hv_billed_to_merchant": "",
                    "hv_hs_code": ""
                }
            }]
        }

        if(paymenttype && paymenttype.includes("cash")){
            data.consignments[0].payment_details= {
                "Discount_Amount": (parseFloat(oldprice)-parseFloat(cod_amount)).toFixed(2), //Amount that has been discounted form the original amount
                "Discount_Percentage": discountnumber, //if discount type in Voucherify is "Percent", then add it here
                "Discount_Code": promocode //Add discount code here

            }
        }else{
            data.consignments[0]["cod_amount"]= "0";
            data.consignments[0]["cod_collection_mode"]= "";
            data.consignments[0].payment_details= {
                 "amount": cod_amount, //final amount paid after discount if any
                 "payment_mode": "Card",
                "Discount_Amount": (parseFloat(oldprice)-parseFloat(cod_amount)).toFixed(2), //Amount that has been discounted form the original amount
                "Discount_Percentage": discountnumber, //if discount type in Voucherify is "Percent", then add it here
                "Discount_Code": promocode //Add discount code here
            }
        }

        if(paymenttype && paymenttype.includes("cashsender")){
            data.consignments[0]["cod_amount"]= "0";
            data.consignments[0]["cod_collection_mode"]= "";
        }
        if(paymenttype && paymenttype.includes("cashreciver")){
            data.consignments[0]["cod_amount"]= cod_amount;
            data.consignments[0]["cod_collection_mode"]= "Cash";
        }

        if(agree1==2){
            data.consignments[0].is_packaging_required = true;
        }
        Log.AddLog("createshipment",JSON.stringify(data),userid)
        try{
            let res = await axios.post(_config("app.zajilapi")+"/api/customer/integration/consignment/softdata",
                data,
                { headers: { "api-key": _config("app.CREATEPICKUPAPI") } }
            );
            return res;
        }catch (e) {
            console.log("eerrro softdata",e.response)
            return {error:true,msg:e.response.data?e.response.data.error.message:"Shipping Error"};
        }

    },


    updateshipment: async function (userid,reference_number,amount,paymenttype,payfortid,discount_code,discount_percentage,discount_amount) {
        // Sending ...
        console.log("updateshipment..")
        let data = {}
                if(paymenttype && paymenttype.includes("cash")){
                    data = {
                        "reference_number": reference_number,
                        "payment_details": {
                            "amount": amount, //final amount paid after discount if any
                            // "payment_mode": "Card",
                            // "transaction_id": "", //Payfort transaction ID
                            "discount_amount": "0", //Amount that has been discounted form the original amount
                            "discount_percentage": "0", //if discount type in Voucherify is "Percent", then add it here
                            "discount_code": "" //Add discount code here

                        }
                    };
        }else{
                    data = {
                        "reference_number": reference_number,
                        "payment_details": {
                            "amount": amount, //final amount paid after discount if any
                            "payment_mode": "Card",
                            "transaction_id": payfortid, //Payfort transaction ID
                            "discount_amount": "0", //Amount that has been discounted form the original amount
                            "discount_percentage": "0", //if discount type in Voucherify is "Percent", then add it here
                            "discount_code": "" //Add discount code here

                        }
                    };
        }

                try{
                    Log.AddLog("updateshipment",JSON.stringify(data),userid)
                     console.log("shippingamount update ",data,reference_number)
                    let res = await axios.post(_config("app.zajilapi")+"/api/customer/integration/pickup/shippingamount/update",
                        data,
                        { headers: { "api-key": _config("app.CREATEPICKUPAPI") } }
                    );
                }catch (e) {
                    console.log("errorr update",e)
                    return false
                }


        return res;

    },

}
