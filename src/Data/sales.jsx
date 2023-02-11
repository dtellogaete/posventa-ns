/*export const sales = () =>{
 
    const mysql = require('mysql2');
   
    const connection = mysql.createConnection({
        host: 'localhost:8888',
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'posventa_service'
      });
      connection.query(
        'SELECT * FROM sales',
        function (err, results, fields) {
          console.log(results); // results contains rows returned by server
          console.log(fields); // fields contains extra meta data about results, if available
        }
      );
    console.log("hola sql")
}

export default sales;
*/
