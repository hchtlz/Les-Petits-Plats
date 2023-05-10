import { getRecipes } from '../utils/model.js'
import { createCard } from '../utils/card.js'

/**
 * Algorithm for sorting recipes
**/
export function sorting() {

  // Variables and constants
  const recipes = getRecipes();
  const searchBar = document.querySelector('.main-index__input');
  const dropdownMenuIngredients = document.querySelector('.dropdown-menu--ingredients');
  const dropdownMenuOptionsIngredients = dropdownMenuIngredients.querySelector('.dropdown-menu__options--ingredients');
  const dropdownMenuAppliances = document.querySelector('.dropdown-menu--devices');
  const dropdownMenuOptionsAppliances = dropdownMenuAppliances.querySelector('.dropdown-menu__options--devices');
  const dropdownMenuUtensils = document.querySelector('.dropdown-menu--utensils');
  const dropdownMenuOptionsUtensils = dropdownMenuUtensils.querySelector('.dropdown-menu__options--utensils');
  const recipesContainer = document.querySelector('.main-index__results-container');
  const dropdownMenu = document.querySelectorAll('.dropdown-menu');
  let searchBarValue = searchBar.value;

  // Search bar
  searchBar.addEventListener('keyup', (e) => {
    searchBarValue = e.target.value;

    const filteredRecipes = [];

    // Filter recipes based on search bar value
    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];

      // Check if recipe name or description matches the search bar value
      if (recipe.name.toLowerCase().includes(searchBarValue.toLowerCase()) || recipe.description.toLowerCase().includes(searchBarValue.toLowerCase())) {
        filteredRecipes[filteredRecipes.length] = recipe;
      } else {
        let found = false;

        // Check if any ingredient matches the search bar value
        for (let j = 0; j < recipe.ingredients.length; j++) {
          const object = recipe.ingredients[j];
          if (object.ingredient && object.ingredient.toLowerCase().includes(searchBarValue.toLowerCase())) {
            found = true;
            break;
          }
        }

        if (found) {
          filteredRecipes[filteredRecipes.length] = recipe;
        }
      }
    }

    // Display filtered recipes
    if (searchBarValue.length > 2 || searchBarValue.length < 3) {
      let a = searchBarValue.length > 2 ? filteredRecipes : recipes;
      recipesContainer.innerHTML = '';
      for (let i = 0; i < a.length; i++) {
        const recipe = a[i];
        const card = createCard(recipe);
        recipesContainer.appendChild(card);
      }
    }

    // Display error message if no matching recipes found
    if (searchBarValue.length > 2 && filteredRecipes.length === 0) {
      recipesContainer.innerHTML = '';
      const errorDiv = document.createElement('div');
      errorDiv.classList.add('error');
      errorDiv.innerHTML = `
        <img class="main-index__error-image" src="assets/images/no-results.png" alt="error">
        <p class="main-index__error-text">Aucune recette ne correspond à votre recherche...</p>
        `;
      recipesContainer.appendChild(errorDiv);
    }
  });

  // Selected filters array for dropdowns
  var filters = [];

  // Dropdowns
  for (let menu of dropdownMenu) {
    menu.addEventListener('click', (e) => {
      if (e.target.classList.contains('dropdown-menu__option')) {
        // Add the selected filter to the filters array
        filters = [...filters, e.target.textContent];
        recipesContainer.innerHTML = '';
        const filteredRecipes = [];

        // Filter recipes based on selected filters
        for (let i = 0; i < recipes.length; i++) {
          let recipe = recipes[i];
          let isFiltered = true;

          for (let j = 0; j < filters.length; j++) {
            let filter = filters[j];
            let ingredientExists = false;
            let utensilExists = false;

            // Check if the filter matches any ingredient in the recipe
            for (let k = 0; k < recipe.ingredients.length; k++) {
              let ingredient = recipe.ingredients[k].ingredient.toLowerCase();
              if (ingredient === filter) {
                ingredientExists = true;
                break;
              }
            }

            // If the filter is not an ingredient, check if it matches the appliance or utensil
            if (!ingredientExists && !recipe.appliance.includes(filter)) {
              for (let k = 0; k < recipe.ustensils.length; k++) {
                let utensil = recipe.ustensils[k].toLowerCase();
                if (utensil === filter) {
                  utensilExists = true;
                  break;
                }
              }
            }

            // If the filter doesn't match any ingredient, appliance, or utensil, the recipe is filtered out
            if (!ingredientExists && !recipe.appliance.includes(filter) && !utensilExists) {
              isFiltered = false;
              break;
            }
          }

          // Add filtered recipes to the filteredRecipes array
          if (isFiltered) {
            filteredRecipes.push(recipe);
          }
        }

        // Display the filtered recipes
        for (let i = 0; i < filteredRecipes.length; i++) {
          let recipe = filteredRecipes[i];
          const card = createCard(recipe);
          recipesContainer.appendChild(card);
        }

        // Update the dropdown menus to display filtered options without duplicates
        const filteredIngredients = [];
        const filteredAppliances = [];
        const filteredUtensils = [];

        // Collect unique ingredients, appliances, and utensils from filtered recipes
        for (let i = 0; i < filteredRecipes.length; i++) {
          let recipe = filteredRecipes[i];

          for (let j = 0; j < recipe.ingredients.length; j++) {
            let ingredient = recipe.ingredients[j].ingredient;
            if (!filteredIngredients.includes(ingredient)) {
              filteredIngredients.push(ingredient);
            }
          }

          let appliance = recipe.appliance;
          if (!filteredAppliances.includes(appliance)) {
            filteredAppliances.push(appliance);
          }

          for (let j = 0; j < recipe.ustensils.length; j++) {
            let utensil = recipe.ustensils[j];
            if (!filteredUtensils.includes(utensil)) {
              filteredUtensils.push(utensil);
            }
          }
        }

        // Update the dropdown menu options for ingredients
        dropdownMenuOptionsIngredients.innerHTML = '';
        for (let ingredient of filteredIngredients) {
          dropdownMenuOptionsIngredients.innerHTML += `<li class="dropdown-menu__option ingredients">${ingredient}</li>`;
        }
        
        // Update the dropdown menu options for appliances
        dropdownMenuOptionsAppliances.innerHTML = '';
        for (let appliance of filteredAppliances) {
          dropdownMenuOptionsAppliances.innerHTML += `<li class="dropdown-menu__option devices">${appliance}</li>`;
        }
        
        // Update the dropdown menu options for utensils
        dropdownMenuOptionsUtensils.innerHTML = '';
        for (let utensil of filteredUtensils) {
          dropdownMenuOptionsUtensils.innerHTML += `<li class="dropdown-menu__option utensils">${utensil}</li>`;
        }
      }
    });
  }
  
  // When the cross is clicked, remove the filter
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('tag__cross')) {
      // Get the text of the filter tag
      var tagText = e.target.previousSibling.previousSibling.textContent;

      let index = -1;
      // Find the index of the filter in the filters array
      for (let i = 0; i < filters.length; i++) {
        if (filters[i] === tagText) {
          index = i;
          break;
        }
      }

      if (index > -1) {
        // Create a new filters array without the removed filter
        const newFilters = [];
        for (let i = 0; i < filters.length; i++) {
          if (i !== index) {
            newFilters[newFilters.length] = filters[i];
          }
        }
        filters = newFilters;
      }

      // Clear the recipes container
      recipesContainer.innerHTML = '';
      const filteredRecipes = [];

      // Filter recipes based on the remaining filters in the filters array
      for (let i = 0; i < recipes.length; i++) {
        let recipe = recipes[i];
        let isFiltered = true;

        for (let j = 0; j < filters.length; j++) {
          let filter = filters[j];
          let isFilterFound = false;

          // Check if the filter matches any ingredient in the recipe
          for (let k = 0; k < recipe.ingredients.length; k++) {
            let ingredient = recipe.ingredients[k].ingredient;
            if (ingredient === filter) {
              isFilterFound = true;
              break;
            }
          }

          // If the filter is not found in ingredients, appliance, or utensils, the recipe is filtered out
          if (!isFilterFound && !recipe.appliance.includes(filter) && !recipe.ustensils.includes(filter)) {
            isFiltered = false;
            break;
          }
        }

        // Add filtered recipes to the filteredRecipes array
        if (isFiltered) {
          let index = filteredRecipes.length;
          filteredRecipes[index] = recipe;
        }
      }

      // Display the filtered recipes
      for (let i = 0; i < filteredRecipes.length; i++) {
        let recipe = filteredRecipes[i];
        const card = createCard(recipe);
        recipesContainer.appendChild(card);
      }

      // Update the dropdown menu options for ingredients
      const filteredIngredients = [];
      for (let i = 0; i < filteredRecipes.length; i++) {
        const ingredients = filteredRecipes[i].ingredients;
        for (let j = 0; j < ingredients.length; j++) {
          filteredIngredients.push(ingredients[j].ingredient);
        }
      }

      // Remove duplicate ingredients
      const uniqueIngredients = [];
      for (let i = 0; i < filteredIngredients.length; i++) {
        if (!uniqueIngredients.includes(filteredIngredients[i])) {
          uniqueIngredients.push(filteredIngredients[i]);
        }
      }

      // Update the HTML content of the ingredients dropdown menu
      dropdownMenuOptionsIngredients.innerHTML = '';
      for (let i = 0; i < uniqueIngredients.length; i++) {
        dropdownMenuOptionsIngredients.innerHTML += `<li class="dropdown-menu__option ingredients">${uniqueIngredients[i]}</li>`;
      }

      // Update the dropdown menu options for appliances
      const filteredAppliances = [];
      for (let i = 0; i < filteredRecipes.length; i++) {
        const appliance = filteredRecipes[i].appliance;
        filteredAppliances.push(appliance);
      }
      
      // Remove duplicate appliances
      const uniqueAppliances = [];
      for (let i = 0; i < filteredAppliances.length; i++) {
        if (!uniqueAppliances.includes(filteredAppliances[i])) {
          uniqueAppliances.push(filteredAppliances[i]);
        }
      }

      // Update the HTML content of the appliances dropdown menu
      dropdownMenuOptionsAppliances.innerHTML = '';
      for (let i = 0; i < uniqueAppliances.length; i++) {
        dropdownMenuOptionsAppliances.innerHTML += `<li class="dropdown-menu__option devices">${uniqueAppliances[i]}</li>`;
      }

      // Update the dropdown menu options for utensils
      const filteredUtensils = [];
      for (let i = 0; i < filteredRecipes.length; i++) {
        const utensils = filteredRecipes[i].ustensils;
        for (let j = 0; j < utensils.length; j++) {
          filteredUtensils.push(utensils[j]);
        }
      }

      // Remove duplicate utensils
      const uniqueUtensils = [];
      for (let i = 0; i < filteredUtensils.length; i++) {
        if (!uniqueUtensils.includes(filteredUtensils[i])) {
          uniqueUtensils.push(filteredUtensils[i]);
        }
      }

      // Update the HTML content of the utensils dropdown menu
      dropdownMenuOptionsUtensils.innerHTML = '';
      for (let i = 0; i < uniqueUtensils.length; i++) {
        dropdownMenuOptionsUtensils.innerHTML += `<li class="dropdown-menu__option utensils">${uniqueUtensils[i]}</li>`;
      }
    }
  })
}

