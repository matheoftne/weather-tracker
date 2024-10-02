<template>
  <div>
    <span v-if="data">{{ data }}</span>
    <span v-else-if="error">{{ error }}</span>
    <button @click="() => refresh()">refresh</button>
  </div>
</template>

<script lang="ts" setup>
const { data, error, refresh } = await useFetch('/api/weather/dailyTemperature');
console.log(data.value);
</script>

<style>

</style>