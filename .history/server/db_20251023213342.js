import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_password',  // replace with your actual MySQL password
  database: 'mediflow_db'     // replace with your actual database name
});

connection.connect((err) => {
  if (err) throw err;
  console.log('✅ Connected to MySQL Database!');
});

export default connection;  
