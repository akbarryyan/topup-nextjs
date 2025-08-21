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
    const { productId, stock, status } = await request.json();

    if (!productId || stock === undefined) {
      return NextResponse.json({
        success: false,
        message: 'Product ID and stock are required'
      }, { status: 400 });
    }

    // Create database connection
    const connection = await mysql.createConnection(dbConfig);

    // Update product stock and status
    await connection.execute(
      `UPDATE products SET 
        stock = ?, 
        status = ?,
        updated_at = CURRENT_TIMESTAMP
        WHERE id = ?`,
      [stock, status, productId]
    );

    await connection.end();

    return NextResponse.json({
      success: true,
      message: 'Product stock updated successfully'
    });

  } catch (error) {
    console.error('Error updating product stock:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      error: error.message
    }, { status: 500 });
  }
}
