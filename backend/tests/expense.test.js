const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Expense = require('../models/Expense');

describe('Expense API', () => {
  let token;
  let userId;

  beforeAll(async () => {
    // Create test user and get token
    const user = await User.create({
      name: 'Test User',
      email: 'test@test.com',
      password: 'password123'
    });
    userId = user._id;
    token = jwt.sign({ id: userId }, process.env.JWT_SECRET);
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Expense.deleteMany({});
    await mongoose.connection.close();
  });

  describe('POST /api/expenses', () => {
    it('should create a new expense', async () => {
      const res = await request(app)
        .post('/api/expenses')
        .set('Authorization', `Bearer ${token}`)
        .send({
          amount: 100,
          description: 'Test Expense',
          category: 'Food'
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body.amount).toBe(100);
    });
  });
});
