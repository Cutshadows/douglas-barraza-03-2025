<script setup lang="ts">
import { usePokemonStore } from '../stores/pokemonStore';

import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { Pokemon } from '../composables/getData';

const route = useRoute();
const router = useRouter();
const pokeSprite = ref({} as Pokemon);

const back = () => {
	router.push('/team');
};
const store = usePokemonStore();
pokeSprite.value = store.selectedPokemons.find((p: Pokemon) => p.name === route.params.name);
</script>

<template>
	<main class="text-center">
		<div v-if="pokeSprite">
			<img :src="pokeSprite.image" alt="pokeSprite.name" />
			<h1>Pokemon: {{ pokeSprite.name }}</h1>
		</div>

		<h1 v-else>Pokemon no encontrado...</h1>
		<button @click="back()">Volver al listado</button>
	</main>
</template>
