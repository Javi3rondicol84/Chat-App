import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'chatdb'
});

connection.connect((err) => {
  if(err) {
    console.log("error in the connection: "+err);
    return;
  }

  console.log("connected to the db with the id: "+connection.threadId);

});

export default connection;