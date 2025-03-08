<script setup lang="ts">
import { RouterLink } from 'vue-router';

const props = defineProps<{
	name: string;
	image: string;
}>();
</script>
<template>
	<router-link :to="`/pokemons/${name}`">
		<img :src="image" :alt="name" class="w-20 h-20 object-cover" />
		<p class="mt-2 text-lg font-semibold">{{ name }}</p>
	</router-link>
</template>
