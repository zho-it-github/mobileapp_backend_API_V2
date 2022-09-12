module.exports = {

    /**
     * The runtime "environment" of your app is either typically
     * 'development' or 'production'.
     */

    env: process.env.NODE_ENV || 'development', // production

    /**
     * The application base url
     */

    url: 'http://localhost:3061',

    /**
     * The `port` setting determines which TCP port your app will be deployed on.
     */

    port: process.env.PORT || 3085,

    /**
     * The application base url
     */

    imageurl: 'http://localhost:3085/upload',

    /**
     * Enabling trust proxy will have the following impact:
     * The value of req.hostname is derived from the value set in the X-Forwarded-Host header, which can be set by the client or by the proxy.
     * X-Forwarded-Proto can be set by the reverse proxy to tell the app whether it is https or http or even an invalid name. This value is reflected by req.protocol.
     * The req.ip and req.ips values are populated with the list of addresses from X-Forwarded-For.
     */

    trust_proxy: true,

    /**
     * The x-powered-by header key
     */

    x_powered_by: 'sam',

    /**
     * View engine to use for your app's server-side views
     */

    view_engine: "ejs",

    /**
     * The views directory path
     */

    views: require('path').join(__basepath, 'app/views'),

    /**
     * The api url prefix
     */

    api_prefix: "api",

    /**
     * The upload folder path
     */

    upload_path: "upload/",

    local_upload_path: "public/upload/",
    cryptrkey : "myTotalySecretKey",
    conractid : "contract id",

    pagination_limit: 20,
    csvuploadpath : "./",
    // gmail login info for sending mail
    gmailfrom : "",
    gmailpass: "",
    // secret for session token
    secret : "893c53d48ecf4d609bcec71b220f2fff",


    // zajil push android
    androidsecret : "AAAAs3KQglo:APA91bH9WKjOSTZwE6tu7fvnCOPQ5Uj9LnLjxm_cist7hEFmxgYL68VH4qKMleU7Q7XdZYLz1Z45niNw7qDLIW5EB2BTHKqxSpvI7rt_UvzIt1T61Pa-3ZEFZl6PHf8gSzFx3ZXmwnzj",

    // push ios,
    keyId : 'H2JGZ9AB8J',
    teamId : '3VVP3FUY38',
    topic : 'com.ffke.zajil', // appbundle

    // google geolocation api key
    googleAPIKEY : "AIzaSyCEIakI1L1Z5BeTRAcourwFtaHwg0QEAhs" ,

    SMSKEY:"e8f430c2f2c2c3312f5ddea7fa184142",
    CREATEPICKUPAPI:"2d17605aca8f1a6e69c2de102fe98f",
    CANCELAPI:"Njc4OTYzNTI0NDYyMzM3NTYyNDI5NTg5MzYyNzQ1Og==",
    FRESHDESKAPI:"U004b0VrODd4SWVzbzc3blNIcGw6WA==",
    customer_code:"MOBAPP",
    service_type_id:"1",
    getConsignmentEventsFromPhone:"https://demodashboardapi.shipsy.in/api/client/integration/getConsignmentEventsFromPhone",
    zajilapi:"https://demodashboardapi.shipsy.in"
};

