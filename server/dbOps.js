// dependencies
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectID

const URI_TO_CONNECT_MONGODB = "mongodb+srv://root:root123@anijitsmongo-mwm6l.mongodb.net/allapps";
const DB_NAME = "allapps"
const COLLECTION_POKEMON_USERS = "pokemonusers"

// this function will connect db and based on API send response
let connectDbAndRunQueries = async (apiName, req, res) => {
  try {
    let client = await MongoClient.connect(URI_TO_CONNECT_MONGODB, { useNewUrlParser: true })
    // select the db, Collections are selected based on needs
    const db = client.db(DB_NAME)

    // default output
    const output = { "message": "SUCCESS" }

    // perform several db actions based on API names
    chooseApiAndSendResponse(apiName, db, req, res, client, output)
  } catch (err) {
    console.log('Some Error occurred ...', err)
  }
}


// choose the particular function for an API and process it
let chooseApiAndSendResponse = (apiName, db, req, res, client, output) => {

  // perform db specific ops based on API names
  switch (apiName) {

    case 'getFavourites':
      makeGetFavourites(db, req, res, client, output)
      break;

    case 'saveFavourites':
      makeSaveFavourites(db, req, res, client, output)
      break;
  }
}

let makeGetFavourites = async (db, req, res, client, output) => {
  console.log('Function reached...', req.body)
  console.log('params..', req.params)
  let { id: userId, name, email } = req.body

  try {

    // db call 
    let docs = await db.collection(COLLECTION_POKEMON_USERS)
      .find({ userId }, { projection: { _id: 0, favourites: 1 } })
      .toArray()

    console.log("docs are now", docs)

    // the user is not present in the db, insert user's info
    if (docs.length == 0) {
      let data = await db.collection(COLLECTION_POKEMON_USERS)
        .insertOne({ userId, name, email, favourites: [] })

      console.log("Number of inserted docs", data.result.n)
      output = []
    } else {
      output = docs[0].favourites
    }

    sendOutputAndCloseConnection(client, output, res)

  } catch (error) {
    console.log('unable to get all the users', error)
    sendOutputAndCloseConnection(client, output, res)
  }
}

let makeSaveFavourites = async (db, req, res, client, output) => {
  console.log('Function reached...', req.body)
  let { userId, favourites } = req.body

  try {

    // db call 
    let data = await db
      .collection(COLLECTION_POKEMON_USERS)
      .updateOne({ userId }, { $set: { favourites } })

    console.log("Number of modified docs", data.result.nModified)
    sendOutputAndCloseConnection(client, output, res)

  } catch (error) {
    console.log('unable to get all the users', error)
    sendOutputAndCloseConnection(client, output, res)
  }
}

// send the response and close the db connection
function sendOutputAndCloseConnection(client, output, res) {
  if (output && res) {
    console.log(`========================\nOUTPUT AS RECEIVED AND BEFORE SENDING\n==================\n`, output)
    res.json(output)
  }

  // close the database connection after sending the response
  client.close()
}

// exports
module.exports = {
  connectDbAndRunQueries
}