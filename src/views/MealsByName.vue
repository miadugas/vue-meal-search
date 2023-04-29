<template>
  <div class="p-8 pb-0">
    <h1 class="text-4xl font-bold mb-4 text-orange-500">Search Meals by Name</h1>
  </div>
  <div class="px-8 pb-3">
    <input
      type="text"
      v-model="keyword"
      class="rounded border-2 bg-white border-gray-200 focus:ring-orange-500 focus:border-orange-500 w-full"
      placeholder="Search for Meals"
      @input="handleInput"
    />
  </div>

  <Meals :meals="meals" />
</template>

<script lang="ts">
import { computed, onMounted, ref } from "vue";
import { debounce } from "lodash";
import { useRoute } from "vue-router";
import { useMealsStore } from "../stores/meals";
import Meals from "../components/Meals.vue";

export default {
  name: "MealsByName",
  components: {
    Meals,
  },

  setup() {
    const mealsStore = useMealsStore();
    const route = useRoute();
    const keyword = ref("");

    const debouncedSearchMeals = debounce((keyword: string) => {
      if (keyword) {
        mealsStore.searchMeals(keyword);
      } else {
        mealsStore.setSearchedMeals([]);
      }
    }, 500);

    function handleInput(event: InputEvent) {
      const searchTerm = (event.target as HTMLInputElement).value;
      keyword.value = searchTerm;
      debouncedSearchMeals(searchTerm);
    }


    const meals = computed(() => mealsStore.searchedMeals);

    onMounted(() => {
      keyword.value = route.params.name as string;
      if (keyword.value) {
        debouncedSearchMeals(keyword.value);
      }
    });

    return {
      keyword,
      handleInput,
      meals,
    };
  },
};
</script>
