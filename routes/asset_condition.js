// select * from dbo.Aims_AssetConditions

const express = require('express');
const sql = require('mssql');
const serverconfig = require('../middleware/config')
const router = express.Router();
const auth = require('../middleware/auth');
const validator = require('../middleware/validate');
const Joi = require('joi');
// const connect = require('../db');

router.get('/',auth,async(req, res,next)=>{
    sql.connect(serverconfig).then(()=>{
        // connect();
        var request = new sql.Request();

        request
        .input('Client',sql.VarChar(200),req.body.client)
        .query(`select * from dbo.Aims_AssetConditions`,function(err,data){
            if (err) console.log(err)
            if(data==undefined){
                return res.status(400).send({'error':"An error occured"});
            }
            var resultLength = Object.values(data.recordset).length;
            if (resultLength == 0)
            return res.status(404).json({'error':'Data not found'})

            res.send(data.recordset);
        });
    }).catch((err)=>{
        next(err);
    });
});

// function validate(req){
//     const schema = Joi.object({
//         client:Joi.string().min(3).max(200).required(),
        
//     });

//     return schema.validate(req);
// }

module.exports = router