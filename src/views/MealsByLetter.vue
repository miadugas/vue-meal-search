<template>
  <div class="p-8 pb-0">
    <h1 class="text-4xl font-bold mb-4 text-rose-500">Meals by Letter</h1>
  </div>
  <div class="flex flex-wrap justify-center gap-3 px-8 mb-6">
    <router-link
      :to="{ name: 'byLetter', params: { letter } }"
      v-for="letter of letters"
      :key="letter"
      class="w-2 h-2 flex items-center justify-center hover:text-rose-500 hover:scale-150 transition-all"
    >
      {{ letter }}
    </router-link>
  </div>

  <Meals :meals="meals" />
</template>

<script lang="ts">
import { computed, onMounted, watch } from 'vue';
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

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const meals = computed(() => mealsStore.mealsByLetter);

    watch(route, () => {
      mealsStore.searchMealsByLetter(route.params.letter);
    });

    onMounted(() => {
      mealsStore.searchMealsByLetter(route.params.letter);
    });

    return {
      letters,
      meals,
    };
  },
};
</script>
