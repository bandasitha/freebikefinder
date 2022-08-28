const { Router } = require('express');
const router = Router();
const shopData = require('../dataInterface/shops');

// Route to retrieve (GET) all shops from database
// curl 'http://localhost:5000/shops'
// curl 'http://localhost:5000/shops?state=ri'
// works
router.get('/', async (req, res) => {
  let result;
  let resultStatus;

  if (Object.keys(req.query).length === 0) {
    result = await shopData.getAllShops();
  } else {
    let state = req.query.state.toUpperCase();
    result = await shopData.getShopByParameter(state);
  }

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
// works
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

// curl -X POST -H "Content-Type: application/json" -d '{"website":"http://test-shop.com", "name":"Test Shop", "state":"WA", "address":"1234 Main St. Seattle WA", "phone":"(234)456-5678", "email":"test@test.co"}' http://localhost:5000/shops
// works
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
// works
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
// doesn't work
router.delete('/:id', async (req, res) => {
  let resultStatus;
  const result = await shopData.deleteByID(req.params.id);

  if (result.error) {
    resultStatus = 400;
  } else {
    resultStatus = 200;
  }

  res.status(resultStatus).send(result);
});

module.exports = router;
