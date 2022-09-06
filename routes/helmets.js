const { Router } = require('express');
const router = Router();
const helmetData = require('../dataInterface/helmets');
const auth = require('../auth');

// Route to retrieve (GET) all helmets from database
// curl 'http://localhost:8000/helmets'
// curl 'http://localhost:8000/helmets?state=nc'
router.get('/', async (req, res) => {
  let result;
  let resultStatus;

  if (Object.keys(req.query).length === 0) {
    result = await helmetData.getAllHelmets();
  } else {
    let state = req.query.state.toUpperCase();
    result = await helmetData.getHelmetByParameter(state);
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

// Route to retrieve (GET) one helmet from database by _id value
// curl http://localhost:8000/helmets/6301a9905051f0576dc8661b
router.get('/:id', async (req, res) => {
  let resultStatus;
  const result = await helmetData.getHelmetById(req.params.id);

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
// curl -X POST -H "Content-Type: application/json" -H "x-access-token:<token-here>" -d '{"website":"http://test-helmet.com", "name":"Test helmet", "phone":"(234)456-5678"}' http://localhost:8000/helmets
router.post('/', auth.verifyToken, async (req, res) => {
  let resultStatus;
  let result = await helmetData.createHelmet(req.body);

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
// curl -X PUT -H "Content-Type: application/json" -H "x-access-token:<token-here>" -d '{"website":"http://test-helmet-update.com", "name":"Test helmet changed"}' http://localhost:8000/helmets/<_id here>
router.put('/:id', auth.verifyToken, async (req, res) => {
  let resultStatus;
  const result = await helmetData.updateHelmetById(req.params.id, req.body);

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
// curl -X DELETE -H "x-access-token:<token-here>" http://localhost:8000/helmets/<_id here>
router.delete('/:id', auth.verifyToken, async (req, res) => {
  let resultStatus;
  const result = await helmetData.deleteByID(req.params.id);

  if (result.error) {
    resultStatus = 400;
  } else {
    resultStatus = 200;
  }

  res.status(resultStatus).send(result);
});

module.exports = router;
