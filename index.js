const DHT = require('@hyperswarm/dht')

module.exports = async function createTestnet (size = 10, opts = {}) {
  const swarm = []
  const teardown = typeof opts === 'function' ? opts : (opts.teardown ? opts.teardown.bind(opts) : noop)
  const host = opts.host || '127.0.0.1'
  const port = opts.port || 0

  if (size === 0) return swarm

  const first = new DHT({
    ephemeral: false,
    firewalled: false,
    bootstrap: [],
    bind: port
  })

  await first.ready()
  const bootstrap = [{ host, port: first.address().port }]

  swarm.push(first)

  while (swarm.length < size) {
    const node = new DHT({
      ephemeral: false,
      firewalled: false,
      bootstrap
    })

    await node.ready()
    swarm.push(node)
  }

  teardown(async function () {
    for (const node of swarm) {
      await node.destroy()
    }
  })

  return swarm
}

function noop () {}
