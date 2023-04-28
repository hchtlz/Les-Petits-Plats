import { getRecipes } from '../utils/model.js'
import { sorting } from '../utils/sorting.js'
import { createCard } from '../utils/card.js'
import { filterIngredients } from '../utils/sorting.js'
import { filterAppliances } from '../utils/sorting.js'
import { filterUstensils } from '../utils/sorting.js'

const recipes = getRecipes()
const dropdownMenu = document.querySelectorAll('.dropdown-menu')
const dropdownMenuIngredients = document.querySelector('.dropdown-menu--ingredients')
const dropdownMenuAppliances = document.querySelector('.dropdown-menu--devices')
const dropdownMenuUstensils = document.querySelector('.dropdown-menu--utensils')
const mainIndexResults = document.querySelector('.main-index__results-container')

// Construction of the card
for (let i = 0; i < recipes.length; i++) {
  const card = createCard(recipes[i])
  mainIndexResults.appendChild(card)
} 
console.log(recipes)

// Sorting of the ingredients, appliances and ustensils
filterIngredients()
filterAppliances();
filterUstensils();

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
  for (let i = 0; i < options.length; i++) {
    const text = options[i].textContent || options[i].innerText
    if (text.toUpperCase().indexOf(filter) > -1) {
      options[i].style.display = ''
    } else {
      options[i].style.display = 'none'
    }
  }
}

// search tag
for (let i = 0; i < dropdownMenu.length; i++) {
  dropdownMenu[i].addEventListener('keyup', (e) => {
    if (e.target.classList.contains('dropdown-menu__sort-input')) {
      searchTag(e)
    }
  })
}

// display tags
for (let i = 0; i < dropdownMenu.length; i++) {
  dropdownMenu[i].addEventListener('click', (e) => {
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
}

// display recipes
sorting();
