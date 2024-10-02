import { fetchWeatherApi } from 'openmeteo';

export default defineEventHandler(async (event) => {	
  const paramsParis = {
    "latitude": 48.8588897,
    "longitude": 2.320041,
    "current": ["temperature_2m", "precipitation", "rain", "wind_speed_10m"],
    "daily": ["sunrise", "sunset"],
    "timezone": "Europe/London"
  };
  const paramsBordeaux = {
    "latitude": 44.841225,
    "longitude": -0.5800364,
    "current": ["temperature_2m", "precipitation", "rain", "wind_speed_10m"],
    "daily": ["sunrise", "sunset"],
    "timezone": "Europe/London"
  };
  const paramsLondon = {
    "latitude": 51.5074456,
    "longitude": -0.1277653,
    "current": ["temperature_2m", "precipitation", "rain", "wind_speed_10m"],
    "daily": ["sunrise", "sunset"],
    "timezone": "Europe/London"
  };
  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, paramsLondon);

  // Helper function to form time ranges
  const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

  // Process first location. Add a for-loop for multiple locations or weather models
  const response = responses[0];

  // Attributes for timezone and location
  const utcOffsetSeconds = response.utcOffsetSeconds();
  const timezone = response.timezone();
  const timezoneAbbreviation = response.timezoneAbbreviation();
  const latitude = response.latitude();
  const longitude = response.longitude();

  const current = response.current()!;

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature2m: current.variables(0)!.value(),
      precipitation: current.variables(1)!.value(),
      rain: current.variables(2)!.value(),
      windSpeed10m: current.variables(3)!.value(),
    },
  };

  return weatherData;
})
