import * as readline from 'node:readline'
import * as process from 'node:process'

const ROBOT_DIRECTIONS = ['N', 'E', 'S', 'W']

const NORTH = ROBOT_DIRECTIONS.indexOf('N')
const EAST = ROBOT_DIRECTIONS.indexOf('E')
const SOUTH = ROBOT_DIRECTIONS.indexOf('S')
const WEST = ROBOT_DIRECTIONS.indexOf('W')

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

const commands = {
  DEFAULT: ({ robotX, robotY, robotDirection }) => ({ robotX, robotY, robotDirection }),

  L: ({ robotX, robotY, robotDirection }) => ({
    robotX,
    robotY,
    robotDirection: (robotDirection + 3) % 4,
  }),

  R: ({ robotX, robotY, robotDirection }) => ({
    robotX,
    robotY,
    robotDirection: (robotDirection + 1) % 4,
  }),

  F: ({ robotX, robotY, robotDirection }) => {

    if (robotDirection === NORTH) {
      return { robotX, robotY: robotY + 1, robotDirection }
    }

    if (robotDirection === EAST) {
      return { robotX: robotX + 1, robotY, robotDirection }
    }

    if (robotDirection === SOUTH) {
      return { robotX, robotY: robotY - 1, robotDirection }
    }

    if (robotDirection === WEST) {
      return { robotX: robotX - 1, robotY, robotDirection }
    }

    return { robotX, robotY, robotDirection }
  },
}

;(async () => {
  let line = await getLine()
  const [, topX, topY] = (line.match(/.*?(\d+)\s*(\d+).*?/) || []).map(Number)

  while(true) {
    let { robotX, robotY, robotDirection } = await getRobotPosition()
    
    for (const command of await getLine()) {
      const commandFn = commands[command] || commands.DEFAULT
      
      ;({ robotX, robotY, robotDirection } = commandFn({ robotX, robotY, robotDirection }))

      console.log(commandFn)
      console.log(robotX, robotY, ROBOT_DIRECTIONS[robotDirection])
    }
  }
})()
