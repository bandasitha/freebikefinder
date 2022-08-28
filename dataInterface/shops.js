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

// Retrieve all shops from db
module.exports.getAllShops = async () => {
  const query = {};
  let cursor = await shopData.find(query).limit(10);
  return cursor.toArray();
};

// Retrieve one shop from db matching provided _id value
module.exports.getShopById = async (shopId) => {
  if (!validateId(shopId)) {
    return { error: `Invalid id value. Please try again` };
  }

  let result = await shopData.findOne({ _id: ObjectId(shopId) });

  return result;
};

// Retrieve all shops from db matching supplied parameters
module.exports.getShopByParameter = async (queryObj) => {
  let cursor = await shopData.find(queryObj);
  return cursor
    ? cursor.toArray()
    : {
        error: `There was an error retrieving shop data. Please try again later.`,
      };
};

// Creates one new shop with provided data fields
module.exports.createShop = async (itemsToInsert) => {
  const query = { ...itemsToInsert };
  let result = await shopData.insertOne(query);

  return result;
};

// Updates one shop with provided data fields matching provided _id value
module.exports.updateShopById = async (shopId, shopObj) => {
  if (!validateId(shopId)) {
    return { error: `Invalid id value. Please try again` };
  }

  let result = await shopData.updateOne(
    { _id: ObjectId(shopId) },
    { $set: shopObj }
  );

  return result;
};

module.exports.deleteByID = async (shopId) => {
  if (~validateId(shopId)) {
    return { error: `Invalid id value. Please try again` };
  }
  const deletionRules = { _id: ObjectId(shopId) };
  let result = await shopData.deleteOne(deletionRules);

  if (result.deletedCount != 1) {
    return {
      error: `Something went wrong. ${result.deletedCount} shops were deleted.`,
    };
  }

  return { message: `Deleted ${result.deletedCount} shops.` };
};

// Helper function to validate provided _id values
let validateId = (id) => {
  return ObjectId.isValid(id);
};
