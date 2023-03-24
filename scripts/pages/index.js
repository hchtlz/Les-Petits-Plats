import { getRecipes } from '../utils/model.js'

const recipes = getRecipes()

// Construction of the Card
const mainIndexResults = document.querySelector('.main-index__results-container')
recipes.forEach(recipe => {
	const card = document.createElement('div')
	card.classList.add('card')
	card.innerHTML = `
    <div class="card__image"></div>
    <div class="card__text-container">
      <div class="card__header">
        <h2 class="card__header-title">${recipe.name}</h2>
        <div class="card__header-time">
          <i class="far fa-clock"></i>
          <p class="card__header-time--text">${recipe.time} min</p>
        </div>
      </div>
      <div class="card__recipe-details">
      <p class="card__recipe-details--description">${recipe.description}</p>
      <ul class="card__recipe-details--ingredients-list">
        ${recipe.ingredients.map(object => `
        <li class="card__recipe-details--ingredient">
        <span class="card__recipe-details--ingredient-name">${object.ingredient? object.ingredient : ''}:</span>
        <span class="card__recipe-details--ingredient-quantity">${object.quantity? object.quantity : ''}</span>
        <span class="card__recipe-details--ingredient-unit">${object.unit? object.unit : ''}</span>
        </li>`).join('')}
      </ul>
    </div>
  `
	mainIndexResults.appendChild(card)
})

// récuperer tous les ingredients présents dans le json
const allIngredients = recipes.map(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient)).flat()

// dropdown menu
const dropdownMenuIngredients = document.querySelector('.dropdown-menu--ingredients')
const dropdownMenuAppliances = document.querySelector('.dropdown-menu--devices')
const dropdownMenuUstensils = document.querySelector('.dropdown-menu--utensils')

dropdownMenuIngredients.addEventListener('click', () => {
  dropdownMenuIngredients.classList.toggle('is-active')
  dropdownMenuIngredients.querySelector('.dropdown-menu__options').classList.toggle('is-active')
})

dropdownMenuAppliances.addEventListener('click', () => {
  dropdownMenuAppliances.classList.toggle('is-active')
  dropdownMenuAppliances.querySelector('.dropdown-menu__options').classList.toggle('is-active')
})

dropdownMenuUstensils.addEventListener('click', () => {
  dropdownMenuUstensils.classList.toggle('is-active')
  dropdownMenuUstensils.querySelector('.dropdown-menu__options').classList.toggle('is-active')
})


// liste des ingrédients
dropdownMenuIngredients.addEventListener('click', () => {
  const dropdownMenuOptions = dropdownMenuIngredients.querySelector('.dropdown-menu__options')
  if (dropdownMenuOptions.classList.contains('is-active')) {
    dropdownMenuOptions.innerHTML = allIngredients.map(ingredient => `<li class="dropdown-menu__option ingredients">${ingredient}</li>`).join('')
  } else {
    dropdownMenuOptions.innerHTML = ''
  }
})

// liste des appareils
dropdownMenuAppliances.addEventListener('click', () => {
  const dropdownMenuOptions = dropdownMenuAppliances.querySelector('.dropdown-menu__options')
  if (dropdownMenuOptions.classList.contains('is-active')) {
    dropdownMenuOptions.innerHTML = recipes.map(recipe => `<li class="dropdown-menu__option appliances">${recipe.appliance}</li>`).join('')
  } else {
    dropdownMenuOptions.innerHTML = ''
  }
})

// liste des ustensiles
dropdownMenuUstensils.addEventListener('click', () => {
  const dropdownMenuOptions = dropdownMenuUstensils.querySelector('.dropdown-menu__options')
  if (dropdownMenuOptions.classList.contains('is-active')) {
    dropdownMenuOptions.innerHTML = recipes.map(recipe => recipe.ustensils.map(ustensil => `<li class="dropdown-menu__option utensils">${ustensil}</li>`)).flat().join('')
  } else {
    dropdownMenuOptions.innerHTML = ''
  }
})
