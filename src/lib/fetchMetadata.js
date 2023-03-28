import axios from 'axios'
import cheerio from 'cheerio'

async function fetchMetadata(url) {
  try {
    const response = await axios.get(url)
    const $ = cheerio.load(response.data)

    const metadata = {}

    $('head meta').each((_index, element) => {
      const metaName = $(element).attr('name') || $(element).attr('property')
      const metaContent = $(element).attr('content')
      if (metaName && metaContent) {
        metadata[metaName] = metaContent
      }
    })

    return metadata
  } catch (error) {
    console.error(`Error fetching metadata for ${url}:`, error)
    return null
  }
}

export default fetchMetadata