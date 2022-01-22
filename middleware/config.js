// const sql =require('mssql');

const config = {
    server: '172.107.168.89',
    // authentication: {
    // },
    user: 'sa',
    requestTimeout: 300000,
    password: 'sqluser10$',
    database: 'DATACAPTURE',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false,

    },
}

// const config = {
//     server: 'THE-REAPER-IN-Y\\SQLEXPRESS',
//     // authentication: {
//     // },
//     user: 'sa',
//     password: 'password',
//     database: 'AIMSDB',
//     options: {
//         encrypt: false,

//     },
// }

module.exports = config;