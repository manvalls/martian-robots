import { NORTH, EAST, SOUTH, WEST } from './constants.js'

export const commands = {
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
