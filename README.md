# @hyperswarm/testnet

Small module to help you spin up a local Hyperswarm testnet.

```
npm install @hyperswarm/testnet
```

Use this if you want to use the swarm in tests, etc.

## Usage

``` js
const createTestnet = require('@hyperswarm/testnet')

const nodes = await createTestnet(10) // create a local testnet with 10 dht nodes
const bootstrap = [{ host: '127.0.0.1', port: nodes[0].address().port }] // the bootstrap address for this testnet
```

## API

#### `const nodes = await createTestnet(size = 10, [options])`

Create a new testnet. `size` is how many DHT nodes you want in it. Options include:

```
{
  port: preferredLocalPort, // defaults to ANY (0)
  host: preferredLocalHost, // defaults to 127.0.0.1
  teardown // optional async teardown helper ie, t.teardown in brittle/tap etc
}
```

## License

MIT
