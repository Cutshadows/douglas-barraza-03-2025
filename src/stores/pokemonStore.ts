import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import type { Pokemon } from '../composables/getData';

const NAME_LOCALSTORAGE = 'selectedPokemons';

export const usePokemonStore = defineStore('pokemonStore', () => {
	const selectedPokemons = ref<Pokemon[]>([]);

	const savedPokemons = localStorage.getItem(NAME_LOCALSTORAGE);
	if (savedPokemons) {
		selectedPokemons.value = JSON.parse(savedPokemons);
	}

	function addPokemon(pokemon: Pokemon) {
		if (selectedPokemons.value.length >= 6) {
			alert('You can only select up to 6 pokemons');
			return;
		} else if (selectedPokemons.value.find((p) => p.name === pokemon.name)) {
			alert('You have already selected this pokemon');
			return;
		}

		selectedPokemons.value.push(pokemon);
	}

	function removePokemon(pokemon: Pokemon) {
		const index = selectedPokemons.value.findIndex((p) => p.name === pokemon.name);
		selectedPokemons.value.splice(index, 1);
	}

	watch(
		selectedPokemons,
		(newPokemons) => {
			localStorage.setItem(NAME_LOCALSTORAGE, JSON.stringify(newPokemons));
		},
		{ deep: true }
	);

	return {
		selectedPokemons,
		addPokemon,
		removePokemon,
	};
});
