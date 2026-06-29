const mongoose = require("mongoose");

const connectDB = async () => {
  let mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.log("No MONGO_URI provided in environment. Starting in-memory MongoDB server...");
    try {
      const { MongoMemoryServer } = require("mongodb-memory-server");
      const mongoServer = await MongoMemoryServer.create();
      mongoUri = mongoServer.getUri();
      console.log("In-memory MongoDB started at:", mongoUri);
      
      // Store the server instance globally to close it on exit if needed
      global.__MONGO_SERVER__ = mongoServer;
    } catch (err) {
      console.log("Failed to start in-memory MongoDB:", err.message);
      console.log("Please provide a valid MONGO_URI in your .env file.");
      process.exit(1);
    }
  }

  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(mongoUri);
    console.log("MongoDB Connected successfully.");
  } catch (error) {
    console.log("Database Connection Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;