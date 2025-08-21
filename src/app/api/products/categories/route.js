import { NextResponse } from 'next/server';
import pool from '@/lib/database';

export async function GET() {
  try {
    const connection = await pool.getConnection();

    // Get all unique categories with count
    const [categoriesResult] = await connection.execute(
      `SELECT 
        category,
        COUNT(*) as count
       FROM products 
       WHERE category IS NOT NULL AND category != ''
       GROUP BY category
       ORDER BY count DESC`
    );

    connection.release();

    // Transform the data to match the expected format
    const categories = categoriesResult.map(cat => ({
      id: cat.category,
      name: cat.category
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      count: cat.count
    }));

    return NextResponse.json({
      success: true,
      data: categories
    });

  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      error: error.message
    }, { status: 500 });
  }
}
