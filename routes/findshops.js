const { Router } = require("express");
const router = Router();
const bodyParser = require('body-parser');

const findShops = require('../dataInterface/findShops');

// curl http://<address-here>
router.get("/:path-here", async (req, res) => {
  let result = await findShops.getAll(req.params.path-here);
  if(result){
    res.status(200).send(result);
  } else {
    // If result is empty/null, something serious is wrong with the MongoDB connection.
    res.status(500).send({error: "Something went wrong. Please try again."});
  }
});

// curl 'http://<address-here>?query-item=param'
router.get("/", async (req, res) => {
  let queryObj = {};
  if (!req.query) {
    res.status(404).send({error: "No query parameters found."});
  }
  if (conditions) {
    // Air temp will come in as str, should be converted to num (parseFloat())
    param = req.query.param;
    // objName["keyName"] = valueName; <- creates key-value pair in objName
    queryObj["key"] = value;
  }
  let result = await shopData.getByParameter(queryObj);
  if(result){
    res.status(200).send(result);
  } else {
    res.status(500).send({error: "Something went wrong. Please try again."});
  }
});

// curl -X POST -H "Content-Type: application/json" -d '{"key":{"subKey":"value", "subKey":"value"}, "key":"value", "key":"value"}' http://<address-here>
router.post("/", async (req, res) => {
  let resultStatus;
  let result = await shopData.createShopDocument(req.body);
  if(result){
    res.status(200).send(result);
  } else {
    res.status(500).send({error: "Something went wrong. Please try again."});
  }
});

module.exports = router;