// dependencies
const express = require("express")
const app = express()
const PORT = 3000

// router
const router = require('./routes')


// home page
app.use(express.static('../dist/'))

// service routes
app.use('/services', router)

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT)
})