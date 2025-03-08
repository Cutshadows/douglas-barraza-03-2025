import { ref, toValue, watchEffect } from "vue";
import { pokemonAPI } from "../composables/utils";

export const useFetch = () => {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(true);

  const fetchData = async (query?: string) => {
    console.log("fetchData");
    data.value = null;
    error.value = null;

    const urlValue = toValue(`${pokemonAPI}${query}`);
    try {
      const res = await fetch(urlValue);
      data.value = await res.json();
    } catch (err) {
      error.value = err;
      loading.value = false;
    } finally {
      loading.value = false;
    }
  };

  watchEffect(() => {
    fetchData();
  });

  return { data, error, loading, fetchData };
};
