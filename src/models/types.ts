export type BoardCell = {
  puyo: PuyoColor
  element: HTMLImageElement
}

export const PuyoColors = {
  Green: 1,
  Blue: 2,
  Purple: 3,
  Red: 4,
  Yellow: 5,
} as const
export type PuyoColor = typeof PuyoColors[keyof typeof PuyoColors]

export const randomPuyoColor = (): PuyoColor => {
  return (Math.floor(Math.random() * 5) + 1) as PuyoColor
}

export const PuyoRotations = {
  Deg0: 0,
  Deg90: 90,
  Deg180: 180,
  Deg270: 270,
} as const
export type PuyoRotation = typeof PuyoRotations[keyof typeof PuyoRotations]

export const isPuyoColor = (value: unknown): value is PuyoColor => {
  return typeof value === 'number' && 1 <= value && value <= 5
}

export type FallingPuyo = {
  element: HTMLImageElement
  position: number
  destination: number
  falling: boolean
}

export type SequencePuyoInfo = {
  x: number
  y: number
  cell: BoardCell
}
