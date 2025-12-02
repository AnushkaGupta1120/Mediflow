import express from 'express';
import cors from 'cors';
import connection from './db.js';

const app = express();
app.use(cors());
app.use(express.json());

// GET all products
app.get('/api/inventory', (req, res) => {
  connection.query('SELECT * FROM products', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Database error');
    } else {
      res.json(results);
    }
  });
});

// POST - Add new product
app.post('/api/inventory', (req, res) => {
  const { name, category, quantity, unit, location, manufacturer, expiryDate, minThreshold } = req.body;
  
  // Map your frontend fields to database columns
  connection.query(
    'INSERT INTO products (productName, category, quantity, reorderLevel, price, sku) VALUES (?, ?, ?, ?, ?, ?)',
    [name, category || null, quantity || 0, minThreshold || 0, 0, null],
    (err, result) => {
      if (err) {
        console.error('Insert error:', err);
        return res.status(500).json({ error: 'Database error', details: err.message });
      }
      res.json({ success: true, id: result.insertId });
    }
  );
});

// PUT - Update existing product
app.put('/api/inventory/:id', (req, res) => {
  const itemId = req.params.id;
  const { name, category, quantity, minThreshold, price } = req.body;

  connection.query(
    'UPDATE products SET productName = ?, category = ?, quantity = ?, reorderLevel = ?, price = ? WHERE id = ?',
    [name, category || null, quantity || 0, minThreshold || 0, price || 0, itemId],
    (err, result) => {
      if (err) {
        console.error('Update error:', err);
        return res.status(500).json({ error: 'Database error', details: err.message });
      }
      res.json({ success: true, affectedRows: result.affectedRows });
    }
  );
});

// DELETE - Delete a product (optional but useful)
app.delete('/api/inventory/:id', (req, res) => {
  const itemId = req.params.id;
  
  connection.query(
    'DELETE FROM products WHERE id = ?',
    [itemId],
    (err, result) => {
      if (err) {
        console.error('Delete error:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ success: true, affectedRows: result.affectedRows });
    }
  );
});

app.listen(5000, () => {
  console.log('✅ Server running on http://localhost:8080');
});
