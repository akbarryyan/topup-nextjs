import { NextResponse } from 'next/server';
import pool from '@/lib/database';

export async function GET() {
  try {
    const connection = await pool.getConnection();

    // Get total products count
    const [totalProductsResult] = await connection.execute(
      'SELECT COUNT(*) as total FROM products'
    );
    const totalProducts = totalProductsResult[0].total;

    // Get available products count
    const [availableProductsResult] = await connection.execute(
      'SELECT COUNT(*) as total FROM products WHERE status IN ("available", "active")'
    );
    const availableProducts = availableProductsResult[0].total;

    // Get popular products count
    const [popularProductsResult] = await connection.execute(
      'SELECT COUNT(*) as total FROM products WHERE is_popular = 1'
    );
    const popularProducts = popularProductsResult[0].total;

    // Get total sold count
    const [totalSoldResult] = await connection.execute(
      'SELECT SUM(sold_count) as total FROM products'
    );
    const totalSold = totalSoldResult[0].total || 0;

    // Get unique categories count
    const [categoriesResult] = await connection.execute(
      'SELECT COUNT(DISTINCT category) as total FROM products WHERE category IS NOT NULL AND category != ""'
    );
    const totalCategories = categoriesResult[0].total;

    connection.release();

    return NextResponse.json({
      success: true,
      data: {
        totalProducts,
        availableProducts,
        popularProducts,
        totalSold,
        totalCategories
      }
    });

  } catch (error) {
    console.error('Error fetching product stats:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      error: error.message
    }, { status: 500 });
  }
}
