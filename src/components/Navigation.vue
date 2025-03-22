<script setup lang="ts">
const menuItems = [
  { name: 'Accueil', route: 'home' },
  { name: 'Combat', route: 'battle' },
  { name: 'Pokédex', route: 'pokedex' },
  { name: 'Quiz', route: 'quiz' }
];

defineProps<{
  currentRoute: string;
}>();

defineEmits<{
  (e: 'navigate', route: string): void;
}>();
</script>

<template>
  <nav class="navigation">
    <div class="nav-container">
      <button
        v-for="item in menuItems"
        :key="item.route"
        :class="{ active: currentRoute === item.route }"
        @click="$emit('navigate', item.route)"
        class="nav-button"
      >
        {{ item.name }}
      </button>
    </div>
  </nav>
</template>

<style scoped>
.navigation {
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  padding: 1rem;
  margin-bottom: 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.nav-button {
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
}

.nav-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

.nav-button.active {
  background: white;
  color: #4CAF50;
}
</style>