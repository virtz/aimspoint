const express = require('express');
// const { send } = require('express/lib/response');
require('express-async-errors');


// const logger = require('./middleware/logger');
// const debug = require('debug')('app:startup');

// const dbDebugger = require('debug')
// const morgan = require('morgan');
const app = express();
require('./startup/routes')(app);
require('./startup/logging');
require('./startup/config')(),
require('./startup/prod')(app);


// console.log('Application name' + config.get('name'));




// if(app.get('env')==='development'){
//     app.use(morgan('tiny'));
//     debug('Morgan enabled');
// }


// app.use(logger);





const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Listening on port ${port}`));