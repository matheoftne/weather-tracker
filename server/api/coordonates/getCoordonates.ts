import axios from 'axios'
import { readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const bodyStringify = body.location.replace(' ', '%20')

  const url = `https://api.geoapify.com/v1/geocode/search?text=${bodyStringify}&format=json&apiKey=59b97a702f084598ad513282b35eef0e`
  const config = {
    method: 'get',
    url: url,
    headers: {},
  }

  try {
    const response = await axios(config)
    return response.data
  }
  catch (error) {
    console.error(error)
  }
})
