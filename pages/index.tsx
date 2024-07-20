import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import { getPokemons } from '../lib/getPokemons';
import Image from 'next/image';

export default function Home() {
  const [pokemons, setPokemons] = useState<{ id: number, sprites: { front_default: string }, name: string }[]>([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      console.log('Fetching pokemons...');
      const pokemonData = await getPokemons();
      console.log('Fetched pokemons:', pokemonData);
      setPokemons(pokemonData);
    };

    fetchPokemons();
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Pokémon List</h1>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </header>
      <main className={styles.main}>
        <div className={styles.grid}>
          {pokemons.map(pokemon => (
            <div key={pokemon.id} className={styles.card}>
              <Image
                src={pokemon.sprites.front_default || '/placeholder-sprite.png'}
                alt={pokemon.name}
                width={96}
                height={96}
              />
              <h3>{pokemon.name}</h3>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
