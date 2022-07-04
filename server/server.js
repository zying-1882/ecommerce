const express  = require('express')
const app = express()
const cors = require('cors')
const PORT = 5000
const mongoose = require('mongoose')
const formidable = require('formidable')

//Connect to the Database "ecommerce" in Robo3T
mongoose.connect("mongodb://localhost:27017/ecommerce", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
})

//Check if we are connected to the Database
mongoose.connection.once("open", () => console.log("We are conneted to the Database"))

app.use(cors())
app.use(express.json())
app.use(express.static('public'))


//Define the routes
app.use("/users", require('./routes/users'))
app.use("/items", require('./routes/items'))
app.use("/carts", require('./routes/carts'))
app.use("/orders", require('./routes/orders'))


app.listen(PORT, ()=> console.log(`App is listening in port ${PORT}`))
