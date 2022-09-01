const { Router } = require('express');
const router = Router();
const shopData = require('../dataInterface/helmets');

// Route to retrieve (GET) all helmets from database
// curl 'http://localhost:5000/helmets'
// curl 'http://localhost:5000/helmets?state=ri'
// works
router.get('/', async (req, res) => {
  let result;
  let resultStatus;

  if (Object.keys(req.query).length === 0) {
    result = await helmetData.getAllhelmets();
  } else {
    let state = req.query.state.toUpperCase();
    result = await helmetData.gethelmetByParameter(state);
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
// curl http://localhost:5000/helmets/630a74a5423ebfea5ae6acc3
// works
router.get('/:id', async (req, res) => {
  let resultStatus;
  const result = await helmetData.gethelmetById(req.params.id);

  if (result === null) {
    resultStatus = 500;
  } else if (result.length === 0 || result.error) {
    resultStatus = 404;
  } else {
    resultStatus = 200;
  }

  res.status(resultStatus).send(result);
});

// curl -X POST -H "Content-Type: application/json" -d '{"website":"http://test-helmet.com", "name":"Test helmet", "state":"WA", "address":"1234 Main St. Seattle WA", "phone":"(234)456-5678", "email":"test@test.co"}' http://localhost:5000/helmets
// works
router.post('/', async (req, res) => {
  let resultStatus;
  let result = await helmetData.createhelmet(req.body);

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

// curl -X PUT -H "Content-Type: application/json" -d '{"website":"http://test-helmet-update.com", "name":"Test helmet", "state":"WA", "address":"1234 Main St. Seattle WA", "phone":"(234)456-5678", "email":"test@test-update.co"}' http://localhost:5000/helmets/630a74a5423ebfea5ae6acc3
// works
router.put('/:id', async (req, res) => {
  let resultStatus;
  const result = await helmetData.updatehelmetById(req.params.id, req.body);

  if (result === null) {
    resultStatus = 500;
  } else if (result.error) {
    resultStatus = 400;
  } else {
    resultStatus = 200;
  }

  res.status(resultStatus).send(result);
});

// curl -X DELETE http://localhost:5000/helmets/<_id here>
// doesn't work
router.delete('/:id', async (req, res) => {
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
