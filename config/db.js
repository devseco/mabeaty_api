const mysql = require('mysql');

const db = mysql.createPool({
 host:"localhost",
 user:'root',
 password:'',
 database:'node_crud'
});
db.getConnection(()=>{
console.log("Connect Db is Successfully ..");
});
module.exports = db;
