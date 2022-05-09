import test from 'brittle'
import createTestnet from './index.js'

test('basic', async (t) => {
  const testnet = await createTestnet(3, t.teardown)

  t.is(testnet.nodes.length, 3, 'has 3 nodes')
  t.alike(testnet.nodes, [...testnet], 'can iterate nodes')
})

test('createNode + createServer', async (t) => {
  t.comment('should not cause request timeouts')

  const testnet = await createTestnet(3, t.teardown)

  const a = testnet.createNode()
  await a.ready()

  const server = a.createServer()
  await server.listen()

  t.pass()
})
