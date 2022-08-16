const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

// uri is from mongodb account > Connect > Connect your app > Driver: Node
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

const databaseName = 'free-bike-finder';
const collName = 'companies';

const database = client.db(databaseName);
const shopData = database.collection(collName);

module.exports = {};

// https://www.mongodb.com/docs/drivers/node/current/usage-examples/find/
module.exports.getAllShops = async () => {
  const query = {};
  let cursor = await shopData.find(query);
  console.log('test');
  return cursor.toArray();
};

module.exports.getByParameter = async (queryObj) => {
  const database = client.db(databaseName);
  const shopData = database.collection(collName);
  let result = await shopData.find(queryObj);
  return cursor
    ? cursor.toArray()
    : {
        error: `There was an error retrieving shop data. Please try again later.`,
      };
};

module.exports.createShopDocument = async (itemsToInsert) => {
  const database = client.db(databaseName);
  const shopData = database.collection(collName);
  const query = { ...itemsToInsert };
  let result = await shopData.insertOne(query);

  return result;
};
