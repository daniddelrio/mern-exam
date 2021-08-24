const express = require("express");
const mongoose = require("mongoose"); // new
const routes = require("./routes");

// Connect to MongoDB database
const mongoUri =
  "mongodb+srv://mongodbuser:IsNOSQLBetter@mongo-cluster.ye2ty.mongodb.net/database?retryWrites=true&w=majority";
mongoose.connect(mongoUri, { useNewUrlParser: true }).then(() => {
  const app = express();
  app.use(express.json());
  app.use("/api", routes);

  app.listen(5000, () => {
    console.log("Server has started!");
  });
});
