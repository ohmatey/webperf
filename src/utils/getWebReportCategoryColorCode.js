const colorCodeRange = [
  {
    min: 0,
    max: 49,
    color: 'red'
  },
  {
    min: 50,
    max: 89,
    color: 'orange'
  },
  {
    min: 90,
    max: 100,
    color: 'green'
  }
]

const getWebReportCategoryColorCode = score => {
  return colorCodeRange.find(range => {
    if (score >= range.min && score <= range.max) {
      return range.color
    }
  })
}

export default getWebReportCategoryColorCode