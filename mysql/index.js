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

// var connection = mysql.createConnection({
//     host: "ec2-13-59-71-164.us-east-2.compute.amazonaws.com",
//     user: "lea",
//     password: "password",
//     database: "Metrix",
//     port: "3306"  
// })
//   console.log("connection : ", connection );

//   connection.connect()
  
//   connection.query("SELECT * from users where email='lea.benero@gmail.com';", function (err, rows, fields) {
//     if (err) throw err
  
//     console.log('The solution is: ', rows[0]);
//     connection.end();

//   })
  
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

