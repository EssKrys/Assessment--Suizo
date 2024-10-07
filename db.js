const mysql = require('mysql2/promise');

const mysqlPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'adminKdo',
    database: 'dbproduct'
})
mysqlPool.query ("Select 1")
.then (data => console.log (data))
.catch (err => console.log ('Connection failed.\n'+ err))