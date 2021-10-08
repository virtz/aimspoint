const express = require('express');
const router = express.Router();
const upload = require('../middleware/file_upload.js');
const validator = require('../middleware/validate');
const Joi = require('joi');
const auth = require('../middleware/auth');
const multiparty = require('multiparty')
const request = require('request')
const fs = require('fs')
const util = require('util')
const http = require('http');



router.post('/',auth,async(req,res,next)=>{
  
//     var form = new multiparty.Form();

//     form.parse(req, function(err, fields, files) {
//         // res.writeHead(200, {'content-type': 'multipart/form-data'});
//         // res.write('received upload:\n\n');
//         // res.end(util.inspect({fields: fields, files: files}));

//     });

//         form.on('file', function(name, file) {


//     var formData = {
//       file: {
//         value:  fs.createReadStream(file.path),
//         options: {
//           filename: file.originalFilename
//         }
//       }
//     };

// console.log(formData)
//     // Post the file to the upload server
//     request.post({url: 'http://aimsassets.com/AppImages', formData: formData});

//     res.send({"message":"Upload successful","path":"http://aimsassets.com/AppImages"+file.path});
//     });
  
var form = new multiparty.Form();

form.on('part', function(formPart) {
    var contentType = formPart.headers['content-type'];

    var formData = {
        file: {
            value: formPart,
            options: {
                filename: formPart.filename,
                contentType: contentType,
                knownLength: formPart.byteCount
            }
        }
    };

    request.post({
        url: 'http://aimsassets.com/AppImages',
        formData: formData,

        // These may or may not be necessary for your server:
        preambleCRLF: true,
        postambleCRLF: true
    });
});
form.on('error', function(error) {
    next(error);
});

// form.on('close', function() {
//    res.send('received upload');
// });

form.on(file,function(name,file){
    res.send(file.path);
})
form.parse(req, function(err, fields, files) {
    res.writeHead(200, {'content-type': 'text/plain'});
    res.write('received upload:\n\n');
    res.end(util.inspect({fields: fields, files: files}));
});
});




function validate(req){
    const schema = Joi.object({
     file:Joi.string().required()

    });

    return schema.validate(req);
}

module.exports = router