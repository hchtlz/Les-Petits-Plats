import { getRecipes } from '../utils/model.js'
import { createCard } from '../utils/card.js'

export function sorting(){

	// Variables and constants
	const recipes = getRecipes()
	const searchBar = document.querySelector('.main-index__input')
	const dropdownMenuIngredients = document.querySelector('.dropdown-menu--ingredients')
	const dropdownMenuOptionsIngredients = dropdownMenuIngredients.querySelector('.dropdown-menu__options--ingredients')
	const dropdownMenuAppliances = document.querySelector('.dropdown-menu--devices')
	const dropdownMenuOptionsAppliances = dropdownMenuAppliances.querySelector('.dropdown-menu__options--devices')
	const dropdownMenuUtensils = document.querySelector('.dropdown-menu--utensils')
	const dropdownMenuOptionsUtensils = dropdownMenuUtensils.querySelector('.dropdown-menu__options--utensils')
	const recipesContainer = document.querySelector('.main-index__results-container')
	const dropdownMenu = document.querySelectorAll('.dropdown-menu')
	let searchBarValue = searchBar.value

	// Search bar
	searchBar.addEventListener('keyup', (e) => {
		searchBarValue = e.target.value
		const filteredRecipes = recipes.filter((recipe) => {
			return recipe.name.toLowerCase().includes(searchBarValue.toLowerCase()) || recipe.description.toLowerCase().includes(searchBarValue.toLowerCase()) || recipe.ingredients.map(object => object.ingredient).join('').toLowerCase().includes(searchBarValue.toLowerCase())
		})

		if (searchBarValue.length > 2 || searchBarValue.length < 3) {
			let a = searchBarValue.length > 2 ? filteredRecipes : recipes
			recipesContainer.innerHTML = ''
			a.forEach((recipe) => {
				const card = createCard(recipe)
				recipesContainer.appendChild(card)
			})
		}
		if (searchBarValue.length > 2 && filteredRecipes.length === 0) {
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

	// Tableau des filtres sélectionnés par l'utilisateur pour les dropdowns
	var filters = []

	// Dropdowns
	dropdownMenu.forEach(menu => {
		menu.addEventListener('click', (e) => {
      
			if (e.target.classList.contains('dropdown-menu__option')) {
				filters.push(e.target.textContent)
				recipesContainer.innerHTML = ''
				const filteredRecipes = recipes.filter((recipe) => {
					return filters.every(filter => {
						return recipe.ingredients.map(object => object.ingredient).includes(filter) || recipe.appliance.includes(filter) || recipe.ustensils.map(object => object).includes(filter)            
					})
				})

				// afficher les recettes filtrées
				filteredRecipes.forEach((recipe) => {
					const card = createCard(recipe)
					recipesContainer.appendChild(card)
				})

				// afficher mais pas de doublons dans les dropdowns
				const filteredIngredients = filteredRecipes.map(recipe => recipe.ingredients.map(object => object.ingredient)).flat()
				const uniqueIngredients = [...new Set(filteredIngredients)]
				dropdownMenuOptionsIngredients.innerHTML = uniqueIngredients.map(ingredient => `<li class="dropdown-menu__option ingredients">${ingredient}</li>`).join('')

				const filteredAppliances = filteredRecipes.map(recipe => recipe.appliance)
				const uniqueAppliances = [...new Set(filteredAppliances)]
				dropdownMenuOptionsAppliances.innerHTML = uniqueAppliances.map(appliance => `<li class="dropdown-menu__option devices">${appliance}</li>`).join('')

				const filteredUtensils = filteredRecipes.map(recipe => recipe.ustensils.map(object => object)).flat()
				const uniqueUtensils = [...new Set(filteredUtensils)]
				dropdownMenuOptionsUtensils.innerHTML = uniqueUtensils.map(utensil => `<li class="dropdown-menu__option utensils">${utensil}</li>`).join('')
			}
		})
	})
  
	// Quand on clique sur la croix, on supprime le filtre
	document.addEventListener('click', (e) => {
		if (e.target.classList.contains('tag__cross')) {
			var tagText = e.target.previousSibling.previousSibling.textContent
			const index = filters.indexOf(tagText)
			if (index > -1) {
				filters.splice(index, 1)
			}
      
			// actualise les recettes affichées en fonction des filtres restants dans le tableau filters 
			recipesContainer.innerHTML = ''
			const filteredRecipes = recipes.filter((recipe) => {
				return filters.every(filter => {
					return recipe.ingredients.map(object => object.ingredient).includes(filter) || recipe.appliance.includes(filter) || recipe.ustensils.map(object => object).includes(filter)            
				})
			})
			filteredRecipes.forEach((recipe) => {
				const card = createCard(recipe)
				recipesContainer.appendChild(card)
			})

			// afficher les filtres des recettes filtrées
			const filteredIngredients = filteredRecipes.map(recipe => recipe.ingredients.map(object => object.ingredient)).flat()
			const uniqueIngredients = [...new Set(filteredIngredients)]
			dropdownMenuOptionsIngredients.innerHTML = uniqueIngredients.map(ingredient => `<li class="dropdown-menu__option ingredients">${ingredient}</li>`).join('')

			const filteredAppliances = filteredRecipes.map(recipe => recipe.appliance)
			const uniqueAppliances = [...new Set(filteredAppliances)]
			dropdownMenuOptionsAppliances.innerHTML = uniqueAppliances.map(appliance => `<li class="dropdown-menu__option devices">${appliance}</li>`).join('')

			const filteredUtensils = filteredRecipes.map(recipe => recipe.ustensils.map(object => object)).flat()
			const uniqueUtensils = [...new Set(filteredUtensils)]
			dropdownMenuOptionsUtensils.innerHTML = uniqueUtensils.map(utensil => `<li class="dropdown-menu__option utensils">${utensil}</li>`).join('')
		}
	})
}


/**
 * Filter ingredients
**/
export function filterIngredients() {
	const recipes = getRecipes()
	const dropdownMenuIngredients = document.querySelector('.dropdown-menu--ingredients')
	const dropdownMenuOptions = dropdownMenuIngredients.querySelector('.dropdown-menu__options--ingredients')
	const searchBar = document.querySelector('.main-index__input')
	let searchBarValue = searchBar.value

	// par default, afficher tous les ingredients et si plusiers fois le meme ingredient, ne pas le repeter
	const ingredients = recipes.map(recipe => recipe.ingredients.map(object => object.ingredient)).flat()
	const uniqueIngredients = [...new Set(ingredients)]
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

/**
 * Filter appliances
 **/
export function filterAppliances() {
	const recipes = getRecipes()
	const dropdownMenuAppliances = document.querySelector('.dropdown-menu--devices')
	const dropdownMenuOptions = dropdownMenuAppliances.querySelector('.dropdown-menu__options--devices')
	const searchBar = document.querySelector('.main-index__input')
	let searchBarValue = searchBar.value

	const appliances = recipes.map(recipe => recipe.appliance.toLowerCase())
	const uniqueAppliances = [...new Set(appliances)]
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
}

/**
 * Filter ustensils
 **/
export function filterUstensils() {
	const recipes = getRecipes()
	const dropdownMenuUstensils = document.querySelector('.dropdown-menu--utensils')
	const dropdownMenuOptions = dropdownMenuUstensils.querySelector('.dropdown-menu__options--utensils')
	const searchBar = document.querySelector('.main-index__input')
	let searchBarValue = searchBar.value

	// par default, afficher tous les ustensiles
	const allUstensils = recipes.map(recipe => recipe.ustensils.map(object => object.toLocaleLowerCase())).flat()
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