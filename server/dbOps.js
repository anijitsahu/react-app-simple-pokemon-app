// dependencies
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectID

const URI_TO_CONNECT_MONGODB = "mongodb+srv://root:root123@anijitsmongo-mwm6l.mongodb.net/allapps";
const DB_NAME = "allapps"
const COLLECTION_POKEMON_USERS = "pokemonUsers"

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

  // try {

  // db call 
  //     let data = await db.collection(COLLECTION_POKEMON_USERS)
  //       .findAndModify({
  //         query: { userId },
  //         update: {
  //           $setOnInsert: { userId, name, email}
  //         },
  //         new: true, // return new doc if one is upserted
  //         upsert: true // insert the document if it does not exist
  //       })
  // 
  //     output = (data.length > 0) ? [...data] : []
  output = []
  sendOutputAndCloseConnection(client, output, res)

  // } catch (error) {
  //   console.log('unable to get all the users', error)
  //   sendOutputAndCloseConnection(client, output, res)
  // }
}

let makeSaveFavourites = async (db, req, res, client, output) => {
  console.log('Function reached...', req.body)
  try {

    // db call 
    let data = await db
      .collection(COLLECTION_RESTAURANTS)
      .find(query)
      .toArray()

    output = (data.length > 0) ? [...data] : []
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