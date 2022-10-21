import * as readline from 'node:readline'
import * as process from 'node:process'

const ROBOT_DIRECTIONS = ['N', 'E', 'S', 'W']

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const getLine = () => new Promise((resolve) => rl.once('line', resolve))

const getRobotPosition = async () => {
  const line = await getLine()
  const [, robotX, robotY, robotDirection] = line.match(/.*?(\d+)\s*(\d+)\s*(N|E|S|W).*?/) || []
  return {
    robotX: Number(robotX),
    robotY: Number(robotY),
    robotDirection: ROBOT_DIRECTIONS.indexOf(robotDirection),
  }
}

;(async () => {
  let line = await getLine()
  const [, topX, topY] = (line.match(/.*?(\d+)\s*(\d+).*?/) || []).map(Number)

  while(true) {
    let { robotX, robotY, robotDirection } = await getRobotPosition()
    
    for (const command of await getLine()) {
      console.log(command)
    }
  }
})()
