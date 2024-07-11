const request = require('supertest');
const express = require('express');
const readingRouter = require('../routes/reading');

const app = express();
app.use(express.json());
app.use('/reading', readingRouter);

describe('Reading Route', () => {
  it('should return a welcome message', async () => {
    const res = await request(app).get('/reading');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual('Welcome to the reading section!');
  });

  it('should validate reading content', async () => {
    const res = await request(app)
      .post('/reading')
      .send({ title: 'Test Title', author: 'Test Author', content: 'Test Content' });
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual('Reading content is valid and has been submitted.');
  });

  it('should return validation error for invalid content', async () => {
    const res = await request(app).post('/reading').send({ title: '', author: '', content: '' });
    expect(res.statusCode).toEqual(400);
  });
});
