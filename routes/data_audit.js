const express = require('express');
const sql = require('mssql');
const serverconfig = require('../middleware/config')
const router = express.Router();
const auth = require('../middleware/auth');
const validator = require('../middleware/validate');
const Joi = require('joi');

router.post('/', validator(validate), async (req, res, next) => {
    sql.connect(serverconfig).then(() => {
        // connect();
        var request = new sql.Request();

        request
            .input('Barcode', sql.VarChar(200), req.body.barcode)
            .query(`SELECT [ID] ,[Product],[Location],[Barcode],[Year],[DateCaptured],[LastUpdated],[CapturedBy],[UpdatedBy],[SerialNo] ,[Condition] ,[Message],[SiteName],[SiteAddress],[CostCenter],[Latitude],[Longitude] ,[MapShape],[Comment],[Status],[Client],[IsParent],[ParentBarcode],[Person],[BrExtra1]
            ,[BrExtra2],[Drop1],[Drop2],[Drop3],[Text1],[Text2],[Text3],[Text4],[Text5],[Text6],[Text7],[Text8],[Mode] FROM [dbo].[Aims_DataCapture] where barcode=@Barcode`, function (err, data) {
                if (err) console.log(err)
                if (data == undefined) {
                    return res.status(400).send({ 'error': "An error occured" });
                }
                var resultLength = Object.values(data.recordset).length;
                // console.log(resultLength)
                if (resultLength == 0)
                    return res.status(404).json({ 'error': 'Data not found' })

                res.send(data.recordset);
            });
    }).catch((err) => {
        next(err);
    });
});

router.post('/find', auth, validator(validate1), async (req, res, next) => {
    sql.connect(serverconfig).then(() => {
        // connect();
        var request = new sql.Request();

        request
            .input('Client', sql.VarChar(200), req.body.client)
            .input('Code', sql.VarChar(200), req.body.code)
            .query(`select distinct * from dbo.Aims_AssetName where client=@Client and P_Code=@Code`, function (err, data) {
                if (err) console.log(err)
                if (data == undefined) {
                    return res.status(400).send({ 'error': "An error occured" });
                }
                var resultLength = Object.values(data.recordset).length;
                if (resultLength == 0)
                    return res.status(404).json({ 'error': 'Data not found' })

                res.send(data.recordset);
            });
    }).catch((err) => {
        next(err);
    });
});

function validate1(req) {
    const schema = Joi.object({
        client: Joi.string().min(3).max(200).required(),
        code: Joi.string().min(3).max(200).required()

    });

    return schema.validate(req);
}
function validate(req) {
    const schema = Joi.object({
        barcode: Joi.string().min(3).max(200).required(),

    });

    return schema.validate(req);
}


module.exports = router