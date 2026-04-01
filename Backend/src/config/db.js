const mongoose = require("mongoose");
const { setServers } = require("node:dns/promises")


async function connectDB() {
  try {
    setServers(["1.1.1.1", "8.8.8.8"])



    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connect to database");

  } catch (error) {
    console.error("Database connection error", error);
  }
}

module.exports = connectDB;
