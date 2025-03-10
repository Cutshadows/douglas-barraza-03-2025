import axios from 'axios';
import { ref } from 'vue';

export type Stat = {
	base_stat: number;
	effort: number;
	stat: {
		name: string;
		url: string;
	};
};

export type Pagination = {
	count: number;
	next: string;
	previous: string;
	pokemons?: Pokemon[];
};

export type Sound = {
	latest: string;
	legacy: string;
};

export type Details = {
	sounds?: Sound;
	stats?: Stat[];
	types?: { type: { name: string; url: string } }[];
};

export type Pokemon = {
	name: string;
	url: string;
	image?: string;
	details?: Details;
};

export const useGetData = () => {
	const data = ref({} as Pagination);
	const error = ref<string | null>(null);
	const loading = ref(true);

	const getData = async (url: string) => {
		loading.value = true;
		try {
			const response = await axios.get(`${url}`);
			const responseDetail = await Promise.all(
				response.data.results.map(async (pokemon: Pokemon) => {
					const details = await axios.get(pokemon.url);
					return {
						...pokemon,
						name: pokemon.name,
						image: details.data.sprites.front_default,
						details: {
							sounds: details.data.cries,
							stats: details.data.stats,
							types: details.data.types,
						},
					} as Pokemon;
				})
			);
			const mergedResponseData = {
				...data.value,
				...({
					count: response.data.count,
					next: response.data.next,
					previous: response.data.previous,
				} as Pagination),
				pokemons: responseDetail,
			};
			data.value = mergedResponseData;
		} catch (e) {
			error.value = 'Something went wrong';
		} finally {
			loading.value = false;
		}
	};

	return { data, error, loading, getData };
};
