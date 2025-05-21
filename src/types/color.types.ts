export type HexModel = `#${string}` | string

export interface RgbModel {
  r: number
  g: number
  b: number
  a?: number
}

export interface HslModel {
  h: number
  s: number
  l: number
  a: number
}

export type Channel = [number, number, number, number]
