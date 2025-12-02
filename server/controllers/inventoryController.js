// server/controllers/inventoryController.js
import db from '../db.js';

export const addProduct = (req, res) => {
  const { productName, sku, category, quantity, reorderLevel, price, supplier } = req.body;

  // Validate required fields
  if (!productName || !sku || !category || !quantity || !reorderLevel || !price || !supplier) {
    return res.status(400).json({
      message: 'All fields are required',
      missing: Object.keys(req.body).filter(key => !req.body[key])
    });
  }

  // SQL query - adjust table and column names based on your actual database schema
  const query = `
    INSERT INTO products (product_name, sku, category, quantity, reorder_level, price, supplier)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [productName, sku, category, parseInt(quantity), parseInt(reorderLevel), parseFloat(price), supplier], (err, result) => {
    if (err) {
      console.error('Error adding product:', err);
      
      // Handle duplicate SKU error
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ message: 'SKU already exists. Please use a unique SKU.' });
      }
      
      return res.status(500).json({ 
        message: 'Database error',
        error: err.message 
      });
    }
    
    res.status(201).json({ 
      message: 'Product added successfully',
      id: result.insertId 
    });
  });
};

// Get all products
export const getAllProducts = (req, res) => {
  const query = 'SELECT * FROM products ORDER BY id DESC';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.json(results);
  });
};

// Get product by ID
export const getProductById = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM products WHERE id = ?';
  
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching product:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(results[0]);
  });
};

// Update product
export const updateProduct = (req, res) => {
  const { id } = req.params;
  const { productName, sku, category, quantity, reorderLevel, price, supplier } = req.body;
  
  const query = `
    UPDATE products 
    SET product_name = ?, sku = ?, category = ?, quantity = ?, reorder_level = ?, price = ?, supplier = ?
    WHERE id = ?
  `;
  
  db.query(query, [productName, sku, category, parseInt(quantity), parseInt(reorderLevel), parseFloat(price), supplier, id], (err, result) => {
    if (err) {
      console.error('Error updating product:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json({ message: 'Product updated successfully' });
  });
};

// Delete product
export const deleteProduct = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM products WHERE id = ?';
  
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting product:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json({ message: 'Product deleted successfully' });
  });
};