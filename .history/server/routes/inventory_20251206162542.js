import express from 'express';
import {
	addProduct,
	getAllProducts,
	getProductById,
	updateProduct,
	deleteProduct,
} from '../controllers/inventoryController.js';

const router = express.Router();

// Get all products
router.get('/', getAllProducts);

// Sample inventory data (for testing / UI demo)
router.get('/sample', (req, res) => {
	const sample = [
		{ id: 1, name: 'Paracetamol 500mg', sku: 'PARA-500', category: 'Analgesic', quantity: 120, unit: 'tabs', location: 'Shelf A1', manufacturer: 'MediCorp', expiryDate: '2026-06-30', minThreshold: 20 },
		{ id: 2, name: 'Amoxicillin 250mg', sku: 'AMOX-250', category: 'Antibiotic', quantity: 60, unit: 'caps', location: 'Shelf B2', manufacturer: 'HealWell', expiryDate: '2025-12-31', minThreshold: 10 },
		{ id: 3, name: 'Saline 0.9% 500ml', sku: 'SAL-500', category: 'IV Fluid', quantity: 40, unit: 'bottles', location: 'Fridge 1', manufacturer: 'SterileLab', expiryDate: '2027-03-15', minThreshold: 5 },
	];
	res.json(sample);
});

// Create product
router.post('/', addProduct);

// Get single product
router.get('/:id', getProductById);

// Update product
router.put('/:id', updateProduct);

// Delete product
router.delete('/:id', deleteProduct);

export default router;
