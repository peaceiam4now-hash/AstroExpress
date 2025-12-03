import request from 'supertest';
import app from '../src/server';
import { prisma } from '../src/lib/prisma';
import { hashPassword, verifyPassword } from '../src/utils/password';
import { generateToken, verifyToken } from '../src/utils/jwt';

// Mock Prisma
jest.mock('../src/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
      deleteMany: jest.fn(),
    },
    $disconnect: jest.fn(),
  },
}));

const mockPrisma = prisma as jest.Mocked<typeof prisma>;

describe('Authentication System', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /auth/register', () => {
    it('should register a new user with valid data', async () => {
      const mockUser = {
        id: 'test-uuid-123',
        email: 'test@example.com',
      };

      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      (mockPrisma.user.create as jest.Mock).mockResolvedValue(mockUser);

      const response = await request(app)
        .post('/auth/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('token');
      expect(response.body.user.email).toBe('test@example.com');
      expect(response.body.user).toHaveProperty('id');
      expect(response.body.user).not.toHaveProperty('password');
    });

    it('should return 400 when registering with duplicate email', async () => {
      const existingUser = {
        id: 'existing-uuid',
        email: 'duplicate@example.com',
        password: 'hashed',
      };

      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(existingUser);

      const response = await request(app)
        .post('/auth/register')
        .send({
          email: 'duplicate@example.com',
          password: 'password456',
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('already registered');
    });

    it('should return 400 when registering with invalid email format', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({
          email: 'invalid-email',
          password: 'password123',
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
    });

    it('should return 400 when registering with short password', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({
          email: 'test@example.com',
          password: 'short',
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('8 characters');
    });

    it('should return 400 when email is missing', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({
          password: 'password123',
        });

      expect(response.status).toBe(400);
    });

    it('should return 400 when password is missing', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({
          email: 'test@example.com',
        });

      expect(response.status).toBe(400);
    });

    it('should hash the password before storing', async () => {
      const mockUser = {
        id: 'test-uuid-123',
        email: 'hash-test@example.com',
      };

      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      (mockPrisma.user.create as jest.Mock).mockResolvedValue(mockUser);

      await request(app)
        .post('/auth/register')
        .send({
          email: 'hash-test@example.com',
          password: 'password123',
        });

      // Check that create was called with a hashed password
      expect(mockPrisma.user.create).toHaveBeenCalled();
      const createCall = (mockPrisma.user.create as jest.Mock).mock.calls[0][0];
      expect(createCall.data.password).not.toBe('password123');
      expect(createCall.data.password.startsWith('$2')).toBe(true);
    });
  });

  describe('POST /auth/login', () => {
    it('should login successfully with valid credentials', async () => {
      const hashedPassword = await hashPassword('password123');
      const mockUser = {
        id: 'login-test-uuid',
        email: 'login-test@example.com',
        password: hashedPassword,
      };

      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'login-test@example.com',
          password: 'password123',
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('token');
      expect(response.body.user.email).toBe('login-test@example.com');
    });

    it('should return 401 with wrong password', async () => {
      const hashedPassword = await hashPassword('password123');
      const mockUser = {
        id: 'login-test-uuid',
        email: 'login-test@example.com',
        password: hashedPassword,
      };

      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'login-test@example.com',
          password: 'wrongpassword',
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('Invalid');
    });

    it('should return 401 for non-existent user', async () => {
      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123',
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message');
    });

    it('should return token that contains correct userId', async () => {
      const hashedPassword = await hashPassword('password123');
      const mockUser = {
        id: 'user-id-for-token',
        email: 'login-test@example.com',
        password: hashedPassword,
      };

      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'login-test@example.com',
          password: 'password123',
        });

      expect(response.status).toBe(200);
      
      const token = response.body.token;
      const decoded = verifyToken(token);
      
      expect(decoded.userId).toBe(response.body.user.id);
    });

    it('should return 400 with invalid email format on login', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'not-an-email',
          password: 'password123',
        });

      expect(response.status).toBe(400);
    });
  });

  describe('GET /auth/me', () => {
    it('should return user data with valid token', async () => {
      const userId = 'me-test-uuid';
      const mockUser = {
        id: userId,
        email: 'me-test@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const authToken = generateToken(userId);
      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const response = await request(app)
        .get('/auth/me')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.id).toBe(userId);
      expect(response.body.user.email).toBe('me-test@example.com');
    });

    it('should return 401 without token', async () => {
      const response = await request(app)
        .get('/auth/me');

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message');
    });

    it('should return 401 with invalid token', async () => {
      const response = await request(app)
        .get('/auth/me')
        .set('Authorization', 'Bearer invalid-token');

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message');
    });

    it('should return 401 with malformed authorization header', async () => {
      const response = await request(app)
        .get('/auth/me')
        .set('Authorization', 'InvalidFormat');

      expect(response.status).toBe(401);
    });

    it('should return 401 with expired token', async () => {
      const response = await request(app)
        .get('/auth/me')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyMzkwMjJ9.invalid');

      expect(response.status).toBe(401);
    });

    it('should return 404 when user not found in database', async () => {
      const authToken = generateToken('non-existent-user');
      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      const response = await request(app)
        .get('/auth/me')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(404);
    });

    it('should return 401 with empty Bearer token', async () => {
      const response = await request(app)
        .get('/auth/me')
        .set('Authorization', 'Bearer ');

      expect(response.status).toBe(401);
    });
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/health');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'ok');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('Password Utilities', () => {
    it('should hash password correctly', async () => {
      const plain = 'testpassword';
      const hash = await hashPassword(plain);

      expect(hash).not.toBe(plain);
      expect(hash.startsWith('$2')).toBe(true);
    });

    it('should verify correct password', async () => {
      const plain = 'testpassword';
      const hash = await hashPassword(plain);
      const isValid = await verifyPassword(plain, hash);

      expect(isValid).toBe(true);
    });

    it('should reject incorrect password', async () => {
      const hash = await hashPassword('correctpassword');
      const isValid = await verifyPassword('wrongpassword', hash);

      expect(isValid).toBe(false);
    });

    it('should produce different hashes for same password', async () => {
      const password = 'samepassword';
      const hash1 = await hashPassword(password);
      const hash2 = await hashPassword(password);

      expect(hash1).not.toBe(hash2);
    });
  });

  describe('JWT Utilities', () => {
    it('should generate valid token', () => {
      const token = generateToken('test-user-id');

      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.').length).toBe(3); // JWT has 3 parts
    });

    it('should verify token and return userId', () => {
      const userId = 'test-user-id-123';
      const token = generateToken(userId);
      const decoded = verifyToken(token);

      expect(decoded.userId).toBe(userId);
    });

    it('should throw error for invalid token', () => {
      expect(() => verifyToken('invalid-token')).toThrow();
    });
  });
});
