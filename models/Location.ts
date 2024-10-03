interface LocationDetails {
  address_line1: string,
  address_line2: string,
  bbox: {
    lon1: number
    lat1: number
    lon2: number
    lat2: number
  },
  category: string,
  city: string,
  country: string,
  country_code: string,
  datasource: {
    sourcename: string
    attribution: string
    license: string
    url: string
  },
  district: string,
  formatted: string,
  lat: number,
  lon: number,
  place_id: string,
  plus_code: string,
  plus_code_short: string,
  rank: {
    importance: number
    popularity: number
    confidence: number
    confidence_city_level: number
    match_type: string
  },
  region: string,
  result_type: string,
  state: string,
  state_COG: number,
  state_code: string,
  suburb: string,
  timezone: {
    abbreviation_DST: string
    abbreviation_STD: string
    name: string
    offset_STD: string
    offset_STD_seconds: number
    offset_DST: string
    offset_DST_seconds: number
  }
}

interface Locations extends Array<LocationDetails> {}

interface Location {
  place_id: string
  city: string
  country: string
  latitude: number
  longitude: number
}

export type { Locations, Location }
