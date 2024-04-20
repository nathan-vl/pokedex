import './PokemonCard.css';

function PokemonType({ pokemonType }) {
  const colors = {
    normal: '#b8b8a8',
    fighting: '#f87070',
    flying: '#5ac8f0',
    poison: '#e5a2f8',
    ground: '#e7e53c',
    rock: '#ad9457',
    bug: '#a0c888',
    ghost: '#a870f8',
    steel: '#b8b8d0',
    fire: '#f89030',
    water: '#6898f8',
    grass: '#a5ea92',
    electric: '#e7e53c',
    psychic: '#f838a8',
    ice: '#30d8d0',
    dragon: '#84aaf8',
    dark: '#908888',
    fairy: '#db94cb',
    stellar: '#e8bbe2',
    unknown: '#a1c9be',
  };

  const color = colors[pokemonType];
  return (
    <div className="pokemon-type" style={{ backgroundColor: color }}>
      {pokemonType.toUpperCase()}
    </div>
  );
}

function PokeCard({ pokemon }) {
  return (
    <div className="pokemon-card">
      <h2 className="pokemon-card-title">{pokemon.name}</h2>
      <img
        alt={`Imagem do ${pokemon.name}`}
        title={`Imagem do ${pokemon.name}`}
        src={pokemon.imageUrl}
      />
      <div className="pokemon-card-types">
        {pokemon.types.map((type, index) => (
          <PokemonType key={index} pokemonType={type} />
        ))}
      </div>
    </div>
  );
}

export default PokeCard;
