<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Pokemon } from '../types/pokemon';
import { POKEMONS } from '../types/pokemon';

interface Question {
  pokemon: Pokemon;
  options: string[];
  correctAnswer: string;
  type: 'name' | 'type';
}

const score = ref(0);
const currentQuestionIndex = ref(0);
const showResult = ref(false);
const questions = ref<Question[]>([]);

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function generateQuestions() {
  const shuffledPokemons = shuffleArray(POKEMONS);
  const newQuestions: Question[] = [];

  // Questions sur les noms des Pokémon
  shuffledPokemons.forEach(pokemon => {
    const wrongOptions = POKEMONS
      .filter(p => p.id !== pokemon.id)
      .map(p => p.name)
      .slice(0, 3);
    
    newQuestions.push({
      pokemon,
      options: shuffleArray([pokemon.name, ...wrongOptions]),
      correctAnswer: pokemon.name,
      type: 'name'
    });
  });

  // Questions sur les types des Pokémon
  shuffledPokemons.forEach(pokemon => {
    const wrongOptions = POKEMONS
      .filter(p => p.id !== pokemon.id)
      .map(p => p.type)
      .slice(0, 3);
    
    newQuestions.push({
      pokemon,
      options: shuffleArray([pokemon.type, ...wrongOptions]),
      correctAnswer: pokemon.type,
      type: 'type'
    });
  });

  questions.value = shuffleArray(newQuestions).slice(0, 10);
}

function startQuiz() {
  score.value = 0;
  currentQuestionIndex.value = 0;
  showResult.value = false;
  generateQuestions();
}

function checkAnswer(selectedAnswer: string) {
  const currentQuestion = questions.value[currentQuestionIndex.value];
  if (selectedAnswer === currentQuestion.correctAnswer) {
    score.value++;
  }

  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++;
  } else {
    showResult.value = true;
  }
}

const currentQuestion = computed(() => questions.value[currentQuestionIndex.value]);
const progress = computed(() => ((currentQuestionIndex.value + 1) / questions.value.length) * 100);

// Démarrer le quiz automatiquement
startQuiz();
</script>

<template>
  <div class="quiz-container">
    <h2>Quiz Pokémon</h2>

    <div v-if="!showResult" class="quiz-content">
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: `${progress}%` }"></div>
      </div>
      
      <div class="question-container">
        <img :src="currentQuestion.pokemon.image" :alt="currentQuestion.pokemon.name" class="pokemon-image">
        
        <div class="question">
          <h3>
            {{ currentQuestion.type === 'name' ? 
              "Quel est ce Pokémon ?" : 
              "Quel est le type de ce Pokémon ?" 
            }}
          </h3>
          
          <div class="options">
            <button
              v-for="option in currentQuestion.options"
              :key="option"
              @click="checkAnswer(option)"
              class="option-button"
            >
              {{ option }}
            </button>
          </div>
        </div>
      </div>

      <div class="score-display">
        Score actuel: {{ score }}/{{ questions.length }}
      </div>
    </div>

    <div v-else class="result-container">
      <h3>Quiz terminé!</h3>
      <p class="final-score">Votre score final: {{ score }}/{{ questions.length }}</p>
      <button @click="startQuiz" class="restart-button">Recommencer le Quiz</button>
    </div>
  </div>
</template>

<style scoped>
.quiz-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.quiz-content {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.progress-bar {
  height: 8px;
  background: #e0e3e7;
  border-radius: 4px;
  margin-bottom: 2rem;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4CAF50 0%, #45a049 100%);
  transition: width 0.3s ease;
}

.question-container {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

.pokemon-image {
  width: 200px;
  height: 200px;
  object-fit: contain;
  background: linear-gradient(135deg, #f0f2f5 0%, #e0e3e7 100%);
  border-radius: 12px;
  padding: 1rem;
}

.question {
  flex: 1;
}

.question h3 {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: #2c3e50;
}

.options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.option-button {
  background: white;
  border: 2px solid #4CAF50;
  color: #4CAF50;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1.1rem;
  transition: all 0.2s ease;
}

.option-button:hover {
  background: #4CAF50;
  color: white;
  transform: translateY(-2px);
}

.score-display {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  margin-top: 2rem;
}

.result-container {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.final-score {
  font-size: 2rem;
  color: #4CAF50;
  margin: 2rem 0;
}

.restart-button {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.restart-button:hover {
  background: #45a049;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .question-container {
    flex-direction: column;
    text-align: center;
  }

  .options {
    grid-template-columns: 1fr;
  }
}
</style>