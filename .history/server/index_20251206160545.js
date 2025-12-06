import express from "express";
import cors from "cors";
import poolPromise from "./db.js";

// Wait for the pool to be created (db.js exports a Promise that resolves to the pool)
const pool = await poolPromise;

const app = express();
app.use(cors());
app.use(express.json());

// ✅ GET all inventory items
app.get("/api/inventory", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM inventory");
    res.json(rows);
  } catch (err) {
    console.error("❌ Query error:", err);
    res.status(500).json({ error: "Database error", details: err?.message });
  }
});

// Health check endpoint - verifies server and DB connectivity
app.get('/api/health', async (req, res) => {
  try {
    // Perform a lightweight check against the database
    const [rows] = await pool.query('SELECT 1 AS ok');
    const dbOk = Array.isArray(rows) && rows.length > 0;
    res.json({ ok: true, database: dbOk });
  } catch (err) {
    console.error('❌ Health check failed:', err);
    res.status(500).json({ ok: false, database: false, error: err?.message });
  }
});

// ✅ POST - Add new inventory item
app.post("/api/inventory", async (req, res) => {
  const { name, category, quantity, unit, location, manufacturer, expiryDate, minThreshold } = req.body;

  const query = `
    INSERT INTO inventory (name, category, quantity, unit, location, manufacturer, expiryDate, minThreshold)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    const [result] = await pool.query(query, [name, category, quantity, unit, location, manufacturer, expiryDate, minThreshold]);
    console.log("✅ Item added successfully! ID:", result.insertId);
    res.json({ success: true, id: result.insertId });
  } catch (err) {
    console.error("❌ Insert error:", err);
    res.status(500).json({ error: "Database error", details: err?.message });
  }
});

// ✅ PUT - Update item
app.put("/api/inventory/:id", async (req, res) => {
  const id = req.params.id;
  const { name, category, quantity, unit, location, manufacturer, expiryDate, minThreshold } = req.body;

  const query = `
    UPDATE inventory
    SET name = ?, category = ?, quantity = ?, unit = ?, location = ?, manufacturer = ?, expiryDate = ?, minThreshold = ?
    WHERE id = ?
  `;

  try {
    const [result] = await pool.query(query, [name, category, quantity, unit, location, manufacturer, expiryDate, minThreshold, id]);
    res.json({ success: true, affectedRows: result.affectedRows });
  } catch (err) {
    console.error("❌ Update error:", err);
    res.status(500).json({ error: "Database error", details: err?.message });
  }
});

// ✅ DELETE - Delete item
app.delete("/api/inventory/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.query("DELETE FROM inventory WHERE id = ?", [id]);
    res.json({ success: true, affectedRows: result.affectedRows });
  } catch (err) {
    console.error("❌ Delete error:", err);
    res.status(500).json({ error: "Database error", details: err?.message });
  }
});

// ✅ Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
