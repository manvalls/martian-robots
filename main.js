import * as readline from 'node:readline'
import * as process from 'node:process'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const getLine = () => new Promise((resolve) => rl.once('line', resolve))

;(async () => {
  const line = await getLine()
  console.log('---->', line)
})()
