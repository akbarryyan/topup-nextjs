-- Add unique constraint to prevent duplicate product names
ALTER TABLE products ADD UNIQUE KEY unique_product_name (name);

-- Add unique constraint to prevent duplicate product codes (if not already exists)
ALTER TABLE products ADD UNIQUE KEY unique_product_code (code);
