<script setup lang="ts">
const features = [
  {
    icon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
    title: 'Mode Combat',
    description: 'Affrontez d\'autres Pokémon dans des duels épiques! Choisissez vos Pokémon et utilisez leurs capacités pour gagner.',
  },
  {
    icon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    title: 'Pokédex',
    description: 'Explorez la base de données complète des Pokémon, avec leurs statistiques, types et caractéristiques.',
  },
  {
    icon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png',
    title: 'Quiz Pokémon',
    description: 'Testez vos connaissances sur les Pokémon avec notre quiz interactif et devenez un véritable expert!',
  }
];
</script>

<template>
  <div class="home">
    <div class="hero">
      <div class="hero-content">
        <h1>Bienvenue dans l'Arène Pokémon!</h1>
        <p class="subtitle">Affrontez les meilleurs dresseurs et devenez le champion!</p>
        <div class="hero-images">
          <img 
            v-for="id in [6, 25, 149]" 
            :key="id"
            :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`"
            :alt="'Pokemon ' + id"
            class="hero-pokemon"
          />
        </div>
      </div>
    </div>
    
    <div class="features">
      <div 
        v-for="feature in features" 
        :key="feature.title" 
        class="feature-card"
      >
        <div class="feature-icon">
          <img :src="feature.icon" :alt="feature.title" />
        </div>
        <h3>{{ feature.title }}</h3>
        <p>{{ feature.description }}</p>
      </div>
    </div>

    <div class="info-section">
      <div class="info-card">
        <h3>Commencez votre aventure</h3>
        <p>Choisissez votre premier Pokémon et partez à l'aventure! Affrontez d'autres dresseurs, collectionnez des badges et devenez le meilleur dresseur.</p>
        <img 
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png" 
          alt="Bulbizarre"
          class="info-pokemon"
        />
      </div>
      <div class="info-card">
        <h3>Devenez un expert</h3>
        <p>Apprenez les forces et faiblesses de chaque type de Pokémon, maîtrisez les stratégies de combat et relevez tous les défis!</p>
        <img 
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png" 
          alt="Tortank"
          class="info-pokemon"
        />
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
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  border-radius: 24px;
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(76, 175, 80, 0.2);
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png') no-repeat center center;
  opacity: 0.1;
  background-size: cover;
  z-index: 0;
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero h1 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.subtitle {
  font-size: 1.4rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.hero-images {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem;
}

.hero-pokemon {
  width: 200px;
  height: 200px;
  object-fit: contain;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  transition: transform 0.3s ease;
}

.hero-pokemon:hover {
  transform: translateY(-10px) scale(1.05);
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 4rem 0;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #4CAF50, #45a049);
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  width: 100px;
  height: 100px;
  margin: 0 auto 1.5rem;
  background: linear-gradient(135deg, #f0f2f5 0%, #e0e3e7 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.feature-icon img {
  width: 80px;
  height: 80px;
  object-fit: contain;
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

.info-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
}

.info-card {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.info-card h3 {
  color: #2c3e50;
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.info-card p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.info-pokemon {
  width: 200px;
  height: 200px;
  object-fit: contain;
  margin: 0 auto;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  transition: transform 0.3s ease;
}

.info-pokemon:hover {
  transform: scale(1.1) rotate(5deg);
}

@media (max-width: 768px) {
  .hero {
    padding: 2rem 1rem;
  }

  .hero h1 {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1.1rem;
  }

  .hero-images {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .hero-pokemon {
    width: 150px;
    height: 150px;
  }

  .features {
    grid-template-columns: 1fr;
  }

  .info-section {
    grid-template-columns: 1fr;
  }
}
</style>