# Always remember this MySQL database schema for this project:

Database Schema:

Database name: topup_nextjs

admins:
  - id (INT, PK, AUTO_INCREMENT)
  - name (VARCHAR 100, NOT NULL)
  - email (VARCHAR 100, UNIQUE, NOT NULL)
  - password (VARCHAR 255, NOT NULL)
  - role (ENUM: 'admin', default 'admin')
  - status (ENUM: 'active','inactive', 'suspended', default 'active')
  - last_login (DATETIME, default NULL)
  - created_at (DATETIME, default CURRENT_TIMESTAMP)
  - updated_at (DATETIME, default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)

games:
  - id (INT, PK, AUTO_INCREMENT)
  - name (VARCHAR 150, NOT NULL)
  - slug (VARCHAR 150, UNIQUE, NOT NULL)
  - created_at (DATETIME, default CURRENT_TIMESTAMP)
  - updated_at (DATETIME, default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)

products:
  - id (INT, PK, AUTO_INCREMENT)
  - game_id (INT, FK → games.id, NOT NULL)
  - code (VARCHAR 50, UNIQUE, NOT NULL)
  - product_name (VARCHAR 255, NOT NULL)
  - price_basic (DECIMAL 12,2)
  - price_premium (DECIMAL 12,2)
  - price_special (DECIMAL 12,2)
  - server (VARCHAR 50)
  - status (ENUM: 'available','empty', default 'available')
  - created_at (DATETIME, default CURRENT_TIMESTAMP)
  - updated_at (DATETIME, default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)

product_stocks:
  - id (INT, PK, AUTO_INCREMENT)
  - product_id (INT, FK → products.id, NOT NULL)
  - description (TEXT)
  - stock (INT, default 0)
  - status (ENUM: 'available','empty', default 'available')
  - last_checked (DATETIME, default CURRENT_TIMESTAMP)
