let router = require("express").Router();


router.post("/user/forgot", UserController.forgotpassword);
router.post("/resetnewpassword", UserController.resetnewpassword);
// admin


/// user manager
router.post("/admin/login", AdminController.managerlogin);
router.get("/admin/managertype/list",AdminController.listmanagertype);
router.get("/admin/manager/list",AdminController.listmanager);

router.post("/admin/manager/save", AdminController.managerAddorUpdate);
router.get("/admin/manager/delete/:id", AdminController.adminmanagerdelete);

router.get("/admin/content/list", AdminController.adminlistcontent);
router.post("/admin/content/save", AdminController.contentAddorUpdate);
router.get("/admin/content/delete/:id", AdminController.admincontentdelete);

router.get("/admin/reported/list",AdminController.listreporteduser);
router.get("/admin/reportedmsg/list",AdminController.listreportedmsguser);

router.get("/admin/user/list",AdminController.listuser);
router.get("/admin/user/delete/:id", AdminController.adminuserdelete);
router.get("/admin/manager/delete/:id", AdminController.adminmanagerdelete);

router.post("/admin/user/save", AdminController.userAddorUpdate);

router.get("/admin/contact/list",AdminController.listcontactadmin);
router.get("/admin/contact/delete/:id", AdminController.admindeletecontact);

///////////////// ON BOARDING

router.post("/user/notify", UserController.notifyuserzajil);
router.post("/user/save", UserController.createuser);
router.post("/user/checkemail", UserController.checkemail);

router.post("/user/updateprofile",JwtAuth, UserController.updateprofile);
router.post("/user/login", UserController.userlogin);
router.post("/user/verify", UserController.verifyuser);
router.post("/user/verify/resend/:id", UserController.resendsms);



router.get("/user/banner",JwtInfo, HomeController.listbanner);
router.get("/user/notification",JwtInfo, HomeController.listusernotifications);
router.get("/showprivacy", HomeController.showprivacy);
router.post("/home/contact/save", HomeController.savecontact);

router.get("/user/avaliabledatestest/:city", HomeController.avaliabledatestest);


router.get("/user/avaliabledates/:city",JwtAuth, HomeController.avaliabledates);
router.get("/user/avaliabletimes/:day/:city",JwtAuth, HomeController.avaliabletimes);


router.get("/user/avaliabledates/address/:addressid",JwtAuth, HomeController.avaliabledatesbyaddress);
router.get("/user/avaliabletimes/address/:day/:addressid",JwtAuth, HomeController.avaliabletimesbyaddress);



router.post("/rate/save",JwtAuth, HomeController.saverating);
router.post("/user/lang/change",JwtAuth, HomeController.userlangchange);
router.post("/address/save",JwtAuth, HomeController.saveaddress);
router.get("/user/address",JwtAuth, HomeController.myaddress);
router.get("/user/order/me",JwtAuth, HomeController.myorder);
router.post("/user/order/checkpromo", JwtAuth,HomeController.checkpromo);

router.get("/user/city",JwtAuth, HomeController.allcity);



// deprecated
//router.get("/user/order/completed/:id", JwtAuth,HomeController.completedorder);

router.post("/user/order/save", JwtAuth,HomeController.saveorder);
router.post("/user/order/generatesig", JwtAuth,HomeController.generatesig);
router.post("/user/order/createtemporder", JwtAuth,HomeController.createtemporder);

router.get("/user/order/track/:id",JwtAuth, HomeController.trackorder);

router.get("/user/order/newtrack/:id",JwtAuth, HomeController.newtrackorder);

router.get("/user/order/cancel/:id",JwtAuth, HomeController.cancelorder);
router.get("/user/paymentinfo/:loadtype",JwtAuth, HomeController.paymentinfo);
router.get("/admin/user/export",AdminController.userexport);
// banner
router.get("/admin/banner/list",JwtAuth, AdminController.adminlistbanner);
router.post("/admin/banner/save",JwtAuth, AdminController.bannerAddorUpdate);
router.get("/admin/banner/delete/:id",JwtAuth, AdminController.adminbannerdelete);


// country
router.get("/admin/country/list",JwtAuth, AdminController.adminlistcountry);
router.post("/admin/country/save",JwtAuth, AdminController.countryAddorUpdate);
router.get("/admin/country/delete/:id",JwtAuth, AdminController.admincountrydelete);


// city
router.get("/admin/city/list", JwtAuth,AdminController.adminlistcity);
router.post("/admin/city/save",JwtAuth, AdminController.cityAddorUpdate);
router.get("/admin/city/delete/:id",JwtAuth, AdminController.admincitydelete);

// payment type
router.get("/admin/paymenttype/list",JwtAuth, AdminController.adminlistpaymenttype);
router.post("/admin/paymenttype/save",JwtAuth, AdminController.paymenttypeAddorUpdate);
router.get("/admin/paymenttype/delete/:id",JwtAuth, AdminController.adminpaymenttypedelete);

// shipping
router.get("/admin/shipping/list",JwtAuth, AdminController.adminlistshipping);
router.post("/admin/shipping/save",JwtAuth, AdminController.shippingAddorUpdate);
router.get("/admin/shipping/delete/:id",JwtAuth, AdminController.adminpaymenttypedelete);


// outlets
router.get("/admin/location/list",JwtAuth, AdminController.adminlistoutlets);
router.post("/admin/location/save",JwtAuth, AdminController.outletsAddorUpdate);
router.get("/admin/location/delete/:id",JwtAuth, AdminController.adminoutletssdelete);



// timeslots
router.get("/admin/timeslots/list",JwtAuth, AdminController.adminlisttimeslots);
router.post("/admin/timeslots/save",JwtAuth, AdminController.timeslotsAddorUpdate);
router.get("/admin/timeslots/delete/:id",JwtAuth, AdminController.admintimeslotssdelete);



router.get("/admin/user/phonetype", AdminController.detectphonetypes);
// order
router.get("/admin/order/list",JwtAuth, AdminController.adminlistorder);
router.get("/admin/order/delete/:id",JwtAuth, AdminController.adminOrderdelete);
// log
router.get("/admin/log/list",JwtAuth, AdminController.adminlistlogs);
router.post("/admin/log/list/:page",AdminController.adminlistlogspagination);
router.get("/admin/log/delete/:id",JwtAuth, AdminController.adminlogdelete);

// day
router.get("/admin/day/list",JwtAuth, AdminController.adminlistday);
router.post("/admin/day/save",JwtAuth, AdminController.dayAddorUpdate);
router.get("/admin/day/delete/:id",JwtAuth, AdminController.admintdaysdelete);


// address
router.get("/admin/address/list",JwtAuth, AdminController.adminlistaddress);

// rating
router.get("/admin/rating/list",JwtAuth,AdminController.adminlistrating);
router.get("/admin/rating/export",JwtAuth, AdminController.ratingexport);
router.get("/location/nearbylocation/:latitude/:longitude",AdminController.nearbylocation);



/// admin
router.get("/admin/settings",JwtAuth,AdminController.admingetsettings);
router.post("/admin/settings/save",JwtAuth,AdminController.adminsavesettings);


router.post("/payfort/feed", UserController.payfortcallback);
router.get("/payfort/feed", UserController.payfortcallback);
router.post("/payfort/notify", UserController.payfortcallback);
router.get("/payfort/notify", UserController.payfortcallback);
module.exports = router;
