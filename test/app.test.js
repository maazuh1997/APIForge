import test from 'node:test'
import assert from 'node:assert/strict'

process.env.JWT_SECRET = 'test-secret'

const { app } = await import('../src/app.js')

async function request(path, options = {}) {
  const server = app.listen(0)
  const { port } = server.address()
  try {
    return await fetch(`http://127.0.0.1:${port}${path}`, options)
  } finally {
    server.close()
  }
}

test('GET /health returns service status', async () => {
  const response = await request('/health')
  assert.equal(response.status, 200)
  const body = await response.json()
  assert.equal(body.status, 'ok')
  assert.equal(body.service, 'APIForge')
})

test('unknown routes return 404 JSON', async () => {
  const response = await request('/does-not-exist')
  assert.equal(response.status, 404)
  const body = await response.json()
  assert.equal(body.error, 'Route not found')
})
