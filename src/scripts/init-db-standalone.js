const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");

// Load environment variables
require("dotenv").config({ path: ".env.local" });

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "topup_nextjs",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test connection function
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Database connected successfully");
    connection.release();
    return true;
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    return false;
  }
}

// Execute query function
async function executeQuery(query, params = []) {
  try {
    const [results] = await pool.execute(query, params);
    return results;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

// Hash password
async function hashPassword(password) {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

// Create admins table
async function createAdminsTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS admins (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role ENUM('super_admin', 'admin', 'moderator') DEFAULT 'admin',
      status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
      last_login TIMESTAMP NULL,
      login_attempts INT DEFAULT 0,
      locked_until TIMESTAMP NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_email (email),
      INDEX idx_status (status)
    )
  `;

  try {
    await executeQuery(createTableQuery);
    console.log("✅ Admins table created successfully");
    return true;
  } catch (error) {
    console.error("❌ Error creating admins table:", error);
    throw error;
  }
}

// Find admin by email
async function findAdminByEmail(email) {
  const query = 'SELECT * FROM admins WHERE email = ? AND status = "active"';
  try {
    const results = await executeQuery(query, [email]);
    return results[0] || null;
  } catch (error) {
    console.error("Error finding admin by email:", error);
    throw error;
  }
}

// Create new admin
async function createAdmin(adminData) {
  const { name, email, password, role = "admin" } = adminData;
  const hashedPassword = await hashPassword(password);

  const query =
    "INSERT INTO admins (name, email, password, role) VALUES (?, ?, ?, ?)";

  try {
    const result = await executeQuery(query, [
      name,
      email,
      hashedPassword,
      role,
    ]);
    return result.insertId;
  } catch (error) {
    console.error("Error creating admin:", error);
    throw error;
  }
}

// Seed default admin user
async function seedDefaultAdmin() {
  try {
    const defaultEmail = process.env.ADMIN_EMAIL || "admin@topup.com";
    const existingAdmin = await findAdminByEmail(defaultEmail);

    if (!existingAdmin) {
      const defaultPassword = process.env.ADMIN_PASSWORD || "admin123456";
      const adminId = await createAdmin({
        name: "Super Admin",
        email: defaultEmail,
        password: defaultPassword,
        role: "super_admin",
      });

      console.log(`✅ Default admin created with ID: ${adminId}`);
      console.log(`📧 Email: ${defaultEmail}`);
      console.log(`🔑 Password: ${defaultPassword}`);

      return adminId;
    } else {
      console.log("ℹ️ Default admin already exists");
      return existingAdmin.id;
    }
  } catch (error) {
    console.error("Error seeding default admin:", error);
    throw error;
  }
}

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
      console.log("\n📝 Make sure:");
      console.log("1. MySQL is running");
      console.log("2. Database exists (CREATE DATABASE topup_nextjs;)");
      console.log("3. User credentials are correct in .env.local");
      console.log("4. User has proper permissions");
      process.exit(1);
    }

    // Create tables
    console.log("📋 Creating database tables...");
    await createAdminsTable();

    // Seed default admin
    console.log("👤 Creating default admin user...");
    await seedDefaultAdmin();

    console.log("✅ Database initialization completed successfully!");
    console.log("\n📝 Next steps:");
    console.log("1. Start your Next.js application: npm run dev");
    console.log("2. Navigate to http://localhost:3000/super/login");
    console.log("3. Use the admin credentials shown above to login");
  } catch (error) {
    console.error("❌ Database initialization failed:", error);
    console.log("\n🔧 Troubleshooting:");
    console.log(
      "1. Check your .env.local file has correct database credentials"
    );
    console.log("2. Ensure MySQL server is running");
    console.log(
      "3. Make sure the database exists: CREATE DATABASE topup_nextjs;"
    );
    console.log(
      "4. Verify user permissions: GRANT ALL PRIVILEGES ON topup_nextjs.* TO 'your_user'@'localhost';"
    );
    process.exit(1);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

// Run initialization
initializeDatabase();
