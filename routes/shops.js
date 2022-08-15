const { Router } = require('express');
const router = Router();
const shopData = require('../dataInterface/shops');

// Route to retrieve (GET) all movies from database
// curl http://localhost:5000/movies
router.get('/', async (req, res) => {
  let resultStatus;
  const result = await shopData.getAllShops();

  if (result === null) {
    resultStatus = 500;
  } else if (result.length === 0) {
    resultStatus = 404;
  } else if (result.error) {
    resultStatus = 400;
  } else {
    resultStatus = 200;
  }

  res.status(resultStatus).send(result);
});

module.exports = router;
