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
    const { updates } = await request.json();

    if (!updates || !Array.isArray(updates) || updates.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'Updates array is required'
      }, { status: 400 });
    }

    // Create database connection
    const connection = await mysql.createConnection(dbConfig);

    let updatedCount = 0;
    let errors = [];

    // Update each product stock
    for (const update of updates) {
      try {
        await connection.execute(
          `UPDATE products SET 
            stock = ?, 
            status = ?,
            updated_at = CURRENT_TIMESTAMP
            WHERE id = ?`,
          [update.stock, update.status, update.productId]
        );
        updatedCount++;
      } catch (error) {
        console.error(`Error updating product ${update.productId}:`, error);
        errors.push({
          productId: update.productId,
          error: error.message
        });
      }
    }

    await connection.end();

    return NextResponse.json({
      success: true,
      message: 'Products stock updated successfully',
      updatedCount,
      errors: errors.length > 0 ? errors : null
    });

  } catch (error) {
    console.error('Error updating products stock:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      error: error.message
    }, { status: 500 });
  }
}
