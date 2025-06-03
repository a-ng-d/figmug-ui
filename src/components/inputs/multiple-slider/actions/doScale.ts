import { doMap } from '@a_ng_d/figmug-utils'
import { Easing } from '../types'

const doScale = (
  stops: Array<number>,
  min: number,
  max: number,
  mode: Easing = 'LINEAR'
) => {
  let x = 1
  const scale: Record<string, number> = {}

  stops.map((index) => {
    scale[index] =
      mode !== 'NONE'
        ? parseFloat(doMap(applyEase(mode, x), 0, 1, min, max).toFixed(1))
        : index
    x -= 1 / (stops.length - 1)
    x < 0.01 ? (x = 0) : x
  })

  return scale
}

const applyEase = (mode: Easing, x: number): number => {
  const actions: { [key: string]: (x: number) => number } = {
    LINEAR: (x) => x,
    EASEIN_SINE: (x) => Math.pow(x, 1.2),
    EASEOUT_SINE: (x) => 1 - Math.pow(1 - x, 1.2),
    EASEINOUT_SINE: (x) =>
      x < 0.5 ? Math.pow(x * 2, 1.2) / 2 : 1 - Math.pow((1 - x) * 2, 1.2) / 2,
    EASEIN_QUAD: (x) => Math.pow(x, 1.5),
    EASEOUT_QUAD: (x) => 1 - Math.pow(1 - x, 1.5),
    EASEINOUT_QUAD: (x) =>
      x < 0.5 ? Math.pow(x * 2, 1.5) / 2 : 1 - Math.pow((1 - x) * 2, 1.5) / 2,
    EASEIN_CUBIC: (x) => 1 - Math.cos((x * Math.PI) / 2),
    EASEOUT_CUBIC: (x) => Math.sin((x * Math.PI) / 2),
    EASEINOUT_CUBIC: (x) => -(Math.cos(Math.PI * x) - 1) / 2,
  }

  return actions[mode ?? 'LINEAR']?.(x)
}

export default doScale
