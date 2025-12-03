import { execSync } from 'child_process';
import path from 'path';

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = 'file:./test.db';
process.env.JWT_SECRET = 'test-secret-key-for-testing';

// Use a separate Prisma schema for testing with SQLite
const testSchemaPath = path.join(__dirname, 'schema.test.prisma');

// Generate test schema content (SQLite version)
import fs from 'fs';

const testSchema = `
datasource db {
  provider = "sqlite"
  url      = "file:./test.db"
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
`;

fs.writeFileSync(testSchemaPath, testSchema);

// Generate Prisma client for tests
try {
  execSync(`npx prisma generate --schema=${testSchemaPath}`, { stdio: 'inherit' });
  execSync(`npx prisma db push --schema=${testSchemaPath} --force-reset`, { stdio: 'inherit' });
} catch (error) {
  console.error('Failed to setup test database:', error);
}

// Cleanup function
afterAll(async () => {
  // Clean up test database file
  const testDbPath = path.join(__dirname, 'test.db');
  if (fs.existsSync(testDbPath)) {
    fs.unlinkSync(testDbPath);
  }
  if (fs.existsSync(testSchemaPath)) {
    fs.unlinkSync(testSchemaPath);
  }
});
