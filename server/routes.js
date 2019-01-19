// dependencies
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require("body-parser")

const express = require("express")
const router = express.Router()

// dbOps
const dbOps = require("./dbOps")

router.use(cors())
router.use(morgan('dev'))
router.use(bodyParser.json({ type: 'application/json' }))

router.post('/getfavourites/:id', (req, res) => {
  dbOps.connectDbAndRunQueries("getFavourites", req, res)
})

router.post('/savefavourites/:id', (req, res) => {
  dbOps.connectDbAndRunQueries("saveFavourites", req, res)
})


module.exports = router