import { getRecipes } from '../utils/model.js'
import { sorting } from '../utils/sorting.js'

const recipes = getRecipes()

// Construction of the card
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

// get data from the json file
const allIngredients = recipes.map(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient)).flat()

// dropdown menu
const dropdownMenu = document.querySelectorAll('.dropdown-menu')
const dropdownMenuIngredients = document.querySelector('.dropdown-menu--ingredients')
const dropdownMenuAppliances = document.querySelector('.dropdown-menu--devices')
const dropdownMenuUstensils = document.querySelector('.dropdown-menu--utensils')

// dropdown menu ingredients
dropdownMenuIngredients.addEventListener('click', () => {
  dropdownMenuIngredients.classList.toggle('is-active')
  dropdownMenuIngredients.querySelector('.dropdown-menu__options').classList.toggle('is-active')
  const dropdownMenuOptions = dropdownMenuIngredients.querySelector('.dropdown-menu__options')
  
  if (dropdownMenuOptions.classList.contains('is-active')) {
    
    const input = dropdownMenuIngredients.querySelector('.dropdown-menu__sort-input')
    input.value = ''
    
    const uniqueIngredients = [...new Set(allIngredients)]
    dropdownMenuOptions.innerHTML = uniqueIngredients.map(ingredient => `<li class="dropdown-menu__option ingredients">${ingredient}</li>`).join('')
  
  } else {
    dropdownMenuOptions.innerHTML = ''

    const input = dropdownMenuIngredients.querySelector('.dropdown-menu__sort-input')
    input.value = 'Ingrédients'
  }
})

// dropdown menu appliances
dropdownMenuAppliances.addEventListener('click', () => {
  dropdownMenuAppliances.classList.toggle('is-active')
  dropdownMenuAppliances.querySelector('.dropdown-menu__options').classList.toggle('is-active')
  const dropdownMenuOptions = dropdownMenuAppliances.querySelector('.dropdown-menu__options')
  
  if (dropdownMenuOptions.classList.contains('is-active')) {
    
    const input = dropdownMenuAppliances.querySelector('.dropdown-menu__sort-input')
    input.value = ''

    const allAppliances = recipes.map(recipe => recipe.appliance)
    const uniqueAppliances = [...new Set(allAppliances)]
    dropdownMenuOptions.innerHTML = uniqueAppliances.map(appliance => `<li class="dropdown-menu__option devices">${appliance}</li>`).join('')
  
  } else {
    dropdownMenuOptions.innerHTML = ''

    const input = dropdownMenuAppliances.querySelector('.dropdown-menu__sort-input')
    input.value = 'Appareils'
  }
})

// dropdown menu ustensils
dropdownMenuUstensils.addEventListener('click', () => {
  dropdownMenuUstensils.classList.toggle('is-active')
  dropdownMenuUstensils.querySelector('.dropdown-menu__options').classList.toggle('is-active')
  const dropdownMenuOptions = dropdownMenuUstensils.querySelector('.dropdown-menu__options')
  
  if (dropdownMenuOptions.classList.contains('is-active')) {
    
    const input = dropdownMenuUstensils.querySelector('.dropdown-menu__sort-input')
    input.value = ''
    
    const allUstensils = recipes.map(recipe => recipe.ustensils).flat()
    const uniqueUstensils = [...new Set(allUstensils)]
    dropdownMenuOptions.innerHTML = uniqueUstensils.map(ustensil => `<li class="dropdown-menu__option utensils">${ustensil}</li>`).join('')
  
  } else {
    dropdownMenuOptions.innerHTML = ''
    
    const input = dropdownMenuUstensils.querySelector('.dropdown-menu__sort-input')
    input.value = 'Ustensiles'
  }
})

// display tags
dropdownMenu.forEach(menu => {
  menu.addEventListener('click', (e) => {
    if (e.target.classList.contains('dropdown-menu__option')) {
      const searchResults = document.querySelector('.main-index__tags-container')
      const tag = document.createElement('div')
      tag.classList.add('tag')
      tag.innerHTML = `
        <p class="tag__text">${e.target.textContent}</p>
        <i class="fas fa-times tag__cross"></i>
      `
      tag.querySelector('.tag__cross').addEventListener('click', () => {
        tag.remove()
      })

      if (e.target.classList.contains('ingredients')) {
        tag.classList.add('ingredients')
      } else if (e.target.classList.contains('devices')) {
        tag.classList.add('devices')
      } else if (e.target.classList.contains('utensils')) {
        tag.classList.add('utensils')
      }
      searchResults.appendChild(tag)
    }
  })
})

sorting();
