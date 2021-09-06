


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
        .input('Photo1',sql.VarChar(sql.MAX),req.body.phone1)
        .input('Photo2',sql.VarChar(sql.MAX),req.body.phone2)
        .input('Photo3',sql.VarChar(sql.MAX),req.body.phone3)
        .input('Photo4',sql.VarChar(sql.MAX),req.body.phone4)
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
        capturedby:Joi.string().min(3).max(300).required(),
        updatedby:Joi.string().min(3).max(300).required(),
        serial_no:Joi.string().min(3).max(300).required(),
        condition:Joi.string(),
        message:Joi.string().min(3).max(300).required(),
        site_name:Joi.string().min(3).max(300).required(),

        site_address:Joi.string().min(3).max(300).required(),

        cost_center:Joi.string(),
        latitude:Joi.string().min(3).max(300).required(),
        longitude:Joi.string().min(3).max(300).required(),
        map_shape:Joi.string().min(3).max(300).required(),
        comment:Joi.string().min(3).max(300).required(),
        status:Joi.string().min(3).max(300).required(),
        client:Joi.string().min(3).max(300).required(),
        is_parent:Joi.string().min(3).max(300).required(),
        parent_barcode:Joi.string().min(3).max(300),
        person:Joi.string().min(3).max(300).required(),
        br_extra1:Joi.string(),
        br_extra2:Joi.string(),
        drop1:Joi.string(),
        drop2:Joi.string(),
        drop3:Joi.string(),
        text1:Joi.string(),
        text2:Joi.string(),
        text3:Joi.string(),
        text4:Joi.string(),
        text5:Joi.string(),
        text6:Joi.string(),
        text7:Joi.string(),
        text8:Joi.string(),
        photo1:Joi.string(),
        photo2:Joi.string(),
        photo3:Joi.string(),
        photo4:Joi.string(),
        mode:Joi.string(),

    });

    return schema.validate(req);
}
module.exports = router