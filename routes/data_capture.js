


const express = require('express');
const sql = require('mssql');
const serverconfig = require('../middleware/config')
const router = express.Router();
const validator = require('../middleware/validate');
const Joi = require('joi');
const auth = require('../middleware/auth');

// const connect = require('../db');

router.post('/',auth,validator(validate),async(req,res,next)=>{
    
    sql.connect(serverconfig).then(()=>{
        // connect();
        var request = new sql.Request();

        request
        .input('Product',sql.VarChar(sql.MAX),req.body.Product)
        .input('Location',sql.VarChar(sql.MAX),req.body.Location)
        .input('Barcode',sql.VarChar(sql.MAX),req.body.Barcode)
        .input('Year',sql.VarChar(sql.MAX),req.body.Year)
        .input('DateCaptured',sql.VarChar(sql.MAX),req.body.Data_Captured)
        .input('LastUpdated',sql.VarChar(sql.MAX),req.body.LastUpdated)
        .input('CapturedBy',sql.VarChar(sql.MAX),req.body.CapturedBy)
        .input('UpdatedBy',sql.VarChar(sql.MAX),req.body.UpdatedBy)
        .input('SerialNo',sql.VarChar(sql.MAX),req.body.SerialNo)
        .input('Condition',sql.VarChar(sql.MAX),req.body.Condition)
        .input('Message',sql.VarChar(sql.MAX),req.body.Message)
        .input('SiteName',sql.VarChar(sql.MAX),req.body.SiteName)
        .input('SiteAddress',sql.VarChar(sql.MAX),req.body.SiteAddress)
        .input('CostCenter',sql.VarChar(sql.MAX),req.body.CostCenter)
        
        .input('Latitude',sql.VarChar(sql.MAX),req.body.Latitude)
        .input('Longitude',sql.VarChar(sql.MAX),req.body.Longitude)
        .input('MapShape',sql.VarChar(sql.MAX),req.body.MapShape)
        .input('Comment',sql.VarChar(sql.MAX),req.body.Comment)
        .input('Status',sql.VarChar(sql.MAX),req.body.Status)
        .input('client',sql.VarChar(sql.MAX),req.body.Client)

        .input('IsParent',sql.VarChar(sql.MAX),req.body.IsParent)
        // .input('IsParent',sql.VarChar(max),req.body.is_parent)
        .input('ParentBarcode',sql.VarChar(sql.MAX),req.body.ParentBarcode)
        .input('Person',sql.VarChar(sql.MAX),req.body.Person)
        .input('BrExtra1',sql.VarChar(sql.MAX),req.body.BrExtra1)
        .input('BrExtra2',sql.VarChar(sql.MAX),req.body.BrExtra2)
        .input('Drop1',sql.VarChar(sql.MAX),req.body.Drop1)
        .input('Drop2',sql.VarChar(sql.MAX),req.body.Drop2)
        .input('Drop3',sql.VarChar(sql.MAX),req.body.Drop3)
        .input('Text1',sql.VarChar(sql.MAX),req.body.Text1)
        .input('Text2',sql.VarChar(sql.MAX),req.body.Text2)
        
        .input('Text3',sql.VarChar(sql.MAX),req.body.Text3)
        .input('Text4',sql.VarChar(sql.MAX),req.body.Text4)
        .input('Text5',sql.VarChar(sql.MAX),req.body.Text5)
        .input('Text6',sql.VarChar(sql.MAX),req.body.Text6)
        .input('Text7',sql.VarChar(sql.MAX),req.body.Text7)
        .input('Text8',sql.VarChar(sql.MAX),req.body.Text8)
        .input('Photo1',sql.VarChar(sql.MAX),req.body.Photo1)
        .input('Photo2',sql.VarChar(sql.MAX),req.body.Photo2)
        .input('Photo3',sql.VarChar(sql.MAX),req.body.Photo3)
        .input('Photo4',sql.VarChar(sql.MAX),req.body.Photo4)
        .input('Mode',sql.VarChar(sql.MAX),req.body.Mode)

        .query(`insert into dbo.Aims_DataCapture Values(
    @Product, @Location, @Barcode, @Year,@DateCaptured,@LastUpdated,@CapturedBy,
    @UpdatedBy,@SerialNo,@Condition,@Message,@SiteName,@SiteAddress,@CostCenter
    ,@Latitude,  @Longitude, @MapShape, @Comment, @Status, @Client,
     @IsParent, @ParentBarcode,@Person,  @BrExtra1,  @BrExtra2,  @Drop1,  @Drop2,
     @Drop3, @Text1, @Text2, @Text3, @Text4,@Text5, @Text6,  @Text7, @Text8,  @Photo1, @Photo2,
     @Photo3,
     @Photo4,
     @Mode)
        `,function(err,data){
            if (err) console.log(err)
            var resultLength = Object.values(data.rowsAffected).length;
            if (resultLength == 0)
            return res.status(404).json({'error':'An error occured'})

            res.json({'mesage':'success',
            'data':data.rowsAffected,
        });
        });
    }).catch((err)=>{
        next(err);
        // res.send(err);
        // console.log(err);
    });
});

