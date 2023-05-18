import { getRecipes } from '../utils/model.js'
import { render } from '../utils/render.js'
import { createCard } from '../utils/card.js'
import { filterIngredients } from '../utils/render.js'
import { filterAppliances } from '../utils/render.js'
import { filterUstensils } from '../utils/render.js'

const recipes = getRecipes()
const dropdownMenu = document.querySelectorAll('.dropdown-menu')
const dropdownMenuIngredients = document.querySelector('.dropdown-menu--ingredients')
const dropdownMenuAppliances = document.querySelector('.dropdown-menu--devices')
const dropdownMenuUstensils = document.querySelector('.dropdown-menu--utensils')
const mainIndexResults = document.querySelector('.main-index__results-container')

// Construction of the card
recipes.forEach(recipe => {
	const card = createCard(recipe)
	mainIndexResults.appendChild(card)
})

// Sorting of the ingredients, appliances and ustensils
filterIngredients()
filterAppliances()
filterUstensils()

/**
 * Toggle dropdown menu and display delete the value of the input
**/
function toggleDropdown(dropdownMenu, label) {
	dropdownMenu.addEventListener('click', () => {
		dropdownMenu.classList.toggle('is-active')
		dropdownMenu.querySelector('.dropdown-menu__options').classList.toggle('is-active')
		const dropdownMenuOptions = dropdownMenu.querySelector('.dropdown-menu__options')
    
		if (dropdownMenuOptions.classList.contains('is-active')) {
			const input = dropdownMenu.querySelector('.dropdown-menu__sort-input')
			input.value = ''
		} else {
			const input = dropdownMenu.querySelector('.dropdown-menu__sort-input')
			input.value = label
		}
	})
}

toggleDropdown(dropdownMenuIngredients, 'Ingrédients')
toggleDropdown(dropdownMenuAppliances, 'Appareils')
toggleDropdown(dropdownMenuUstensils, 'Ustensiles')

/**
 * Search tag in dropdown menu
**/
function searchTag (e) {
	const input = e.target
	const filter = input.value.toUpperCase()
	const options = input.parentNode.querySelectorAll('.dropdown-menu__option')
	options.forEach(option => {
		const text = option.textContent || option.innerText
		if (text.toUpperCase().indexOf(filter) > -1) {
			option.style.display = ''
		} else {
			option.style.display = 'none'
		}
	})
}

// search tag
dropdownMenu.forEach(menu => {
	menu.addEventListener('keyup', (e) => {
		if (e.target.classList.contains('dropdown-menu__sort-input')) {
			searchTag(e)
		}
	})
})

// display tags
dropdownMenu.forEach(menu => {
	menu.addEventListener('click', (e) => {
		if (e.target.classList.contains('dropdown-menu__option')) {
			const searchResults = document.querySelector('.main-index__tags-container')
			const tag = document.createElement('div')
			tag.classList.add('tag')
			tag.innerHTML = `
        <p class="tag__text">${e.target.outerText}</p>
        <img class="tag__cross" src="assets/SVGS/cross.svg" alt="cross">
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

// display recipes
render()
