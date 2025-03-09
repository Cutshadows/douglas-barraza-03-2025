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
		<div
			v-if="pokeSprite"
			class="bg-white w-3/4 text-black p-6 rounded-lg shadow-lg mt-4 text-center"
		>
			<img :src="pokeSprite.image" :alt="pokeSprite.name" class="w-40 h-40 mx-auto" />
			<h1 class="text-3xl font-bold capitalize mt-2">{{ pokeSprite.name }}</h1>
			<div class="justify-center items-center mt-4">
				<span class="text-xl font-extrabold">
					{{
						pokeSprite?.details?.types && pokeSprite.details.types.length > 1
							? 'Types'
							: 'Type'
					}}
				</span>
				<ul class="ml-2" v-if="pokeSprite?.details?.types">
					<li
						v-for="type in pokeSprite?.details?.types"
						:key="type.type.url"
						class="capitalize text-md font-semibold bg-gray-200 p-2 rounded-lg mt-2"
					>
						{{ type.type.name }}
					</li>
				</ul>
			</div>
			<div class="mt-4">
				<h2 class="text-xl font-semibold mt-4">Stats:</h2>
				<div v-for="(stat, index) in pokeSprite.details?.stats" :key="index" class="mt-2">
					<p class="capitalize font-semibold">
						{{ stat.stat.name }}: {{ stat.base_stat }}
					</p>
					<div class="w-full bg-gray-300 rounded-full h-4">
						<div
							class="h-4 bg-blue-500 rounded-full transition-all"
							:style="{ width: stat.base_stat + '%' }"
						></div>
					</div>
				</div>
			</div>
			<div class="mt-6" v-for="(sound, index) of pokeSprite.details?.sounds" :key="index">
				<audio ref="audio" :src="sound"></audio>
				<button
					@click="playSound"
					class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
				>
					🔊 Cries {{ index }}
				</button>
			</div>
		</div>
	</div>
</template>
