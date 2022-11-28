 const { uuid } = require('uuidv4');
 const MongoClient = require('mongodb').MongoClient;

var uri = "mongodb://root:rootpassword@localhost:27017?authMechanism=DEFAULT";

async function getCollection(collection) {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('mobtimer');
  return db.collection(collection);
}

async function getMobByName(name) {
  const collection = await getCollection('mobs');
  return collection.findOne({ mob: name });
}

async function insertMob(mob) {
  const collection = await getCollection('mobs');
  mob.id = uuid();
  await collection.insertOne(mob);
}

module.exports = {
  getMobByName,
  insertMob,
}

// use 'docker-compose up -d' to start the database