router.post('/fetch',auth,validator(validateInput),async(req,res,next)=>{
    sql.connect(serverconfig).then(()=>{
        // connect();
        var request = new sql.Request();

        request
        .input('Client',sql.VarChar(50),req.body.client)
        .input('CapturedBy',sql.VarChar(50),req.body.user)
        .input('Location',sql.VarChar(50),req.body.location)
        .query(`SELECT [ID]
        ,[Product]
        ,[Location]
        ,[Barcode]
        ,[Year]
        ,[DateCaptured]
        ,[LastUpdated]
        ,[CapturedBy]
        ,[UpdatedBy]
        ,[SerialNo]
        ,[Condition]
        ,[Message]
        ,[SiteName]
        ,[SiteAddress]
        ,[CostCenter]
        ,[Latitude]
        ,[Longitude]
        ,[MapShape]
        ,[Comment]
        ,[Status]
        ,[Client]
        ,[IsParent]
        ,[ParentBarcode]
        ,[Person]
        ,[BrExtra1]
        ,[BrExtra2]
        ,[Drop1]
        ,[Drop2]
        ,[Drop3]
        ,[Text1]
        ,[Text2]
        ,[Text3]
        ,[Text4]
        ,[Text5]
        ,[Text6]
        ,[Text7]
        ,[Text8]
        ,[Mode]
    FROM [dbo].[Aims_DataCapture] where client=@Client and location=@Location and capturedby=@CapturedBy`,function(err,data){
            if (err) console.log(err)
            var resultLength = Object.values(data.recordset).length;
            if (resultLength == 0)
            return res.status(404).json({'error':'Data not found'})

            res.send(data.recordset);
        });
    }).catch((err)=>{
        next(err);
    });
});

router.post('/findCopy',auth,validator(validateInput2),async(req,res,next)=>{
    sql.connect(serverconfig).then(()=>{
        // connect();
        var request = new sql.Request();
        request
        .input('Client',sql.VarChar(50),req.body.client)
        .input('Barcode',sql.VarChar(50),req.body.barcode)
        .query(`SELECT [ID]
        ,[Product]
        ,[Location]
        ,[Barcode]
        ,[Year]
        ,[DateCaptured]
        ,[LastUpdated]
        ,[CapturedBy]
        ,[UpdatedBy]
        ,[SerialNo]
        ,[Condition]
        ,[Message]
        ,[SiteName]
        ,[SiteAddress]
        ,[CostCenter]
        ,[Latitude]
        ,[Longitude]
        ,[MapShape]
        ,[Comment]
        ,[Status]
        ,[Client]
        ,[IsParent]
        ,[ParentBarcode]
        ,[Person]
        ,[BrExtra1]
        ,[BrExtra2]
        ,[Drop1]
        ,[Drop2]
        ,[Drop3]
        ,[Text1]
        ,[Text2]
        ,[Text3]
        ,[Text4]
        ,[Text5]
        ,[Text6]
        ,[Text7]
        ,[Text8]
        ,[Mode]
    FROM [dbo].[Aims_DataCapture] where client=@Client and barcode=@Barcode`,function(err,data){
            if (err) console.log(err)
            var resultLength = Object.values(data.recordset).length;
            if (resultLength == 0)
            return res.status(404).json({'error':'Data not found'})

            res.send({"message":true});
        });
    }).catch((err)=>{
        next(err);
    });
});



function validate(req){
    const schema = Joi.object({
        Product:Joi.string().min(3).max(300).required(),
        Location:Joi.string().min(3).max(300).required(),
        Barcode:Joi.string().min(3).max(300).required(),
        Year:Joi.string(),
        DateCaptured:Joi.string().min(3).max(300).required(),
        LastUpdated:Joi.string().min(3).max(300).required(),
        CapturedBy:Joi.string().min(3).max(300).required(),
        UpdatedBy:Joi.string().min(3).max(300).required(),
        SerialNo:Joi.string().min(3).max(300).required(),
        Condition:Joi.string(),
        Message:Joi.string().allow(''),
        SiteName:Joi.string().min(3).max(300).required(),

        SiteAddress:Joi.string().min(3).max(300).required(),

        CostCenter:Joi.string(),
        Latitude:Joi.string().min(3).max(300).required(),
        Longitude:Joi.string().min(3).max(300).required(),
        MapShape:Joi.string().allow(''),
        Comment:Joi.string().allow(''),
        Status:Joi.string().min(3).max(300).required(),
        Client:Joi.string().min(3).max(300).required(),
        IsParent:Joi.string().min(3).max(300).required(),
        ParentBarcode:Joi.string().allow(''),
        Person:Joi.string().min(3).max(300).required(),
        BrExtra1:Joi.string().allow(''),
        BrExtra2:Joi.string().allow(''),
        Drop1:Joi.string().allow(''),
        Drop2:Joi.string().allow(''),
        Drop3:Joi.string().allow(''),
        Text1:Joi.string().allow(''),
        Text2:Joi.string().allow(''),
        Text3:Joi.string().allow(''),
        Text4:Joi.string().allow(''),
        Text5:Joi.string().allow(''),
        Text6:Joi.string().allow(''),
        Text7:Joi.string().allow(''),
        Text8:Joi.string().allow(''),
        Photo1:Joi.string().allow(''),
        Photo2:Joi.string().allow(''),
        Photo3:Joi.string().allow(''),
        Photo4:Joi.string().empty(''),
        
        Mode:Joi.string().allow(''),
        ID:Joi.string().allow(null)

    });

    return schema.validate(req);
}

function validateInput(req){
    const schema = Joi.object({
        user:Joi.string().min(3).max(300).required(),
        location:Joi.string().min(3).max(300).required(),
        client:Joi.string().min(3).max(300).required(),

    });

    return schema.validate(req);
}

function validateInput2(req){
    const schema = Joi.object({
        barcode:Joi.string().min(3).max(300).required(),
        client:Joi.string().min(3).max(300).required(),

    });

    return schema.validate(req);
}
module.exports = router