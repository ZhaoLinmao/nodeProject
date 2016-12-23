/**
 * Created by zlm on 2016/12/22.
 */

var db    = {},
     mysql = require('mysql');

db.settings = {
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password : 'jadite',
    port: '3366',
    database: 'fhc',
    checkExpirationInterval: 900000,// How frequently expired sessions will be cleared; milliseconds.
    expiration: 86400000,// The maximum age of a valid session; milliseconds.
    createDatabaseTable: true,// Whether or not to create the sessions database table, if one does not already exist.
    connectionLimit: 1,// Number of connections when creating a connection pool
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
};

db.conf = {
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : 'jadite',
    port        : '3366',
    database        : 'fhc',
};
var pool  = mysql.createPool(db.conf);

db.query = function(sql, callback){

    if (!sql) {
        callback();
        return;
    }
    pool.query(sql, function(err, rows, fields) {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        }

        callback(null, rows, fields);
    });
};

module.exports = db;