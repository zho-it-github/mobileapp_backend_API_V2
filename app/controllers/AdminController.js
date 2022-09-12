let _ = require('lodash');
const findNearestLocation = require('map-nearest-location');
let Security = require("../helpers/Security");

const moment = require("moment")
let { Parser } = require('json2csv')
let ImageManager = require("../helpers/ImageManager");
let UserHelper = require("../helpers/UserHelper");
let Utils = require("../helpers/Utils")
let Response = require("../helpers/Response")

alllocations = [
    {
        "branchname": "Riyadh main branch",
        "locatiions": "24.608108, 46.760202"
    },
    {
        "branchname": "Al Naseem Branch",
        "locatiions": "24.714195, 46.817111"
    },
    {
        "branchname": "Al Quds Branch",
        "locatiions": "24.757580, 46.752696"
    },
    {
        "branchname": "Morrowoj branch firest",
        "locatiions": "24.752716, 46.674063"
    },
    {
        "branchname": "Riyadh Al-Weday Branch",
        "locatiions": "24.790764, 46.692590"
    },
    {
        "branchname": "Azizia branch",
        "locatiions": "24.595331, 46.746514"
    },
    {
        "branchname": "Al-Nahda branch",
        "locatiions": "24.773742, 46.817735"
    },
    {
        "branchname": "Al Sahafa Branch",
        "locatiions": "24.809729, 46.642362"
    },
    {
        "branchname": "Dhahrat Laban Branch",
        "locatiions": "24.624565, 46.545154"
    },
    {
        "branchname": "Uriga branch",
        "locatiions": "24.578497, 46.546488"
    },
    {
        "branchname": "Alsheifa  branch",
        "locatiions": "24.551964, 46.712883"
    },
    {
        "branchname": "Al Suwaidi branch",
        "locatiions": "24.575832, 46.659504"
    },
    {
        "branchname": "Yarmouk branch",
        "locatiions": "24.803150, 46.803385"
    },
    {
        "branchname": "Morrooj second branch",
        "locatiions": "24.765709, 46.661100"
    },
    {
        "branchname": "shuqra branch",
        "locatiions": "25.239461, 45.246199"
    },
    {
        "branchname": "Al Rawabi Branch",
        "locatiions": "24.697332, 46.791793"
    },
    {
        "branchname": "Al Majmaah Branch",
        "locatiions": "25.906751, 45.342656"
    },
    {
        "branchname": "Alkharj branch",
        "locatiions": "24.139694, 47.291694"
    },
    {
        "branchname": "Al Duwadimi Branch",
        "locatiions": "24.520861, 44.417722"
    },
    {
        "branchname": "Aflaj branch",
        "locatiions": "22.303437, 46.710517"
    },
    {
        "branchname": "Wadi Al-Dawasir Branch",
        "locatiions": "20.478030, 44.777049"
    },
    {
        "branchname": "Zulfi Branch",
        "locatiions": "26.299561, 44.813678"
    },
    {
        "branchname": "Riyadh Sultana Branch",
        "locatiions": "24.606745, 46.684703"
    },
    {
        "branchname": "Almathb Branch",
        "locatiions": "24.6966117,46.834981"
    },
    {
        "branchname": "Alwoorod Branch",
        "locatiions": "24.6966117,46.834981"
    },
    {
        "branchname": "Hafer al batin Branch",
        "locatiions": "28.419865, 45.974144"
    },
    {
        "branchname": "Buraydah suq al qad Branch",
        "locatiions": "26.341517, 43.954343"
    },
    {
        "branchname": "Buraydah Branch",
        "locatiions": "26.346029, 43.947685"
    },
    {
        "branchname": "Unayzah Branch",
        "locatiions": "26.086526, 43.970764"
    },
    {
        "branchname": "Rass Branch",
        "locatiions": "25.866194, 43.489944"
    },
    {
        "branchname": "Hail Branch",
        "locatiions": "27.477207, 41.723554"
    },
    {
        "branchname": "Al Mahattah, Hail",
        "locatiions": "27.514906, 41.694121"
    },
    {
        "branchname": "Sakaka Branch",
        "locatiions": "29.950432, 40.214250"
    },
    {
        "branchname": "turif  Branch",
        "locatiions": "24.6966116,46.834981"
    },
    {
        "branchname": "Arar   Branch",
        "locatiions": "30.955799, 41.041377"
    },
    {
        "branchname": "Rafha Branch",
        "locatiions": "29.625923, 43.520594"
    },
    {
        "branchname": "Al Qurayyat Branch",
        "locatiions": "31.334993, 37.340054"
    },
    {
        "branchname": "Tubarjal Branch",
        "locatiions": "30.481129, 38.240455"
    },
    {
        "branchname": "Dumat Al-Jandal Branch",
        "locatiions": "24.6966117,46.834981"
    },
    {
        "branchname": "Hail alshemli Branch",
        "locatiions": "24.6966117,46.834981"
    },
    {
        "branchname": "Yanbu Branch -",
        "locatiions": "24.071196, 38.106285"
    },
    {
        "branchname": "JEDD-Darrajah Branch-",
        "locatiions": "21.567831, 39.180851"
    },
    {
        "branchname": "Jeddah Main Branch-",
        "locatiions": "21.456137, 39.181739"
    },
    {
        "branchname": "Jeddah Jeddah University",
        "locatiions": "21.484763, 39.249693"
    },
    {
        "branchname": "Jeddah Makarouna Branch-",
        "locatiions": "21.617155, 39.178082"
    },
    {
        "branchname": "JED - Tahlia Branch-",
        "locatiions": "21.566351,39.224666"
    },
    {
        "branchname": "Jeddah Samer Branch-",
        "locatiions": "21.578416, 39.234255"
    },
    {
        "branchname": "Jeddah Naeem Branch-",
        "locatiions": "21.619963, 39.147007"
    },
    {
        "branchname": "Jeddah Ameer Majid Branch-",
        "locatiions": "21.532941, 39.207964"
    },
    {
        "branchname": "Jeddah Hamdaniya Branch-",
        "locatiions": "21.734736, 39.193797"
    },
    {
        "branchname": "Jeddah Al - Salama Branch -",
        "locatiions": "21.593388, 39.155937"
    },
    {
        "branchname": "Taif Branch -",
        "locatiions": "21.277950, 40.409111"
    },
    {
        "branchname": "Tayif Mowiya Branch-",
        "locatiions": "21.283053, 40.397342"
    },
    {
        "branchname": "Makkah Branch -",
        "locatiions": "21.393921, 39.721118"
    },
    {
        "branchname": "Makkah Al-Noor Branch -",
        "locatiions": "21.446251, 39.861534"
    },
    {
        "branchname": "Makkah Al - Nazha Branch. -",
        "locatiions": "21.437565, 39.794003"
    },
    {
        "branchname": "Jeddah Naseem Branch-",
        "locatiions": "21.512641, 39.231272"
    },
    {
        "branchname": "Makkah KAKIYA Branch-",
        "locatiions": "21.395438, 39.805015"
    },
    {
        "branchname": "Madnah Branch -",
        "locatiions": "24.543621, 39.605123"
    },
    {
        "branchname": "Madnah airport Branch-",
        "locatiions": "24.480093, 39.628166"
    },
    {
        "branchname": "Madinah Shoran  Branch -",
        "locatiions": "24.387152, 39.620060"
    },
    {
        "branchname": "BAHA Branch -",
        "locatiions": "20.011514, 41.497099"
    },
    {
        "branchname": "Qunfuda  Branch -",
        "locatiions": "19.133467, 41.083470"
    },
    {
        "branchname": "Laith Branch -",
        "locatiions": "20.151184, 40.270790"
    },
    {
        "branchname": "Hulaya Main Branch -",
        "locatiions": "18.770042, 41.385688"
    },
    {
        "branchname": "Al - Ulaa Branch",
        "locatiions": "26.6040140,37.9290190"
    },
    {
        "branchname": "Hanakiya  Branch -",
        "locatiions": "24.869974, 40.511827"
    },
    {
        "branchname": "Hadaad Bani Malek",
        "locatiions": "20.602089, 41.042900"
    },
    {
        "branchname": "Mahad Al Dahab Branch -",
        "locatiions": "23.492622, 40.892048"
    },
    {
        "branchname": "- Jeddah Taiba Branch",
        "locatiions": "21.793148, 39.133114"
    },
    {
        "branchname": "- Jeddah Marjan Branch",
        "locatiions": "21.687538, 39.107019"
    },
    {
        "branchname": "- Jeddah Ajawid Branch",
        "locatiions": "21.414973, 39.290909"
    },
    {
        "branchname": "Jeddah Rabigh Branch",
        "locatiions": "22.799679, 39.035572"
    },
    {
        "branchname": "Tabuk Branch -",
        "locatiions": "28.367344, 36.570223"
    },
    {
        "branchname": "Tabuk Nahda Branch -",
        "locatiions": "28.399622, 36.530060"
    },
    {
        "branchname": "Tima Branch",
        "locatiions": "27.612403, 38.536698"
    },
    {
        "branchname": "Sharurah branch",
        "locatiions": "17.491744, 47.114102"
    },
    {
        "branchname": "Najran branch",
        "locatiions": "17.549150, 44.253716"
    },
    {
        "branchname": "Abha branch",
        "locatiions": "18.209678, 42.514173"
    },
    {
        "branchname": "Khamis Mushait Branch",
        "locatiions": "18.285155, 42.673441"
    },
    {
        "branchname": "Khamis Mushayt Al Zahour",
        "locatiions": "18.301947, 42.734294"
    },
    {
        "branchname": "Bisha branch",
        "locatiions": "20.010909, 42.607375"
    },
    {
        "branchname": "Namas branch",
        "locatiions": "19.117460, 42.131072"
    },
    {
        "branchname": "Majardah branch",
        "locatiions": "19.118883, 41.922076"
    },
    {
        "branchname": "Mahayel Aseer Branch",
        "locatiions": "18.546070, 42.036799"
    },
    {
        "branchname": "Bish branch",
        "locatiions": "17.374711, 42.513100"
    },
    {
        "branchname": "sabia branch",
        "locatiions": "17.148706, 42.638310"
    },
    {
        "branchname": "Jizan Al-Safa Branch",
        "locatiions": "16.881961, 42.561320"
    },
    {
        "branchname": "Jazan main branch",
        "locatiions": "16.908062, 42.705153"
    },
    {
        "branchname": "Abu Arish branch",
        "locatiions": "16.985992, 42.821064"
    },
    {
        "branchname": "Samtah branch",
        "locatiions": "16.606180, 42.938723"
    },
    {
        "branchname": "Dmmam Inbound",
        "locatiions": "26.406333, 50.155083"
    },
    {
        "branchname": "Dammam 42",
        "locatiions": "26.437889, 50.065667"
    },
    {
        "branchname": "Dammam Souq",
        "locatiions": "26.444833, 50.102444"
    },
    {
        "branchname": "Dharan",
        "locatiions": "26.348028, 50.141389"
    },
    {
        "branchname": "Khobar Aqrabia",
        "locatiions": "26.289806, 50.196639"
    },
    {
        "branchname": "Khobar Thoqba",
        "locatiions": "26.272806, 50.195278"
    },
    {
        "branchname": "Khobar Jisser",
        "locatiions": "26.211056, 50.197972"
    },
    {
        "branchname": "AlAhsaa Mubarkya",
        "locatiions": "25.373861, 49.614806"
    },
    {
        "branchname": "AlAhsaa Alkot",
        "locatiions": "25.378194, 49.585111"
    },
    {
        "branchname": "Jubail Albalad",
        "locatiions": "27.008139, 49.658472"
    },
    {
        "branchname": "Jubail Alhaiaah Almalkeyah",
        "locatiions": "27.082250, 49.557611"
    },
    {
        "branchname": "Qatif",
        "locatiions": "26.551667, 50.017194"
    },
    {
        "branchname": "Khafji",
        "locatiions": "28.406194, 48.465556"
    },
    {
        "branchname": "Dammam Ghrnath",
        "locatiions": "26.416472, 50.079917"
    },
    {
        "branchname": "Sikat Hadid",
        "locatiions": "24.6531137,46.7502858"
    }
];
module.exports = {

    /**
     * Show homepage
     * @param req
     * @param res
     */

    managerlogin: async function (req, res) {
        let data =  req.body;

        let username =  data.username;
        let password =  data.password;

        const response = await Manager.findOne({username: username}).populate('managertype').exec()
        // console.log(response,email)
        //return res.ok({
        //   managertype:"admin",
        //  id:"4324234324",
        //  token: await Security.generateToken("4234324324324324234", "full_name", 1,"admin",true),
        //});
        if(response && response.username){
            response.comparePassword(password, async function (valid) {
                if (!valid) return Response.notOk(res,'Invalid password');

                response.lastlogin = Date.now();
                await response.save();
                return res.ok({
                    managertype:response.managertype.name,
                    id:response._id,
                    token: await Security.generateToken(response._id, response.full_name, 1,response.managertype.name,true),
                });

            });

        }else{
            return res.forbidden("user not found");
        }

    },

    listmanagertype:async function (req, res) {
        const items = await ManagerType.find().sort({ "$natural": -1 }).exec();
        return res.ok(
            items
        );
    },

    listmanager:async function (req, res) {
        const items = await Manager.find().populate('managertype').sort({ "$natural": -1 }).exec();
        return Response.ok(res,
            items
        );
    },

    adminlistbanner:async function (req, res) {
        const items = await Banner.find().sort({ "$natural": -1 }).exec();
        return Response.ok(res,
            items
        );
    },
    adminlistcountry:async function (req, res) {
        const items = await Country.find().sort({ "$natural": -1 }).exec();
        return Response.ok(res,
            items
        );
    },

    adminlistpaymenttype:async function (req, res) {
        const items = await PaymentType.find().sort({ "$natural": -1 }).exec();
        return Response.ok(res,
            items
        );
    },

    adminlistshipping:async function (req, res) {
        const items = await Shipping.find().sort({ "$natural": -1 }).exec();
        return Response.ok(res,
            items
        );
    },

    adminlistoutlets:async function (req, res) {
        const items = await Location.find().sort({ "$natural": -1 }).exec();
        return Response.ok(res,
            items
        );
    },

    adminlisttimeslots:async function (req, res) {
        const items = await TimeSlots.find().sort({ "$natural": -1 }).exec();
        return Response.ok(res,
            items
        );
    },

    adminlistorder:async function (req, res) {
        const items = await Order.find().populate("user senderaddress reciveraddress").sort({ "$natural": -1 }).exec();
        return Response.ok(res,
            items
        );
    },


    detectphonetypes:async function (req, res) {
        const items = await User.find().sort({ "$natural": -1 }).exec();
        let android = 0;
        let iphone = 0;
        for(let i =0 ;i<items.length;i++){
            let testtken = items[i].push.token;
            if(testtken.length>20){
                android++;
            }else{
                iphone++;
            }
        }

        return Response.ok(res,
            {
                iphone,
                android
            }
        );
    },

    adminlistlogs:async function (req, res) {
        const items = await Log.find().populate("user").sort({ "$natural": -1 }).exec();
        return Response.ok(res,
            items
        );
    },
    adminlistlogspagination:async function (req, res) {
        const page = req.params.page;
        const limit = _config("app.pagination_limit");
        let data =  req.body;
        const filtered = data.filtered;

        let condition= {}

        for(let i =0 ;i<filtered.length;i++){
            let key = filtered[i].id;
            const value = filtered[i].value
            condition[key]= { "$regex": value, "$options": "i" };
        }
        let skip = 0 ;
        if(page > 1){
            skip = (page-1)*limit;
        }
        let count = await Log.countDocuments({
            $and: [
                condition
            ]
        }).exec();
        const items = await Log.find({
            $and: [
                condition
            ]
        }).populate("user").skip(skip).limit(limit).sort({ "$natural": -1 }).exec();
        return Response.ok(res,{
            data:items,
            count: Math.ceil(count/limit)
        });
    },
    adminlistday:async function (req, res) {
        const items = await Day.find().populate("timeslots city").sort({ "$natural": -1 }).exec();
        return Response.ok(res,
            items
        );
    },

    adminlistcity:async function (req, res) {
        const items = await City.find().populate("country").sort({ "$natural": -1 }).exec();
        return Response.ok(res,
            items
        );
    },



    adminlistaddress:async function (req, res) {
        const items = await Address.find().populate("user").sort({ "$natural": -1 }).exec();
        return Response.ok(res,
            items
        );
    },


    adminlistrating:async function (req, res) {
        const items = await Rate.find().populate("user").sort({ "$natural": -1 }).exec();
        return Response.ok(res,
            items
        );
    },
    ratingexport:async function (req, res) {


        let items = await Rate.find().populate("user").sort({ "$natural": -1 }).exec();

        let neededdata = [];
        for(let i = 0 ;i<items.length;i++){


            neededdata.push({
                countofstars:items[i].countofstars,
                comment:items[i].comments,
                phone:items[i].user && items[i].user.phone,
                created_at:Utils.renderDate(items[i].createdAt),
            })
        }

        const json2csv = new Parser({
            withBOM: true,
        })
        try {
            const csv = json2csv.parse(neededdata)
            res.attachment('cartrequestexport.csv')
            return   res.status(200).send(csv)
        } catch (error) {
            console.log('error:', error.message)
            return res.status(500).send(error.message)
        }
    },

    nearbylocation:async function (req, res) {


        const longitude = parseFloat(req.params.latitude);
        const latitude = parseFloat(req.params.longitude);

        //Log.AddLog("nearbylocation",longitude+" "+latitude,null)
       /* for(let i = 0 ;i<alllocations.length;i++){
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
          // await xx.save();
        }*/

      /*

*/




        let data2 = await Location.find({
            location: {
                $near: {
                    $maxDistance: 500000000000,
                    $geometry: {
                        type: "Point",
                        coordinates: [latitude, longitude]
                    }
                },
            }
        }).lean({virtuals:true}).exec();

        for(let i = 0 ;i<data2.length;i++){

            const myLocation = {
                lat: data2[i].location.coordinates[0],
                lng: data2[i].location.coordinates[1]
            };

            const locations = [
                {
                    lat: latitude,
                    lng: longitude,
                },
            ];

            const data = findNearestLocation(myLocation, locations);

            const km =  data.distance/ 1000;
            data2[i].distance  =km.toFixed(1) + " km"
            data2[i].locations  =data2[i].location.coordinates[0]+","+data2[i].location.coordinates[1]

        }
        return Response.ok(res,data2);
    },

    adminlistcontent:async function (req, res) {
        const items = await Content.find().sort({ "$natural": -1 }).exec();
        return Response.ok(res,
            items
        );
    },

    adminlistreview:async function (req, res) {
        const items = await Reviews.find().sort({ "$natural": -1 }).lean({virtuals:true}).exec();
        return Response.ok(res,
            items
        );
    },


    adminlistguide:async function (req, res) {
        const items = await Guided.find().sort({ "$natural": -1 }).exec();
        return Response.ok(res,
            items
        );
    },
    adminlistthread:async function (req, res) {
        const items = await Thread.find().sort({ "$natural": -1 }).exec();
        return Response.ok(res,
            items
        );
    },

    adminlistsponsor:async function (req, res) {
        const items = await Sponsor.find().sort({ "$natural": -1 }).exec();
        return Response.ok(res,
            items
        );
    },
    bannerAddorUpdate: async function (req, res) {
        const data = req.body;
        let newdata = new Banner();
        if (data._id && data._id.length >1) {
            newdata = await Banner.findById(data._id).exec()
        }
        newdata.title = data.title;
        if(data.sidepicture && data.sidepicture.includes("image")){
            newdata.picture = await ImageManager.uploadimagebase64row(data.sidepicture);
        }
        await newdata.save();

        return Response.ok(res);
    },

    countryAddorUpdate: async function (req, res) {
        const data = req.body;
        let newdata = new Country();
        if (data._id && data._id.length >1) {
            newdata = await Country.findById(data._id).exec()
        }
        newdata.name = data.name;
        newdata.dialcode = data.dialcode;
        await newdata.save();

        return Response.ok(res);
    },

    paymenttypeAddorUpdate: async function (req, res) {
        const data = req.body;
        let newdata = new PaymentType();
        if (data._id && data._id.length >1) {
            newdata = await PaymentType.findById(data._id).exec()
        }
        newdata.name = data.name;
        await newdata.save();

        return Response.ok(res);
    },

    outletsAddorUpdate: async function (req, res) {
        const data = req.body;
        let newdata = new Location();
        if (data._id && data._id.length >1) {
            newdata = await Location.findById(data._id).exec()
        }




        newdata.branchcode = data.branchcode;
        newdata.zajilmap = data.zajilmap;
        newdata.name = data.name;
        newdata.location = {
            type:"Point",
            coordinates:[parseFloat(data.lat),parseFloat(data.lot)]
        }
        await newdata.save();

        return Response.ok(res);
    },

    timeslotsAddorUpdate: async function (req, res) {
        const data = req.body;
        let newdata = new TimeSlots();
        if (data._id && data._id.length >1) {
            newdata = await TimeSlots.findById(data._id).exec()
        }
        newdata.name = data.name;
        await newdata.save();

        return Response.ok(res);
    },



    dayAddorUpdate: async function (req, res) {
        const data = req.body;
        let newdata = new Day();
        if (data._id && data._id.length >1) {
            newdata = await Day.findById(data._id).exec()
        }
        newdata.name = data.name;
        newdata.timeslots = data.timeslots;
        newdata.city = data.city;
        await newdata.save();

        return Response.ok(res);
    },

    shippingAddorUpdate: async function (req, res) {
        const data = req.body;
        let newdata = new Shipping();
        if (data._id && data._id.length >1) {
            newdata = await Shipping.findById(data._id).exec()
        }
        newdata.extrabox = data.extrabox;
        newdata.servicetype = data.servicetype;
        newdata.chargefirstprice = data.chargefirstprice;
        newdata.chargemoreprice = data.chargemoreprice;
        await newdata.save();

        return Response.ok(res);
    },

    cityAddorUpdate: async function (req, res) {
        const data = req.body;
        let newdata = new City();
        if (data._id && data._id.length >1) {
            newdata = await City.findById(data._id).exec()
        }
        newdata.name = data.name;
        newdata.pincode = data.pincode;
        newdata.country = data.country;

        newdata.servingcity = data.servingcity;
        newdata.googlearabic = data.googlearabic;
        newdata.googleenglish = data.googleenglish;
        newdata.lat = data.lat;
        newdata.long = data.long;

        newdata.branchcode = data.branchcode;
        newdata.zajilmap = data.zajilmap;
        await newdata.save();

        return Response.ok(res);
    },

    contentAddorUpdate: async function (req, res) {
        const data = req.body;
        let newdata = new Content();
        if (data._id.length >1) {
            newdata = await Content.findById(data._id).exec()
        }
        newdata.title = data.title;
        newdata.text = data.text;
        await newdata.save();

        return Response.ok(res);
    },

    reviewAddorUpdate: async function (req, res) {
        const data = req.body;
        let newdata = new Reviews();
        if (data._id.length >1) {
            newdata = await Reviews.findById(data._id).exec()
        }
        newdata.user = data.user;
        newdata.review = data.review;
        newdata.authorposition = data.authorposition;
        if(req.body.authorpicture.includes("image")){
            newdata.authorpicture = await ImageManager.uploadimagebase64row(req.body.authorpicture);
        }
        await newdata.save();

        return Response.ok(res);
    },

    guidedAddorUpdate: async function (req, res) {
        const data = req.body;
        let newdata = new Guided();
        if (data._id.length >1) {
            newdata = await Guided.findById(data._id).exec()
        }
        newdata.question = data.question;
        newdata.reply = data.reply;
        await newdata.save();

        return Response.ok(res);
    },

    threadAddorUpdate: async function (req, res) {
        const data = req.body;
        let newdata = new Thread();
        if (data._id.length >1) {
            newdata = await Thread.findById(data._id).exec()
        }

        const approved = data.approved;
        newdata.title = data.title;
        newdata.description = data.description;



        if(data.picturebase64){
           let picture = await ImageManager.uploadimagebase64row(data.picturebase64)
            if(picture){
                newdata.picture = picture;
            }

        }

         console.log("approved",approved)
        newdata.status = approved=="yes"?1:0;


        await newdata.save();

        return Response.ok(res);
    },

    userexport:async function (req, res) {

        let items = await User.find().sort({ "$natural": -1 }).lean().exec();
        let neededdata = [];
        for(let i = 0 ;i<items.length;i++){
            const newdate = moment(items[i].createdAt).add(0, 'hours').format('DD/MM/YYYY HH:mm')

            neededdata.push({
                name:items[i].full_name,
                email:  items[i].email,
                dialcode:items[i].dialcode,
                phone: items[i].phone,
                company: items[i].company,
                id:items[i].idtxt,
                date:newdate,

            })
        }

        const json2csv = new Parser()
        try {
            const csv = json2csv.parse(neededdata)
            res.attachment('export.csv')
            return   res.status(200).send(csv)
        } catch (error) {
            console.log('error:', error.message)
            return res.status(500).send(error.message)
        }
    },
    sponsorAddorUpdate: async function (req, res) {
        const data = req.body;
        let newdata = new Sponsor();
        if (data._id.length >1) {
            newdata = await Sponsor.findById(data._id).exec()
        }




        if(data.picturebase64){
            let picture = await ImageManager.uploadimagebase64row(data.picturebase64)
            if(picture){
                newdata.picture = picture;
            }

        }

        newdata.title = data.title;


        await newdata.save();

        return Response.ok(res);
    },
    adminbannerdelete: function (req, res) {
        const id = req.params.id;
        Banner.findById(id, async function (error, data) {
            if (error) return res.serverError(error);
            if (!data) return res.notFound();
            data.remove(function (error) {
                if (error) return res.serverError(error);
                return res.ok();
            });

        });
    },

    admincountrydelete: function (req, res) {
        const id = req.params.id;
        Country.findById(id, async function (error, data) {
            if (error) return res.serverError(error);
            if (!data) return res.notFound();
            data.remove(function (error) {
                if (error) return res.serverError(error);
                return res.ok();
            });

        });
    },

    adminpaymenttypedelete: function (req, res) {
        const id = req.params.id;
        Shipping.findById(id, async function (error, data) {
            if (error) return res.serverError(error);
            if (!data) return res.notFound();
            data.remove(function (error) {
                if (error) return res.serverError(error);
                return res.ok();
            });

        });
    },
    adminoutletssdelete: function (req, res) {
        const id = req.params.id;
        Location.findById(id, async function (error, data) {
            if (error) return res.serverError(error);
            if (!data) return res.notFound();
            data.remove(function (error) {
                if (error) return res.serverError(error);
                return res.ok();
            });

        });
    },

    admintimeslotssdelete: function (req, res) {
        const id = req.params.id;
        TimeSlots.findById(id, async function (error, data) {
            if (error) return res.serverError(error);
            if (!data) return res.notFound();
            data.remove(function (error) {
                if (error) return res.serverError(error);
                return res.ok();
            });

        });
    },

    adminlogdelete: function (req, res) {
        const id = req.params.id;
        Log.findById(id, async function (error, data) {
            if (error) return res.serverError(error);
            if (!data) return res.notFound();
            data.remove(function (error) {
                if (error) return res.serverError(error);
                return res.ok();
            });

        });
    },

    adminOrderdelete: function (req, res) {
        const id = req.params.id;
        Order.findById(id, async function (error, data) {
            if (error) return res.serverError(error);
            if (!data) return res.notFound();
            data.remove(function (error) {
                if (error) return res.serverError(error);
                return res.ok();
            });

        });
    },

    admintdaysdelete: function (req, res) {
        const id = req.params.id;
        Day.findById(id, async function (error, data) {
            if (error) return res.serverError(error);
            if (!data) return res.notFound();
            data.remove(function (error) {
                if (error) return res.serverError(error);
                return res.ok();
            });

        });
    },

    admincitydelete: function (req, res) {
        const id = req.params.id;
        City.findById(id, async function (error, data) {
            if (error) return res.serverError(error);
            if (!data) return res.notFound();
            data.remove(function (error) {
                if (error) return res.serverError(error);
                return res.ok();
            });

        });
    },

    adminreviewdelete: function (req, res) {
        const id = req.params.id;
        Reviews.findById(id, async function (error, data) {
            if (error) return res.serverError(error);
            if (!data) return res.notFound();
            data.remove(function (error) {
                if (error) return res.serverError(error);
                return res.ok();
            });

        });
    },

    adminguidedelete: function (req, res) {
        const id = req.params.id;
        Guide.findById(id, async function (error, data) {
            if (error) return res.serverError(error);
            if (!data) return res.notFound();
            data.remove(function (error) {
                if (error) return res.serverError(error);
                return res.ok();
            });

        });
    },

    listuser:async function (req, res) {
        let items = await User.find().sort({ "$natural": -1 }).lean({virtuals:true}).exec();
        return res.ok(
            items
        );
    },
    listroomadmin:async function (req, res) {
        let items = await Room.find().populate("users").sort({ "$natural": -1 }).lean({virtuals:true}).exec();
        return res.ok(
            items
        );
    },
    createroomfromadmin: async function(req, res) {
        const data = req.body;
        let newdata = new Room();
        if (data._id.length >1) {
            newdata = await Room.findById(data._id).exec()
        }
        console.log(data)
        newdata.title = data.title;
        newdata.users = data.users;
        newdata.ispublic = data.ispublic;
        newdata.isgroup = true;
        await newdata.save();

        return Response.ok(res);
        //
    },

    listreporteduser:async function (req, res) {
        let items = await UserReport.find().populate("user reported").sort({ "$natural": -1 }).lean({virtuals:true}).exec();
        return res.ok(
            items
        );
    },
    listreportedmsguser:async function (req, res) {
        let items = await UserReportMessage.find().populate("user reported message").sort({ "$natural": -1 }).lean({virtuals:true}).exec();
        return res.ok(
            items
        );
    },

    admingetsettings: async function (req, res) {
        let data  = await Settings.findOne().lean({virtuals:true}).exec();
        return Response.ok(res,data);

    },



    listaddressx: async function (req, res) {
        let data  = await Address.find().sort({ "$natural": -1 }).lean({virtuals:true}).exec();
        return Response.ok(res,data);

    },

    adminsavesettings: async function (req, res) {


        let lessthan = req.body.lessthan;
        let morethan = req.body.morethan;
        let documentx = req.body.documentx;



        let data  = await Settings.findOne().exec();


        if(data){
            data.lessthan = lessthan;
            data.morethan = morethan;
            data.documentx = documentx;
            await data.save();
        }else{
            data  = new Settings();
            data.lessthan = lessthan;
            data.morethan = morethan;
            data.documentx = documentx;
            await data.save();
        }
        return Response.ok(res,data);
    },

    listcontactadmin:async function (req, res) {
        let items = await Contact.find().sort({ "$natural": -1 }).lean({virtuals:true}).exec();
        return res.ok(
            items
        );
    },
    adminuserdelete: function (req, res) {
        const id = req.params.id;

        User.findById(id, function (error, data) {
            if (error) return res.serverError(error);
            if (!data) return res.notFound();

            Address.deleteMany({user:id}).exec();
            Order.deleteMany({user:id}).exec();

            data.remove(function (error) {
                if (error) return res.serverError(error);
                return res.ok();
            });

        });
    },

    adminroomdelete: function (req, res) {
        const id = req.params.id;

        Room.findById(id, function (error, data) {
            if (error) return res.serverError(error);
            if (!data) return res.notFound();
            data.remove(function (error) {
                if (error) return res.serverError(error);
                return res.ok();
            });

        });
    },


    admindeletecontact: function (req, res) {
        const id = req.params.id;

        Contact.findById(id, function (error, data) {
            if (error) return res.serverError(error);
            if (!data) return res.notFound();


            data.remove(function (error) {
                if (error) return res.serverError(error);
                return res.ok();
            });

        });
    },


    userAddorUpdate: async function (req, res) {

        console.log("userAddorUpdate ....");

        const data = await ImageManager.uploadimagebody(req,res)
        //console.log("data",data)
        if (data._id.length >1) {
            User.findById(data._id, async function (error, item) {
                if (error) return res.serverError(error);
                if (!item) return res.notFound("item not found");

                item.username = data.username;
                item.full_name = data.full_name;
                item.phone = data.phone;
                item.dob = data.dob;
                item.country = data.country;



                item.email = data.email;
                if(data.newpassword && data.newpassword.length>1){
                    item.password = data.newpassword;
                    console.log("new password detect");
                    //
                    UserHelper.sendResetPasswordEmail(data._id,data.email);
                }




                item.picture =  data.picture;
                await item.save();
                return res.ok();
            });
        }else{

            let newdata = new User();
            newdata.first_name = data.first_name;
            newdata.last_name = data.last_name;
            newdata.email = data.email;
            newdata.password = data.password;
            newdata.comments = data.comments;
            newdata.birthday = data.birthday;
            newdata.phone = data.phone;
            newdata.picture =  data.picture;
            await newdata.save();
            return res.ok();

        }


    },

    adminthreaddelete: function (req, res) {
        const id = req.params.id;
        Thread.findById(id, async function (error, data) {
            if (error) return res.serverError(error);
            if (!data) return res.notFound();
            data.remove(function (error) {
                if (error) return res.serverError(error);
                return res.ok();
            });

        });
    },

    adminsponsordelete: function (req, res) {
        const id = req.params.id;
        Sponsor.findById(id, async function (error, data) {
            if (error) return res.serverError(error);
            if (!data) return res.notFound();
            data.remove(function (error) {
                if (error) return res.serverError(error);
                return res.ok();
            });

        });
    },


    managerAddorUpdate: function (req, res) {
        let data =  req.body;

        if (data._id.length >1) {
            Manager.findById(data._id, function (error, item) {
                if (error) return res.serverError(error);
                if (!item) return res.notFound("item not found");

                item.full_name = data.full_name;
                item.username = data.username;
                // item.password = data.password;
                if(data.newpassword && data.newpassword.length>1){
                    item.password = data.newpassword;
                }
                item.comments = data.comments;
                item.managertype = data.managertype;
                item.phone = data.phone;
                item.save(function (error) {
                    if (error) return res.serverError(error);
                    return res.ok();
                });
            });
        }else{

            let newdata = new Manager();
            newdata.full_name = data.full_name;
            newdata.username = data.username;
            newdata.password = data.password;
            newdata.comments = data.comments;
            newdata.managertype = data.managertype;
            newdata.phone = data.phone;

            newdata.save(function (error) {
                console.log(error)
                if (error) return res.serverError(error);
                return res.ok();
            });
        }
    },
    adminmanagerdelete: function (req, res) {
        const id = req.params.id;
        Manager.findById(id, function (error, data) {
            if (error) return res.serverError(error);
            if (!data) return res.notFound();

            data.remove(function (error) {
                if (error) return res.serverError(error);
                return res.ok();
            });

        });
    },

    admincontentdelete: function (req, res) {
        const id = req.params.id;
        Content.findById(id, function (error, data) {
            if (error) return res.serverError(error);
            if (!data) return res.notFound();

            data.remove(function (error) {
                if (error) return res.serverError(error);
                return res.ok();
            });

        });
    },

};
