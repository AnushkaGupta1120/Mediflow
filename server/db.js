import mysql from 'mysql2';


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'akshat@0201#',  // ⚠️ Replace with your MySQL password
  database: 'inventory_db'
});


connection.connect((err) => {
if (err) {
    console.error('❌ Database connection failed:', err);
    throw err;
  }
  console.log('✅ Connected to MySQL Database!');
});


export default connection;