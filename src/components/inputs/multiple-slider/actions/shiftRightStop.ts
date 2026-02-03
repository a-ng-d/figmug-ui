const shiftRightStop = (
  scale: Record<string, number>,
  selectedKnob: HTMLElement,
  shift: boolean,
  minRange: number,
  maxRange: number,
  step: number = 1
) => {
  const stopsList: Array<string> = []
  const shiftValue = shift ? step * 10 : step

  Object.entries(scale)
    .sort((a, b) => a[1] - b[1])
    .forEach((stop) => {
      stopsList.push(stop[0])
    })

  const selectedKnobIndex = stopsList.indexOf(
      selectedKnob.dataset.id as string
    ),
    newScale = scale,
    currentStopValue: number = newScale[stopsList[selectedKnobIndex]]

  if (currentStopValue + shiftValue <= minRange)
    newScale[stopsList[selectedKnobIndex]] = minRange
  else if (currentStopValue + shiftValue >= maxRange)
    newScale[stopsList[selectedKnobIndex]] = maxRange
  else
    newScale[stopsList[selectedKnobIndex]] =
      newScale[stopsList[selectedKnobIndex]] + shiftValue

  return {
    scale: newScale as Record<string, number>,
  }
}

export default shiftRightStop
