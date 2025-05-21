const getNumberScale = (num: number): number => {
  const length = Math.floor(Math.abs(num)).toString().length
  return Math.pow(10, length - 1)
}

const deleteStop = (
  scale: Record<string, number>,
  selectedKnob: HTMLElement
) => {
  const entries = Object.entries(scale)
    .map(([key, value]) => ({
      index: parseFloat(key),
      value: value as number,
    }))
    .filter((entry) => entry.index > 0)

  const firstKey = Math.min(...entries.map((e) => e.index))
  const numberScale = getNumberScale(firstKey)

  const filteredEntries = entries.filter(
    (entry) => entry.index !== parseFloat(selectedKnob.dataset.id as string)
  )

  const newScale = filteredEntries.reduce(
    (acc, _, idx) => {
      const newIndex = Math.max(1, idx + 1) * numberScale
      acc[newIndex] = filteredEntries[idx].value
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

export default deleteStop
