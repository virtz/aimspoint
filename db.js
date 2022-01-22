
const sql = require('mssql');

const config = {
    server: 'THE-REAPER-IN-Y\\SQLEXPRESS',
    // authentication: {
    // },
    user: 'sa',
    password: 'password',
    database: 'AIMSDB',
    options: {
        encrypt: false,

    },
}


var connect = function (req, res, next) {
    sql.connect(config, function (err) {
        if (err) console.log(err.message);
        console.log('connnected to db')
        next();

    },
    );


}

// module.exports = config;
module.exports = connect;