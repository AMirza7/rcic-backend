import request from 'supertest';
import { Sequelize } from 'sequelize';
import { app } from '../src/app';              // your Express app export
import { sequelize } from '../src/models';     // to sync & teardown
import { generateTestJWT } from './testUtils'; // helper to mint a valid JWT

describe('Conversations & Messages e2e', () => {
  let jwt: string;
  let convoId: string;
  let messageId: string;

  beforeAll(async () => {
    // ensure a clean DB
    await sequelize.sync({ force: true });
    // generate or insert a test user & token
    jwt = generateTestJWT({ userId: 'test-user-uuid' });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a conversation', async () => {
    const res = await request(app)
      .post('/api/conversations')
      .set('Authorization', `Bearer ${jwt}`)
      .send({
        title: 'Test Thread',
        participants: [
          { userId: 'test-user-uuid', role: 'client' },
          { userId: 'other-user-uuid', role: 'consultant' }
        ]
      });
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    convoId = res.body.id;
  });

  it('should post a message to the conversation', async () => {
    const res = await request(app)
      .post(`/api/conversations/${convoId}/messages`)
      .set('Authorization', `Bearer ${jwt}`)
      .send({
        senderId: 'test-user-uuid',
        recipientId: 'other-user-uuid',
        content: 'Hello world',
        timestamp: new Date().toISOString()
      });
    expect(res.status).toBe(201);
    expect(res.body.content).toEqual('Hello world');
    messageId = res.body.id;
  });

  it('should list messages with pagination meta', async () => {
    const res = await request(app)
      .get(`/api/conversations/${convoId}/messages?page=1&limit=10`)
      .set('Authorization', `Bearer ${jwt}`);
    expect(res.status).toBe(200);
    expect(res.body.meta).toMatchObject({
      total: 1,
      page: 1,
      limit: 10,
      pages: 1
    });
    expect(res.body.data[0].id).toEqual(messageId);
  });

  it('should mark conversation as read and show unreadCount=0', async () => {
    // first, unreadCount should be 1 for other-user
    const res1 = await request(app)
      .get('/api/conversations')
      .set('Authorization', `Bearer ${jwt}`);
    expect(res1.body[0].unreadCount).toBe(1);

    // mark as read
    const res2 = await request(app)
      .post(`/api/conversations/${convoId}/read`)
      .set('Authorization', `Bearer ${jwt}`);
    expect(res2.status).toBe(204);

    // now unreadCount=0
    const res3 = await request(app)
      .get('/api/conversations')
      .set('Authorization', `Bearer ${jwt}`);
    expect(res3.body[0].unreadCount).toBe(0);
  });
});
