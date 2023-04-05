import { getRecipes } from '../utils/model.js'

export function sorting(){

  const recipes = getRecipes()
  const searchBar = document.querySelector('.main-index__input')
  let searchBarValue = searchBar.value

  searchBar.addEventListener('keyup', (e) => {
    searchBarValue = e.target.value
    const filteredRecipes = recipes.filter((recipe) => {
      return recipe.name.toLowerCase().includes(searchBarValue.toLowerCase()) || recipe.description.toLowerCase().includes(searchBarValue.toLowerCase()) || recipe.ingredients.map(object => object.ingredient).join('').toLowerCase().includes(searchBarValue.toLowerCase())
    })

    if (searchBarValue.length > 2 || searchBarValue.length < 3) {
      const recipesContainer = document.querySelector('.main-index__results-container')
      let a = searchBarValue.length > 2 ? filteredRecipes : recipes;
      recipesContainer.innerHTML = ''
      a.forEach((recipe) => {
        const card = createCard(recipe)
        recipesContainer.appendChild(card)
      })
    }
    if (searchBarValue.length > 2 && filteredRecipes.length === 0) {
      const recipesContainer = document.querySelector('.main-index__results-container')
      recipesContainer.innerHTML = ''
      const errorDiv = document.createElement('div')
      errorDiv.classList.add('error')
      errorDiv.innerHTML = `
        <img class="main-index__error-image" src="assets/images/no-results.png" alt="error">
        <p class="main-index__error-text">Aucune recette ne correspond à votre recherche...</p>
      `
      recipesContainer.appendChild(errorDiv)
    }
  })
}

export function createCard(recipe) {
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
  return card
}

// CORIGER LE CODE 
// CORRIGER LES CLASS IS-ACTIVE

export function filterIngredients() {
  const recipes = getRecipes()
  const dropdownMenuIngredients = document.querySelector('.dropdown-menu--ingredients')
  const searchBar = document.querySelector('.main-index__input')
  let searchBarValue = searchBar.value

  searchBar.addEventListener('keyup', (e) => {
    searchBarValue = e.target.value
    const filteredRecipes = recipes.filter((recipe) => {
      return recipe.name.toLowerCase().includes(searchBarValue.toLowerCase()) || recipe.description.toLowerCase().includes(searchBarValue.toLowerCase()) || recipe.ingredients.map(object => object.ingredient).join('').toLowerCase().includes(searchBarValue.toLowerCase())
    })
    if (searchBarValue.length > 2) {
      const filteredIngredients = filteredRecipes.map(recipe => recipe.ingredients.map(object => object.ingredient)).flat()
      const uniqueIngredients = [...new Set(filteredIngredients)]
      const dropdownMenuOptions = dropdownMenuIngredients.querySelector('.dropdown-menu__options')
      dropdownMenuOptions.innerHTML = uniqueIngredients.map(ingredient => `<li class="dropdown-menu__option ingredients">${ingredient}</li>`).join('')
    } 
    else {
      const dropdownMenuOptions = dropdownMenuIngredients.querySelector('.dropdown-menu__options')
      dropdownMenuOptions.innerHTML = recipes.map(recipe => recipe.ingredients.map(object => `<li class="dropdown-menu__option ingredients">${object.ingredient}</li>`)).flat().join('')
    }
  })
}

export function filterAppliances() {
  const recipes = getRecipes()
  const searchBar = document.querySelector('.main-index__input')
  let searchBarValue = searchBar.value

  searchBar.addEventListener('keyup', (e) => {
    searchBarValue = e.target.value
    const filteredRecipes = recipes.filter((recipe) => {
      return recipe.name.toLowerCase().includes(searchBarValue.toLowerCase()) || recipe.description.toLowerCase().includes(searchBarValue.toLowerCase()) || recipe.ingredients.map(object => object.ingredient).join('').toLowerCase().includes(searchBarValue.toLowerCase())
    })
    if (searchBarValue.length > 2) {
      const filteredAppliances = filteredRecipes.map(recipe => recipe.appliance)
      const uniqueAppliances = [...new Set(filteredAppliances)]
      console.log(uniqueAppliances)
    }
  })
}

export function filterUstensils() {
  const recipes = getRecipes()
  const searchBar = document.querySelector('.main-index__input')
  let searchBarValue = searchBar.value

  searchBar.addEventListener('keyup', (e) => {
    searchBarValue = e.target.value
    const filteredRecipes = recipes.filter((recipe) => {
      return recipe.name.toLowerCase().includes(searchBarValue.toLowerCase()) || recipe.description.toLowerCase().includes(searchBarValue.toLowerCase()) || recipe.ingredients.map(object => object.ingredient).join('').toLowerCase().includes(searchBarValue.toLowerCase())
    })
    if (searchBarValue.length > 2) {
      const filteredUstensils = filteredRecipes.map(recipe => recipe.ustensils).flat()
      const uniqueUstensils = [...new Set(filteredUstensils)]
      console.log(uniqueUstensils)
    }
  })
}
