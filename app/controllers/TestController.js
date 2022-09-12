let VoucherifyManager = require("../helpers/VoucherifyManager")
let ZajilHelper = require("../helpers/ZajilHelper")
let StaticData = require("../helpers/StaticData")


let alllocations = [];
module.exports = {

    /**
     * Show homepage
     * @param req
     * @param res
     * @param next
     */
    index: async function (req, res, next) {



        var NodeGeocoder = require('node-geocoder');

        var options = {
            provider: 'google',
            httpAdapter: 'https', // Default
            apiKey: 'AIzaSyCJftt9rlQwOsA6wwbzanMXObC6zzfGw9w', // for Mapquest, OpenCage, Google Premier
            formatter: 'json' // 'gpx', 'string', ...
        };

        var geocoder = NodeGeocoder(options);

        geocoder.reverse({lat:28.5967439, lon:77.3285038}, function(err, res) {

            console.log(err);
            console.log(res);
        });

        return res.render("hello");

        PushNotification.globalsend("dVHoBrb6T16_6uH_scb7CN:APA91bHwpAL0vuehr-BPtlLky9cr2ZdssepIzC1BR9ClEPgwolARRtljnPi2mB-YBZ48Uuq7jjPoDsKHmBrH7qK3qT8mapx2cUuYjg3Up_ag2tWkfVIMHHHGCLmBAYMX7Y_XnEInYi58","Zajil Express","hhh")
        const moment = require('moment-timezone');
        let aa = "2022-03-09T08:50:02.544Z";


        //var moment = require('moment-timezone');
       // let zzz=moment(aa).tz("America/Los_Angeles").format();
       // console.log("zzz",zzz)
        // convert to time
        var date = moment(aa).tz('Asia/Riyadh').format('YYYY-MM-DDTHH:mm:ss[Z]')
       //  let    timestamp = moment(date).format("X");
        console.log("date",date)
        return res.render("hello");
        var timeInMilliseconds = moment(date).valueOf();
        console.log("timeInMilliseconds",timeInMilliseconds)
        return res.render("hello");
        const city = "PR3M+4CX As Saadah, Riyadh Saudi Arabia";
        const userid = "61fcecd74c6129867e8fb0d4"
       // let addressfound = await Address.findOneAddress(userid,city);
       // console.log("addressfound",addressfound)

        let resultx = await ZajilHelper.track("132139190153")
        if(resultx.data && resultx.data.status){

        }else{
            console.log("try another tracking ")
            resultx = await ZajilHelper.trackchipsy("132139190153")
            if(resultx.data && resultx.data.Status){
                console.log("resultx",resultx.data.Result.travel_history)
            }
        }
        console.log("resultx",resultx.data.Status)
        return res.render("hello");
        var xx = [
            {
                "type": "not_picked_up",
                "event_time": 1613840787823,
                "hub_name": null,
                "hub_code": null,
                "customer_update": "Shipment Not Picked Up",
                "poc_image": null,
                "failure_reason": null,
                "signature_image": null
            },
            {
                "type": "assigned_to_hub",
                "event_time": 1613633183626,
                "hub_name": "Jeddah",
                "hub_code": "JED",
                "customer_update": "assigned_to_hub",
                "poc_image": null,
                "failure_reason": null,
                "signature_image": null
            },
            {
                "type": "softdata_upload",
                "event_time": 1613589938927,
                "hub_name": "Jeddah",
                "hub_code": "JED",
                "customer_update": "Shipment Data Received",
                "poc_image": null,
                "failure_reason": null,
                "signature_image": null
            }
        ];

        let trackiginfo = {}

            trackiginfo.events = xx;
            let events = [];
            for(let i =0 ;i<trackiginfo.events.length;i++){
                const eventfound = StaticData.grabTracking().find(x=>x.event==trackiginfo.events[i].type );
                if(eventfound){
                    trackiginfo.events[i].english=eventfound.english;
                    trackiginfo.events[i].arabic=eventfound.arabic;
                }else{
                    trackiginfo.events[i].english=trackiginfo.events[i].customer_update;
                    trackiginfo.events[i].arabic=trackiginfo.events[i].customer_update;
                }
                //  events.push(...trackiginfo.events[i])
            }

            console.log("trackiginfo",trackiginfo)


        return res.render("hello");
        const d = new Date();
        var local = d.getTime();
        var offset = d.getTimezoneOffset() * (60 * 1000);
        var utc = new Date(local + offset);
        var riyadh = new Date(utc.getTime() + (3 * 60 * 60 * 1000));
        let hour = riyadh.getHours();

        let zz=[22,44,55]
        zz.shift()
        console.log("hour",hour,zz)
        ZajilHelper.createpdf("zzz",20,30,"xx","4","12/02/1989",1,3,8,true,3,1)

        return res.render("hello");
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var dayName = days[riyadh.getDay()];
      // let ss = await  ZajilHelper.track("TT400157")


        //console.log("zzz",ss.data)
        console.log("server hour now is",dayName)

        const sorterk = {
            "09:00 - 12:00":0,
            "12:00 - 01:00": 1,
            "12:00 - 13:00": 2,
            "12:00 - 15:00": 3,
            "15:00 - 16:00": 4,
            "15:00 - 18:00": 5,
            "18:00 - 21:00": 6,
        }
        let datax = [
            {name:"ssss"},
            {name:"09:00 - 12:00"},
        ]
        if(hour>=9){
            // remove 0
            datax = datax.filter((x=>x.name!="09:00 - 12:00"))
        }
       // console.log(datax)

        if(hour>=12){
            // remove 0
        }

        //let or = new Order();

       // await or.save();

        //const invoiceorderid = or.id;

       // let zz = await ZajilHelper.createpdf(invoiceorderid);
        //console.log("invoiceorderid",invoiceorderid)
        const _ = require("lodash");
        //let resux = await ZajilHelper.getConsignmentEventsFromPhone();
         //let dataxx = _.orderBy(resux.data.consignments, ['creation_date'],['desc']);
         // console.log("resux",dataxx[0],resux.data.consignments[0])


        return res.render("hello");
// 0500051029' \
      //  const resx = await ZajilHelper.getConsignmentEventsFromPhone2("0500051029")
       let resx = await VoucherifyManager.redeem("test21","nasim",80*100);
       if(!resx){
          console.log("falsexxxx");
       }
       console.log("zzz",resx,resx.order.discount_amount)
        return res.render("hello");

       // let token = "ekJj3Qd0dkFep6X8Gly7sN:APA91bF5Vef8maREdVjTA8WyaXFtrI08lIH0lUhj2e7w7e370mGJ3trR5sCj7iSC4Jo4NqDn_Si4cbTnHiUTOrbf77C4cKdNIz2zYLSmqvN9kPh-XJ2VYS_QgEd13FBEpV8e5IiD5iI-"
//token ="dEGaNQ5IQ6i0LGTpVLERHm:APA91bGzWpK0phf8IYU-B_J2SUDuBRTfGcjO_SnbV27AfxegHINvHOqpaUoALAvxpeuHrvaUMUwNmwAm4DC81ex2pLeVKAHaDb4YwMInfcceLqri3b67O5xAFseAvds7URINxEZAO7z3"
     //let token = "ezbUr-2pRImJlzsXjLB6pZ:APA91bFN3VLmn4OnxWGySvOiBGYrCcHP9tnSYnl40gfX6vnia0HFZImqG3aO_EUFOlnS9Ajg4nrPIeHKHATRsiNyurrpAifqMeRy-5X_Zx1Yegave0vaNotrbfP_ZJzw77Q6TpQh3tBQ"
      // PushNotification.globalsend(token,"hi","test")
        //Notification.AddNoti("hi there ","61b26805b6ae3138d1d38d2e")
      // const invoicenumber = await Settings.grabinvoicenumber()
     // ZajilHelper.createpdf(invoicenumber);

      /*  if(resx && resx.id){
            console.log(resx.campaign)
            if(resx.discount){
                console.log(resx.discount.percent_off)
            }
        }*/
       // ZajilHelper.createsig();

      //  let xx = "e2Imq0DTvUAqnfIak7J5bC:APA91bGRXlfUeRMwS2aVBWLP5neX7WNJoviCQZfeNJXwieUFMJVyJtX9zAwc8fXZZOod2LVsYqmZ0MG8FciglQWcDiX6BLUGQhbChrkwidaf6HdTOcP3VfHJ2qrh1fEZcw98IvMfILDb";
       //PushNotification.globalsend(xx,"hi ")

        let email = "sad@yopmail.com";
       let msg = "hi erergrgrgrgrg";
     // EmailService.sendemail(email, "RESET YOUR PASSWORD", msg);

     //   var client = payfort.create_client("development", {
        //    access_code : "GlU3ilRTptrqchpfQtR5",
         //   merchant_identifier : "19cb37d7",
         //   passphrase : "NKjU.Np2p0mZN.VXepLE",
           // purchase_url : "send this only to override default urls"
        //});
       // console.log("client",client)
       // ZajilHelper.track();

        let data = [{
            name:"friday",
        },
            {
                name:"monday",
            },
            {
                name:"sunday",
            },
            {
                name:"tuesday",
            },
            {
                name:"saturday",
            }]



        function sort_days2(toSort) {
            var today = new Date().toUTCString().substr(0, 3), //get today as 3 letter string
                list = ["tuesday","wednesday","thursday","friday","saturday","sunday","monday"], // days list
                before = list.splice(0, list.findIndex(x=>x.includes(today.toLowerCase()))); // splice what is before today in the list
            list = list.concat(before); // concat the list with what was spliced

            //console.log("today",list.findIndex(x=>x.includes(today.toLowerCase())),today,list)
            return list.filter(function (item) { return toSort.name!=item}); // return the sorted list with only the asked days
        }

        let sorter = sort_days2(data)
        let sorterx={};
        sorter.map((x,i)=>{
            sorterx[x]=i;
            return x
        })

        data.sort(function sortByDay(a, b) {
            let day1 = a.name.toLowerCase();
            let day2 = b.name.toLowerCase();
            return sorterx[day1] - sorterx[day2];
        })


        //console.log("data",sorterx)
        return res.render("hello");
      /* await ManagerType.Clear();
        const adminid = await ManagerType.AddManager("admin");
        await ManagerType.AddManager("manager");

       let newdata = new Manager();
        newdata.full_name ="admin";
        newdata.username = "admin";
        newdata.password = "letmein";
        // newdata.comments = data.comments;
        newdata.managertype = adminid;
        //newdata.phone = data.phone;
       await newdata.save()
       // return res.render("hello");
        let newdata2 = new Thread();
        newdata2.title ="covid19";
        await newdata2.save();
        newdata2 = new Thread();
        newdata2.title ="sport";
        await newdata2.save();


        newdata2 = new Faq();
        newdata2.question ="question";
        newdata2.reply="reply";
        await newdata2.save()



        return res.render("hello");*/
    },


    clearall: async function (req, res, next) {
        Address.deleteMany().exec();
        Day.deleteMany().exec();
        return res.render("hello");
    },
    createmanager: async function (req, res, next) {

        return res.render("hello");

        for(let i = 0 ;i<alllocations.length;i++){
            let xx= new Location()
            xx.name = alllocations[i].branchname
            let xa = alllocations[i].locatiions.split(",")
            if(xa.length<1){
                continue;
            }
            xx.location= {
                type: "Point",
                coordinates: [parseFloat(xa[0]),parseFloat(xa[1])]
            };
             await xx.save();
        }
      //  await ManagerType.AddManager("admin2");
        return res.render("hello");
        await ManagerType.Clear();
          const adminid = await ManagerType.AddManager("admin");
         // await ManagerType.AddManager("manager");

         let newdata = new Manager();
          newdata.full_name ="admin";
          newdata.username = "admin";
          newdata.password = "letmein";
          newdata.managertype = adminid;
         await newdata.save()

        return res.render("hello");
    },


    parsefile: async function (req, res, next) {

       //await FileParser.parse("category.csv")
        return res.render("hello");
    },





};
