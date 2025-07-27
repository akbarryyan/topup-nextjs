-- Database Setup SQL Commands
-- Run these commands in your MySQL command line or GUI tool

-- 1. Create the database
CREATE DATABASE IF NOT EXISTS topup_nextjs;

-- 2. Create a dedicated user (optional but recommended)
CREATE USER IF NOT EXISTS 'topup_user'@'localhost' IDENTIFIED BY 'your_secure_password';

-- 3. Grant permissions
GRANT ALL PRIVILEGES ON topup_nextjs.* TO 'topup_user'@'localhost';

-- 4. Apply permissions
FLUSH PRIVILEGES;

-- 5. Use the database
USE topup_nextjs;

-- 6. Show databases to verify
SHOW DATABASES;

-- Note: After running these commands, update your .env.local file with:
-- DB_HOST=localhost
-- DB_PORT=3306
-- DB_USER=topup_user
-- DB_PASSWORD=your_secure_password
-- DB_NAME=topup_nextjs
