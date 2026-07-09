import axios from "axios";

const API_URL = "https://www.themealdb.com/api/json/v1/1";

export const recipeService = {
  searchRecipesByName: async (name) => {
    const response = await axios.get(`${API_URL}/search.php?s=${name}`);
    return response.data.meals || [];
  },

  getRecipeById: async (id) => {
    const response = await axios.get(`${API_URL}/lookup.php?i=${id}`);
    return response.data.meals ? response.data.meals[0] : null;
  },

  getRandomRecipe: async () => {
    const response = await axios.get(`${API_URL}/random.php`);
    return response.data.meals ? response.data.meals[0] : null;
  },

  getCategories: async () => {
    const response = await axios.get(`${API_URL}/categories.php`);
    return response.data.categories || [];
  },

  getRecipesByCategory: async (category) => {
    const response = await axios.get(`${API_URL}/filter.php?c=${category}`);
    return response.data.meals || [];
  },

  getRecipesByArea: async (area) => {
    const response = await axios.get(`${API_URL}/filter.php?a=${area}`);
    return response.data.meals || [];
  },

  getRecipesByIngredient: async (ingredient) => {
    const response = await axios.get(`${API_URL}/filter.php?i=${ingredient}`);
    return response.data.meals || [];
  },

  getAreas: async () => {
    const response = await axios.get(`${API_URL}/list.php?a=list`);
    return response.data.meals || [];
  },

  getIngredients: async () => {
    const response = await axios.get(`${API_URL}/list.php?i=list`);
    return response.data.meals || [];
  },
};
