<script setup lang="ts">
import { usePokemonStore } from '../stores/pokemonStore';

import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { Pokemon } from '../composables/getData';

const audio = ref(null);
const route = useRoute();
const router = useRouter();
const pokeSprite = ref({} as Pokemon);

const back = () => {
	router.push('/team');
};
const store = usePokemonStore();
pokeSprite.value = store.selectedPokemons.find((p: Pokemon) => p.name === route.params.name);

const playSound = () => {
	if (audio.value) {
		audio.value.play();
	}
};
</script>

<template>
	<div class="flex flex-col items-center p-6">
		<button @click="back()">⬅ Back to Team</button>
		<!-- <router-link to="/team" class="text-blue-500 underline">⬅ Back to Team</router-link> -->
		<div
			v-if="pokeSprite"
			class="bg-white text-black p-6 rounded-lg shadow-lg mt-4 text-center"
		>
			<img :src="pokeSprite.image" :alt="pokeSprite.name" class="w-40 h-40 mx-auto" />
			<h1 class="text-3xl font-bold capitalize mt-2">{{ pokeSprite.name }}</h1>
			<div class="flex flex-row justify-center items-center mt-4">
				<h2 class="text-sm font-semibold">
					{{
						pokeSprite?.details?.types && pokeSprite.details.types.length > 1
							? 'Types'
							: 'Type'
					}}
				</h2>
				<ul class="ml-2">
					<li
						v-for="type in pokeSprite?.details?.types"
						:key="type.type.url"
						class="capitalize text-md font-semibold"
					>
						{{ type.type.name }}
					</li>
				</ul>
			</div>
			<div class="mt-6" v-for="(sound, index) of pokeSprite.details?.sounds" :key="index">
				<audio ref="audio" :src="sound"></audio>
				<button
					@click="playSound"
					class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
				>
					🔊 Play {{ index }}
				</button>
			</div>
		</div>

		<p v-else class="text-red-500 mt-4">Loading Pokémon details...</p>
	</div>
</template>
