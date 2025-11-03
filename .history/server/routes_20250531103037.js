import express from 'express';
import cors from 'cors';
import connection from './db.js';

const app = express();
app.use(cors());
app.use(express.json());

// Example route using the MySQL connection
app.get('/api/inventory', (req, res) => {
  connection.query('SELECT * FROM inventory', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Database error');
    } else {
      res.json(results);
    }
  });
});

app.listen(5000, () => {
  console.log('✅ Server running on http://localhost:5000');
});
