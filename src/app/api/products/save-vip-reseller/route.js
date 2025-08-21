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

// In-memory progress tracking (in production, use Redis or database)
let progressData = {
  isProcessing: false,
  current: 0,
  total: 0,
  percentage: 0,
  message: '',
  startTime: null
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

    // Initialize progress
    progressData = {
      isProcessing: true,
      current: 0,
      total: products.length,
      percentage: 0,
      message: 'Starting batch processing...',
      startTime: new Date()
    };

    // Create database connection
    const connection = await mysql.createConnection(dbConfig);

    let savedCount = 0;
    let updatedCount = 0;
    let newCount = 0;
    let errors = [];

    // Batch size for processing
    const BATCH_SIZE = 100;
    const totalBatches = Math.ceil(products.length / BATCH_SIZE);

    console.log(`Processing ${products.length} products in ${totalBatches} batches of ${BATCH_SIZE}`);

    // Process products in batches
    for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
      const startIndex = batchIndex * BATCH_SIZE;
      const endIndex = Math.min(startIndex + BATCH_SIZE, products.length);
      const batch = products.slice(startIndex, endIndex);

      // Update progress
      progressData.current = startIndex;
      progressData.percentage = Math.round((startIndex / products.length) * 100);
      progressData.message = `Processing batch ${batchIndex + 1}/${totalBatches} (products ${startIndex + 1}-${endIndex})`;
      
      // Add more detailed progress info
      console.log(`Progress: ${progressData.percentage}% - ${progressData.message}`);

      console.log(`Processing batch ${batchIndex + 1}/${totalBatches} (products ${startIndex + 1}-${endIndex})`);

      // Prepare batch data
      const batchData = batch.map(product => ({
        code: product.code,
        game: product.game,
        name: product.name,
        description: product.name,
        price_basic: product.price?.basic || 0,
        price_premium: product.price?.premium || 0,
        price_special: product.price?.special || 0,
        server: product.server || '1',
        status: product.status || 'available',
        stock: 0,
        category: getCategoryFromGame(product.game),
        image: getDefaultImage(product.game),
        is_popular: 0,
        sold_count: 0,
        rating: 0.00
      }));

      // Get all existing products in this batch
      const codes = batchData.map(p => p.code);
      const names = batchData.map(p => p.name);
      
      let existingProducts = [];
      
      if (codes.length > 0 || names.length > 0) {
        // Create placeholders for IN clause
        const codePlaceholders = codes.length > 0 ? codes.map(() => '?').join(',') : '';
        const namePlaceholders = names.length > 0 ? names.map(() => '?').join(',') : '';
        
        let query = 'SELECT id, code, name FROM products WHERE ';
        let params = [];
        
        if (codes.length > 0 && names.length > 0) {
          query += `code IN (${codePlaceholders}) OR name IN (${namePlaceholders})`;
          params = [...codes, ...names];
        } else if (codes.length > 0) {
          query += `code IN (${codePlaceholders})`;
          params = codes;
        } else if (names.length > 0) {
          query += `name IN (${namePlaceholders})`;
          params = names;
        }
        
        const [results] = await connection.execute(query, params);
        existingProducts = results;
      }

      // Create lookup maps for faster checking
      const existingByCode = new Map(existingProducts.map(p => [p.code, p]));
      const existingByName = new Map(existingProducts.map(p => [p.name, p]));

      // Separate new and existing products
      const newProducts = [];
      const updateProducts = [];

      batchData.forEach(product => {
        const existingByCodeProduct = existingByCode.get(product.code);
        const existingByNameProduct = existingByName.get(product.name);

        if (existingByCodeProduct || existingByNameProduct) {
          updateProducts.push(product);
        } else {
          newProducts.push(product);
        }
      });

             // Batch insert new products
       if (newProducts.length > 0) {
         // Remove duplicates within the batch first
         const uniqueNewProducts = [];
         const seenNames = new Set();
         const seenCodes = new Set();
         
         for (const product of newProducts) {
           if (!seenNames.has(product.name) && !seenCodes.has(product.code)) {
             uniqueNewProducts.push(product);
             seenNames.add(product.name);
             seenCodes.add(product.code);
           }
         }
         
         if (uniqueNewProducts.length > 0) {
           try {
             // Create placeholders for batch insert
             const placeholders = uniqueNewProducts.map(() => '(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)').join(',');
             
             const insertQuery = `
               INSERT INTO products (
                 code, game, name, description, 
                 price_basic, price_premium, price_special,
                 server, status, stock, category, image, 
                 is_popular, sold_count, rating, created_at, updated_at
               ) VALUES ${placeholders}
             `;

             const insertValues = uniqueNewProducts.flatMap(product => [
               product.code, product.game, product.name, product.description,
               product.price_basic, product.price_premium, product.price_special,
               product.server, product.status, product.stock, product.category, product.image,
               product.is_popular, product.sold_count, product.rating
             ]);

             await connection.execute(insertQuery, insertValues);
             newCount += uniqueNewProducts.length;
             console.log(`Inserted ${uniqueNewProducts.length} new products in batch ${batchIndex + 1}`);
           } catch (error) {
             console.error(`Error inserting batch ${batchIndex + 1}:`, error);
             // Fallback to individual inserts for this batch
             for (const product of uniqueNewProducts) {
               try {
                 await connection.execute(
                   `INSERT INTO products (
                     code, game, name, description, 
                     price_basic, price_premium, price_special,
                     server, status, stock, category, image, 
                     is_popular, sold_count, rating, created_at, updated_at
                   ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
                   [
                     product.code, product.game, product.name, product.description,
                     product.price_basic, product.price_premium, product.price_special,
                     product.server, product.status, product.stock, product.category, product.image,
                     product.is_popular, product.sold_count, product.rating
                   ]
                 );
                 newCount++;
               } catch (insertError) {
                 // Check if it's a duplicate entry error
                 if (insertError.code === 'ER_DUP_ENTRY') {
                   console.log(`Skipping duplicate product: ${product.name} (${product.code})`);
                   // Don't count as error, just skip
                 } else {
                   errors.push({
                     code: product.code,
                     name: product.name,
                     error: insertError.message
                   });
                 }
               }
             }
           }
         }
       }

      // Update existing products (individual updates for now)
      for (const product of updateProducts) {
        try {
          const existingProduct = existingByCode.get(product.code) || existingByName.get(product.name);
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
              product.game, product.name, product.description,
              product.price_basic, product.price_premium, product.price_special,
              product.server, product.status, product.category, product.image,
              updateValue
            ]
          );
          updatedCount++;
        } catch (error) {
          // Check if it's a duplicate entry error during update
          if (error.code === 'ER_DUP_ENTRY') {
            console.log(`Skipping duplicate update for product: ${product.name} (${product.code})`);
            // Don't count as error, just skip
          } else {
            errors.push({
              code: product.code,
              name: product.name,
              error: error.message
            });
          }
        }
      }

      savedCount += batch.length;
      
             // Update progress after batch completion
       progressData.current = endIndex;
       progressData.percentage = Math.round((endIndex / products.length) * 100);
       progressData.message = `Completed batch ${batchIndex + 1}/${totalBatches} - ${newCount} new, ${updatedCount} updated`;
       
       console.log(`Batch ${batchIndex + 1} completed: ${newCount} new, ${updatedCount} updated products`);
    }

         // Final progress update
     progressData.current = products.length;
     progressData.percentage = 100;
     progressData.message = 'Processing completed!';
     progressData.isProcessing = false;

     await connection.end();

     console.log(`Final Results: ${newCount} new products, ${updatedCount} updated products, ${errors.length} errors`);

     return NextResponse.json({
       success: true,
       message: 'Products processed successfully',
       savedCount: newCount + updatedCount,
       updatedCount,
       newCount,
       errors: errors.length > 0 ? errors : null
     });

     } catch (error) {
     // Reset progress on error
     progressData.isProcessing = false;
     progressData.message = 'Error occurred during processing';
     
     console.error('Error saving VIP Reseller products:', error);
     
     // Try to close connection if it exists
     try {
       if (connection) {
         await connection.end();
       }
     } catch (closeError) {
       console.error('Error closing database connection:', closeError);
     }
     
     return NextResponse.json({
       success: false,
       message: 'Internal server error',
       error: error.message
     }, { status: 500 });
   }
}

// GET endpoint to check progress
export async function GET() {
  return NextResponse.json(progressData);
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