/**
 * Filter ingredients
**/
export function filterIngredients() {
  const recipes = getRecipes(); // Get the list of recipes
  const dropdownMenuIngredients = document.querySelector('.dropdown-menu--ingredients'); // Get the dropdown menu for ingredients
  const dropdownMenuOptions = dropdownMenuIngredients.querySelector('.dropdown-menu__options--ingredients'); // Get the options container within the dropdown menu
  const searchBar = document.querySelector('.main-index__input'); // Get the search bar
  let searchBarValue = searchBar.value; // Store the current value of the search bar

  // Default: display all ingredients without repetition
  const ingredients = [];
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    for (let j = 0; j < recipe.ingredients.length; j++) {
      const ingredient = recipe.ingredients[j].ingredient.toLowerCase();
      ingredients.push(ingredient);
    }
  }
  const uniqueIngredients = [...new Set(ingredients)];
  
  // Populate the dropdown menu with unique ingredients
  dropdownMenuOptions.innerHTML = '';
  for (let i = 0; i < uniqueIngredients.length; i++) {
    const ingredient = uniqueIngredients[i];
    const optionElement = document.createElement('li');
    optionElement.classList.add('dropdown-menu__option', 'ingredients');
    optionElement.textContent = ingredient;
    dropdownMenuOptions.appendChild(optionElement);
  }

  searchBar.addEventListener('keyup', (e) => {
    searchBarValue = e.target.value;
    
    // Constant that will contain the filtered recipes
    const filteredRecipes = [];
    const lowerCaseSearchBarValue = searchBarValue.toLowerCase();

    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      const lowerCaseName = recipe.name.toLowerCase();
      const lowerCaseDescription = recipe.description.toLowerCase();

      let hasMatch = false;

      // Check if the search bar value matches the recipe name or description
      if (lowerCaseName.includes(lowerCaseSearchBarValue) || lowerCaseDescription.includes(lowerCaseSearchBarValue)) {
        hasMatch = true;
      } else {
        const recipeIngredients = recipe.ingredients;
        let lowerCaseIngredients = '';

        // Concatenate all ingredient names for comparison
        for (let j = 0; j < recipeIngredients.length; j++) {
          const ingredientObject = recipeIngredients[j];
          lowerCaseIngredients += ingredientObject.ingredient.toLowerCase();
        }

        // Check if the search bar value matches any ingredient in the recipe
        if (lowerCaseIngredients.includes(lowerCaseSearchBarValue)) {
          hasMatch = true;
        }
      }

      // If there is a match, add the recipe to the filtered recipes list
      if (hasMatch) {
        filteredRecipes.push(recipe);
      }
    }

    if (searchBarValue.length > 2) {
      const filteredIngredients = [];
      
      // Get all unique ingredients from the filtered recipes
      for (let i = 0; i < filteredRecipes.length; i++) {
        const recipe = filteredRecipes[i];
        for (let j = 0; j < recipe.ingredients.length; j++) {
          const ingredient = recipe.ingredients[j].ingredient.toLowerCase();
          filteredIngredients.push(ingredient);
        }
      }
      const uniqueIngredients = [...new Set(filteredIngredients)];
      
      // Update the dropdown menu with the unique filtered ingredients
      dropdownMenuOptions.innerHTML = '';

      // Populate the dropdown menu with unique ingredients
      for (let i = 0; i < uniqueIngredients.length; i++) {
        const ingredient = uniqueIngredients[i];
        const optionElement = document.createElement('li');
        optionElement.classList.add('dropdown-menu__option', 'ingredients');
        optionElement.textContent = ingredient;
        dropdownMenuOptions.appendChild(optionElement);
      }
    }
    // If the search bar value is less than 3 characters, display all ingredients without repetition
    else if (searchBarValue.length < 3) {
      dropdownMenuOptions.innerHTML = '';
      for (let i = 0; i < uniqueIngredients.length; i++) {
        const ingredient = uniqueIngredients[i];
        const optionElement = document.createElement('li');
        optionElement.classList.add('dropdown-menu__option', 'ingredients');
        optionElement.textContent = ingredient;
        dropdownMenuOptions.appendChild(optionElement);
      }
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

  const appliances = []
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const appliance = recipe.appliance.toLowerCase();
    appliances.push(appliance);
  }
  const uniqueAppliances = [...new Set(appliances)]
  dropdownMenuOptions.innerHTML = '';
  for (let i = 0; i < uniqueAppliances.length; i++) {
    const appliance = uniqueAppliances[i];
    const optionElement = document.createElement('li');
    optionElement.classList.add('dropdown-menu__option', 'devices');
    optionElement.textContent = appliance;
    dropdownMenuOptions.appendChild(optionElement);
  }
  
  searchBar.addEventListener('keyup', (e) => {
    searchBarValue = e.target.value
    
    // Constante qui va contenir les recettes filtrées
    const filteredRecipes = [];
    const lowerCaseSearchBarValue = searchBarValue.toLowerCase();

    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      const lowerCaseName = recipe.name.toLowerCase();
      const lowerCaseDescription = recipe.description.toLowerCase();

      let hasMatch = false;

      if (lowerCaseName.includes(lowerCaseSearchBarValue) || lowerCaseDescription.includes(lowerCaseSearchBarValue)) {
        hasMatch = true;
      } else {
        const recipeIngredients = recipe.ingredients;
        let lowerCaseIngredients = '';

        for (let j = 0; j < recipeIngredients.length; j++) {
          const ingredientObject = recipeIngredients[j];
          lowerCaseIngredients += ingredientObject.ingredient.toLowerCase();
        }

        if (lowerCaseIngredients.includes(lowerCaseSearchBarValue)) {
          hasMatch = true;
        }
      }

      if (hasMatch) {
        filteredRecipes.push(recipe);
      }
    }

    if (searchBarValue.length > 2) {
      const filteredAppliances = []
      for (let i = 0; i < filteredRecipes.length; i++) {
        const recipe = filteredRecipes[i];
        const appliance = recipe.appliance.toLowerCase();
        filteredAppliances.push(appliance);
      }
      const uniqueAppliances = [...new Set(filteredAppliances)]
      dropdownMenuOptions.innerHTML = '';
      for (let i = 0; i < uniqueAppliances.length; i++) {
        const appliance = uniqueAppliances[i];
        const optionElement = document.createElement('li');
        optionElement.classList.add('dropdown-menu__option', 'devices');
        optionElement.textContent = appliance;
        dropdownMenuOptions.appendChild(optionElement);
      }
    }
    else if (searchBarValue.length < 3) {
      dropdownMenuOptions.innerHTML = '';
      for (let i = 0; i < uniqueAppliances.length; i++) {
        const appliance = uniqueAppliances[i];
        const optionElement = document.createElement('li');
        optionElement.classList.add('dropdown-menu__option', 'devices');
        optionElement.textContent = appliance;
        dropdownMenuOptions.appendChild(optionElement);
      }
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
  const allUstensils = [];
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const ustensils = recipe.ustensils;
    for (let j = 0; j < ustensils.length; j++) {
      const ustensil = ustensils[j];
      allUstensils.push(ustensil.toLowerCase());
    }
  }
  const uniqueUstensils = [...new Set(allUstensils.flat())]
  dropdownMenuOptions.innerHTML = '';
  for (let i = 0; i < uniqueUstensils.length; i++) {
    const ustensil = uniqueUstensils[i];
    const optionElement = document.createElement('li');
    optionElement.classList.add('dropdown-menu__option', 'utensils');
    optionElement.textContent = ustensil;
    dropdownMenuOptions.appendChild(optionElement);
  }

  searchBar.addEventListener('keyup', (e) => {
    searchBarValue = e.target.value
    
    // Constante qui va contenir les recettes filtrées
    const filteredRecipes = [];
    const lowerCaseSearchBarValue = searchBarValue.toLowerCase();

    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      const lowerCaseName = recipe.name.toLowerCase();
      const lowerCaseDescription = recipe.description.toLowerCase();

      let hasMatch = false;

      if (lowerCaseName.includes(lowerCaseSearchBarValue) || lowerCaseDescription.includes(lowerCaseSearchBarValue)) {
        hasMatch = true;
      } else {
        const recipeIngredients = recipe.ingredients;
        let lowerCaseIngredients = '';

        for (let j = 0; j < recipeIngredients.length; j++) {
          const ingredientObject = recipeIngredients[j];
          lowerCaseIngredients += ingredientObject.ingredient.toLowerCase();
        }

        if (lowerCaseIngredients.includes(lowerCaseSearchBarValue)) {
          hasMatch = true;
        }
      }

      if (hasMatch) {
        filteredRecipes.push(recipe);
      }
    }

    if (searchBarValue.length > 2) {
      const filteredUstensils = [];
      for (let i = 0; i < filteredRecipes.length; i++) {
        const recipe = filteredRecipes[i];
        const ustensils = recipe.ustensils;
        filteredUstensils.push(ustensils);
      }

      const uniqueUstensils = [...new Set(filteredUstensils.flat())]
      dropdownMenuOptions.innerHTML = '';
      for (let i = 0; i < uniqueUstensils.length; i++) {
        const ustensil = uniqueUstensils[i];
        const optionElement = document.createElement('li');
        optionElement.classList.add('dropdown-menu__option', 'utensils');
        optionElement.textContent = ustensil;
        dropdownMenuOptions.appendChild(optionElement);
      }
    }
    else if (searchBarValue.length < 3) {
      dropdownMenuOptions.innerHTML = '';
      for (let i = 0; i < uniqueUstensils.length; i++) {
        const ustensil = uniqueUstensils[i];
        const optionElement = document.createElement('li');
        optionElement.classList.add('dropdown-menu__option', 'utensils');
        optionElement.textContent = ustensil;
        dropdownMenuOptions.appendChild(optionElement);
      }
    }
  })
}