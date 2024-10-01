<template>
  <div>
    <h1>Weather Tracker</h1>
  </div>
</template>

<script lang="ts">
const { data: weatherData } = await useFetch('/api/weather')
console.log(data)
</script>

<style>

</style>