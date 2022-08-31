const { Router } = require('express');
const router = Router();
// require('dotenv').config();

router.use('/shops', require('./shops'));
router.use('/', (req, res) =>
  res.status(404).send('Route not found. Maybe you meant /shops?')
);

module.exports = router;
