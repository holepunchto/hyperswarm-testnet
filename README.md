# @hyperswarm/testnet

Small module to help you spin up a local Hyperswarm testnet.

```
npm install @hyperswarm/testnet
```

Use this if you want to use the swarm in tests, etc.

## Usage

``` js
const createTestnet = require('@hyperswarm/testnet')

const testnet = await createTestnet(10) // create a local testnet with 10 dht nodes
```

## API

#### `const testnet = await createTestnet(size = 10, [options])`

Create a new testnet. `size` is how many DHT nodes you want in it. Options include:

```js
{
  port: preferredLocalPort, // defaults to ANY (0)
  host: preferredLocalHost, // defaults to 127.0.0.1
  teardown // optional async teardown helper ie, t.teardown in brittle/tap etc
}
```

#### `testnet.nodes`

An array of nodes in the testnet.

#### `testnet.bootstrap`

An array of bootstrap addresses of the testnet.

#### `const node = testnet.createNode([options])`

Create an additional ephemeral node and add it to the testnet. Options are the same as [`new DHT()`](https://github.com/holepunchto/hyperdht#const-node--new-dhtoptions).

#### `for (const node of testnet)`

Iterate over the nodes of the testnet.

## License

MIT
