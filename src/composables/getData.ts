import axios from 'axios';
import { ref } from 'vue';
import { pokemonAPI } from '../composables/utils';

export type Stat = {
	base_stat: number;
	effort: number;
	stat: {
		name: string;
		url: string;
	};
};

export type Pokemon = {
	name: string;
	url: string;
	image?: string;
	sound?: string;
	stats?: Stat[];
};

export const useGetData = () => {
	const data = ref([] as Pokemon[]);
	const error = ref(null);
	const loading = ref(true);

	const getData = async (url: string) => {
		loading.value = true;
		const response = await axios.get(`${pokemonAPI}${url}?limit=25&generation=1`);
		try {
			const res = await Promise.all(
				response.data.results.map(async (pokemon: Pokemon) => {
					const details = await axios.get(pokemon.url);
					return {
						...pokemon,
						name: pokemon.name,
						image: details.data.sprites.front_default,
						sound: details.data.cries.legacy,
						stats: details.data.stats,
					} as Pokemon;
				})
			);
			data.value = res;
		} catch (e) {
			error.value = 'Something went wrong';
		} finally {
			loading.value = false;
		}
	};

	return { data, error, loading, getData };
};
