import { fetchWeatherApi } from 'openmeteo'

export default defineEventHandler(async (event) => {
  const params = {
    latitude: 52.52,
    longitude: 13.41,
    hourly: 'temperature_2m',
  }
  const url = 'https://api.open-meteo.com/v1/forecast'
  const responses = await fetchWeatherApi(url, params)

  const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step)

  const response = responses[0]

  const utcOffsetSeconds = response.utcOffsetSeconds()
  const timezone = response.timezone()
  const timezoneAbbreviation = response.timezoneAbbreviation()
  const latitude = response.latitude()
  const longitude = response.longitude()

  const hourly = response.hourly()!

  const weatherData = {

    hourly: {
      time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
        t => new Date((t + utcOffsetSeconds) * 1000),
      ),
      temperature2m: hourly.variables(0)!.valuesArray()!,
    },

  }

  for (let i = 0; i < weatherData.hourly.time.length; i++) {
    weatherData.hourly.time[i].toISOString(),
    weatherData.hourly.temperature2m[i]
  }

  return weatherData
})
