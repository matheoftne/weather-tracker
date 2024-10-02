<template>
  <div>
    <h1>Weather Tracker</h1>
    <input v-model="currentPokemon.imageUrl"></input>
    <input v-model="currentPokemon.name"></input>
    <button @click="nextPokemon">Next</button>
    <button @click="previousPokemon">Prev</button>
  </div>
</template>

<script lang="ts" setup>
const currentId = ref(1);
const currentPokemon = ref();
const fetchPokemonForCurrentId = async () => {
  const pokemon = await $fetch(`https://pokeapi.co/api/v2/pokemon/${currentId.value}`) as { name: string, sprites: { front_default: string } };
  currentPokemon.value = {
    name: pokemon.name,
    imageUrl: pokemon.sprites.front_default,
  };
};
onBeforeMount(() => {
  fetchPokemonForCurrentId();
});
const nextPokemon = async () => {
  currentId.value++;
  console.log(currentId.value);
  await fetchPokemonForCurrentId();
};
const previousPokemon = async () => {
  if (currentId.value > 1) {
    currentId.value--;
    console.log(currentPokemon.value);
  }
  await fetchPokemonForCurrentId();
};
</script>

<style>

</style>