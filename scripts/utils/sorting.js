import { getRecipes } from '../utils/model.js'
import { createCard } from '../utils/card.js'

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
  
   // quand on clique sur un li, on affiche les recettes correspondantes
  const dropdownMenu = document.querySelectorAll('.dropdown-menu')
  dropdownMenu.forEach(menu => {
    menu.addEventListener('click', (e) => {
      // quand un li est selectionné, afficher seulement les recettes correspondantes dans les autres dropdowns
      const dropdownMenuIngredients = document.querySelector('.dropdown-menu--ingredients')
      const dropdownMenuOptionsIngredients = dropdownMenuIngredients.querySelector('.dropdown-menu__options--ingredients')
      const dropdownMenuAppliances = document.querySelector('.dropdown-menu--devices')
      const dropdownMenuOptionsAppliances = dropdownMenuAppliances.querySelector('.dropdown-menu__options--devices')
      const dropdownMenuUtensils = document.querySelector('.dropdown-menu--utensils')
      const dropdownMenuOptionsUtensils = dropdownMenuUtensils.querySelector('.dropdown-menu__options--utensils')

      if (e.target.classList.contains('dropdown-menu__option')) {
        const recipesContainer = document.querySelector('.main-index__results-container')
        recipesContainer.innerHTML = ''

        if (e.target.classList.contains('ingredients')) {
          const filteredRecipes = recipes.filter((recipe) => {
            return recipe.ingredients.map(object => object.ingredient).join('').toLowerCase().includes(e.target.outerText.toLowerCase())
          })
          filteredRecipes.forEach((recipe) => {
            const card = createCard(recipe)
            recipesContainer.appendChild(card)
          })
          const filteredIngredients = filteredRecipes.map(recipe => recipe.ingredients.map(object => object.ingredient)).flat()
          const uniqueIngredients = [...new Set(filteredIngredients)]
          dropdownMenuOptionsIngredients.innerHTML = uniqueIngredients.map(ingredient => `<li class="dropdown-menu__option ingredients">${ingredient}</li>`).join('')
          dropdownMenuOptionsAppliances.innerHTML = filteredRecipes.map(recipe => `<li class="dropdown-menu__option devices">${recipe.appliance}</li>`).join('')
          dropdownMenuOptionsUtensils.innerHTML = filteredRecipes.map(recipe => recipe.ustensils.map(object => `<li class="dropdown-menu__option utensils">${object}</li>`)).flat().join('')
        } else if (e.target.classList.contains('devices')) {
          const filteredRecipes = recipes.filter((recipe) => {
            return recipe.appliance.toLowerCase().includes(e.target.outerText.toLowerCase())
          })
          filteredRecipes.forEach((recipe) => {
            const card = createCard(recipe)
            recipesContainer.appendChild(card)
          })
          const filteredIngredients = filteredRecipes.map(recipe => recipe.ingredients.map(object => object.ingredient)).flat()
          const uniqueIngredients = [...new Set(filteredIngredients)]
          dropdownMenuOptionsIngredients.innerHTML = uniqueIngredients.map(ingredient => `<li class="dropdown-menu__option ingredients">${ingredient}</li>`).join('')
          dropdownMenuOptionsAppliances.innerHTML = filteredRecipes.map(recipe => `<li class="dropdown-menu__option devices">${recipe.appliance}</li>`).join('')
          dropdownMenuOptionsUtensils.innerHTML = filteredRecipes.map(recipe => recipe.ustensils.map(object => `<li class="dropdown-menu__option utensils">${object}</li>`)).flat().join('')
        } else if (e.target.classList.contains('utensils')) {
          const filteredRecipes = recipes.filter((recipe) => {
            return recipe.ustensils.map(object => object).join('').toLowerCase().includes(e.target.outerText.toLowerCase())
          })
          filteredRecipes.forEach((recipe) => {
            const card = createCard(recipe)
            recipesContainer.appendChild(card)
          })
        }
      }
    })
  }) 
}

export function filterIngredients() {
  const recipes = getRecipes()
  const dropdownMenuIngredients = document.querySelector('.dropdown-menu--ingredients')
  const dropdownMenuOptions = dropdownMenuIngredients.querySelector('.dropdown-menu__options--ingredients')
  const searchBar = document.querySelector('.main-index__input')
  let searchBarValue = searchBar.value

  // par default, afficher tous les ingredients
  const allIngredients = recipes.map(recipe => recipe.ingredients.map(object => object.ingredient)).flat()
  const uniqueIngredients = [...new Set(allIngredients)]
  dropdownMenuOptions.innerHTML = uniqueIngredients.map(ingredient => `<li class="dropdown-menu__option ingredients">${ingredient}</li>`).join('')

  searchBar.addEventListener('keyup', (e) => {
    searchBarValue = e.target.value
    const filteredRecipes = recipes.filter((recipe) => {
      return recipe.name.toLowerCase().includes(searchBarValue.toLowerCase()) || recipe.description.toLowerCase().includes(searchBarValue.toLowerCase()) || recipe.ingredients.map(object => object.ingredient).join('').toLowerCase().includes(searchBarValue.toLowerCase())
    })

    if (searchBarValue.length > 2) {
      const filteredIngredients = filteredRecipes.map(recipe => recipe.ingredients.map(object => object.ingredient)).flat()
      const uniqueIngredients = [...new Set(filteredIngredients)]
      dropdownMenuOptions.innerHTML = uniqueIngredients.map(ingredient => `<li class="dropdown-menu__option ingredients">${ingredient}</li>`).join('')
    }
    else if (searchBarValue.length < 3) {
      dropdownMenuOptions.innerHTML = recipes.map(recipe => recipe.ingredients.map(object => `<li class="dropdown-menu__option ingredients">${object.ingredient}</li>`)).flat().join('')
    }
  })
}

