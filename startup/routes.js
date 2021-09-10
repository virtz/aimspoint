const express = require('express');
const auth = require('../routes/auth');
const clientlist = require('../routes/client_list');
const locations = require('../routes/location');
const costCenter = require('../routes/cost_center');
const asset_category = require('../routes/asset_category');
const asset_subcategory = require('../routes/asset_subcategory');
const asset_type = require('../routes/asset_type');
const asset_name = require('../routes/asset_name');
const parameter_setup = require('../routes/parameter_setup');
const user_controller = require('../routes/user_controller');
const data_capture = require('../routes/data_capture');
const conditions = require('../routes/asset_condition');
const site_issues = require('../routes/site_issues');
const helmet = require('helmet');
const Joi = require('joi');
const error = require('../middleware/error');

module.exports = function(app){
    app.use(express.json({limit:"100mb"}));
app.use(express.urlencoded({extended:true,limit: '100mb',
parameterLimit: 100000, }));
app.use(helmet());
app.use('/api/auth', auth);
app.use('/api/clientlist', clientlist);
app.use('/api/location',locations);
app.use('/api/costcenter',costCenter);
app.use('/api/assetcategory',asset_category);
app.use('/api/assetsubcategory',asset_subcategory);
app.use('/api/assettype',asset_type);
app.use('/api/assetname',asset_name);
app.use('/api/parameters',parameter_setup);
app.use('/api/control',user_controller);
app.use('/api/datacapture',data_capture);
app.use('/api/condition',conditions);
app.use('/api/siteissues',site_issues);
app.use(error);
}