<script setup lang="ts">
</script>

<template>
  <div class="home">
    <div class="hero">
      <h1>Bienvenue dans l'Arène Pokémon!</h1>
      <p class="subtitle">Affrontez les meilleurs dresseurs et devenez le champion!</p>
    </div>
    
    <div class="features">
      <div class="feature-card">
        <div class="icon">🎮</div>
        <h3>Mode Combat</h3>
        <p>Affrontez d'autres Pokémon dans des duels épiques! Choisissez vos Pokémon et utilisez leurs capacités pour gagner.</p>
      </div>
      
      <div class="feature-card">
        <div class="icon">📱</div>
        <h3>Pokédex</h3>
        <p>Explorez la base de données complète des Pokémon, avec leurs statistiques, types et caractéristiques.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.hero {
  text-align: center;
  margin-bottom: 4rem;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(76, 175, 80, 0.2) 100%);
  border-radius: 16px;
}

.hero h1 {
  font-size: 3rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 1.2rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  text-align: center;
}

.feature-card:hover {
  transform: translateY(-4px);
}

.icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  color: #2c3e50;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 2rem;
  }
  
  .features {
    grid-template-columns: 1fr;
  }
}
</style>