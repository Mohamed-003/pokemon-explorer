
'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'


const HomePage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [pokemonData, setPokemonData] = useState({ results: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
        );
        const data = await response.json();
        setPokemonData(data);
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPokemon = pokemonData.results.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePokemonClick = (pokemonId) => {
    router.push(`/pokemon/${pokemonId}`);
  };

  return (
    <div className="min-h-screen p-5 bg-gray-100 font-sans">
      <div className="w-full max-w-[600px] p-5 mx-auto text-center">
        <input
          type="text"
          placeholder="Search Pokemon..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full py-[15px] px-[20px] text-base border border-gray-300 rounded-[30px] outline-none shadow mb-[30px]"
        />
      </div>
      {loading ? (
        <div className="text-center text-xl p-5 text-gray-600">
          Loading Pokemon...
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-5 p-5 max-w-[1200px] mx-auto">
          {filteredPokemon.map((pokemon) => {
            const pokemonId = pokemon.url.split("/")[6];
            return (
              <div
                key={pokemon.name}
                onClick={() => handlePokemonClick(pokemonId)}
                className="bg-white rounded-[10px] p-5 shadow transition-transform duration-200 cursor-pointer text-center hover:scale-105"
              >
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                  alt={pokemon.name}
                  className="w-24 h-24 mx-auto"
                />
                <h3 className="my-[10px] capitalize text-gray-800">
                  {pokemon.name}
                </h3>
                <p className="text-sm text-gray-600">#{pokemonId}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HomePage;
