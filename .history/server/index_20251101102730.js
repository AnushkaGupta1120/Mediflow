import express from "express";
import cors from "cors";
import connection from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ GET all inventory items
app.get("/api/inventory", (req, res) => {
  connection.query("SELECT * FROM inventory", (err, results) => {
    if (err) {
      console.error("❌ Query error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// ✅ POST - Add new inventory item
app.post("/api/inventory", (req, res) => {
  const { name, category, quantity, unit, location, manufacturer, expiryDate, minThreshold } = req.body;

  const query = `
    INSERT INTO inventory (name, category, quantity, unit, location, manufacturer, expiryDate, minThreshold)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(
    query,
    [name, category, quantity, unit, location, manufacturer, expiryDate, minThreshold],
    (err, result) => {
      if (err) {
        console.error("❌ Insert error:", err);
        return res.status(500).json({ error: "Database error", details: err.message });
      }
      console.log("✅ Item added successfully! ID:", result.insertId);
      res.json({ success: true, id: result.insertId });
    }
  );
});

// ✅ PUT - Update item
app.put("/api/inventory/:id", (req, res) => {
  const id = req.params.id;
  const { name, category, quantity, unit, location, manufacturer, expiryDate, minThreshold } = req.body;

  const query = `
    UPDATE inventory
    SET name = ?, category = ?, quantity = ?, unit = ?, location = ?, manufacturer = ?, expiryDate = ?, minThreshold = ?
    WHERE id = ?
  `;

  connection.query(
    query,
    [name, category, quantity, unit, location, manufacturer, expiryDate, minThreshold, id],
    (err, result) => {
      if (err) {
        console.error("❌ Update error:", err);
        return res.status(500).json({ error: "Database error", details: err.message });
      }
      res.json({ success: true, affectedRows: result.affectedRows });
    }
  );
});

// ✅ DELETE - Delete item
app.delete("/api/inventory/:id", (req, res) => {
  const id = req.params.id;
  connection.query("DELETE FROM inventory WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("❌ Delete error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ success: true, affectedRows: result.affectedRows });
  });
});

// ✅ Server Start
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
