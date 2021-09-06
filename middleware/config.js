// const sql =require('mssql');

const config={
    server: 'THE-REAPER-IN-Y\\SQLEXPRESS',
    // authentication: {
    // },
    user: 'sa',
    password: 'password',
    database: 'AIMSDB',
    options: {
        encrypt: false,

    },
};

module.exports =  config;