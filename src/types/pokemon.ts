export interface Pokemon {
  id: number;
  name: string;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  image: string;
  type: string;
}

export const POKEMONS: Pokemon[] = [
  {
    id: 25,
    name: 'Pikachu',
    hp: 100,
    maxHp: 100,
    attack: 25,
    defense: 20,
    type: 'Électrique',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'
  },
  {
    id: 6,
    name: 'Dracaufeu',
    hp: 120,
    maxHp: 120,
    attack: 30,
    defense: 25,
    type: 'Feu/Vol',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png'
  },
  {
    id: 9,
    name: 'Tortank',
    hp: 110,
    maxHp: 110,
    attack: 28,
    defense: 30,
    type: 'Eau',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png'
  },
  {
    id: 3,
    name: 'Florizarre',
    hp: 115,
    maxHp: 115,
    attack: 27,
    defense: 28,
    type: 'Plante/Poison',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png'
  },
  {
    id: 149,
    name: 'Dracolosse',
    hp: 130,
    maxHp: 130,
    attack: 35,
    defense: 25,
    type: 'Dragon/Vol',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png'
  },
  {
    id: 150,
    name: 'Mewtwo',
    hp: 140,
    maxHp: 140,
    attack: 40,
    defense: 30,
    type: 'Psy',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png'
  }
];