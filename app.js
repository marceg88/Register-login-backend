require("dotenv").config()
const express = require("express")
const {connectToDb} = require("./config/database")
const cors = require("cors")


const port = process.env.PORT
const app = express()
app.use(cors());
//cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
}); 

connectToDb()

app.use(express.json());
app.use(cors());

const routes = require("./routes/index")
app.use("/", routes)

app.listen(port, console.log(`Server running in the port: ${port}`))