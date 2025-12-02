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
      console.error('Query error:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(results);
    }
  });
});

// POST - Add new product
app.post('/api/inventory', (req, res) => {
  console.log('Received POST request:', req.body);
  
  const { name, category, quantity, unit, location, manufacturer, expiryDate, minThreshold } = req.body;
  
  connection.query(
    'INSERT INTO products (productName, category, quantity, reorderLevel, price, sku) VALUES (?, ?, ?, ?, ?, ?)',
    [name, category || null, parseInt(quantity) || 0, parseInt(minThreshold) || 0, 0, null],
    (err, result) => {
      if (err) {
        console.error('Insert error:', err);
        return res.status(500).json({ error: 'Database error', details: err.message });
      }
      console.log('✅ Item added successfully! ID:', result.insertId);
      res.json({ success: true, id: result.insertId });
    }
  );
});

// PUT - Update existing product
app.put('/api/inventory/:id', (req, res) => {
  const itemId = req.params.id;
  const { name, category, quantity, minThreshold, price } = req.body;
  
  console.log('Received PUT request for ID:', itemId, req.body);

  connection.query(
    'UPDATE products SET productName = ?, category = ?, quantity = ?, reorderLevel = ?, price = ? WHERE id = ?',
    [name, category || null, parseInt(quantity) || 0, parseInt(minThreshold) || 0, parseFloat(price) || 0, itemId],
    (err, result) => {
      if (err) {
        console.error('Update error:', err);
        return res.status(500).json({ error: 'Database error', details: err.message });
      }
      console.log('✅ Item updated successfully! Rows affected:', result.affectedRows);
      res.json({ success: true, affectedRows: result.affectedRows });
    }
  );
});

// DELETE - Delete a product
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
      console.log('✅ Item deleted successfully!');
      res.json({ success: true, affectedRows: result.affectedRows });
    }
  );
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
