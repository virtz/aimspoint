


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
        .input('Product',sql.VarChar(sql.MAX),req.body.product)
        .input('Location',sql.VarChar(sql.MAX),req.body.location)
        .input('Barcode',sql.VarChar(sql.MAX),req.body.barcode)
        .input('Year',sql.VarChar(sql.MAX),req.body.year)
        .input('DateCaptured',sql.VarChar(sql.MAX),req.body.data_captured)
        .input('LastUpdated',sql.VarChar(sql.MAX),req.body.last_updated)
        .input('CapturedBy',sql.VarChar(sql.MAX),req.body.capturedby                    )
        .input('UpdatedBy',sql.VarChar(sql.MAX),req.body.updatedby)
        .input('SerialNo',sql.VarChar(sql.MAX),req.body.serial_no)
        .input('Condition',sql.VarChar(sql.MAX),req.body.condition)
        .input('Message',sql.VarChar(sql.MAX),req.body.message)
        .input('SiteName',sql.VarChar(sql.MAX),req.body.site_name)
        .input('SiteAddress',sql.VarChar(sql.MAX),req.body.site_address)
        .input('CostCenter',sql.VarChar(sql.MAX),req.body.cost_center)
        
        .input('Latitude',sql.VarChar(sql.MAX),req.body.latitude)
        .input('Longitude',sql.VarChar(sql.MAX),req.body.longitude)
        .input('MapShape',sql.VarChar(sql.MAX),req.body.map_shape)
        .input('Comment',sql.VarChar(sql.MAX),req.body.comment)
        .input('Status',sql.VarChar(sql.MAX),req.body.status)
        .input('client',sql.VarChar(sql.MAX),req.body.client)

        .input('IsParent',sql.VarChar(sql.MAX),req.body.is_parent)
        // .input('IsParent',sql.VarChar(max),req.body.is_parent)
        .input('ParentBarcode',sql.VarChar(sql.MAX),req.body.parent_barcode)
        .input('Person',sql.VarChar(sql.MAX),req.body.person)
        .input('BrExtra1',sql.VarChar(sql.MAX),req.body.br_extra1)
        .input('BrExtra2',sql.VarChar(sql.MAX),req.body.br_extra2)
        .input('Drop1',sql.VarChar(sql.MAX),req.body.drop1)
        .input('Drop2',sql.VarChar(sql.MAX),req.body.drop2)
        .input('Drop3',sql.VarChar(sql.MAX),req.body.drop3)
        .input('Text1',sql.VarChar(sql.MAX),req.body.text1)
        .input('Text2',sql.VarChar(sql.MAX),req.body.text2)
        
        .input('Text3',sql.VarChar(sql.MAX),req.body.text3)
        .input('Text4',sql.VarChar(sql.MAX),req.body.text4)
        .input('Text5',sql.VarChar(sql.MAX),req.body.text5)
        .input('Text6',sql.VarChar(sql.MAX),req.body.text6)
        .input('Text7',sql.VarChar(sql.MAX),req.body.text7)
        .input('Text8',sql.VarChar(sql.MAX),req.body.text8)
        .input('Photo1',sql.VarChar(sql.MAX),req.body.photo1)
        .input('Photo2',sql.VarChar(sql.MAX),req.body.photo2)
        .input('Photo3',sql.VarChar(sql.MAX),req.body.photo3)
        .input('Photo4',sql.VarChar(sql.MAX),req.body.photo4)
        .input('Mode',sql.VarChar(sql.MAX),req.body.mode)

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
        .input('User',sql.VarChar(50),req.body.user)
        .input('Location',sql.VarChar(50),req.body.location)
        .query(`select * from dbo.Aims_DataCapture where client=@Client and location=@Location and user=@User `,function(err,data){
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



function validate(req){
    const schema = Joi.object({
        product:Joi.string().min(3).max(300).required(),
        location:Joi.string().min(3).max(300).required(),
        barcode:Joi.string().min(3).max(300).required(),
        year:Joi.string(),
        data_captured:Joi.string().min(3).max(300).required(),
        last_updated:Joi.string().min(3).max(300).required(),
        captured_by:Joi.string().min(3).max(300).required(),
        updated_by:Joi.string().min(3).max(300).required(),
        serial_no:Joi.string().min(3).max(300).required(),
        condition:Joi.string(),
        message:Joi.string().allow(''),
        site_name:Joi.string().min(3).max(300).required(),

        site_address:Joi.string().min(3).max(300).required(),

        cost_center:Joi.string(),
        latitude:Joi.string().min(3).max(300).required(),
        longitude:Joi.string().min(3).max(300).required(),
        map_shape:Joi.string().allow(''),
        comment:Joi.string().allow(''),
        status:Joi.string().min(3).max(300).required(),
        client:Joi.string().min(3).max(300).required(),
        is_parent:Joi.string().min(3).max(300).required(),
        parent_barcode:Joi.string().allow(''),
        person:Joi.string().min(3).max(300).required(),
        br_extra1:Joi.string().allow(''),
        br_extra2:Joi.string().allow(''),
        drop1:Joi.string().allow(''),
        drop2:Joi.string().allow(''),
        drop3:Joi.string().allow(''),
        text1:Joi.string().allow(''),
        text2:Joi.string().allow(''),
        text3:Joi.string().allow(''),
        text4:Joi.string().allow(''),
        text5:Joi.string().allow(''),
        text6:Joi.string().allow(''),
        text7:Joi.string().allow(''),
        text8:Joi.string().allow(''),
        photo1:Joi.string().allow(''),
        photo2:Joi.string().allow(''),
        photo3:Joi.string().allow(''),
        photo4:Joi.string().empty(''),
        
        mode:Joi.string().allow(''),

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
module.exports = router