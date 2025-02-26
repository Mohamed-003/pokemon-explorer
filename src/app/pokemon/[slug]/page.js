'use client'
import { use, useEffect, useState } from 'react';

const PokemonDetail = ({params}) => {
//   const router = useRouter();
  const {slug} = use(params);
  const id = Number(slug);
  console.log(id);
  const [pokemonData, setPokemonData] = useState({
    abilities: [],
    types: [],
    moves: [],
    stats: [],
    loading: true,
    error: null
  });

  useEffect(() => {
    if (!id) return;

    const fetchPokemonData = async () => {
      try {
        const abilitiesResponse = await fetch(`https://pokeapi.co/api/v2/ability/${id}/`);
        const abilitiesData = await abilitiesResponse.json();

        const typeResponse = await fetch(`https://pokeapi.co/api/v2/type/${id}/`);
        const typeData = await typeResponse.json();

        const statsResponse = await fetch(`https://pokeapi.co/api/v2/stat/${id}/`);
        const statsData = await statsResponse.json();

        setPokemonData({
          abilities: { name: abilitiesData.name },
          types: { name: typeData.name, moves: typeData.moves },
          stats: statsData,
          loading: false,
          error: null
        });
      } catch (error) {
        setPokemonData(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to fetch Pokemon data'
        }));
      }
    };

    fetchPokemonData();
  }, [id]);

  if (!id) return <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">Loading...</div>;
  if (pokemonData.error) return <div className="min-h-screen flex items-center justify-center text-xl text-red-600">{pokemonData.error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-10" >
      <main className="max-w-[1920px] mx-auto p-6 sm:p-8" style={{backgroundColor:"rgb(245, 245, 245)"}}>
        {/* Pokemon Image and Name Section */}
        <header className="bg-white rounded-3xl p-8 shadow-lg mb-12 transform transition-all duration-300 hover:shadow-xl">
          <section className="flex flex-col items-center gap-8">
            <div className="relative-group" >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                alt={`Pokemon ${id}`}
                height={200}
                className="relative w-[400px] h-[400px] object-contain bg-white rounded-3xl p-8 transform transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="text-center">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 ">
                {pokemonData.abilities.name}
              </h1>
              {/* <div className="text-2xl text-gray-500 font-medium">#{id}</div> */}
            </div>
          </section>
        </header>

        {/* Info Cards Section */}
        <section className="flex flex-wrap gap-20 justify-center  section" >
          {/* Abilities Card */}
          <article className="bg-white p-4 border border-gray-200 rounded-2xl m-4 h-fit shadow-lg transition-all duration-300 hover:shadow-xl hover:border-purple-200 min-w-[350px] article">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Abilities
            </h2>
            <p className="text-gray-700 text-lg">{pokemonData.abilities.name}</p>
          </article>

          {/* Type Card */}
          <article className="bg-white p-4 border border-gray-200 rounded-2xl m-4 h-fit shadow-lg transition-all duration-300 hover:shadow-xl hover:border-purple-200 min-w-[350px] article">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Type
            </h2>
            <p className="text-gray-700 text-lg">{pokemonData.types.name}</p>
          </article>

          {/* Moves Card */}
          <article className="bg-white p-4 border border-gray-200 rounded-2xl m-4 h-fit shadow-lg transition-all duration-300 hover:shadow-xl hover:border-purple-200 min-w-[350px] article">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Moves
            </h2>
            <div className="h-[400px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {pokemonData.types.moves?.map((move, index) => (
                <div key={index} className="py-3 px-4 mb-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <span className="text-gray-700">{move.name}</span>
                </div>
              ))}
            </div>
          </article>

          {/* Stats Card */}
          <article className="bg-white p-4 border border-gray-200 rounded-2xl m-4 h-fit shadow-lg transition-all duration-300 hover:shadow-xl hover:border-purple-200 min-w-[350px] article">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Stats
            </h2>
            <div className="space-y-4 h-[400px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 ">
              {pokemonData.stats.affecting_moves?.increase.map((stat, index) => (
                <div key={index} className="bg-green-50 rounded-xl p-5 transition-colors duration-200 hover:bg-green-100">
                  <div className="text-green-700 font-semibold text-lg">
                    Increase: {stat.move.name} <span className="text-green-600">(+{stat.change})</span>
                  </div>
                </div>
              ))}
              {pokemonData.stats.affecting_moves?.decrease.map((stat, index) => (
                <div key={index} className="bg-red-50 rounded-xl p-5 transition-colors duration-200 hover:bg-red-100">
                  <div className="text-red-700 font-semibold text-lg">
                    Decrease: {stat.move.name} <span className="text-red-600">({stat.change})</span>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>
      </main>
    </div>
  );
};

export default PokemonDetail;
