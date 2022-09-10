const { Router } = require('express');
const router = Router();

router.use('/shops', require('./shops'));
router.use('/helmets', require('./helmets'));
router.use('/nonProfits', require('./nonProfits'));
router.use('/users', require('./users'));
router.use('/users/login', require('./users'));
router.use('/', (req, res) =>
  res.status(404).send('Route not found. Maybe you meant /shops?')
);

module.exports = router;
