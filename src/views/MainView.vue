<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useGetData } from '../composables/getData';
import PokemonItem from '../components/PokemonItem.vue';

const { data: pokemons, error, loading, getData } = useGetData();
getData('/pokemon');
</script>

<template>
	<div class="team flex flex-col items-center justify-center">
		<h1 class="text-white-400">POKEMONS</h1>
		<p v-if="loading">Loading...</p>
		<div class="alert alert-danger" v-if="error">Error: {{ error }}</div>
	</div>
	<div v-if="pokemons">
		<div class="grid grid-cols-2 md:grid-cols-5 gap-4">
			<PokemonItem
				v-for="pokemon in pokemons"
				:key="pokemon.name"
				:name="pokemon.name"
				:image="pokemon.image"
				class="p-4 border rounded-lg flex flex-col items-center shadow hover:scale-105 transition-transform"
			/>
		</div>
		<div class="my-2">
			<button
				class="btn btn-outline-danger me-2"
				@click="getData(pokemons.previous)"
				:disabled="pokemons.previous === null"
			>
				Previous
			</button>
			<button
				class="btn btn-outline-primary"
				@click="getData(pokemons.next)"
				:disabled="pokemons.next === null"
			>
				Next
			</button>
		</div>
	</div>
</template>
