const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

const databaseName = 'free-bike-finder';
const collName = 'companies';

const database = client.db(databaseName);
const shopData = database.collection(collName);

module.exports = {};

findCompanyByName = async (name) => {
  const query = {name: name};
  let company = await shopData.findOne(query);
  return company;
};

findCompanybyPhone = async (phone) => {
  const query = {phone: phone};
  let company = await shopData.findOne(query);
  return company;
}

// https://www.mongodb.com/docs/drivers/node/current/usage-examples/find/
module.exports.getAllShops = async () => {
  const database = client.db(databaseName);
  const shopData = database.collection(collName);
  
  const query = {};
  let cursor = await shopData.find(query).limit(10);
  console.log(query);
  return cursor.toArray();
};

module.exports.getByParameter = async (queryObj) => {
  let result = await shopData.find(queryObj);
  return cursor
    ? cursor.toArray()
    : {
        error: `There was an error retrieving shop data. Please try again later.`,
      };
};

module.exports.createShopDocument = async (itemsToInsert) => {
  const query = { ...itemsToInsert };
  let result = await shopData.insertOne(query);

  return result;
};

module.exports.updateById = async (shopId, newObj) => {
  // Stealing the following filter because it makes the updateOne() code easier to read.
  const updateRules = {
    $set: {"website" : newObj.website, "name": newObj.name, "address": newObj.address, "phone": newObj.phone, "email": newObj.email, "contact_form": newObj.contact_form, "facebook": newObj.facebook, "twitter": newObj.twitter, "instagram": newObj.instagram, "cost": newObj.cost, "helmets": newObj.bikes, "maintenance": newObj.maintenance, "tools": newObj.tools, "classes": newObj.classes, "suggested_donation": newObj.suggested_donation, "volunteering": newObj.volunteering, "donate_bikes": newObj.donate_bikes, "target_client": newObj.target_client, }
  };
  const filter = { _id: ObjectId(shopId) };
  const result = await shopData .updateOne(filter, updateRules);

  if(result.modifiedCount != 1){
    return {error: `Something went wrong. ${result.modifiedCount} movies were updated. Please try again.`}
  };
};

module.exports.deleteById = async (movieId) => {
  const deletionRules = {_id:ObjectId(movieId)}
  const result = await shopData.deleteOne(deletionRules);

  if(result.deletedCount != 1){
    return {error: `Something went wrong. ${result.deletedCount} movies were deleted. Please try again.`}
  };

  return {message: `Deleted ${result.deletedCount} movie.`};
};
