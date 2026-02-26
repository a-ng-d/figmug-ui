import { doMap } from '@unoff/utils'

const getNumberScale = (num: number): number => {
  const length = Math.floor(Math.abs(num)).toString().length
  return Math.pow(10, length - 1)
}

const addStop = (
  e: MouseEvent,
  scale: Record<string, number>,
  rangeMin: number,
  rangeMax: number
) => {
  const entries = Object.entries(scale)
    .map(([key, value]) => ({
      index: Math.max(1, parseFloat(key)),
      value: value as number,
    }))
    .filter((entry) => entry.index > 0)

  const numberScale = getNumberScale(Math.min(...entries.map((e) => e.index)))
  const isDescending = entries[0].value > entries[entries.length - 1].value

  const target = e.target as HTMLElement
  const offset = parseFloat(
    doMap(e.layerX, 0, target.offsetWidth, rangeMin, rangeMax).toFixed(1)
  )

  entries.push({
    index: Math.max(...entries.map((e) => e.index)) + numberScale,
    value: offset,
  })

  entries.sort((a, b) => (isDescending ? b.value - a.value : a.value - b.value))

  const newScale = entries.reduce(
    (acc, entry, idx) => {
      acc[(idx + 1) * numberScale] = entry.value
      return acc
    },
    {} as Record<string, number>
  )

  return {
    scale: newScale,
    stops: Object.keys(newScale).map((k) => parseFloat(k)),
    min: Math.min(...Object.values(newScale)),
    max: Math.max(...Object.values(newScale)),
  }
}

export default addStop
