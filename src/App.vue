<script setup lang="ts">
import { ref, computed } from 'vue';
import Navigation from './components/Navigation.vue';
import Home from './components/Home.vue';
import PokemonCard from './components/PokemonCard.vue';
import PokemonSelection from './components/PokemonSelection.vue';
import Pokedex from './components/Pokedex.vue';
import Quiz from './components/Quiz.vue';
import type { Pokemon } from './types/pokemon';

const currentRoute = ref('home');
const pokemon1 = ref<Pokemon | null>(null);
const pokemon2 = ref<Pokemon | null>(null);
const gameStarted = ref(false);
const gameLog = ref<string[]>([]);

const currentComponent = computed(() => {
  switch (currentRoute.value) {
    case 'battle':
      return 'battle-view';
    case 'pokedex':
      return 'pokedex-view';
    case 'quiz':
      return 'quiz-view';
    default:
      return 'home-view';
  }
});

function calculateDamage(attacker: Pokemon, defender: Pokemon) {
  const damage = Math.max(5, attacker.attack - defender.defense / 2);
  return Math.floor(damage);
}

function attack(attacker: Pokemon, defender: Pokemon) {
  if (!gameStarted.value || defender.hp <= 0) return;
  
  const damage = calculateDamage(attacker, defender);
  defender.hp = Math.max(0, defender.hp - damage);
  
  gameLog.value.unshift(`${attacker.name} attaque ${defender.name} et inflige ${damage} dégâts!`);
  
  if (defender.hp <= 0) {
    gameLog.value.unshift(`${defender.name} est K.O.! ${attacker.name} gagne le combat!`);
    gameStarted.value = false;
  }
}

function startGame() {
  if (!pokemon1.value || !pokemon2.value) {
    alert('Veuillez sélectionner deux Pokémon pour commencer le combat!');
    return;
  }
  
  pokemon1.value.hp = pokemon1.value.maxHp;
  pokemon2.value.hp = pokemon2.value.maxHp;
  gameLog.value = ['Le combat commence!'];
  gameStarted.value = true;
}

function resetGame() {
  pokemon1.value = null;
  pokemon2.value = null;
  gameStarted.value = false;
  gameLog.value = [];
}
</script>

<template>
  <div class="game-container">
    <Navigation 
      :current-route="currentRoute"
      @navigate="currentRoute = $event"
    />
    
    <component :is="currentComponent">
      <template v-if="currentComponent === 'home-view'">
        <Home />
      </template>
      
      <template v-else-if="currentComponent === 'battle-view'">
        <h1>Combat Pokémon</h1>
        
        <div v-if="!gameStarted" class="selection-phase">
          <div class="selections-container">
            <PokemonSelection
              :selected-pokemon="pokemon1"
              position="left"
              @select="pokemon1 = { ...($event) }"
            />
            <PokemonSelection
              :selected-pokemon="pokemon2"
              position="right"
              @select="pokemon2 = { ...($event) }"
            />
          </div>
          <button @click="startGame" class="start-button">Commencer le Combat</button>
        </div>
        
        <div v-else class="battle-arena">
          <PokemonCard 
            v-if="pokemon1"
            :pokemon="pokemon1" 
            @attack="attack(pokemon1, pokemon2!)"
          />
          <div class="vs">VS</div>
          <PokemonCard 
            v-if="pokemon2"
            :pokemon="pokemon2" 
            @attack="attack(pokemon2, pokemon1!)"
          />
        </div>

        <div v-if="gameStarted || gameLog.length > 0" class="game-controls">
          <button @click="resetGame" class="reset-button">Nouveau Combat</button>
        </div>

        <div v-if="gameLog.length > 0" class="battle-log">
          <h3>Journal de Combat</h3>
          <ul>
            <li v-for="(log, index) in gameLog" :key="index">
              {{ log }}
            </li>
          </ul>
        </div>
      </template>
      
      <template v-else-if="currentComponent === 'pokedex-view'">
        <Pokedex />
      </template>

      <template v-else-if="currentComponent === 'quiz-view'">
        <Quiz />
      </template>
    </component>
  </div>
</template>

<style>
.game-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.selection-phase {
  margin: 2rem 0;
}

.selections-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.battle-arena {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 2rem 0;
  gap: 2rem;
}

.vs {
  font-size: 2rem;
  font-weight: bold;
  color: #ff5252;
}

.battle-log {
  margin-top: 2rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
}

.battle-log ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.battle-log li {
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
}

.start-button, .reset-button {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1rem;
  margin: 1rem 0;
  display: block;
  margin: 0 auto;
}

.start-button:hover, .reset-button:hover {
  background: #45a049;
}

body {
  background: #f0f0f0;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
}
</style>