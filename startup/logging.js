
const winston = require('winston');
require('express-async-errors');


module.exports = function(){
winston.ExceptionHandler(
    new winston.transports.Console({colorize:true,prettyPrint: true}),
    new winston.transport.File({filename:'uncaughtExceptions.log'})
)

    winston.add(winston.transports.File,{filename:'logfile.log'});
    process.on('uncaughtException',(ex)=>{
        winston.error(ex.message,ex);
        process.exit(1);
    });
    
    process.on('unhandledRejection',(ex)=>{
        winston.error(ex.name,ex)
        process.exit(1)
    });
    
}
