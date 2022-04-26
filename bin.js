#!/usr/bin/env node

const testnet = require('@hyperswarm/testnet')

const size = Number(arg('--size', '-s') || 30)
const host = arg('--host', '-h') || '127.0.0.1'

testnet(size, { host, port: 49736 }).then(function ({ nodes, bootstrap }) {
  console.log('Running a testnet of ' + nodes.length + ' nodes')
  console.log('Bootstrap:', bootstrap)
})

function arg (name, short) {
  for (let i = 2; i < process.argv.length; i++) {
    const arg = process.argv[i]

    if (arg === name || arg === short) {
      return process.argv[i + 1]
    }
    if (arg.startsWith(name + '=')) {
      return arg.slice(name.length + 1)
    }
  }
  return ''
}
