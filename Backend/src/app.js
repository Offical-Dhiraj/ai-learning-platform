const express = require("express");
const app = express();
const cors = require("cors");

const routes = require("./routes");
const errorHandler = require("./middlewares/error.middleware");
const notFound = require("./middlewares/notFound.middleware");

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;