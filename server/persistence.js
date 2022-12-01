const { uuid } = require('uuidv4');
const MongoClient = require('mongodb').MongoClient;

var uri = process.env.MONGO_URI || "mongodb://root:rootpassword@localhost:27017?authMechanism=DEFAULT";
const client = new MongoClient(uri);
client.connect();
const db = client.db('mobtimer');

async function getCollection(collection) {
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

async function updateMobNames(name, change) {
 const collection = await getCollection('mobs');
 return collection.findOneAndUpdate(
   { mob: name },
   {$set: { names: change }}
 );
}

async function updateMobTime(name, change) {
 const collection = await getCollection('mobs');
 return collection.findOneAndUpdate(
   { mob: name },
   {$set: {
     timeInitial: change.timeInitial,
     timeLeft: change.timeLeft,
     playing:change.playing,
     autonext: change.autonext
   }},
 );
}

async function updateMobSound(name, change) {
 const collection = await getCollection('mobs');
 return collection.findOneAndUpdate(
   { mob: name },
   {$set: { sounds: change }},
 );
}

module.exports = {
 getMobByName,
 insertMob,
 updateMobNames,
 updateMobTime,
 updateMobSound,
}

// use 'docker-compose up -d' to start the database
