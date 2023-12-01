//npm init -y
//npm install express sqlite3 cors

const express = require('express');
const sqlite3 = require('sqlite-async');
const cors = require('cors');

const app = express();
const port = 3001;
const dbPath = 'products.db';

const initDbAndServer = async () => {
  // Initialize SQLite database
  const db = await sqlite3.open(dbPath);

  // Create products table if it doesn't exist
  await db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      brand TEXT,
      price REAL,
      image_url TEXT,
      rating INTEGER
    )
  `);

  // Define middleware to open the database connection
  app.use(async (req, res, next) => {
    req.db = db;
    next();
  });

  // Define API endpoints
  app.get('/products', async (req, res) => {
    const { sort_by, category, title_search, rating } = req.query;

    let query = 'SELECT * FROM products WHERE 1=1';

    if (sort_by) {
      query += ` ORDER BY ${sort_by === 'PRICE_LOW' ? 'price ASC' : 'price DESC'}`;
    }

    if (category) {
      query += ` AND category = '${category}'`;
    }

    if (title_search) {
      query += ` AND title LIKE '%${title_search}%'`;
    }

    if (rating) {
      query += ` AND rating = ${rating}`;
    }

    try {
      const products = await req.db.all(query);
      res.json({ products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Define middleware to close the database connection after each request
  app.use((req, res, next) => {
    next();
  });

  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

initDbAndServer();



The expression WHERE 1=1 in the SQL query SELECT * FROM products WHERE 1=1 is a common technique used in dynamic SQL generation.
It essentially serves as a placeholder or a starting point for additional conditions to be appended dynamically based on certain conditions in your code.

In this case, the WHERE 1=1 condition is always true (since 1 is always equal to 1), and it doesn't affect the logic of the query.
However, it provides a convenient starting point for dynamically adding additional conditions to the WHERE clause in the query string. 
This is often done in programming to simplify the logic for appending conditions.

For example, you might have code that conditionally appends additional conditions to the WHERE clause based on user input or other dynamic factors. 
Using WHERE 1=1 allows you to consistently append conditions without having to check whether a condition has been added yet. It simplifies the logic for dynamically building the query string.
