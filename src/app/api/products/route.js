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

// GET - Fetch all products
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 12;
    const offset = (page - 1) * limit;

    const connection = await mysql.createConnection(dbConfig);

    // Build WHERE clause
    let whereClause = 'WHERE 1=1';
    const params = [];

    if (category && category !== 'all') {
      whereClause += ' AND category = ?';
      params.push(category);
    }

    if (search) {
      whereClause += ' AND (name LIKE ? OR game LIKE ? OR code LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    // Get total count
    const [countResult] = await connection.execute(
      `SELECT COUNT(*) as total FROM products ${whereClause}`,
      params
    );
    const total = countResult[0].total;

    // Get products with pagination
    const [products] = await connection.execute(
      `SELECT * FROM products ${whereClause} 
       ORDER BY created_at DESC 
       LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    await connection.end();

    return NextResponse.json({
      success: true,
      data: products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      error: error.message
    }, { status: 500 });
  }
}

// POST - Create new product
export async function POST(request) {
  try {
    const productData = await request.json();

    const connection = await mysql.createConnection(dbConfig);

    const [result] = await connection.execute(
      `INSERT INTO products (
        code, game, name, description, 
        price_basic, price_premium, price_special,
        server, status, stock, category, image, 
        is_popular, sold_count, rating, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
      [
        productData.code,
        productData.game,
        productData.name,
        productData.description,
        productData.price_basic || 0,
        productData.price_premium || 0,
        productData.price_special || 0,
        productData.server || '1',
        productData.status || 'available',
        productData.stock || 0,
        productData.category || 'other',
        productData.image,
        productData.is_popular || 0,
        productData.sold_count || 0,
        productData.rating || 0.00
      ]
    );

    await connection.end();

    return NextResponse.json({
      success: true,
      message: 'Product created successfully',
      productId: result.insertId
    });

  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      error: error.message
    }, { status: 500 });
  }
}
