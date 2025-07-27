import { executeQuery, executeQuerySingle } from "@/lib/database";
import { hashPassword } from "@/lib/auth";

export class AdminModel {
  // Create admins table
  static async createTable() {
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
  static async findByEmail(email) {
    const query = 'SELECT * FROM admins WHERE email = ? AND status = "active"';
    try {
      return await executeQuerySingle(query, [email]);
    } catch (error) {
      console.error("Error finding admin by email:", error);
      throw error;
    }
  }

  // Find admin by ID
  static async findById(id) {
    const query =
      'SELECT id, name, email, role, status, last_login, created_at FROM admins WHERE id = ? AND status = "active"';
    try {
      return await executeQuerySingle(query, [id]);
    } catch (error) {
      console.error("Error finding admin by ID:", error);
      throw error;
    }
  }

  // Create new admin
  static async create(adminData) {
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

  // Update last login
  static async updateLastLogin(adminId) {
    const query =
      "UPDATE admins SET last_login = CURRENT_TIMESTAMP, login_attempts = 0 WHERE id = ?";

    try {
      await executeQuery(query, [adminId]);
      return true;
    } catch (error) {
      console.error("Error updating last login:", error);
      throw error;
    }
  }

  // Increment login attempts
  static async incrementLoginAttempts(email) {
    const query = `
      UPDATE admins 
      SET login_attempts = login_attempts + 1,
          locked_until = CASE 
            WHEN login_attempts >= 4 THEN DATE_ADD(NOW(), INTERVAL 15 MINUTE)
            ELSE locked_until
          END
      WHERE email = ?
    `;

    try {
      await executeQuery(query, [email]);
      return true;
    } catch (error) {
      console.error("Error incrementing login attempts:", error);
      throw error;
    }
  }

  // Check if account is locked
  static async isAccountLocked(email) {
    const query =
      "SELECT locked_until, login_attempts FROM admins WHERE email = ?";

    try {
      const admin = await executeQuerySingle(query, [email]);
      if (!admin) return false;

      if (admin.locked_until && new Date(admin.locked_until) > new Date()) {
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error checking account lock status:", error);
      throw error;
    }
  }

  // Reset login attempts
  static async resetLoginAttempts(email) {
    const query =
      "UPDATE admins SET login_attempts = 0, locked_until = NULL WHERE email = ?";

    try {
      await executeQuery(query, [email]);
      return true;
    } catch (error) {
      console.error("Error resetting login attempts:", error);
      throw error;
    }
  }

  // Seed default admin user
  static async seedDefaultAdmin() {
    try {
      const defaultEmail = process.env.ADMIN_EMAIL || "admin@topup.com";
      const existingAdmin = await this.findByEmail(defaultEmail);

      if (!existingAdmin) {
        const defaultPassword = process.env.ADMIN_PASSWORD || "admin123456";
        const adminId = await this.create({
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
}
