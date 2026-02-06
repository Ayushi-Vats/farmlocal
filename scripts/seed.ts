import mysql from 'mysql2/promise';
import { faker } from '@faker-js/faker'; // Add to package.json if needed

async function seed() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'farmlokal'
  });

  await connection.execute(`
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      description TEXT,
      category VARCHAR(100),
      price DECIMAL(10,2),
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_name (name),
      INDEX idx_category (category),
      INDEX idx_price (price),
      INDEX idx_createdAt (createdAt)
    )
  `);

  const values = [];
  for (let i = 0; i < 1000000; i++) {
    values.push([
      faker.commerce.productName(),
      faker.lorem.sentence(),
      faker.commerce.department(),
      faker.commerce.price(),
      faker.date.past()
    ]);
  }
  await connection.execute(
    'INSERT INTO products (name, description, category, price, createdAt) VALUES ?',
    [values]
  );
  console.log('Seeded 1M products');
  connection.end();
}

seed();