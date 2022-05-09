const DHT = require('@hyperswarm/dht')

module.exports = async function createTestnet (size = 10, opts = {}) {
  const swarm = []
  const teardown = typeof opts === 'function' ? opts : (opts.teardown ? opts.teardown.bind(opts) : noop)
  const host = opts.host || '127.0.0.1'
  const port = opts.port || 0

  if (size === 0) return new Testnet(swarm)

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

  const testnet = new Testnet(swarm, bootstrap)

  teardown(async function () {
    await testnet.destroy()
  })

  return testnet
}

class Testnet {
  constructor (nodes, bootstrap = []) {
    this.nodes = nodes
    this.bootstrap = bootstrap
  }

  createNode (opts = {}) {
    const node = new DHT({
      ephemeral: true,
      bootstrap: this.bootstrap,
      ...opts
    })

    this.nodes.push(node)

    return node
  }

  async destroy () {
    for (let i = this.nodes.length - 1; i >= 0; i--) {
      await this.nodes[i].destroy()
    }
  }

  [Symbol.iterator] () {
    return this.nodes[Symbol.iterator]()
  }
}

function noop () {}
