import { getRecipes } from '../utils/model.js'
import { sorting } from '../utils/sorting.js'
import { createCard } from '../utils/card.js'
import { filterIngredients } from '../utils/sorting.js'
import { filterAppliances } from '../utils/sorting.js'
import { filterUstensils } from '../utils/sorting.js'

const recipes = getRecipes() // Get the recipes from the model
const dropdownMenu = document.querySelectorAll('.dropdown-menu')
const dropdownMenuIngredients = document.querySelector('.dropdown-menu--ingredients') // Get the dropdown menu for ingredients
const dropdownMenuAppliances = document.querySelector('.dropdown-menu--devices') // Get the dropdown menu for appliances
const dropdownMenuUstensils = document.querySelector('.dropdown-menu--utensils')  // Get the dropdown menu for ustensils
const mainIndexResults = document.querySelector('.main-index__results-container') // Get the container for the results

// Construction of the card
for (let i = 0; i < recipes.length; i++) {
  const card = createCard(recipes[i])
  mainIndexResults.appendChild(card)
} 

// Sorting of the ingredients, appliances and ustensils
filterIngredients()
filterAppliances();
filterUstensils();

/**
 * Toggle dropdown menu and display, delete the value of the input
 **/
function toggleDropdown(dropdownMenu, label) {
  dropdownMenu.addEventListener('click', () => {
    // Toggle the active class on the dropdown menu and its options
    dropdownMenu.classList.toggle('is-active');
    dropdownMenu.querySelector('.dropdown-menu__options').classList.toggle('is-active');
    const dropdownMenuOptions = dropdownMenu.querySelector('.dropdown-menu__options');

    if (dropdownMenuOptions.classList.contains('is-active')) {
      // Clear the input value when the dropdown menu is active
      const input = dropdownMenu.querySelector('.dropdown-menu__sort-input');
      input.value = '';
    } else {
      // Set the input value to the specified label when the dropdown menu is not active
      const input = dropdownMenu.querySelector('.dropdown-menu__sort-input');
      input.value = label;
    }
  });
}

toggleDropdown(dropdownMenuIngredients, 'Ingrédients')
toggleDropdown(dropdownMenuAppliances, 'Appareils')
toggleDropdown(dropdownMenuUstensils, 'Ustensiles')

/**
 * Search tag in dropdown menu
**/
function searchTag(e) {
  // Get the input element
  const input = e.target;
  
  // Convert the search filter to uppercase for case-insensitive search
  const filter = input.value.toUpperCase();
  
  // Get all the dropdown menu options
  const options = input.parentNode.querySelectorAll('.dropdown-menu__option');
  
  // Iterate over each option and filter based on the search filter
  for (let i = 0; i < options.length; i++) {
    const text = options[i].textContent || options[i].innerText;
    
    // Check if the option's text contains the search filter
    if (text.toUpperCase().indexOf(filter) > -1) {
      options[i].style.display = ''; // Show the option
    } else {
      options[i].style.display = 'none'; // Hide the option
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

// Display tags
for (let i = 0; i < dropdownMenu.length; i++) {
  dropdownMenu[i].addEventListener('click', (e) => {
    if (e.target.classList.contains('dropdown-menu__option')) {
      // Get the container for search results
      const searchResults = document.querySelector('.main-index__tags-container');

      // Create a new tag element
      const tag = document.createElement('div');
      tag.classList.add('tag');
      tag.innerHTML = `
        <p class="tag__text">${e.target.outerText}</p>
        <img class="tag__cross" src="assets/SVGS/cross.svg" alt="cross">
      `;

      // Add event listener to the cross icon of the tag to remove the tag when clicked
      tag.querySelector('.tag__cross').addEventListener('click', () => {
        tag.remove();
      });

      // Add a class to the tag based on the selected option
      if (e.target.classList.contains('ingredients')) {
        tag.classList.add('ingredients');
      } else if (e.target.classList.contains('devices')) {
        tag.classList.add('devices');
      } else if (e.target.classList.contains('utensils')) {
        tag.classList.add('utensils');
      }

      // Append the tag to the search results container
      searchResults.appendChild(tag);
    }
  });
}

// display recipes
sorting();
