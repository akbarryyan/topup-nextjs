const { testConnection } = require("../lib/database.js");
const { AdminModel } = require("../models/Admin.js");

async function initializeDatabase() {
  console.log("🚀 Starting database initialization...");

  try {
    // Test database connection
    console.log("📡 Testing database connection...");
    const connected = await testConnection();

    if (!connected) {
      console.error(
        "❌ Cannot connect to database. Please check your configuration."
      );
      process.exit(1);
    }

    // Create tables
    console.log("📋 Creating database tables...");
    await AdminModel.createTable();

    // Seed default admin
    console.log("👤 Creating default admin user...");
    await AdminModel.seedDefaultAdmin();

    console.log("✅ Database initialization completed successfully!");
    console.log("\n📝 Next steps:");
    console.log(
      "1. Update your .env.local file with correct database credentials"
    );
    console.log("2. Start your Next.js application");
    console.log("3. Navigate to /super/login to test admin login");
  } catch (error) {
    console.error("❌ Database initialization failed:", error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

// Run initialization
initializeDatabase();
