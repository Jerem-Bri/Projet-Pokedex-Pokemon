<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import type { Pokemon } from '../types/pokemon';

const searchQuery = ref('');
const pokemons = ref<Pokemon[]>([]);
const loading = ref(false);
const error = ref('');

const filteredPokemons = computed(() => {
  const query = searchQuery.value?.toLowerCase() || '';
  return pokemons.value.filter(
    (pokemon) =>
      pokemon.name.toLowerCase().includes(query) ||
      (pokemon.type?.toLowerCase() || '').includes(query)
  );
});

async function fetchPokemons() {
  loading.value = true;
  error.value = '';
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    const data = await response.json();

    const pokemonDetails = await Promise.all(
      data.results.map(async (pokemon: { url: string }) => {
        const detailResponse = await fetch(pokemon.url);
        const detail = await detailResponse.json();
        return {
          id: detail.id,
          name: detail.name.charAt(0).toUpperCase() + detail.name.slice(1),
          hp: detail.stats[0].base_stat,
          maxHp: detail.stats[0].base_stat,
          attack: detail.stats[1].base_stat,
          defense: detail.stats[2].base_stat,
          type: detail.types
            .map(
              (t: { type: { name: string } }) =>
                t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)
            )
            .join('/'),
          image: detail.sprites.front_default,
        };
      })
    );

    pokemons.value = pokemonDetails;
  } catch (e) {
    error.value = 'Erreur lors du chargement des Pokémon';
    console.error('Erreur dans fetchPokemons:', e);
  } finally {
    loading.value = false;
  }
}

onMounted(fetchPokemons);
</script>

<template>
  <div class="pokedex">
    <h2>Pokédex</h2>

    <div class="search-bar">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Rechercher un Pokémon..."
        class="search-input"
      />
    </div>

    <div v-if="loading" class="loading">Chargement des Pokémon...</div>

    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <div v-else class="pokemon-grid">
      <div
        v-for="pokemon in filteredPokemons"
        :key="pokemon.id"
        class="pokemon-card"
      >
        <img :src="pokemon.image" :alt="pokemon.name" />
        <h3>{{ pokemon.name }}</h3>
        <p class="type">Type: {{ pokemon.type }}</p>
        <div class="stats">
          <p>HP: {{ pokemon.hp }}</p>
          <p>ATK: {{ pokemon.attack }}</p>
          <p>DEF: {{ pokemon.defense }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Vos styles existants */
</style>
