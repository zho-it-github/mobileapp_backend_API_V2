const fs = require('fs');
let util = require('util')

let url = require('url')
let mkdirp = require('mkdirp')
module.exports =  {

    nativedownload : async function (file, options,callback) {

        if (!file) throw("Need a file url to download")

        if (!callback && typeof options === 'function') {
            callback = options
        }

        options = typeof options === 'object' ? options : {}
        options.timeout = options.timeout || 20000
        options.directory = options.directory ? options.directory : '.'

        let uri = file.split('/')
        options.filename = options.filename || uri[uri.length - 1]

        let path = options.directory + "/" + options.filename


        let  req = http
        if (url.parse(file).protocol === 'https:') {
            req = https
        } else {
            req = http
        }

        let request = req.get(file, function(response) {

            if (response.statusCode === 200) {

                mkdirp(options.directory, function(err) {
                    if (err) throw err
                    let file = fs.createWriteStream(path)
                    response.pipe(file)
                })

            } else {

                if (callback) callback(response.statusCode)

            }

            response.on("end", function(){
                if (callback) callback(false, path)
            })

            request.setTimeout(options.timeout, function () {
                request.abort()
                callback("Timeout")
            })

        }).on('error', function(e) {

            if (callback) callback(e)

        })


    },

    // download pdf
    downloadpdf : async function (pdfurl,filename) {
        try {

            const options = {
                directory: './public/pdf/',
                filename: filename
            }
            const httpDownload = util.promisify(this.nativedownload);
            return await httpDownload(pdfurl,options)

        }catch (e) {
            Logger.systemlog("error while downloading pdf  "+e.message);
            return "error while downloading pdf  "
        }

    },

    // parse csv file
    parse:  async function (csvFile) {
        console.log("csv paring ",csvFile);
        const csv=require('csvtojson')
        const jsonArray=await csv().fromFile(_config("app.csvuploadpath")+csvFile)
        let result = []

        for (let i = 0; i < jsonArray.length; i++) {
           //  console.log(jsonArray[i])
            const sub1 = jsonArray[i].sub1
            const sub2 = jsonArray[i].sub2

            const banner = await Category.findOne({name:sub1}).exec();
             if(banner && banner.name){
                 console.log(sub1+" "+banner._id)

                 let newcat = new Category()
                 newcat.name = sub2;
                 newcat.category = banner._id;
                 await newcat.save();
             }else{
                 console.log(sub1+" not found")
             }

            }


    },

    checkimagefound(imagelist,imagefound,imgname){
        if(imagefound.includes(imgname)){
            imagelist.push({url:imgname,type:0,order:0})
        }
    },
    importfinaldataplz:  async function (filename) {
        console.log("csv paring ");
        const csv=require('csvtojson')

        let imagefound = [];

        const imagepage = '/root/rowad-api/public/upload';
        const fs = require('fs');
        await fs.readdir(imagepage, (err, files) => {
            files.forEach(file => {
                console.log(file);
                imagefound.push(file);
            });
        });
        console.log("reading")
        //return;
        const jsonArray=await csv().fromFile("/root/rowad-api/"+filename+".csv")

       // console.log(jsonArray);
        /**
         * [
         * 	{a:"1", b:"2", c:"3"},
         * 	{a:"4", b:"5". c:"6"}
         * ]
         */

        for (let i = 0; i < jsonArray.length; i++) {


            let catidlist = []
            let imagelist = [];
            const item = jsonArray[i];
            let sku = item.sku;
            let barcode = item.barcode;
            let model = item.model;
            let parentcategory = item.parentcategory;
            let cateinfo = await Category.createCategory(parentcategory);
            if(cateinfo && cateinfo!=-1){
                console.log("**********category found"+cateinfo)
                catidlist.push(cateinfo);
            }
            let category = item.category;
             cateinfo = await Category.createCategory(category,cateinfo);
            if(cateinfo && cateinfo!=-1){
                console.log("**********category found"+cateinfo)
                catidlist.push(cateinfo);
            }
            let subcategory = item.subcategory;
            cateinfo = await Category.createCategory(subcategory,cateinfo);
            if(cateinfo && cateinfo!=-1){
                console.log("**********category found"+cateinfo)
                catidlist.push(cateinfo);
            }

            let itemtype = item.itemtype;
            let brand = item.brand;
            let color = item.color;
            let size = item.size;
            let weight= item.weight;
            let description = item.description
            let price = item.price;
            let qty = item.qty;
            let name = item.name;



            this.checkimagefound(imagelist,imagefound,sku+".png");
            this.checkimagefound(imagelist,imagefound,sku+"-1.png")
            this.checkimagefound(imagelist,imagefound,sku+"-2.png")
            this.checkimagefound(imagelist,imagefound,sku+"-3.png")
            this.checkimagefound(imagelist,imagefound,sku+"-4.png")
            this.checkimagefound(imagelist,imagefound,sku+"-5.png")
            this.checkimagefound(imagelist,imagefound,sku+"-6.png")
            this.checkimagefound(imagelist,imagefound,sku+"-7.png");

            this.checkimagefound(imagelist,imagefound,sku+".jpg");
            this.checkimagefound(imagelist,imagefound,sku+"-1.jpg")
            this.checkimagefound(imagelist,imagefound,sku+"-2.jpg")
            this.checkimagefound(imagelist,imagefound,sku+"-3.jpg")
            this.checkimagefound(imagelist,imagefound,sku+"-4.jpg")
            this.checkimagefound(imagelist,imagefound,sku+"-5.jpg")
            this.checkimagefound(imagelist,imagefound,sku+"-6.jpg")
            this.checkimagefound(imagelist,imagefound,sku+"-7.jpg");



          //  let teacher = item.teacher.trim(); // mada and teacher
          //  let mada = item.mada.trim(); // mada and teacher

            //return {ok:jsonArray}




            if(name.length<1){
                console.log("skip name error")
                continue;
            }




            let newentry = new Product();
            newentry.name = name;
            newentry.sku = sku;
            newentry.price = price;
            newentry.qty = qty;
            newentry.description = description;
            newentry.weight = weight;
            newentry.size = size;
            newentry.color = color;
            newentry.brand = brand;
            newentry.itemtype = itemtype;
            newentry.model = model;
            newentry.barcode = barcode;
            newentry.category=catidlist
            newentry.images =imagelist;

            console.log("trying to save "+i);
           await newentry.save();
            console.log("saved "+i);
            //return;





        }

        console.log("done")


        return {ok:jsonArray}

    },

};
