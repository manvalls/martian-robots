import * as readline from 'node:readline'
import * as process from 'node:process'

import { ROBOT_DIRECTIONS, LOST } from './constants.js'
import { commands } from './commands.js'

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

  const scents = {}

  while(true) {
    let { robotX, robotY, robotDirection } = await getRobotPosition()
    let lost = false
    
    for (const command of await getLine()) {
      const commandFn = commands[command] || commands.DEFAULT

      const {
        robotX: newRobotX,
        robotY: newRobotY,
        robotDirection: newRobotDirection,
      } = commandFn({
        robotX,
        robotY,
        robotDirection,
      })

      if (newRobotX > topX || newRobotX < 0 || newRobotY > topY || newRobotY < 0) {
        if (scents[`${robotX}-${robotY}`]) {
          continue
        }

        scents[`${robotX}-${robotY}`] = true
        lost = true
        break
      }

      robotX = newRobotX
      robotY = newRobotY
      robotDirection = newRobotDirection
    }

    console.log(`${robotX} ${robotY} ${ROBOT_DIRECTIONS[robotDirection]}${
      lost ? ` ${LOST}` : ''
    }`)
  }
})()
