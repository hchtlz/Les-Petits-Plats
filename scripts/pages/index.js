import { getRecipes } from '../utils/model.js'
import { sorting } from '../utils/sorting.js'
import { createCard } from '../utils/sorting.js'
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
        <p class="tag__text">${e.target.textContent}</p>
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
        const ingredientsTags = document.querySelectorAll('.ingredients')
        if (ingredientsTags.length > 1) {
          ingredientsTags[0].remove()
        }
      } else if (tag.classList.contains('devices')) {
        const devicesTags = document.querySelectorAll('.devices')
        if (devicesTags.length > 1) {
          devicesTags[0].remove()
        }
      } else if (tag.classList.contains('utensils')) {
        const utensilsTags = document.querySelectorAll('.utensils')
        if (utensilsTags.length > 1) {
          utensilsTags[0].remove()
        }
      }
    })
  })
})

sorting();
filterIngredients();
filterAppliances();
filterUstensils();