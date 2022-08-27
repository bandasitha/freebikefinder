const { Router } = require('express');
const router = Router();
const shopData = require('../dataInterface/shops');

// Route to retrieve (GET) all shops from database
// curl http://localhost:5000/shops
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

// curl 'http://localhost:5000/shops?query-item=param'
// curl 'http://localhost:5000/shops?state=ca'
router.get('/', async (req, res) => {
  if (!req.query) {
    res.status(404).send({ error: 'No query parameters found.' });
  }

  let resultStatus;
  let queryObj = {};

  if (req.query.state) {
    state = req.query.state;
    queryObj['state'] = state;
  }

  let result = await shopData.getByParameter(queryObj);

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

// curl -X POST -H "Content-Type: application/json" -d '{"website":"http://website.com", "name":"test-shop", "state":"WA", "address":"1234 Main St. Seattle WA", "bikes":"true", "tools":"true"}' http://localhost:5000/shops
router.post('/', async (req, res) => {
  let resultStatus;
  let result = await shopData.createShopDocument(req.body);

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
