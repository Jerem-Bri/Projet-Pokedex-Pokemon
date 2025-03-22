<script setup lang="ts">
import type { Pokemon } from '../types/pokemon';

defineProps<{
  pokemon: Pokemon;
}>();

defineEmits<{
  (e: 'attack'): void;
}>();
</script>

<template>
  <div class="pokemon-card" :class="{ 'knocked-out': pokemon.hp <= 0 }">
    <div class="card-header">
      <h2>{{ pokemon.name }}</h2>
      <span class="type-badge">{{ pokemon.type }}</span>
    </div>
    <div class="image-container">
      <img :src="pokemon.image" :alt="pokemon.name" class="pokemon-image">
    </div>
    <div class="stats">
      <div class="hp-bar">
        <div class="hp-label">HP</div>
        <div class="hp-track">
          <div 
            class="hp-fill" 
            :style="{ width: (pokemon.hp / pokemon.maxHp * 100) + '%' }"
            :class="{ 'low-hp': pokemon.hp < pokemon.maxHp * 0.3 }"
          ></div>
        </div>
        <div class="hp-text">{{ pokemon.hp }}/{{ pokemon.maxHp }}</div>
      </div>
      <div class="battle-stats">
        <div class="stat">
          <span class="stat-label">ATK</span>
          <span class="stat-value">{{ pokemon.attack }}</span>
        </div>
        <div class="stat">
          <span class="stat-label">DEF</span>
          <span class="stat-value">{{ pokemon.defense }}</span>
        </div>
      </div>
    </div>
    <button 
      @click="$emit('attack')" 
      :disabled="pokemon.hp <= 0"
      class="attack-button"
    >
      Attaquer
    </button>
  </div>
</template>

<style scoped>
.pokemon-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  max-width: 300px;
  position: relative;
  overflow: hidden;
}

.pokemon-card.knocked-out {
  opacity: 0.7;
  filter: grayscale(1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.card-header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: #2c3e50;
}

.type-badge {
  background: #4CAF50;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

.image-container {
  background: linear-gradient(135deg, #f0f2f5 0%, #e0e3e7 100%);
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.pokemon-image {
  width: 150px;
  height: 150px;
  object-fit: contain;
  display: block;
  margin: 0 auto;
  transition: transform 0.3s ease;
}

.pokemon-card:hover .pokemon-image {
  transform: scale(1.1);
}

.stats {
  margin-bottom: 1.5rem;
}

.hp-bar {
  margin-bottom: 1rem;
}

.hp-label {
  font-weight: 600;
  margin-bottom: 0.3rem;
  color: #2c3e50;
}

.hp-track {
  background: #e0e3e7;
  border-radius: 8px;
  height: 12px;
  overflow: hidden;
  margin-bottom: 0.3rem;
}

.hp-fill {
  background: linear-gradient(90deg, #4CAF50 0%, #45a049 100%);
  height: 100%;
  transition: width 0.3s ease;
}

.hp-fill.low-hp {
  background: linear-gradient(90deg, #ff5252 0%, #ff1744 100%);
}

.hp-text {
  text-align: right;
  font-size: 0.9rem;
  color: #666;
}

.battle-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1rem;
}

.stat {
  background: #f0f2f5;
  padding: 0.8rem;
  border-radius: 8px;
  text-align: center;
}

.stat-label {
  display: block;
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.3rem;
}

.stat-value {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
}

.attack-button {
  width: 100%;
  background: linear-gradient(135deg, #ff5252 0%, #ff1744 100%);
  color: white;
  border: none;
  padding: 0.8rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s ease;
}

.attack-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 23, 68, 0.3);
}

.attack-button:disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
}
</style>