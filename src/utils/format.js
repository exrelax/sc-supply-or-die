export const numberToFormattedString = (num) => {
  return num.toLocaleString('en-US')
}

export const numberToFormattedShortString = (num) => {
  let prefix = ''

  if (num >= 1000000) {
    prefix = 'm'
    num = Math.round((num / 1000000) * 100) / 100
  } else if (num >= 1000) {
    prefix = 'k'
    num = Math.round((num / 1000) * 100) / 100
  }

  return `${numberToFormattedString(num)}${prefix}`
}

export const numberToString = (num, shortMode = false) => {
  const formatFn = shortMode ? numberToFormattedShortString : numberToFormattedString

  return formatFn(num)
}

export const createFormattedNumberRange = (min, max, shortMode = false) => {
  return min === max
    ? numberToString(min, shortMode)
    : `${numberToString(min, shortMode)} – ${numberToString(max, shortMode)}`
}
