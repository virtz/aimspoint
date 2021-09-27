// const sql =require('mssql');

const config={
    server: '172.107.168.89',
    // authentication: {
    // },
    user: 'sa',
    password: 'sqluser10$',
    database: 'DATACAPTURE',
    options: {
        encrypt: false,

    },
}

module.exports =  config;