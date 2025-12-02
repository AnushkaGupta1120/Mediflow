import express from 'express';
const router = express.Router();

// For demo, using an in-memory array as "database"
let suppliers = [];

router.post('/', (req, res) => {
  const { supplierName, contact } = req.body;

  if (!supplierName || !contact) {
    return res.status(400).json({ error: 'supplierName and contact are required' });
  }

  // Create new supplier object (add more fields if needed)
  const newSupplier = {
    id: suppliers.length + 1,
    supplierName,
    contact,
  };

  suppliers.push(newSupplier);

  res.status(201).json({ message: 'Supplier added', supplier: newSupplier });
});

router.get('/', (req, res) => {
  res.json(suppliers);
});

export default router;
