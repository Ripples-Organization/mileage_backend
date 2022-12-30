require("dotenv").config();
const mongoose = require("mongoose");
const serverless = require("serverless-http");
const express = require("express");


mongoose
  .connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("connected"))
  .catch((e) => console.log(e));

mongoose.connection.on("error", (err) => {
  console.log("Mongoose Connection ERROR: " + err.message);
});

mongoose.connection.once("open", () => {
  console.log("MongoDB Connected!");
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("cors")());

app.use("/user", require("./routes/user"));
app.use("/car", require("./routes/car"));
app.use("/trip", require("./routes/trip"));

const errorHandlers = require("./handlers/errorHandler");

app.use(errorHandlers.notFound);
app.use(errorHandlers.mongooseErrors);

if (process.env.ENV === "DEVELOPMENT") {
  app.use(errorHandlers.developmentErrors);
} else {
  app.use(errorHandlers.productionErrors);
}

module.exports.handler = serverless(app);

// 'use strict';

// module.exports.hello = async (event) => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify(
//       {
//         message: 'yay!!! it works !!!!!!',
//         input: event,
//       },
//       null,
//       2
//     ),
//   };

//   // Use this code if you don't use the http event with the LAMBDA-PROXY integration
//   // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
// };
