# TopUp NextJS Admin Dashboard with MySQL Authentication

This project implements a complete admin authentication system using MySQL database with Next.js 15.

## 🚀 Quick Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Database Setup

#### Install MySQL

- **Windows**: Download from [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)
- **macOS**: `brew install mysql`
- **Linux**: `sudo apt install mysql-server`

#### Create Database

```sql
CREATE DATABASE topup_nextjs;
CREATE USER 'topup_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON topup_nextjs.* TO 'topup_user'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Environment Configuration

Update `.env.local` with your database credentials:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=topup_user
DB_PASSWORD=your_password
DB_NAME=topup_nextjs

# JWT Secret (generate a secure key)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Admin Default Credentials
ADMIN_EMAIL=admin@topup.com
ADMIN_PASSWORD=admin123456
```

### 4. Initialize Database

```bash
npm run init-db
```

This will:

- Create the `admins` table
- Create a default admin user
- Display the login credentials

### 5. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000/super/login` to access the admin login.

## 🔐 Default Admin Credentials

- **Email**: admin@topup.com
- **Password**: admin123456

## 🏗️ Database Schema

### Admins Table

```sql
CREATE TABLE admins (
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
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 🔒 Security Features

- ✅ **Password Hashing**: bcrypt with 12 salt rounds
- ✅ **JWT Authentication**: Secure token-based auth
- ✅ **Account Locking**: 5 failed attempts = 15-minute lockout
- ✅ **HTTP-Only Cookies**: Secure token storage
- ✅ **Route Protection**: Middleware-based access control
- ✅ **SQL Injection Protection**: Parameterized queries
- ✅ **Session Management**: Automatic token expiration

## 📁 File Structure

```
src/
├── lib/
│   ├── database.js          # MySQL connection and utilities
│   └── auth.js             # Authentication utilities
├── models/
│   └── Admin.js            # Admin database model
├── middleware.js           # Route protection middleware
├── app/
│   ├── api/auth/
│   │   ├── login/route.js  # Login API endpoint
│   │   └── logout/route.js # Logout API endpoint
│   └── super/
│       ├── login/page.js   # Admin login page
│       └── page.js         # Admin dashboard
└── scripts/
    └── init-db.js          # Database initialization
```

## 🛡️ API Endpoints

### POST /api/auth/login

Login admin user

```json
{
  "email": "admin@topup.com",
  "password": "admin123456",
  "rememberMe": false
}
```

### POST /api/auth/logout

Logout current admin

## 🚨 Troubleshooting

### Database Connection Issues

1. Ensure MySQL is running
2. Verify credentials in `.env.local`
3. Check if database exists
4. Ensure user has proper permissions

### Authentication Issues

1. Clear browser cookies
2. Check JWT_SECRET in `.env.local`
3. Verify admin account status in database

### Installation Issues

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 🔧 Advanced Configuration

### Custom JWT Expiration

Update `src/lib/auth.js`:

```javascript
expiresIn: '7d', // 7 days instead of 24h
```

### Account Lockout Settings

Update `src/models/Admin.js`:

```javascript
WHEN login_attempts >= 3 THEN DATE_ADD(NOW(), INTERVAL 30 MINUTE)
// Changed from 5 attempts to 3, and 15 minutes to 30
```

## 📱 Mobile Support

The admin interface is fully responsive and works on:

- ✅ Desktop (1024px+)
- ✅ Tablet (768px - 1023px)
- ✅ Mobile (320px - 767px)

## 🚀 Production Deployment

1. **Environment Variables**: Update all secrets
2. **Database**: Use production MySQL instance
3. **HTTPS**: Enable secure cookies
4. **Rate Limiting**: Add API rate limiting
5. **Monitoring**: Add error tracking

---

For support, please create an issue or contact the development team.
