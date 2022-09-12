/**
 * UsersController
 * @description :: Server-side logic for managing users
 */

let Response = require("../helpers/Response")
const moment = require("moment-timezone")
let ZajilHelper = require("../helpers/ZajilHelper");
let Utils = require("../helpers/Utils");
let StaticData = require("../helpers/StaticData");
let _ = require('lodash');
let VoucherifyManager = require("../helpers/VoucherifyManager")
let util = require('util')
module.exports = {

    listusernotifications:async function (req, res) {
        let userid = req.userid;
        const lang = req.lang;
        let data = await Notification.find({user:userid}).sort({ "$natural": 1 }).lean({virtuals:true}).exec();
        for(let j = 0; j < data.length; j++) {
            data[j] =  Notification.Translate(data[j],lang)
            data[j].createdAt = moment.tz(data[j].createdAt, "Asia/Riyadh").format('YYYY-MM-DDTHH:mm:ss[Z]');
        }
        return Response.ok(res,data);
    },

    listbanner:async function (req, res) {
        let data = await Banner.find().sort({ "$natural": -1 }).lean({virtuals:true}).exec();
        return Response.ok(res,data);
    },


    showabout:async function (req, res) {

        let settingsinfo = await Settings.findOne().exec();
        let text = await Content.findById(settingsinfo.aboutid).exec();
        return Response.ok(res,{
            text:text.text,
        });
    },

    getpostinfo:async function (req, res) {
        const id = req.params.id
       let postinfo = await Post.findById(id).populate("user").sort({ "$natural": -1 }).lean({virtuals:true}).exec();
        return Response.ok(res,{
            postinfo:postinfo,
        });
    },


    avaliabledatestest:async function (req, res) {
        let userid = req.userid;
        let city = req.params.city

        let data = []
        let cityinfo = await City.findOneCity(city)

        if(cityinfo){
            data = await Day.find({city:cityinfo.id}).populate("timeslots").sort({ "$natural": -1 }).lean({virtuals:true}).exec();
        }else{
            console.log("days not found for ",city)
        }


        function sort_days2(toSort) {
            const d = new Date();
            var local = d.getTime();
            var offset = d.getTimezoneOffset() * (60 * 1000);
            var utc = new Date(local + offset);
            var today = new Date(utc.getTime() + (3 * 60 * 60 * 1000)).toUTCString().substr(0, 3);
            var  list = ["tuesday","wednesday","thursday","friday","saturday","sunday","monday"], // days list
                before = list.splice(0, list.findIndex(x=>x.includes(today.toLowerCase()))); // splice what is before today in the list
            list = list.concat(before); // concat the list with what was spliced
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

        data= _.uniqBy(data, function (e) {
            return e.name;
        });

        // remove current day plz if time

        const d = new Date();
        var local = d.getTime();
        var offset = d.getTimezoneOffset() * (60 * 1000);
        var utc = new Date(local + offset);
        var riyadh = new Date(utc.getTime() + (3 * 60 * 60 * 1000));
        let hour = riyadh.getHours();


        var days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
        var dayName = days[riyadh.getDay()];
        let removelast = false
        if(hour>18 && data && data[0] && dayName==data[0].name){
            removelast = true;
            console.log("hour bigger than 18 need to remove the first day")
        }





        let xx = Day.checkifcontainetimes(data[0].name,data[0].timeslots)
        if(removelast){
            data.shift()
        }

        // console.log("saudi time is , ",hour)
        console.log("xx",xx)



        return Response.ok(res, {hour:hour,xx:xx,removelast:removelast,first:data[0],data});
    },
    avaliabledates:async function (req, res) {
        let userid = req.userid;
        let city = req.params.city

        let data = []
        let cityinfo= [];
        let addressfound = await Address.findOneAddress(userid,city);

        if(addressfound){
            cityinfo = await City.findOneCity(addressfound.city)
        }else{
            console.log("address not found",userid,city)
        }
        if(cityinfo){
            data = await Day.find({city:cityinfo.id}).populate("timeslots").sort({ "$natural": -1 }).lean({virtuals:true}).exec();
        }else{
            console.log("days not found for ",city)
        }


        function sort_days2(toSort) {
            const d = new Date();
            var local = d.getTime();
            var offset = d.getTimezoneOffset() * (60 * 1000);
            var utc = new Date(local + offset);
            var today = new Date(utc.getTime() + (3 * 60 * 60 * 1000)).toUTCString().substr(0, 3);
               var  list = ["tuesday","wednesday","thursday","friday","saturday","sunday","monday"], // days list
                before = list.splice(0, list.findIndex(x=>x.includes(today.toLowerCase()))); // splice what is before today in the list
            list = list.concat(before); // concat the list with what was spliced
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

        data= _.uniqBy(data, function (e) {
            return e.name;
        });

        // remove current day plz if time

        const d = new Date();
        var local = d.getTime();
        var offset = d.getTimezoneOffset() * (60 * 1000);
        var utc = new Date(local + offset);
        var riyadh = new Date(utc.getTime() + (3 * 60 * 60 * 1000));
        let hour = riyadh.getHours();


        var days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
        var dayName = days[riyadh.getDay()];
        let removelast = false
        if(hour>18 && data && data[0] && dayName==data[0].name){
            removelast = true;
            console.log("hour bigger than 18 need to remove the first day")
        }


        if(removelast){
            data.shift()
        }

        if(data.length>0){
            //

            //
            let groupeddata = [];
            let testday = await Day.find({name:data[0].name,city:cityinfo.id}).populate("timeslots").sort({ "$natural": -1 }).lean({virtuals:true}).exec();
            for(let i = 0 ;i<testday.length;i++){
                if(testday[i].timeslots){
                    groupeddata = groupeddata.concat(testday[i].timeslots)
                }
            }
            let testtimelost= _.uniqBy(groupeddata, function (e) {
                return e.name;
            });
            let timeslotcount = Day.checkifcontainetimes(data[0].name,testtimelost)
            if(timeslotcount==0){
                console.log("checkifcontainetimes remove ",data[0].name,testtimelost)
                data.shift();
            }
        }

      //  data.shift();

       // console.log("saudi time is , ",hour)

        return Response.ok(res,data);
    },

    avaliabledatesbyaddress:async function (req, res) {
        let userid = req.userid;
        let addressid = req.params.addressid

        let data = []
        let cityinfo= [];
        let addressfound = await Address.findById(addressid).exec();

        if(addressfound){
            cityinfo = await City.findOneCity(addressfound.city);
        }
        if(cityinfo){
            data = await Day.find({city:cityinfo.id}).sort({ "$natural": -1 }).lean({virtuals:true}).exec();
        }else{
            console.log("days not found for ",city)
        }


        function sort_days2(toSort) {
            const d = new Date();
            var local = d.getTime();
            var offset = d.getTimezoneOffset() * (60 * 1000);
            var utc = new Date(local + offset);
            var today = new Date(utc.getTime() + (3 * 60 * 60 * 1000)).toUTCString().substr(0, 3);
              var  list = ["tuesday","wednesday","thursday","friday","saturday","sunday","monday"], // days list
                before = list.splice(0, list.findIndex(x=>x.includes(today.toLowerCase()))); // splice what is before today in the list
            list = list.concat(before); // concat the list with what was spliced
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

        data= _.uniqBy(data, function (e) {
            e.city = undefined;
            e.timeslots = undefined;
            return e.name;
        });

        return Response.ok(res,data);
    },


    avaliabletimes:async function (req, res) {
        let userid = req.userid;
        let name = req.params.day
        let city = req.params.city

        let cityinfo= [];
        let addressfound = await Address.findOneAddress(userid,city);


        if(addressfound){
            cityinfo = await City.findOneCity(addressfound.city)
        }
        let data = []
        let groupeddata = [];
        if(cityinfo && cityinfo.id){
             data = await Day.find({name:name,city:cityinfo.id}).populate("timeslots").sort({ "$natural": -1 }).lean({virtuals:true}).exec();
            for(let i = 0 ;i<data.length;i++){
                if(data[i].timeslots){
                    groupeddata = groupeddata.concat(data[i].timeslots)
                }
            }
        }

        data = groupeddata;

        data= _.uniqBy(data, function (e) {
            return e.name;
        });


        const sorter = {
            "09:00 - 12:00":0,
            "12:00 - 01:00": 1,
            "12:00 - 13:00": 2,
            "12:00 - 15:00": 3,
            "15:00 - 16:00": 4,
            "15:00 - 18:00": 5,
            "18:00 - 21:00": 6,
        }
        if(data){
            data.sort(function sortByDay(a, b) {
                let slot = a.name.toLowerCase();
                let slot2 = b.name.toLowerCase();
                return sorter[slot] - sorter[slot2];
            });
        }


        const d = new Date();
        var local = d.getTime();
        var offset = d.getTimezoneOffset() * (60 * 1000);
        var utc = new Date(local + offset);
        var riyadh = new Date(utc.getTime() + (3 * 60 * 60 * 1000));
        let hour = riyadh.getHours();

        var days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
        var dayName = days[riyadh.getDay()];
        if (dayName==name){
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


      //  data = []
        return Response.ok(res,data);
    },

    avaliabletimesbyaddress:async function (req, res) {
        let userid = req.userid;
        let name = req.params.day
        let addressid = req.params.addressid

        let cityinfo= [];
        let addressfound = await Address.findById(addressid).exec();
        if(addressfound){
            cityinfo = await City.findOneCity(addressfound.city)
        }
        let data = []
        let groupeddata = [];
        if(cityinfo && cityinfo.id){
            data = await Day.find({name:name,city:cityinfo.id}).populate("timeslots").sort({ "$natural": -1 }).lean({virtuals:true}).exec();
            for(let i = 0 ;i<data.length;i++){
                if(data[i].timeslots){
                    groupeddata = groupeddata.concat(data[i].timeslots)
                }
            }

        }

        data = groupeddata;

        data= _.uniqBy(data, function (e) {
            return e.name;
        });


        const sorter = {
            "09:00 - 12:00":0,
            "12:00 - 01:00": 1,
            "12:00 - 13:00": 2,
            "12:00 - 15:00": 3,
            "15:00 - 16:00": 4,
            "15:00 - 18:00": 5,
            "18:00 - 21:00": 6,
        }
        if(data){
            data.sort(function sortByDay(a, b) {
                let slot = a.name.toLowerCase();
                let slot2 = b.name.toLowerCase();
                return sorter[slot] - sorter[slot2];
            });
        }


        const d = new Date();
        var local = d.getTime();
        var offset = d.getTimezoneOffset() * (60 * 1000);
        var utc = new Date(local + offset);
        var riyadh = new Date(utc.getTime() + (3 * 60 * 60 * 1000));
        let hour = riyadh.getHours();
// check if name is name

        var days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
        var dayName = days[riyadh.getDay()];
        if (dayName==name){
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

        // skip time


        return Response.ok(res,data);
    },
    myaddress:async function (req, res) {
        let userid = req.userid;
        let data = await Address.find({user:userid}).sort({ "$natural": -1 }).lean({virtuals:true}).exec();
        return Response.ok(res,data);
    },

    allcity:async function (req, res) {
        let data = await City.find().sort({ "name": 1 }).lean({virtuals:true}).exec();
        return Response.ok(res,data);
    },

    paymentinfo:async function (req, res) {

        const loadtype = req.params.loadtype
        let userid = req.userid;
        let wherecondition = "parcel";
        if(loadtype=="DOCUMENT"){
                wherecondition = "document";
        }
        let data = await Shipping.findOne({servicetype:wherecondition}).exec();

       // console.log("data",data)
        return Response.ok(res,data);
    },

    myorder:async function (req, res) {

        let userid = req.userid;

        // pass vs the phone
        let userinfo = await User.findById(userid).sort({ "$natural": -1 }).lean({virtuals:true}).exec();

        let data = []
        if(userinfo){
            let resux = await ZajilHelper.getConsignmentEventsFromPhone(userinfo.phone);
          //  console.log("resux",resux.data.consignments)
            //  let data = await Order.find({user:userid}).sort({ "$natural": -1 }).lean({virtuals:true}).exec();
             if(resux && resux.data){
                 data = resux.data.consignments;
                 data = _.orderBy(data, ['creation_date'],['desc']);
             }
             if(data.length==0){
                 resux = await ZajilHelper.getConsignmentEventsFromPhone(userinfo.phone.slice(1));
                 //  console.log("resux",resux.data.consignments)
                 //  let data = await Order.find({user:userid}).sort({ "$natural": -1 }).lean({virtuals:true}).exec();
                 if(resux && resux.data){
                     data = resux.data.consignments;
                     data = _.orderBy(data, ['creation_date'],['desc']);
                 }
             }

        }

      //  console.log("data",data)

        return Response.ok(res,data);
    },


    cancelorder:async function (req, res) {

        const id = req.params.id
        let userid = req.userid;
        let resultx ={}
        try{
             resultx = await ZajilHelper.cancelshipmenet(id)
            ZajilHelper.cancelshipmenetfreshdesk(id);
        }catch (e) {
            console.log("e",e)
        }


        let data = {}
        if(resultx.data){
            console.log("resultx",resultx.data);
        }

        return Response.ok(res, data);
    },

    trackorder:async function (req, res) {

        const id = req.params.id
        let userid = req.userid;
        let resultx ={}
        try{
             resultx = await ZajilHelper.track(id)
        }catch (e) {
            console.log(e.response.data.error.message)
            return Response.notOk(res,e.response.data.error.message)
        }

        let trackiginfo = {
            info :{},
            events:[]
    }
        if(resultx.data){
            trackiginfo.info = {
                status:resultx.data.status
            };
            trackiginfo.events = resultx.data.events;
        }

        return Response.ok(res, trackiginfo);
    },

    newtrackorder:async function (req, res) {
        const id = req.params.id
        let userid = req.userid;
        let resultx ={}
        let errormsg = "Reference number is not valid"
        try{
            resultx = await ZajilHelper.track(id)
        }catch (e) {
            errormsg = e.response.data.error.message
        }

        let trackiginfo = {
            info :{},
            events:[]
        }
        if(resultx && resultx.data){
            trackiginfo.info = {
                status:resultx.data.status,
                lat:23.442160,
                long:44.158429,
            };
            trackiginfo.events = resultx.data.events;
            for(let i =0 ;i<trackiginfo.events.length;i++){
                const eventfound = StaticData.grabTracking().find(x=>x.event==trackiginfo.events[i].type );
                if(eventfound){
                    trackiginfo.events[i].english=eventfound.english;
                    trackiginfo.events[i].arabic=eventfound.arabic;
                }else{
                    trackiginfo.events[i].english=trackiginfo.events[i].customer_update;
                    trackiginfo.events[i].arabic=trackiginfo.events[i].customer_update;
                }
            }
        }else{
            try{
                resultx = await ZajilHelper.trackchipsy(id)
                if(resultx && resultx.data && resultx.data.Status && resultx.data.Result.travel_history){
                    console.log("try to fetch")
                }
            }catch (e) {
                return Response.notOk(res,errormsg)
            }

            if(resultx && resultx.data && resultx.data.Status && resultx.data.Result.travel_history){
                trackiginfo.info = {
                    status:resultx.data.Status,
                    lat:23.442160,
                    long:44.158429,
                };
                let neweevents = resultx.data.Result.travel_history
                trackiginfo.events = []
                let location ="";
               // console.log("another result tracking")
                for(let i =0 ;i<neweevents.length;i++){
                    let eventfound = StaticData.grabTracking().find(x=>x.event==neweevents[i].activities );

                    location = neweevents[i].new_location;

                    var date = moment(neweevents[i].entry_date).tz('Asia/Riyadh').format()
                        const timestamp = parseInt(moment(date).valueOf());
                    if(eventfound){
                        if(location){
                            eventfound.english = eventfound.english.replace("branchname",location)
                            eventfound.arabic = eventfound.arabic.replace("branchname",location)
                        }
                        trackiginfo.events.push({english:eventfound.english,arabic:eventfound.arabic,event_time:timestamp})
                    }else{
                        let english = neweevents[i].activities;
                        let arabic = neweevents[i].activities;
                        if(location){
                            english = english.replace("branchname",location)
                            arabic = arabic.replace("branchname",location)
                        }
                        trackiginfo.events.push({english:english,arabic:arabic,event_time:timestamp})
                    }
                }

                if(location){
                  let locationinfo = await Location.findOneLocation(location);

                    if(locationinfo && locationinfo.location && locationinfo.location.coordinates[0]){
                       trackiginfo.info.lat=locationinfo.location.coordinates[0];
                       trackiginfo.info.long=locationinfo.location.coordinates[1];
                     }
                }
            }else{
                errormsg = "AWB Not Found"
                return Response.notOk(res,errormsg)
            }
        }
        return Response.ok(res, trackiginfo);
    },
    showprivacy:async function (req, res) {

        let settingsinfo = await Settings.findOne().exec();
        let text = await Content.findById(settingsinfo.privacyid).exec();
        return Response.ok(res,{
            text:text.text,
        });
    },

    showterms:async function (req, res) {

        let settingsinfo = await Settings.findOne().exec();
        let text = await Content.findById(settingsinfo.termsid).exec();
        return Response.ok(res,{
            text:text.text,
        });
    },

    savecontact: async function (req, res) {
        const data = req.body;
        //console.log("savecontact ....");
        let newdata = new Contact();

        newdata.name = data.name;
        newdata.email = data.email;
        newdata.message = data.message;
        await newdata.save();






        return Response.ok(res);
    },


    saveaddress: async function (req, res) {
        let userid = req.userid;
        const data = req.body;
        const lang = req.lang;
        const savex = data.savex;
        let cityfound = await City.findOneCity(data.city);


       // console.log("data.city",data)
       // if(!data.city || data.city.length<2){
        //    return Response.notOk(res,"City information is missing");
       // }
        if(!data.address1 || data.address1.length<2){
            let msg = "يرجى تحديد الموقع بالضغط على الخريطة";
            if(lang=="ar"){
                return Response.notOk(res,msg);
            }
            return Response.notOk(res,"Please Click on the map");
        }

        if(!cityfound){
            return Response.notOk(res,"City not allowed");
        }

        let addresscondition = {title:data.title,address1:data.address1}
        if(userid){
            addresscondition = {title:data.title,address1:data.address1,user:userid}
        }

        let addressfound = await Address.findOne(addresscondition).exec();
        if(addressfound){
            return Response.ok(res);
        }

        let newdata = new Address();
        newdata.title = data.title;
        newdata.address1 = data.address1;
        if(savex=="false" && newdata.title<2){
            newdata.title = data.address1;
        }
        newdata.lat = data.lat;
        newdata.long = data.long;
        newdata.city = data.city;
        newdata.savex = (savex=="true");
        if(userid){
            newdata.user = userid;
            await newdata.save();
        }
        return Response.ok(res);
    },

    saverating: async function (req, res) {
        let userid = req.userid;
        const data = req.body;

        let rateinfo = await Rate.findOne({user:userid}).exec();

        if(rateinfo){
            return Response.notOk(res,"Already Rated!");
        }

        rateinfo = new Rate();
        rateinfo.countofstars = data.countofstars;
        rateinfo.comments = data.comments;
        rateinfo.user = userid;

        await rateinfo.save();
        return Response.ok(res);
    },


    userlangchange: async function (req, res) {
        let userid = req.userid;
        const data = req.body;
        let userinfo = await User.findById(userid).exec();
        if(userinfo){
            userinfo.lang = data.lang;
            await userinfo.save();
        }
        return Response.ok(res);
    },

    generatesig: async function (req, res) {
        let userid = req.userid;
        let data = req.body;
        let signature = {};
        let paymentinfo = {}
        if(data.type=="apple"){
            signature = await ZajilHelper.createsigapple(data.device_id)
            paymentinfo = await ZajilHelper.paymentApiApple(data.device_id,signature);
        }else{
            signature = await ZajilHelper.createsig(data.device_id)
            paymentinfo = await ZajilHelper.paymentApi(data.device_id,signature);

           // let xpaymentinfo = await ZajilHelper.paymentApi(data.device_id,signature,"TOKENIZATION");
           // console.log("xpaymentinfo",xpaymentinfo.data)
        }

        let sdk_token = "";
        if(paymentinfo){
            console.log("xxx",paymentinfo.data)
            sdk_token = paymentinfo.data.sdk_token;
        }

        let newdata = new Order();
        newdata.device_id = data.device_id;
        newdata.sdk_token = data.sdk_token;
        newdata.user = userid;
        await newdata.save();


        data = {
            signature:signature,
            orderid:newdata.id,
            sdk_token:sdk_token,
            awbnumber:newdata.awbnumber
        }

        console.log("data",data)
        return Response.ok(res,data);
    },


    createtemporder: async function (req, res) {
        let userid = req.userid;
        let newdata = new Order();
        newdata.user = userid;
        await newdata.save();
        const data = {
            orderid:newdata.id,
            awbnumber:newdata.awbnumber
        }
        return Response.ok(res,data);
    },


    completedorder: async function (req, res) {
        let userid = req.userid;
        const id = req.params.id

        let orderinfo = await Order.findById(id).populate("user").exec();
        if(orderinfo && orderinfo.promocode.length>2){
            let result = await VoucherifyManager.redeem(orderinfo.promocode,orderinfo.user.full_name,parseFloat(orderinfo.price)*100);
            console.log("result",result)
        }
        return Response.ok(res);
    },

    checkpromo: async function (req, res) {
        let userid = req.userid;
        let userinfo = await User.findById(userid).exec();
        let params = req.body;
        let code = params.code;
        let paymentamount = params.paymentamount;
// 15%OFF-ZKd-D1B
        let result = await VoucherifyManager.check(code);

        let data = {}
        if(result && result.discount){
            let paymentamountforcoupon = parseFloat(paymentamount)*100;
            let resx = await VoucherifyManager.redeem(code,userinfo.full_name,paymentamountforcoupon);
            if(!resx){
                return Response.notOk(res,"Invalid Coupon code")
            }else{
                console.log(paymentamountforcoupon,resx.order.discount_amount)
                let newdiscountedpayment = (parseFloat(paymentamountforcoupon)-parseFloat(resx.order.discount_amount))/100
                if(newdiscountedpayment<0){
                    newdiscountedpayment = 0
                }
                console.log(paymentamountforcoupon,resx.order.discount_amount,newdiscountedpayment)
                data = {
                    discount:resx.discount && resx.discount.percent_off ? resx.discount.percent_off:0,
                    campaign:result.campaign?result.campaign:"",
                    code:result.code,
                    id:result.id,
                    paymentamount:newdiscountedpayment
                };
                return Response.ok(res,data);
            }
        }else{
            return Response.notOk(res,"Wrong Coupon code")
        }




        return Response.ok(res,data);
    },
    saveorder: async function (req, res) {
        let userid = req.userid;
        let data = req.body;
        let orderid = data.orderid;
        const lang = req.lang;
        let temp = data.temp;
        let onlyupdate = data.onlyupdate;
        let newdata = new Order();
        if (orderid && orderid.length >1) {
            newdata = await Order.findById(orderid).exec()
        }
        let addresserror = false;
        newdata.paymenttype = data.paymenttype;
        newdata.payfortid = data.payfortid;
        newdata.nobox = data.nobox;
        newdata.discountnumber = data.discountnumber;
        newdata.doctype = data.doctype;
        newdata.selecteddate = data.selecteddate;

        let forbiddenddates = ["30/04/2022","2022-04-30","31/04/2022","2022-04-31","1/05/2022","2022-05-01","2/05/2022","2022-05-1","2022-05-2","2022-05-02","3/05/2022","2022-05-3","2022-05-03","4/05/2022","2022-05-4","2022-05-04"]

        console.log("data.selecteddate",data.selecteddate)
        //if(2>1 || forbiddenddates.includes(data.selecteddate)){
            let msge = "We are pleased to serve you starting from next Wednesday(14/7/2022)";
            if(lang=="ar"){
                msge = "تسرنا خدمتكم بداية من يوم الاربعاء  القادم (١٤/٧/٢٠٢٢)";
            }
           // return Response.notOk(res,msge);
       // }


        newdata.declaredvalue = data.declaredvalue;
        newdata.description = data.description;
        newdata.sendername = data.sendername;
        newdata.senderphone = data.senderphone;
        newdata.senderemail = data.senderemail;

        newdata.promocode = data.promocode;
        newdata.district = data.district;
        newdata.withextrabox = (data.agree1==2)


        let pincode = "KMS";
        let cityname = data.sendercity;
        newdata.rawsendercity = cityname;
        let cityinfo= await City.findOneCity(cityname)
        if(cityinfo){
            pincode = cityinfo.pincode;
            cityname = cityinfo.servingcity;
        }
        // replace city
        let senderaddressfound = await Address.findOneAddress(userid,data.senderaddress)
        if(senderaddressfound){
            newdata.senderaddress = senderaddressfound._id;
            let cityinfo= await City.findOneCity(senderaddressfound.city)
            if(cityinfo){
                pincode = cityinfo.pincode;
                cityname = cityinfo.servingcity;
            }
        }

        newdata.sendercity = cityname;


        let cityname2 = data.recivercity;
        let quickcityfix1 = await City.findOne({googlearabic:cityname2}).exec();
        if(quickcityfix1){
            cityname2=quickcityfix1.servingcity
        }else{
            let cityinfo22= await City.findOneCity(cityname2)
            if(cityinfo22){
                cityname2 = cityinfo22.servingcity;
            }
        }


        // replace city
        let reciveraddressfound = await Address.findOneAddress(userid,data.reciveraddress)
        if(reciveraddressfound){
            newdata.reciveraddress = reciveraddressfound._id;
            let cityinfo= await City.findOneCity(reciveraddressfound.city)
            if(cityinfo && reciveraddressfound.city.length>2){
                cityname2 = cityinfo.servingcity;
            }
        }

        newdata.recivername = data.recivername;
        newdata.reciverphone = data.reciverphone;
        newdata.recivercity = cityname2;
        newdata.price = data.price;
        newdata.oldprice = data.oldprice;
        newdata.selectedtime = data.selectedtime;
        newdata.selecteddaystring= data.selecteddaystring;
        newdata.user = userid;
        newdata.status = 1;
        let invoicelink  = "";


        await newdata.save();

        const invoicedate = Utils.renderDate(newdata.createdAt)

        let extraamount = 0;

        let wherecondition = "document";
        if(data.doctype=="NON-DOCUMENT"){
            wherecondition = "parcel";
        }
        let shipinfo= await Shipping.findOne({servicetype:wherecondition}).exec()

        const invoicenumber = await Settings.grabinvoicenumber()
        //
        let extrarow = false;
        let firstprice = shipinfo.chargefirstprice ;
        let secondprice = 0 ;
        let thirdprice = 0 ;
        if(parseInt(data.nobox)>1){
            extrarow = true;
            secondprice = shipinfo.chargemoreprice;
        }
        if(newdata.withextrabox){
            thirdprice = shipinfo.extrabox;
        }



        let latitude = "";
        let longitude = "";
        let address_line_1 = data.senderaddress;
        if(senderaddressfound){
            latitude  = senderaddressfound.lat;
            longitude  = senderaddressfound.long;
            address_line_1 = senderaddressfound.address1;
            if(address_line_1.length<2){
                address_line_1 = senderaddressfound.title;
            }
        }

        if(address_line_1.length<2){
            address_line_1 = cityname;
        }


        let origin_details = {
            "name": data.sendername,
            "phone": data.senderphone,
            "alternate_phone": "",
            "address_line_1": address_line_1,
            "address_line_2": "",
            "city": cityname,
            "pincode": pincode,
            "latitude": latitude,
            "longitude":longitude
        }


         let reclatitude = "";
         let reclongitude = "";




         quickcityfix1 = await City.findOne({googlearabic:cityname2}).exec();
        if(quickcityfix1){
            cityname2=quickcityfix1.servingcity
        }else{
            const quickcityfix0 = await City.findOneCity(cityname2.trim())
            if(quickcityfix0){
                cityname2=quickcityfix0.servingcity
            }
        }


        if(cityname2){
            const quickcityfix = StaticData.grabStaticcity().find(x=>x.arabicname==cityname2 );
            if(quickcityfix){
                cityname2=quickcityfix.zajilcityname
            }
        }


        var reciveraddress_line_1 = cityname2+" / "+data.district;
        if(reciveraddressfound){
            reclatitude  = reciveraddressfound.lat;
            reclongitude  = reciveraddressfound.long;
            reciveraddress_line_1 = reciveraddressfound.address1;
            if(reciveraddress_line_1.length<2){
                reciveraddress_line_1 = reciveraddressfound.title;
            }
            //if(cityname2.length<2){
             //   cityname2= reciveraddressfound.city
           // }
        }

        let destination_details = {
            "name": data.recivername,
            "phone": data.reciverphone,
            "alternate_phone": "",
            "address_line_1": reciveraddress_line_1,
            "address_line_2": "",
            "city": cityname2,
            "latitude": reclatitude,
            "longitude":reclongitude
        }



        if(newdata.reciveraddress && newdata.senderaddress && newdata.reciveraddress.toString() ==  newdata.senderaddress.toString()){
           // console.log("they are the same , ",newdata.reciveraddress,newdata.senderaddress,data.reciveraddress)
            await newdata.remove();
            return Response.notOk(res,"destination and origin same address")
        }

        if(newdata.reciveraddress && newdata.reciveraddress.toString()>2){
            addresserror = false;
        }

        if(!newdata.reciveraddress && newdata.recivercity.toString()<2){
            addresserror = true;
        }
        if(addresserror){
            await newdata.remove();
            return Response.notOk(res,"Address Error")
        }
        let awbnumber = "0";

        if(onlyupdate=="false"){
            let description = data.description;
            if(data.agree1==2){ // if i dont have a box
                description = data.description+" , boxes required: "+data.nobox;
            }
            // first create ship with cod 0 , create ticket  // then update
            let shipres = await ZajilHelper.createshipment(data.agree1,data.oldprice,data.promocode,data.discountnumber,userid,temp,data.doctype,data.paymenttype,data.price,data.nobox,description,data.declaredvalue,userid,origin_details,destination_details)
            if(shipres && !shipres.data && shipres.error){
                await newdata.remove();
                return Response.notOk(res,shipres.msg)
            }
            //
            const customer_reference_number = shipres.data.data[0]["reference_number"];
            const selectedtime= data.selectedtime.split("-");
            let pick = await ZajilHelper.createpickup(latitude,longitude,data.nobox,data.price,userid,temp,data.selecteddate,customer_reference_number,data.paymenttype,pincode,data.sendername,data.senderphone,address_line_1,"",cityname,selectedtime[0],selectedtime[1])
            if(pick && pick.error){
                await newdata.remove();
                return Response.notOk(res,pick.msg)
            }
            if(shipres.data){
                awbnumber = shipres.data.data[0].reference_number;
                newdata.awbnumber = awbnumber
                await newdata.save();
                ZajilHelper.createpdf(newdata.id,newdata.price,newdata.oldprice,newdata.awbnumber,invoicenumber,invoicedate,firstprice,secondprice,thirdprice,extrarow,extraamount,parseInt(data.nobox));
            }else{
                await newdata.remove();
                return Response.notOk(res,"payment error")
            }

        }else{
            awbnumber = newdata.awbnumber;
            console.log("old order",newdata)
        }

        if(temp=="false"){
            // real payment
           await ZajilHelper.updateshipment(userid,awbnumber,data.price,data.paymenttype,data.payfortid,data.promocode,"0","0")

        }
        newdata.district = data.district;
        invoicelink = _config("app.url")+"/"+newdata.id+".pdf"
        if(invoicelink){
            newdata.invoicelink = invoicelink;
        }
        await newdata.save()
        let orderinfo = newdata.toObject();

        orderinfo.selectedAddress = data.senderaddress;
        orderinfo.selectedAddress2 = data.reciveraddress;
        orderinfo.selectedCity2 = data.recivercity;

       // console.log("orderinfo ",orderinfo)
        return Response.ok(res,orderinfo);
    },






};

