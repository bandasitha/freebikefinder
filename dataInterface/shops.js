const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

// uri is from mongodb account > Connect > Connect your app > Driver: Node
const uri =
  'mongodb+srv://superuser:7Kvszal8Uz7Oqzok@cluster0.mwyfrof.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri);

const databaseName = 'free-bike-finder';
const collName = 'companies';

module.exports = {};

// https://www.mongodb.com/docs/drivers/node/current/usage-examples/find/
module.exports.getAll = async () => {
  const database = client.db(databaseName);
  const shopData = database.collection(collName);
  const query = {};
  let resultCursor = await shopData.find(query);
  return resultCursor.toArray();
};

module.exports.getByParameter = async (queryObj) => {
  const database = client.db(databaseName);
  const shopData = database.collection(collName);
  let result = await shopData.find(queryObj);
  return result.toArray();
};

module.exports.createShopDocument = async (itemsToInsert) => {
  const database = client.db(databaseName);
  const shopData = database.collection(collName);
  const query = { ...itemsToInsert };
  let result = await shopData.insertOne(query);

  // retrieve all movies from database
  module.exports.getAllShops = async () => {
    const query = {};
    let cursor = await collectionData
      .find(query)
      .limit(10)
      .sort({ runtime: -1 });

    return cursor
      ? cursor.toArray()
      : {
          error: `There was an error retrieving shop data. Please try again later.`,
        };
  };

  return result;
};