export function filterAppliances() {
  const recipes = getRecipes()
  const dropdownMenuAppliances = document.querySelector('.dropdown-menu--devices')
  const dropdownMenuOptions = dropdownMenuAppliances.querySelector('.dropdown-menu__options--devices')
  const searchBar = document.querySelector('.main-index__input')
  let searchBarValue = searchBar.value

  // par default, afficher tous les appareils
  const allAppliances = recipes.map(recipe => recipe.appliance)
  const uniqueAppliances = [...new Set(allAppliances)]
  dropdownMenuOptions.innerHTML = uniqueAppliances.map(appliance => `<li class="dropdown-menu__option devices">${appliance}</li>`).join('')
  
  searchBar.addEventListener('keyup', (e) => {
    searchBarValue = e.target.value
    const filteredRecipes = recipes.filter((recipe) => {
      return recipe.name.toLowerCase().includes(searchBarValue.toLowerCase()) || recipe.description.toLowerCase().includes(searchBarValue.toLowerCase()) || recipe.ingredients.map(object => object.ingredient).join('').toLowerCase().includes(searchBarValue.toLowerCase())
    })

    if (searchBarValue.length > 2) {
      const filteredAppliances = filteredRecipes.map(recipe => recipe.appliance)
      const uniqueAppliances = [...new Set(filteredAppliances)]
      dropdownMenuOptions.innerHTML = uniqueAppliances.map(appliance => `<li class="dropdown-menu__option devices">${appliance}</li>`).join('')
    }
    else if (searchBarValue.length < 3) {
      dropdownMenuOptions.innerHTML = recipes.map(recipe => `<li class="dropdown-menu__option devices">${recipe.appliance}</li>`).join('')
    }
  })

   // quand on clique sur un li dropdown-menu__option devices, on affiche les recettes correspondantes
  /* dropdownMenuOptions.addEventListener('click', (e) => {
    const recipesContainer = document.querySelector('.main-index__results-container')
    const filteredRecipes = recipes.filter((recipe) => {
      return recipe.appliance === e.target.innerText
    })
    recipesContainer.innerHTML = ''
    filteredRecipes.forEach((recipe) => {
      const card = createCard(recipe)
      recipesContainer.appendChild(card)
    })
  }) */
}

export function filterUstensils() {
  const recipes = getRecipes()
  const dropdownMenuUstensils = document.querySelector('.dropdown-menu--utensils')
  const dropdownMenuOptions = dropdownMenuUstensils.querySelector('.dropdown-menu__options--utensils')
  const searchBar = document.querySelector('.main-index__input')
  let searchBarValue = searchBar.value

  // par default, afficher tous les ustensiles
  const allUstensils = recipes.map(recipe => recipe.ustensils)
  const uniqueUstensils = [...new Set(allUstensils.flat())]
  dropdownMenuOptions.innerHTML = uniqueUstensils.map(ustensil => `<li class="dropdown-menu__option utensils">${ustensil}</li>`).join('')

  searchBar.addEventListener('keyup', (e) => {
    searchBarValue = e.target.value
    const filteredRecipes = recipes.filter((recipe) => {
      return recipe.name.toLowerCase().includes(searchBarValue.toLowerCase()) || recipe.description.toLowerCase().includes(searchBarValue.toLowerCase()) || recipe.ingredients.map(object => object.ingredient).join('').toLowerCase().includes(searchBarValue.toLowerCase())
    })

    if (searchBarValue.length > 2) {
      const filteredUstensils = filteredRecipes.map(recipe => recipe.ustensils)
      const uniqueUstensils = [...new Set(filteredUstensils.flat())]
      dropdownMenuOptions.innerHTML = uniqueUstensils.map(ustensil => `<li class="dropdown-menu__option utensils">${ustensil}</li>`).join('')
    }
    else if (searchBarValue.length < 3) {
      dropdownMenuOptions.innerHTML = recipes.map(recipe => recipe.ustensils.map(ustensil => `<li class="dropdown-menu__option utensils">${ustensil}</li>`)).flat().join('')
    }
  })
}

