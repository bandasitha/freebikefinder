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

// Route to retrieve shops by query parameters: state, maintenance, classes
// curl 'http://localhost:5000/shops?query-item=param'
// curl 'http://localhost:5000/shops?state=ca'
// curl 'http://localhost:5000/shops?maintenance=TRUE'
// curl 'http://localhost:5000/shops?classes=TRUE'
// curl 'http://localhost:5000/shops?state=ca&maintenance=TRUE&classes=FALSE'
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

// curl -X POST -H "Content-Type: application/json" -d '{"website":"http://website.com", "name":"test-shop", "state":"TS", "address":"1234 Main St. City TS", "bikes":"true", "tools":"true" "phone":"(123) 456-7890"}' http://localhost:5000/companies
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

// curl 'http://localhost:5000/shops/shop-name?idtype=name'
// curl 'http://localhost:5000/shops/phone-num?idtype=phone'
router.put("/:id", async (req, res, next) => {
  let resultStatus;
  const validAttrib = [
    "name", "website", 
    //ADD MORE LATER
  ]

  if (:id == name) {
    findCompanyByName
  } else {
    
  }
  const result = await movieData.updateByName(req.params.name, req.body)

  if(result.error){
    resultStatus = 400;
  } else {
    resultStatus = 200;
  }

  res.status(resultStatus).send(result);
});

// curl -X PUT -H "Content-Type: application/json" -d '{"bikes":"TRUE"}' http://localhost:5000/companies/(123) 456-7890

// router.put("/:phone", async (req, res, next) => {
//   let resultStatus;
//   const result = await movieData.updateByPhone(req.params.phone, req.body)

//   if(result.error){
//     resultStatus = 400;
//   } else {
//     resultStatus = 200;
//   }

//   res.status(resultStatus).send(result);
// });

// curl -X DELETE http://localhost:5000/movies/573a1390f29313caabcd4135
router.delete("/:id", async (req, res, next) => {
  const result = await movieData.delete(req.params.id);

  if(result.error){
    resultStatus = 400;
  } else {
    resultStatus = 200;
  }

  res.status(resultStatus).send(result);
});

module.exports = router;
