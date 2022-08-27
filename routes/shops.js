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

// Route to retrieve (GET) one shop from database by _id value
// curl http://localhost:5000/shops/630a74a5423ebfea5ae6acc3
router.get('/:id', async (req, res) => {
  let resultStatus;
  const result = await shopData.getShopById(req.params.id);

  if (result === null) {
    resultStatus = 500;
  } else if (result.length === 0 || result.error) {
    resultStatus = 404;
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

  let result = await shopData.getShopByParameter(queryObj);

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

// curl -X POST -H "Content-Type: application/json" -d '{"website":"http://test-shop.com", "name":"Test Shop", "state":"WA", "address":"1234 Main St. Seattle WA", "phone":"(234)456-5678", "email":"test@test.co"}' http://localhost:5000/shops
router.post('/', async (req, res) => {
  let resultStatus;
  let result = await shopData.createShop(req.body);

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

// curl -X PUT -H "Content-Type: application/json" -d '{"website":"http://test-shop-update.com", "name":"Test Shop", "state":"WA", "address":"1234 Main St. Seattle WA", "phone":"(234)456-5678", "email":"test@test-update.co"}' http://localhost:5000/shops/630a74a5423ebfea5ae6acc3
router.put('/:id', async (req, res) => {
  let resultStatus;
  const result = await shopData.updateShopById(req.params.id, req.body);

  if (result === null) {
    resultStatus = 500;
  } else if (result.error) {
    resultStatus = 400;
  } else {
    resultStatus = 200;
  }

  res.status(resultStatus).send(result);
});

// curl -X DELETE http://localhost:5000/shops/<_id here>
router.delete('/:id', async (req, res) => {
  let resultStatus;
  const result = await shopData.deleteByID(req.params.id);

  if(result.error){
    resultStatus = 400;
  } else {
    resultStatus = 200;
  }

  res.status(resultStatus).send(result);
});

module.exports = router;
