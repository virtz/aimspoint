// const sql =require('mssql');

const config={
    server: 'THE-REAPER-IN-Y\\SQLEXPRESS',
    // authentication: {
    // },
    user: 'sa',
    password: '12345678',
    database: 'AIMSDB',
    options: {
        encrypt: false,

    },
}

module.exports =  config;