<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { usePokemonStore } from '../stores/pokemonStore';
import type { Pokemon } from '../composables/getData';

const store = usePokemonStore();
const props = defineProps<{
	pokemon?: Pokemon;
	origin: 'team' | 'list';
}>();

const isSelected = computed(() => {
	if (!props.pokemon) return false;
	return store.selectedPokemons.some((p: Pokemon) => p.name === props?.pokemon?.name);
});
const toggleSelect = () => {
	if (!props?.pokemon?.name || !props.pokemon.image || props.origin !== 'list') return;
	if (isSelected.value) {
		store.removePokemon(props.pokemon);
	} else {
		store.addPokemon(props.pokemon);
	}
};
</script>
<template>
	<div
		class="p-4 border rounded-lg flex flex-col items-center shadow hover:scale-105 transition-transform cursor-pointer"
		:class="isSelected ? 'bg-blue-500 text-white' : 'hover:scale-105'"
		@click="toggleSelect"
	>
		<section v-if="origin === 'team'">
			<router-link
				:to="`/team/${pokemon?.name}`"
				class="no-underline text-black hover:text-white"
			>
				<img :src="pokemon?.image" :alt="pokemon?.name" class="w-20 h-20 object-cover" />
				<p class="mt-2 text-lg font-semibold">{{ pokemon?.name }}</p>
			</router-link>
		</section>
		<section v-else>
			<img :src="pokemon?.image" :alt="pokemon?.name" class="w-20 h-20 object-cover" />
			<p class="mt-2 text-lg font-semibold">{{ pokemon?.name }}</p>
		</section>
		<slot></slot>
	</div>
</template>
