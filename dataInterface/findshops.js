const { MongoClient } = require("mongodb");
const ObjectId = require('mongodb').ObjectId;

// uri is from mongodb account > Connect > Connect your app > Driver: Node
const uri = "";

const client = new MongoClient(uri);

const databaseName = '';
const collName = '';

module.exports = {};

// https://www.mongodb.com/docs/drivers/node/current/usage-examples/find/
module.exports.getAll = async () => {
  const database = client.db(databaseName);
  const shopData = database.collection(collName);
  const query = {  };
  let resultCursor = await shopData.find(query);
  return resultCursor.toArray();
}

module.exports.getByParameter = async (queryObj) => {
  const database = client.db(databaseName);
  const shopData = database.collection(collName);
  let result = await shopData.find(queryObj);
  return result.toArray();
}

module.exports.createShopDocument = async (itemsToInsert) => {
  const database = client.db(databaseName);
  const shopData = database.collection(collName);
  const query = {...itemsToInsert};
  let result = await shopData.insertOne(query);

  return result;
}
