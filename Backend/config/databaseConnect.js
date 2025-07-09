const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGOOSE_URI);
    console.log("✅ MongoDB connected");

    // Import cron job AFTER DB connection
    require('../jobs/clearExpiredResetTokens');

  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
}

module.exports = connectDB;
