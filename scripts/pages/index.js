import { getRecipes } from '../utils/model.js'
import { Recipe } from '../models/recipe'

const recipes = getRecipes()
const recipesList = document.querySelector('.cards')
recipes.slice(0, 9).forEach(recipe => {
  const recipeCard = new Recipe(recipe)
  recipesList.appendChild(recipeCard.element)
})