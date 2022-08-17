const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Setup Cross origin
app.use(require("cors")());

//Bring in the routes

app.use("/user", require("./routes/user"));
app.use("/car", require("./routes/car"));
app.use("/trip", require("./routes/trip"));


//Setup Error Handlers

const errorHandlers = require("./handlers/errorHandler");
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongooseErrors);

if (process.env.ENV === "DEVELOPMENT") {
  app.use(errorHandlers.developmentErrors);
} else {
  app.use(errorHandlers.productionErrors);
}

module.exports = app;
// crypto.randomBytes(60).toString('base64')
