const express = require('express');
const router = express.Router();
const upload = require('../middleware/file_upload.js');
const validator = require('../middleware/validate');
const Joi = require('joi');
const auth = require('../middleware/auth');


router.post('/',auth,async(req,res,next)=>{
  

    await upload(req,res).catch((err) => {res.status(500).send({"err":err})})
    
    // .catch((err) => {next(err)});
    if(req.file ==undefined){
        return res.status(400).send({"message":"Please upload file"});
    }
    res.status(200).send({
        "message":"Upload successful",
        "path":req.file.path
    })


    // res.send({'message':"Image upload successful","path":upload.})
});




function validate(req){
    const schema = Joi.object({
     file:Joi.string().required()

    });

    return schema.validate(req);
}

module.exports = router