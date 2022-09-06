const { Router } = require('express');
const router = Router();
const nonProfitData = require('../dataInterface/nonProfits');
const auth = require('../auth');

// Route to retrieve (GET) all nonprofits from database
// curl 'http://localhost:8000/nonprofits'
// curl 'http://localhost:8000/nonprofits?state=ca'
router.get('/', async (req, res) => {
  let result;
  let resultStatus;

  if (Object.keys(req.query).length === 0) {
    result = await nonProfitData.getAllNonProfits();
  } else {
    let state = req.query.state.toUpperCase();
    result = await nonProfitData.getNonProfitByParameter(state);
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

// Route to retrieve (GET) one nonprofit from database by _id value
// curl http://localhost:8000/nonprofits/6301a9c35051f0576dc895a1
router.get('/:id', async (req, res) => {
  let resultStatus;
  const result = await nonProfitData.getNonProfitById(req.params.id);

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
// curl -X POST -H "Content-Type: application/json" -H "x-access-token:<token-here>" -d '{"website":"http://test-nonprofit.com", "name":"Test nonprofit", "state":"CA", "phone":"(234)456-5678"}' http://localhost:8000/nonprofits
router.post('/', auth.verifyToken, async (req, res) => {
  let resultStatus;
  let result = await nonProfitData.createNonProfit(req.body);

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
// curl -X PUT -H "Content-Type: application/json" -H "x-access-token:<token-here>" -d '{"website":"http://test-nonprofit-update.com", "name":"Test nonprofit changed"}' http://localhost:8000/nonprofits/<_id here>
router.put('/:id', auth.verifyToken, async (req, res) => {
  let resultStatus;
  const result = await nonProfitData.updateNonProfitById(
    req.params.id,
    req.body
  );

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
// curl -X DELETE -H "x-access-token:<token-here>" http://localhost:8000/nonprofits/<_id here>
router.delete('/:id', auth.verifyToken, async (req, res) => {
  let resultStatus;
  const result = await nonProfitData.deleteByID(req.params.id);

  if (result.error) {
    resultStatus = 400;
  } else {
    resultStatus = 200;
  }

  res.status(resultStatus).send(result);
});

module.exports = router;
