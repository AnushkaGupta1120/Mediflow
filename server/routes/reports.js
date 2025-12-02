import express from 'express';
const router = express.Router();

router.get('/inventory', (req, res) => {
  res.json({
    labels: ['Product A', 'Product B', 'Product C'],
    values: [120, 80, 60],
  });
});

export default router;
