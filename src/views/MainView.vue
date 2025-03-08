<script setup lang="ts">
import { pokemonAPI } from '../utils/apiBase.ts';
import { useGetData, type Pokemon } from '../composables/getData';
import { usePokemonStore } from '../stores/pokemonStore';
import PokemonItem from '../components/PokemonItem.vue';
const store = usePokemonStore();

const { data, error, loading, getData } = useGetData();
getData(`${pokemonAPI}/pokemon?limit=25`);

const isSelected = (pokemon: Pokemon) =>
	store.selectedPokemons.some((p) => p.name === pokemon.name);
</script>

<template>
	<div class="team flex flex-col items-center justify-center">
		<h1 class="text-white-400">Pokemons</h1>
		<p v-if="loading">Loading...</p>
		<div class="alert alert-danger" v-if="error">Error: {{ error }}</div>
	</div>
	<div v-if="data">
		<div class="grid grid-cols-2 md:grid-cols-5 gap-4">
			<PokemonItem
				v-for="pokemon in data.pokemons"
				:key="pokemon.name"
				:pokemon="pokemon"
				:origin="'list'"
			>
				<button
					class="mt-2 px-4 py-1 bg-blue-500 text-white rounded-lg"
					:class="isSelected(pokemon) ? 'bg-red-500' : 'bg-blue-500'"
				>
					{{ isSelected(pokemon) ? 'Remove' : 'Add' }}
				</button>
			</PokemonItem>
		</div>
		<div class="my-2">
			<button
				class="btn btn-outline-danger me-2"
				@click="getData(data.previous)"
				:disabled="data.previous === null"
			>
				Previous
			</button>
			<button
				class="btn btn-outline-primary"
				@click="getData(data.next)"
				:disabled="data.next === null"
			>
				Next
			</button>
		</div>
	</div>
</template>
