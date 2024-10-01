import { fetchWeatherApi } from 'openmeteo'

export default defineEventHandler(async () => {
  const params = {
    latitude: 44.841225,
    longitude: -0.5800364,
    current: ['temperature_2m', 'apparent_temperature', 'is_day', 'precipitation', 'rain', 'wind_speed_10m', 'wind_direction_10m'],
    timezone: 'Europe/London',
    forecast_hours: 1,
    models: 'meteofrance_seamless',
  }
  const url = 'https://api.open-meteo.com/v1/forecast'

  const responses = await fetchWeatherApi(url, params)

  // // Helper function to form time ranges
  // const range = (start: number, stop: number, step: number) =>
  // 	Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

  // Process first location. Add a for-loop for multiple locations or weather models
  const response = responses[0]

  // Attributes for timezone and location
  const utcOffsetSeconds = response.utcOffsetSeconds()
  const timezone = response.timezone()
  const timezoneAbbreviation = response.timezoneAbbreviation()
  const latitude = response.latitude()
  const longitude = response.longitude()

  const current = response.current()!

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature2m: current.variables(0)!.value(),
      apparentTemperature: current.variables(1)!.value(),
      isDay: current.variables(2)!.value(),
      precipitation: current.variables(3)!.value(),
      rain: current.variables(4)!.value(),
      windSpeed10m: current.variables(5)!.value(),
      windDirection10m: current.variables(6)!.value(),
    },

  }
//   return weatherData
})
