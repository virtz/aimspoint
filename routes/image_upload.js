const express = require('express');
const router = express.Router();
const upload = require('../middleware/file_upload.js');
const validator = require('../middleware/validate');
const Joi = require('joi');
const auth = require('../middleware/auth');


router.post('/',auth,async(req,res,next)=>{
  
    var form = new multiparty.Form();

    form.parse(req, function(err, fields, files) {
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
        res.end(util.inspect({fields: fields, files: files}));

    });
    form.on('file', function(name, file) {


    var formData = {
      file: {
        value:  fs.createReadStream(file.path),
        options: {
          filename: file.path+ '_'+ file.originalFilename
        }
      }
    };

console.log(formData)
    // Post the file to the upload server
    request.post({url: 'http://http://aimsassets.com/AppImages', formData: formData});
    });
    // await upload(req,res).catch((err) => {res.status(500).send({"err":err})})
    
    // // .catch((err) => {next(err)});
    // if(req.file ==undefined){
    //     return res.status(400).send({"message":"Please upload file"});
    // }
    // res.status(200).send({
    //     "message":"Upload successful",
    //     "path":req.file.path
    // })



});




function validate(req){
    const schema = Joi.object({
     file:Joi.string().required()

    });

    return schema.validate(req);
}

module.exports = router