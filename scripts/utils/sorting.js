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
    // afficher message d'erreur quand il n'y a pas de résultats
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
  
    function filterIngredients() {
      //au bout de 3 caractères, afficher les ingrédients qui correspondent
      if (searchBarValue.length > 2) {
        const filteredIngredients = filteredRecipes.map(recipe => recipe.ingredients.map(object => object.ingredient)).flat()
        const uniqueIngredients = [...new Set(filteredIngredients)]
        console.log(uniqueIngredients)
      }
    }
    filterIngredients()

    function filterAppliances() {
      if (searchBarValue.length > 2) {
        const filteredAppliances = filteredRecipes.map(recipe => recipe.appliance)
        const uniqueAppliances = [...new Set(filteredAppliances)]
        console.log(uniqueAppliances)
      }
    }
    filterAppliances()

    function filterUstensils() {
      if (searchBarValue.length > 2) {
        const filteredUstensils = filteredRecipes.map(recipe => recipe.ustensils).flat()
        const uniqueUstensils = [...new Set(filteredUstensils)]
        console.log(uniqueUstensils)
      }
    }
    filterUstensils()



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
