<script setup lang="ts">
import PokemonItem from '../components/PokemonItem.vue';
import { usePokemonStore } from '../stores/pokemonStore';

const store = usePokemonStore();
</script>

<template>
	<div class="p-6">
		<h1 class="text-2xl font-bold text-center mb-4">My Pokémon Team</h1>

		<div v-if="store.selectedPokemons.length === 0" class="text-center text-gray-500">
			No Pokémon selected. Go back and choose some!
		</div>

		<div class="grid grid-cols-2 md:grid-cols-3 gap-4">
			<PokemonItem
				v-for="pokemon in store.selectedPokemons"
				:key="pokemon.name"
				:pokemon="pokemon"
				:origin="'team'"
				class="p-4 border rounded-lg flex flex-col items-center shadow hover:scale-105 transition-transform"
			>
				<button
					class="mt-2 px-4 py-1 bg-red-500 text-white rounded-lg"
					@click="store.removePokemon(pokemon)"
				>
					Remove
				</button>
			</PokemonItem>
		</div>

		<div class="mt-4 text-center">
			<router-link to="/" class="px-4 py-2 bg-blue-600 text-white rounded-lg">
				Back to Pokémon List
			</router-link>
		</div>
	</div>
</template>
