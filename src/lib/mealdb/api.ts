import axios from 'axios';

const mealApi = axios.create({
  baseURL: 'https://www.themealdb.com/api/json/v1/1/',
});

type MealDTO = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

type Meal = {
  id: string;
  meal: string;
  mealThumb: string;
};

type MealDetailsDTO = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strIngredient16: string;
  strIngredient17: string;
  strIngredient18: string;
  strIngredient19: string;
  strIngredient20: string;
};

type MealDetails = {
  id: string;
  meal: string;
  mealThumb: string;
  instructions: string;
  ingredients: string[];
};

type CategoryDTO = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
};

export async function getRandomMeal() {
  const response = await mealApi.get<{ meals: MealDetailsDTO[] }>('random.php');
  const m = response.data.meals[0];
  const ingredients = [
    m.strIngredient1,
    m.strIngredient2,
    m.strIngredient3,
    m.strIngredient4,
    m.strIngredient5,
    m.strIngredient6,
    m.strIngredient7,
    m.strIngredient8,
    m.strIngredient9,
    m.strIngredient10,
    m.strIngredient11,
    m.strIngredient12,
    m.strIngredient13,
    m.strIngredient14,
    m.strIngredient15,
    m.strIngredient16,
    m.strIngredient17,
    m.strIngredient18,
    m.strIngredient19,
    m.strIngredient20,
  ];
  return {
    id: m.idMeal,
    meal: m.strMeal,
    mealThumb: m.strMealThumb,
    instructions: m.strInstructions,
    ingredients,
  } satisfies MealDetails;
}

export async function getCategories() {
  const response = await mealApi.get<{ categories: CategoryDTO[] }>(
    'categories.php',
  );
  return response.data.categories;
}

export async function getMealsByCategory(category: string) {
  const response = await mealApi.get<{ meals: MealDTO[] }>(
    `filter.php?c=${category}`,
  );
  return response.data.meals.map(
    (m) =>
      ({
        id: m.idMeal,
        meal: m.strMeal,
        mealThumb: m.strMealThumb,
      }) satisfies Meal,
  );
}

export async function getMealById(id: string) {
  const response = await mealApi.get<{ meals: MealDetailsDTO[] }>(
    `lookup.php?i=${id}`,
  );
  const m = response.data.meals[0];
  const ingredients = [
    m.strIngredient1,
    m.strIngredient2,
    m.strIngredient3,
    m.strIngredient4,
    m.strIngredient5,
    m.strIngredient6,
    m.strIngredient7,
    m.strIngredient8,
    m.strIngredient9,
    m.strIngredient10,
    m.strIngredient11,
    m.strIngredient12,
    m.strIngredient13,
    m.strIngredient14,
    m.strIngredient15,
    m.strIngredient16,
    m.strIngredient17,
    m.strIngredient18,
    m.strIngredient19,
    m.strIngredient20,
  ];
  return {
    id: m.idMeal,
    meal: m.strMeal,
    mealThumb: m.strMealThumb,
    instructions: m.strInstructions,
    ingredients,
  } satisfies MealDetails;
}
