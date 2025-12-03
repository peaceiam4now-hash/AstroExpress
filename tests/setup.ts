// Set test environment variables before importing anything else
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-key-for-testing';

// Jest setup will be minimal - the actual DB setup happens in the test file
jest.setTimeout(30000);
