const {mysqlConfig} = require('../config/default.json');
var mysql = require('mysql');
var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : mysqlConfig.host,
    user            : mysqlConfig.user,
    password        : mysqlConfig.password,
    database        : mysqlConfig.database,
    port            : mysqlConfig.port
});

  
module.exports.queryHandler = async function(query){
    console.log("queryHandler");
    console.log("query : ", query);
    const results = await new Promise((resolve, reject) => {
        pool.getConnection(async function (err, connection) {
            if(err) reject(err);
            console.log("connection : ", connection);
            connection.query(query, function (error, results, fields) {
                connection.release();
                if(error) reject(error);
                resolve(results);
            })
        })
    });
    return results;
};

