const { Router } = require('express');
const router = Router();

router.use('/shops', require('./shops'));
router.use('/', (req, res) =>
  res.status(404).send('Route not found. Maybe you meant /shops?')
);

module.exports = router;
