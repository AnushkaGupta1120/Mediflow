import express, { Request, Response } from "express";
import connection from "../db"; // your mysql2 connection file

const router = express.Router();

// ➕ Add inventory item
router.post("/add", (req: Request, res: Response) => {
  const { item_name, category, quantity, supplier, location, expiry_date } = req.body;

  const query = `
    INSERT INTO inventory (item_name, category, quantity, supplier, location, expiry_date)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  connection.query(
    query,
    [item_name, category, quantity, supplier, location, expiry_date],
    (err, result) => {
      if (err) {
        console.error("❌ Insert error:", err);
        return res.status(500).json({ error: "Database insert failed" });
      }
      res.json({ message: "✅ Item added successfully!" });
    }
  );
});

// 📦 Get all inventory items
router.get("/", (_req: Request, res: Response) => {
  connection.query("SELECT * FROM inventory", (err, results) => {
    if (err) {
      console.error("❌ Fetch error:", err);
      return res.status(500).json({ error: "Database fetch failed" });
    }
    res.json(results);
  });
});

export default router;
