import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'topup_nextjs',
  port: process.env.DB_PORT || 3306,
};

export async function POST(request) {
  try {
    const { products } = await request.json();

    if (!products || !Array.isArray(products) || products.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'No products data provided'
      }, { status: 400 });
    }

    // Create database connection
    const connection = await mysql.createConnection(dbConfig);

    let savedCount = 0;
    let updatedCount = 0;
    let newCount = 0;
    let errors = [];

         // Process each product
     for (const product of products) {
       try {
         // Check if product already exists by code or name
         const [existingProducts] = await connection.execute(
           'SELECT id FROM products WHERE code = ? OR name = ?',
           [product.code, product.name]
         );

                 const productData = {
           code: product.code,
           game: product.game,
           name: product.name,
           description: product.name, // Using name as description if no description provided
           price_basic: product.price?.basic || 0,
           price_premium: product.price?.premium || 0,
           price_special: product.price?.special || 0,
           server: product.server || '1',
           status: product.status || 'available',
           stock: 0, // Set default stock to 0
           category: getCategoryFromGame(product.game),
           image: getDefaultImage(product.game),
           is_popular: 0,
           sold_count: 0,
           rating: 0.00
         };

                 if (existingProducts.length > 0) {
           // Update existing product (check by code first, then by name)
           const existingProduct = existingProducts[0];
           const updateField = existingProduct.code === product.code ? 'code' : 'name';
           const updateValue = existingProduct.code === product.code ? product.code : product.name;
           
           await connection.execute(
             `UPDATE products SET 
               game = ?, name = ?, description = ?, 
               price_basic = ?, price_premium = ?, price_special = ?,
               server = ?, status = ?, category = ?, image = ?,
               updated_at = CURRENT_TIMESTAMP
               WHERE ${updateField} = ?`,
             [
               productData.game, productData.name, productData.description,
               productData.price_basic, productData.price_premium, productData.price_special,
               productData.server, productData.status, productData.category, productData.image,
               updateValue
             ]
           );
           updatedCount++;
         } else {
           // Insert new product
           await connection.execute(
             `INSERT INTO products (
               code, game, name, description, 
               price_basic, price_premium, price_special,
               server, status, stock, category, image, 
               is_popular, sold_count, rating, created_at, updated_at
             ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
             [
               productData.code, productData.game, productData.name, productData.description,
               productData.price_basic, productData.price_premium, productData.price_special,
               productData.server, productData.status, productData.stock, productData.category, productData.image,
               productData.is_popular, productData.sold_count, productData.rating
             ]
           );
           newCount++;
         }
        savedCount++;

             } catch (error) {
         console.error(`Error processing product ${product.code}:`, error);
         
         // Handle duplicate key errors more gracefully
         let errorMessage = error.message;
         if (error.code === 'ER_DUP_ENTRY') {
           if (error.message.includes('unique_product_name')) {
             errorMessage = `Product name "${product.name}" already exists`;
           } else if (error.message.includes('unique_product_code')) {
             errorMessage = `Product code "${product.code}" already exists`;
           }
         }
         
         errors.push({
           code: product.code,
           name: product.name,
           error: errorMessage
         });
       }
    }

    await connection.end();

    return NextResponse.json({
      success: true,
      message: 'Products processed successfully',
      savedCount,
      updatedCount,
      newCount,
      errors: errors.length > 0 ? errors : null
    });

  } catch (error) {
    console.error('Error saving VIP Reseller products:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      error: error.message
    }, { status: 500 });
  }
}

// Helper function to determine category from game name (kebab-case format)
function getCategoryFromGame(gameName) {
  // Convert game name to kebab-case format
  const kebabCase = gameName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
  
  return kebabCase;
}

// Helper function to get default image based on game
function getDefaultImage(gameName) {
  const gameNameLower = gameName.toLowerCase();
  
  if (gameNameLower.includes('mobile legends') || gameNameLower.includes('ml')) {
    return 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop';
  } else if (gameNameLower.includes('free fire') || gameNameLower.includes('ff')) {
    return 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=200&fit=crop';
  } else if (gameNameLower.includes('pubg')) {
    return 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=200&h=200&fit=crop';
  } else if (gameNameLower.includes('genshin')) {
    return 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop';
  } else if (gameNameLower.includes('valorant')) {
    return 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=200&h=200&fit=crop';
  } else if (gameNameLower.includes('call of duty') || gameNameLower.includes('cod')) {
    return 'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?w=200&h=200&fit=crop';
  } else if (gameNameLower.includes('steam')) {
    return 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=200&h=200&fit=crop';
  } else if (gameNameLower.includes('honkai')) {
    return 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=200&h=200&fit=crop';
  } else {
    return 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop';
  }
}
