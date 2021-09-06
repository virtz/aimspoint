

const express = require('express');
const sql = require('mssql');
const serverconfig = require('../middleware/config')
const router = express.Router();
const validator = require('../middleware/validate');
const Joi = require('joi');
const auth = require('../middleware/auth');
// const connect = require('../db');

router.post('/',validator(validate),auth,async(req,res,next)=>{
    sql.connect(serverconfig).then(()=>{
        // connect();
        var request = new sql.Request();

        request.input('Agent',sql.VarChar(50),req.body.name)
        .input('Client',sql.VarChar(50),req.body.client)
        .query(`select * from dbo.Aims_Locations where agent=@Agent and client=@Client`,function(err,data){
            if (err) console.log(err)
            var resultLength = Object.values(data.recordset).length;
            if (resultLength == 0)
               return res.status(404).send('Data not found')

            res.send(data.recordset);
        });
    }).catch((err)=>{
        next(err);
    });
});

function validate(req){
    const schema = Joi.object({
        name:Joi.string().min(3).max(30).required(),
        client:Joi.string().required()
    });

    return schema.validate(req);
}
module.exports = router