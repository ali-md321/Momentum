const cron = require("node-cron");
const User = require("../models/userModel");

cron.schedule("*/16 * * * *", async () => {
  console.log("⏰ Running token cleanup at", new Date().toLocaleTimeString());

  try {
    const now = new Date();
    const expiredUsers = await User.find({
        resetPasswordExpiry: { $lt: now },
      });
      console.log(`Found ${expiredUsers.length} expired token(s)`);
      
    const result = await User.updateMany(
      { resetPasswordExpiry: { $lt: now } },
      {
        $unset: {
          resetPasswordToken: "",
          resetPasswordExpiry: "",
        },
      }
    );

    if (result.modifiedCount > 0) {
      console.log(`🧹 Cleared expired reset tokens from ${result.modifiedCount} user(s)`);
    } else {
      console.log("✅ No expired tokens to clear");
    }
  } catch (err) {
    console.error("❌ Token cleanup error:", err.message);
  }
});
