import { getRecipes } from '../utils/model.js'

export function sorting(){

  const recipes = getRecipes()
  const searchBar = document.querySelector('.main-index__input')
  let searchBarValue = searchBar.value

  // actualisé la value de la search bar a chaque fois que l'on tape une lettre et l'afficher dans la console
  searchBar.addEventListener('keyup', (e) => {
    searchBarValue = e.target.value

    // afficher les recettes qui correspondent a la recherche
    if (searchBarValue.length > 2) {
      const filteredRecipes = recipes.filter((recipe) => {
        return recipe.name.toLowerCase().includes(searchBarValue.toLowerCase())
      })
      console.log(filteredRecipes)

      // afficher les recettes qui correspondent a la recherche dans le DOM 
      const recipesContainer = document.querySelector('.main-index__results-container')
      recipesContainer.innerHTML = ''
      filteredRecipes.forEach((recipe) => {
        // afficher les cards qui correspondent a la recherche
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
        recipesContainer.appendChild(card)
      })
    }
    // afficher message d'erreur si la recherche ne correspond a aucune recette
    else if (searchBarValue.length < 3) {
      const recipesContainer = document.querySelector('.main-index__results-container')
      recipesContainer.innerHTML = ''
      // afficher image d'erreur et un message d'erreur dans une div
      const errorDiv = document.createElement('div')
      errorDiv.classList.add('error')
      errorDiv.innerHTML = `
        <img class="main-index__error-image" src="assets/images/no-results.png" alt="error">
        <p class="main-index__error-text">Aucune recette ne correspond à votre critère...</p>
      `
      recipesContainer.appendChild(errorDiv)
    }
  })
}