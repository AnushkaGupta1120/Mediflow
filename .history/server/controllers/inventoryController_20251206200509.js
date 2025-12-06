// server/controllers/inventoryController.js
import poolPromise from '../db.js';

// Helper to get DB connection pool
async function getPool() {
  return await poolPromise;
}

// -----------------------------
// ADD NEW INVENTORY ITEM
// -----------------------------
export const addProduct = async (req, res) => {
  const { productName, sku, category, quantity, reorderLevel, price } = req.body; // ← Add price

  if (!productName || !sku || !category || quantity == null || reorderLevel == null || price == null) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const query = `
    INSERT INTO inventory 
      (name, sku, category, quantity, minThreshold, price)
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
      parseFloat(price)  // ← Add price parameter
    ]);

    res.status(201).json({ message: "Product added successfully", id: result.insertId });

  } catch (err) {
    console.error("❌ Error adding product:", err);
    res.status(500).json({ message: "Database error", error: err.message });
  }
};

// -----------------------------
// GET ALL INVENTORY ITEMS
// -----------------------------
export const getAllProducts = async (req, res) => {
  const query = `SELECT * FROM inventory ORDER BY id DESC`;

  try {
    const pool = await getPool();
    const [rows] = await pool.query(query);
    res.json(rows);

  } catch (err) {
    console.error("❌ Error fetching inventory:", err);
    res.status(500).json({ message: "Database error", error: err.message });
  }
};


// -----------------------------
// GET A SINGLE INVENTORY ITEM BY ID
// -----------------------------
export const getProductById = async (req, res) => {
  const { id } = req.params;

  const query = `SELECT * FROM inventory WHERE id = ?`;

  try {
    const pool = await getPool();
    const [rows] = await pool.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(rows[0]);

  } catch (err) {
    console.error("❌ Error fetching item:", err);
    res.status(500).json({ message: "Database error", error: err.message });
  }
};


// -----------------------------
// UPDATE INVENTORY ITEM
// -----------------------------
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { productName, sku, category, quantity, reorderLevel, price } = req.body;

  const query = `
    UPDATE inventory 
    SET name = ?, sku = ?, category = ?, quantity = ?, minThreshold = ?, price = ?
    WHERE id = ?
  `;

  try {
    const pool = await getPool();
    const [result] = await pool.query(query, [
      productName,
      sku,
      category,
      parseInt(quantity),
      parseInt(reorderLevel),
      parseFloat(price),
      id
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Product updated successfully" });

  } catch (err) {
    console.error("❌ Error updating product:", err);
    res.status(500).json({ message: "Database error", error: err.message });
  }
};


// -----------------------------
// DELETE INVENTORY ITEM
// -----------------------------
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM inventory WHERE id = ?`;

  try {
    const pool = await getPool();
    const [result] = await pool.query(query, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Product deleted successfully" });

  } catch (err) {
    console.error("❌ Error deleting item:", err);
    res.status(500).json({ message: "Database error", error: err.message });
  }
};
