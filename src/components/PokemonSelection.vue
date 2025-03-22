<script setup lang="ts">
import type { Pokemon } from '../types/pokemon';
import { POKEMONS } from '../types/pokemon';

defineProps<{
  selectedPokemon: Pokemon | null;
  position: 'left' | 'right';
}>();

defineEmits<{
  (e: 'select', pokemon: Pokemon): void;
}>();
</script>

<template>
  <div class="pokemon-selection">
    <h3>Sélectionnez votre Pokémon {{ position === 'left' ? '1' : '2' }}</h3>
    <div class="pokemon-grid">
      <div 
        v-for="pokemon in POKEMONS" 
        :key="pokemon.id"
        class="pokemon-option"
        :class="{ selected: selectedPokemon?.id === pokemon.id }"
        @click="$emit('select', pokemon)"
      >
        <img :src="pokemon.image" :alt="pokemon.name">
        <div class="pokemon-info">
          <h4>{{ pokemon.name }}</h4>
          <p>Type: {{ pokemon.type }}</p>
          <p>ATK: {{ pokemon.attack }} | DEF: {{ pokemon.defense }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pokemon-selection {
  margin: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.pokemon-option {
  border: 2px solid #eee;
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pokemon-option:hover {
  border-color: #4CAF50;
  transform: translateY(-2px);
}

.pokemon-option.selected {
  border-color: #4CAF50;
  background: #e8f5e9;
}

.pokemon-option img {
  width: 80px;
  height: 80px;
  object-fit: contain;
}

.pokemon-info {
  text-align: center;
  margin-top: 0.5rem;
}

.pokemon-info h4 {
  margin: 0;
  color: #333;
}

.pokemon-info p {
  margin: 0.2rem 0;
  font-size: 0.9rem;
  color: #666;
}
</style>