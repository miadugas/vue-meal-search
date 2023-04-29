import { defineStore } from 'pinia';
import axios from 'axios';

interface Ingredient {
  idIngredient: string;
  strIngredient: string;
  // Other properties if needed
}

export const useMealsStore = defineStore('meals', {
  state: () => ({
    meals: [],
    meal: null,
    ingredient: null as Ingredient | null,
    searchedMeals: [] as any[], // Add searchedMeals state
    mealsByLetter: [] as any[], // Add this line
    mealsByIngredient: [] as any[], // Add this line
  }),
  actions: {
    async fetchMeals() {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
      this.meals = response.data.meals;
    },
    async fetchMeal(id: string) {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      this.meal = response.data.meals[0];
    },
    async searchMealsByLetter(letter: string) {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
      this.mealsByLetter = response.data.meals;
    },
    async searchMealsByIngredient(ingredient: string) {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
      this.mealsByIngredient = response.data.meals; // Update this line
    },
    setIngredient(ingredient: Ingredient) {
      this.ingredient = ingredient;
    },

    // Add the searchMeals action
    async searchMeals(keyword: string) {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`);
      this.setSearchedMeals(response.data.meals || []);
    },

    // Add the setSearchedMeals mutation
    setSearchedMeals(meals: any[]) {
      this.searchedMeals = meals;
    },
  },
});
