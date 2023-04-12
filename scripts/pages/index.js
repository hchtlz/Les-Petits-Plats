import { getRecipes } from '../utils/model.js'
import { sorting } from '../utils/sorting.js'
import { createCard } from '../utils/card.js'
import { filterIngredients } from '../utils/sorting.js'
import { filterAppliances } from '../utils/sorting.js'
import { filterUstensils } from '../utils/sorting.js'

const recipes = getRecipes()

// Construction of the card
const mainIndexResults = document.querySelector('.main-index__results-container')
recipes.forEach(recipe => {
  const card = createCard(recipe)
  mainIndexResults.appendChild(card)
})

// dropdown menu
const dropdownMenu = document.querySelectorAll('.dropdown-menu')
const dropdownMenuIngredients = document.querySelector('.dropdown-menu--ingredients')
const dropdownMenuAppliances = document.querySelector('.dropdown-menu--devices')
const dropdownMenuUstensils = document.querySelector('.dropdown-menu--utensils')

filterIngredients()
dropdownMenuIngredients.addEventListener('click', () => {
  dropdownMenuIngredients.classList.toggle('is-active')
  dropdownMenuIngredients.querySelector('.dropdown-menu__options').classList.toggle('is-active')
  const dropdownMenuOptions = dropdownMenuIngredients.querySelector('.dropdown-menu__options')
  
  if (dropdownMenuOptions.classList.contains('is-active')) {
    const input = dropdownMenuIngredients.querySelector('.dropdown-menu__sort-input')
    input.value = ''

  } else {
    const input = dropdownMenuIngredients.querySelector('.dropdown-menu__sort-input')
    input.value = 'Ingrédients'
  }
})

filterAppliances();
dropdownMenuAppliances.addEventListener('click', () => {
  dropdownMenuAppliances.classList.toggle('is-active')
  dropdownMenuAppliances.querySelector('.dropdown-menu__options').classList.toggle('is-active')
  const dropdownMenuOptions = dropdownMenuAppliances.querySelector('.dropdown-menu__options')
  
  if (dropdownMenuOptions.classList.contains('is-active')) {
    const input = dropdownMenuAppliances.querySelector('.dropdown-menu__sort-input')
    input.value = ''
  
  } else {
    const input = dropdownMenuAppliances.querySelector('.dropdown-menu__sort-input')
    input.value = 'Appareils'
  }
})

filterUstensils();
// dropdown menu ustensils
dropdownMenuUstensils.addEventListener('click', () => {
  dropdownMenuUstensils.classList.toggle('is-active')
  dropdownMenuUstensils.querySelector('.dropdown-menu__options').classList.toggle('is-active')
  const dropdownMenuOptions = dropdownMenuUstensils.querySelector('.dropdown-menu__options')
  
  if (dropdownMenuOptions.classList.contains('is-active')) {
    const input = dropdownMenuUstensils.querySelector('.dropdown-menu__sort-input')
    input.value = ''
  
  } else {
    const input = dropdownMenuUstensils.querySelector('.dropdown-menu__sort-input')
    input.value = 'Ustensiles'
  }
})

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

    // afficher qu'un seul tag par catégorie
    const tags = document.querySelectorAll('.tag')
    tags.forEach(tag => {
      if (tag.classList.contains('ingredients')) {
        const ingredientsTags = document.querySelectorAll('.tag.ingredients')
        if (ingredientsTags.length > 1) {
          ingredientsTags[0].remove()
          filterIngredients()
        }
      } else if (tag.classList.contains('devices')) {
        const devicesTags = document.querySelectorAll('.tag.devices')
        if (devicesTags.length > 1) {
          devicesTags[0].remove()
        }
      } else if (tag.classList.contains('utensils')) {
        const utensilsTags = document.querySelectorAll('.tag.utensils')
        if (utensilsTags.length > 1) {
          utensilsTags[0].remove()
        }
      }
    })
  })
})

sorting();
