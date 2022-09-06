const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
const auth = require('../auth');

const uri =
  'mongodb+srv://superuser:4IYc1f1LQtmvDELv@cluster0.mwyfrof.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri);

const databaseName = 'free-bike-finder';
const collName = 'users';

const database = client.db(databaseName);
const userData = database.collection(collName);

module.exports = {};

findByEmail = async (email) => {
  const query = { email: email };
  let user = await userData.findOne(query);
  return user;
};

module.exports.findByCredentials = async (userObj) => {
  if (!userObj.email || !userObj.password) {
    return { error: `Invalid credentials provided. Please try again.` };
  }

  let user = await findByEmail(userObj.email);

  if (await bcrypt.compare(userObj.password, user.password)) {
    let token = auth.createToken(user.email);
    return {
      message: `User successfully logged in.`,
      token: token,
    };
  } else {
    return { error: `No user found with email ${userObj.email}.` };
  }
};

module.exports.create = async (newObj) => {
  let alreadyExists = await findByEmail(newObj.email);
  if (alreadyExists) {
    return { error: `This email is already in use.` };
  }

  if (!newObj.name || !newObj.email || !newObj.password) {
    return { error: `Invalid user fields provided. Please try again.` };
  }

  let encryptedPassword = await bcrypt.hash(newObj.password, 10);

  let goodUser = {
    name: newObj.name,
    email: newObj.email,
    password: encryptedPassword,
  };

  const result = await userData.insertOne(goodUser);

  if (result.acknowledged) {
    return {
      newObjectId: result.insertedId,
      message: `User created! ID: ${result.insertedId}`,
    };
  } else {
    return { error: `Something went wrong. Please try again.` };
  }
};
