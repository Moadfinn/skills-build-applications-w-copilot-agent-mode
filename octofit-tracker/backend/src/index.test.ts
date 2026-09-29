import assert from 'node:assert/strict';
import test from 'node:test';
import request from 'supertest';
import { app } from './index';

test('GET /api/health returns application status information', async () => {
  const response = await request(app).get('/api/health');

  assert.equal(response.status, 200);
  assert.equal(response.body.status, 'ok');
  assert.equal(typeof response.body.apiUrl, 'string');
});

test('GET /api/users returns a collection payload', async () => {
  const response = await request(app).get('/api/users');

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(response.body.data));
  assert.equal(typeof response.body.apiUrl, 'string');
});
