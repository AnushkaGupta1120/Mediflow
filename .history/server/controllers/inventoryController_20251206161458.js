// server/controllers/inventoryController.js
import poolPromise from '../db.js';

// Helper to get the pool
async function getPool() {
  const pool = await poolPromise;
  return pool;
}

export const addProduct = async (req, res) => {
  const { productName, sku, category, quantity, reorderLevel, price, supplier } = req.body;

  if (!productName || !sku || !category || quantity == null || reorderLevel == null || price == null || !supplier) {
    return res.status(400).json({
      message: 'All fields are required',
      missing: Object.keys(req.body).filter((key) => req.body[key] === undefined || req.body[key] === null || req.body[key] === '')
    });
  }

  const query = `
    INSERT INTO products (product_name, sku, category, quantity, reorder_level, price, supplier)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    const pool = await getPool();
    const [result] = await pool.query(query, [productName, sku, category, parseInt(quantity, 10), parseInt(reorderLevel, 10), parseFloat(price), supplier]);
    res.status(201).json({ message: 'Product added successfully', id: result.insertId });
  } catch (err) {
    console.error('Error adding product:', err);
    if (err && err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'SKU already exists. Please use a unique SKU.' });
    }
    return res.status(500).json({ message: 'Database error', error: err?.message });
  }
};

export const getAllProducts = async (req, res) => {
  const query = 'SELECT * FROM products ORDER BY id DESC';
  try {
    const pool = await getPool();
    const [rows] = await pool.query(query);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: 'Database error', error: err?.message });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM products WHERE id = ?';
  try {
    const pool = await getPool();
    const [rows] = await pool.query(query, [id]);
    if (!rows || rows.length === 0) return res.status(404).json({ message: 'Product not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ message: 'Database error', error: err?.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { productName, sku, category, quantity, reorderLevel, price, supplier } = req.body;
  const query = `
    UPDATE products 
    SET product_name = ?, sku = ?, category = ?, quantity = ?, reorder_level = ?, price = ?, supplier = ?
    WHERE id = ?
  `;
  try {
    const pool = await getPool();
    const [result] = await pool.query(query, [productName, sku, category, parseInt(quantity, 10), parseInt(reorderLevel, 10), parseFloat(price), supplier, id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product updated successfully' });
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ message: 'Database error', error: err?.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM products WHERE id = ?';
  try {
    const pool = await getPool();
    const [result] = await pool.query(query, [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ message: 'Database error', error: err?.message });
  }
};