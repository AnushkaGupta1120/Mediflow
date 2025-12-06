// server/controllers/inventoryController.js
import poolPromise from '../db.js';

async function getPool() {
  return await poolPromise;
}

// --------------------------------------
// ADD PRODUCT
// --------------------------------------
export const addProduct = async (req, res) => {
  const { productName, sku, category, quantity, reorderLevel, price } = req.body;

  if (!productName || !sku || !category || !quantity || !reorderLevel || !price) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const query = `
    INSERT INTO products
    (productName, sku, category, quantity, reorderLevel, price)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  try {
    const pool = await getPool();
    const [result] = await pool.query(query, [
      productName,
      sku,
      category,
      parseInt(quantity, 10),
      parseInt(reorderLevel, 10),
      parseFloat(price)
    ]);

    res.status(201).json({ message: "Product added successfully", id: result.insertId });
  } catch (err) {
    console.error("Error adding product:", err);

    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ message: "SKU already exists" });
    }

    res.status(500).json({ message: "Database error", error: err.message });
  }
};

// --------------------------------------
// GET ALL PRODUCTS
// --------------------------------------
export const getAllProducts = async (req, res) => {
  const query = `SELECT * FROM products ORDER BY id DESC`;

  try {
    const pool = await getPool();
    const [rows] = await pool.query(query);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Database error", error: err.message });
  }
};

// --------------------------------------
// GET SINGLE PRODUCT
// --------------------------------------
export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await getPool();
    const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);

    if (rows.length === 0)
      return res.status(404).json({ message: "Product not found" });

    res.json(rows[0]);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ message: "Database error", error: err.message });
  }
};

// --------------------------------------
// UPDATE PRODUCT
// --------------------------------------
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { productName, sku, category, quantity, reorderLevel, price } = req.body;

  const query = `
    UPDATE products
    SET productName = ?, sku = ?, category = ?, quantity = ?, reorderLevel = ?, price = ?
    WHERE id = ?
  `;

  try {
    const pool = await getPool();
    const [result] = await pool.query(query, [
      productName,
      sku,
      category,
      parseInt(quantity, 10),
      parseInt(reorderLevel, 10),
      parseFloat(price),
      id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product updated successfully" });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ message: "Database error", error: err.message });
  }
};

// --------------------------------------
// DELETE PRODUCT
// --------------------------------------
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await getPool();
    const [result] = await pool.query("DELETE FROM products WHERE id = ?", [id]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ message: "Database error", error: err.message });
  }
};
