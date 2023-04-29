<template>
	<div class="p-8 pb-0">
		<h1 class="text-4xl font-bold mb-4 text-rose-500">
			Meals for {{ ingredient.strIngredient }}
		</h1>
	</div>

	<Meals :meals="meals" />
</template>

<script lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Meals from '../components/Meals.vue';
import { useMealsStore } from '../stores/meals';

export default {
  components: {
    Meals,
  },
  setup() {
    const route = useRoute();
    const mealsStore = useMealsStore();

    const ingredient = computed(() => mealsStore.ingredient);
    const meals = computed(() => mealsStore.mealsByIngredient);

    onMounted(() => {
      mealsStore.searchMealsByIngredient(route.params.ingredient);
    });

    return {
      ingredient,
      meals,
    };
  },
};
</script>
