// init project
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
var cors = require('cors'); //HSX  don't delete.


// Establish a connection with the Mongo Database
// Get the username, password, host, and databse from the .env file
const mongoDB =
  "mongodb+srv://" +
  process.env.USERNAME +
  ":" +
  process.env.PASSWORD +
  "@" +
  process.env.HOST +
  "/" +
  process.env.DATABASE;
mongoose.connect(mongoDB, { useNewUrlParser: true, retryWrites: true });



// Initialize Express application
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: ['https://front-end-rubber-ducks.glitch.me', 'https://react-starter-hsx.glitch.me', 'https://slime-sideways-cyclone.glitch.me', 'https://responsible-lacy-molecule.glitch.me']
})); //give out access to front-end, don't delete this line. HSX

// set the view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views/");

// Using connect-mongo for session storage
// https://www.npmjs.com/package/connect-mongo

// Load routes
const routes = require("./routes");
app.use(routes);

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
