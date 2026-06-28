const mongoose = require("mongoose");

const connectDB = async () => {
  try {
        console.log("URI:", process.env.MONGO_URI);
     console.log("Trying to connect...");
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");
  } catch (error) {
    console.log("Database Connection Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;