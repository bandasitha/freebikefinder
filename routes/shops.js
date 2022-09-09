const { Router } = require('express');
const router = Router();
const shopData = require('../dataInterface/shops');
const auth = require('../auth');

// Route to retrieve (GET) all shops from database
// curl 'https://freebikefinder.herokuapp.com/shops'
// curl 'https://freebikefinder.herokuapp.com/shops?state=ri'
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
// curl 'https://freebikefinder.herokuapp.com/shops/62f8166c5051f0576d48c62a'
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

// PROTECTED ROUTE
// curl -X POST -H "Content-Type: application/json" -H "x-access-token:<token-here>" -d '{"website":"http://test-shop.com", "name":"Test Shop 2", "state":"WA", "address":"1234 Main St. Seattle WA", "phone":"(234)456-5678", "email":"test@test.org"}' https://freebikefinder.herokuapp.com/shops
router.post('/', auth.verifyToken, async (req, res) => {
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

// PROTECTED ROUTE
// curl -X PUT -H "Content-Type: application/json" -H "x-access-token:<token-here>" -d '{"website":"http://test-shop-update.com", "name":"Test Shop", "state":"WA", "address":"1234 Main St. Seattle WA", "phone":"(234)456-5678", "email":"test@test-update.co"}' https://freebikefinder.herokuapp.com/shops/<_id-here>
router.put('/:id', auth.verifyToken, async (req, res) => {
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

// PROTECTED ROUTE
// curl -X DELETE -H "x-access-token:<token-here>" https://freebikefinder.herokuapp.com/shops/<_id here>
router.delete('/:id', auth.verifyToken, async (req, res) => {
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
