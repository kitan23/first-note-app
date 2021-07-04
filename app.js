const express = require("express");
const connectDB = require("./config/db");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const app = express();

//Start Middleware Handlebars
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

//Initiate BodyParser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Initiate methodOverride Middleware
app.use(methodOverride("_method"));

//import routes and use routes
const posts = require("./routes/posts");
app.use("/", posts);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
