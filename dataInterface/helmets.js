const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

// uri is from mongodb account > Connect > Connect your app > Driver: Node
const uri =
  'mongodb+srv://superuser:4IYc1f1LQtmvDELv@cluster0.mwyfrof.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri);

const databaseName = 'free-bike-finder';
const collName = 'helmets';

const database = client.db(databaseName);
const helmetData = database.collection(collName);

module.exports = {};

// Retrieve all helmets from db
module.exports.getAllHelmets = async () => {
  const query = {};
  let cursor = await helmetData.find(query);
  return cursor.toArray();
};

// Retrieve one helmet org from db matching provided _id value
module.exports.getHelmetById = async (helmetId) => {
  if (!validateId(helmetId)) {
    return { error: `Invalid id value. Please try again` };
  }

  let result = await helmetData.findOne({ _id: ObjectId(helmetId) });

  return result;
};

// Retrieve all helmet orgs from db matching supplied parameters
module.exports.gethelmetByParameter = async (state) => {
  let cursor = await helmetData.find({ state: state });
  return cursor
    ? cursor.toArray()
    : {
        error: `There was an error retrieving organization data. Please try again later.`,
      };
};

// Creates one new shop with provided data fields
module.exports.createHelmet = async (itemsToInsert) => {
  const query = { ...itemsToInsert };
  let result = await helmetData.insertOne(query);

  return result;
};

// Updates one shop with provided data fields matching provided _id value
module.exports.updateHelmetById = async (helmetId, helmetObj) => {
  if (!validateId(helmetId)) {
    return { error: `Invalid id value. Please try again` };
  }

  let result = await helmetData.updateOne(
    { _id: ObjectId(helmetId) },
    { $set: helmetObj }
  );

  return result;
};

module.exports.deleteByID = async (helmetId) => {
  if (!validateId(helmetId)) {
    return { error: `Invalid id value. Please try again` };
  }
  const deletionRules = { _id: ObjectId(helmetId) };
  let result = await helmetData.deleteOne(deletionRules);

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
