


const express = require('express');
const sql = require('mssql');
const serverconfig = require('../middleware/config')
const router = express.Router();
// const connect = require('../db');

router.get('/:client',async(req, res,next)=>{
    sql.connect(serverconfig).then(()=>{
        // connect();
        var request = new sql.Request();

        request
        .input('Client',sql.VarChar(50),req.params.client)
        .query(`select * from dbo.Aims_Drop2_Data where client=@Client`,function(err,data){
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


module.exports = router