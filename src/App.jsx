import { useEffect } from 'react';
import './App.css';
import { useState } from 'react';
import PokeCard from './PokemonCard';

function loadPokemonsLocalStorage() {
  const pokemonsJSON = localStorage.getItem('pokemons');
  if (pokemonsJSON == null) {
    return {};
  } else {
    const pokemons = JSON.parse(pokemonsJSON);
    return pokemons;
  }
}

function savePokemonsLocalStorage(pokemon) {
  let pokemons = loadPokemonsLocalStorage();
  pokemons[pokemon.id] = pokemon;

  const pokemonsJSON = JSON.stringify(pokemons);
  localStorage.setItem('pokemons', pokemonsJSON);
}

function pokemonAPItoPokemon(pokemonAPI) {
  const pokemon = {
    id: pokemonAPI.id,
    name: pokemonAPI.name,
    imageUrl: pokemonAPI.sprites.front_default,
    types: pokemonAPI.types.map((t) => t.type.name),
  };

  return pokemon;
}

async function fetchPokemonApi(pokemonId) {
  const URL = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
  const res = await fetch(URL);
  const pokemonAPI = await res.json();

  const pokemon = pokemonAPItoPokemon(pokemonAPI);
  return pokemon;
}

async function getPokemons(pokemonsIds) {
  const pokemons = Array(pokemonsIds.length);

  for (let i = 0; i < pokemonsIds.length; i++) {
    const pokemon = loadPokemonsLocalStorage()[pokemonsIds[i]];

    if (pokemon != null) {
      pokemons.push(pokemon);
    } else {
      const pokemon = await fetchPokemonApi(pokemonsIds[i]);
      savePokemonsLocalStorage(pokemon);
      pokemons.push(pokemon);
    }
  }

  return pokemons;
}

function App() {
  const [searchFilter, setSearchFilter] = useState('');

  const [pokemons, setPokemons] = useState([]);
  useEffect(() => {
    const loadPokemons = async () => {
      const pokemonIds = [...Array(150).keys()].map((i) => i + 1);
      const pokemons = await getPokemons(pokemonIds);
      setPokemons(pokemons);
    };
    loadPokemons();
  }, []);

  let filteredPokemons = pokemons;
  if (searchFilter != '') {
    const seachFilter = searchFilter.toLowerCase();
    filteredPokemons = pokemons.filter((p) => p.name.toLowerCase().includes(seachFilter));
  }

  return (
    <>
      <input
        id="pokemonSearch"
        placeholder="Pesquise aqui..."
        type="text"
        onChange={(e) => {
          setSearchFilter(e.target.value);
        }}></input>

      <div id="pokemons">
        {filteredPokemons.map((p) => (
          <PokeCard pokemon={p} key={p.id} />
        ))}
      </div>
    </>
  );
}

export default App;
