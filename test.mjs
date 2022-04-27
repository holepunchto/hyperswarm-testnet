import test from 'brittle'
import createTestnet from './index.js'

test('basic', async (t) => {
  const testnet = await createTestnet(3, t.teardown)

  t.is(testnet.nodes.length, 3, 'has 3 nodes')
  t.alike(testnet.nodes, [...testnet], 'can iterate nodes')
})
