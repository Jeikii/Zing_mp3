export const getArrSlider = (start, end, number) => {
  const result = start > end ? number : end
  let output = []
  for (let i = start; i <= result; i++) {
    output.push(i)
  }
  if (start > end) {
    for (let i = 0; i <= end; i++) {
      output.push(i)
    }
  }
  return output
}

export const handleNumber = (number) => {
  if (number > Math.pow(10, 6)) {
    return `${Math.round((number * 10) / Math.pow(10, 6)) / 10}M`
  } else {
    return `${Math.round((number * 10) / Math.pow(10, 3)) / 10}K`
  }
}
