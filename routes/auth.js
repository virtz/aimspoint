const express = require('express');
const config = require('config');
const router = express.Router();
const Joi = require('joi');
const validator = require('../middleware/validate');
const serverconfig = require('../middleware/config')
const sql = require('mssql');
const jwt = require('jsonwebtoken');

router.post('/',validator(validate) ,async(req, res,next) => {

   
    sql.connect(serverconfig).then(()=>{
        // connect();
        var request = new sql.Request();

        request.input('Name',sql.VarChar(50),req.body.name)
        .input('Password',sql.VarChar(50), req.body.password)
        .query(`select * from dbo.Aims_Users  where name=@Name `,function(err,data){
            if (err) console.log(err)
            var resultLength = Object.values(data.recordset).length;
            if(resultLength ==0){
                
                return res.status(400).send('Incorrect name or password')
            }
          const token =       jwt.sign({name:req.body.name,password:req.body.password},config.get('jwtPrivateKey'));
            res.send(token);
        });
    }).catch((err)=>{
        next(err);
    });

});

function validate(req){
    const schema = Joi.object({
        name:Joi.string().min(3).max(30).required(),
        password:Joi.string().min(5).max(255).required(),
    });

    return schema.validate(req);
}
module.exports = router;