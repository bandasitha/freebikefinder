const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

// uri is from mongodb account > Connect > Connect your app > Driver: Node
const uri =
  'mongodb+srv://superuser:4IYc1f1LQtmvDELv@cluster0.mwyfrof.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri);

const databaseName = 'free-bike-finder';
const collName = 'nonprofits';

const database = client.db(databaseName);
const nonProfitData = database.collection(collName);

module.exports = {};

// Retrieve all nonprofits from db
module.exports.getAllNonProfits = async () => {
  const query = {};
  let cursor = await nonProfitData.find(query);
  return cursor.toArray();
};

// Retrieve one nonprofit org from db matching provided _id value
module.exports.getNonProfitById = async (nonProfitId) => {
  if (!validateId(nonProfitId)) {
    return { error: `Invalid id value. Please try again` };
  }

  let result = await nonProfitData.findOne({ _id: ObjectId(nonProfitId) });

  return result;
};

// Retrieve all nonprofit orgs from db matching supplied parameters
module.exports.getNonProfitByParameter = async (state) => {
  let cursor = await nonProfitData.find({ state: state });
  return cursor
    ? cursor.toArray()
    : {
        error: `There was an error retrieving organization data. Please try again later.`,
      };
};

// Creates one new shop with provided data fields
module.exports.createNonProfit = async (itemsToInsert) => {
  const query = { ...itemsToInsert };
  let result = await nonProfitData.insertOne(query);

  return result;
};

// Updates one shop with provided data fields matching provided _id value
module.exports.updateNonProfitById = async (nonProfitId, nonProfitObj) => {
  if (!validateId(nonProfitId)) {
    return { error: `Invalid id value. Please try again` };
  }

  let result = await nonProfitData.updateOne(
    { _id: ObjectId(nonProfitId) },
    { $set: nonProfitObj }
  );

  return result;
};

module.exports.deleteByID = async (nonProfitId) => {
  if (!validateId(nonProfitId)) {
    return { error: `Invalid id value. Please try again` };
  }
  const deletionRules = { _id: ObjectId(nonProfitId) };
  let result = await nonProfitData.deleteOne(deletionRules);

  if (result.deletedCount != 1) {
    return {
      error: `Something went wrong. ${result.deletedCount} organizations were deleted.`,
    };
  }

  return { message: `Deleted ${result.deletedCount} organizations.` };
};

// Helper function to validate provided _id values
let validateId = (id) => {
  return ObjectId.isValid(id);
};
