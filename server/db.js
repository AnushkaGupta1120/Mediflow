import mysql from 'mysql2';

<<<<<<< HEAD
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'akshat@0201#',
  database: 'inventory_db',
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

export default db;
=======

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
>>>>>>> 96fd69b0c500abff2626d801e3ee749c84cd251b
