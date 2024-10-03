<template>
  <h1>Weather Tracker/></h1>
  <div>
    <input
      v-model="address"
      type="text"
      placeholder="please enter your localisation"
    >
    <button @click="fetchCoordonates">
      send
    </button>
    <span v-if="location.place_id"> 
      <span>{{ location }}</span>
    </span>
    <span v-if="currentWeather">
      <span>{{ currentWeather }}</span>
    </span>
  </div>
</template>

<script lang="ts" setup>
import type { Locations, Location } from '~/models/Location'
import type { CurrentWeather } from '~/models/Weather';
const address: Ref<string> = ref('')
const location: Ref<Location> = ref({
  place_id: '',
  city: '',
  country: '',
  latitude: 0,
  longitude: 0,
})
let locations: Ref<Locations> = ref([])
const currentWeather: Ref<CurrentWeather> = ref({})

const fetchCoordonates = async () => {
  const response = await fetch(`/api/coordonates/getCoordonates`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ location: address.value }),
  })
  const data = await response.json();
  locations.value = data.results
  location.value.place_id = locations.value[0]?.place_id || ''
  location.value.city = locations.value[0]?.city || ''
  location.value.country = locations.value[0]?.country || ''
  location.value.latitude = locations.value[0]?.lat || 0
  location.value.longitude = locations.value[0]?.lon || 0

  fetchCurrentWeather()
}

const fetchCurrentWeather = async () => {
  const response = await fetch(`/api/weather/currentWeather`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ location: location.value }),
  })
  const data = await response.json();
  currentWeather.value = data
  console.log(currentWeather.value)
}
</script>

<style>

</style>
