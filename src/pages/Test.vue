<template>
  <h1>Test2</h1>
  <div>
    <input
      v-model="address"
      type="text"
      placeholder="please enter your localisation"
    >
    <button @click="fetchCoordonates">
      send
    </button>
    <span v-if="locations.length">
      <span v-for="location in locations" :key="location.results.place_id">{{ location.results.address_line1 }}</span>
    </span>
    <span>{{ locations }}</span>
  </div>
</template>

<script lang="ts" setup>
import type { Location } from '~/models/Location'

const address: Ref<string> = ref('')
const locations: Ref<Location[]> = ref([])
console.log(locations)

const fetchCoordonates = async () => {
  const response = await fetch(`/api/coordonates/getCoordonates`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ location: address.value }),
  })
  locations.value = await response.json()
  console.log(locations.value)
}
</script>

<style>

</style>
