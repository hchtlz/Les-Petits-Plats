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
    
    const filteredRecipes = [];

    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];

      if (recipe.name.toLowerCase().includes(searchBarValue.toLowerCase()) || recipe.description.toLowerCase().includes(searchBarValue.toLowerCase())) {
        filteredRecipes.push(recipe);
      } else {
        let found = false;
        for (let j = 0; j < recipe.ingredients.length; j++) {
          const object = recipe.ingredients[j];
          if (object.ingredient && object.ingredient.toLowerCase().includes(searchBarValue.toLowerCase())) {
            found = true;
            break;
          }
        }
        if (found) {
          filteredRecipes.push(recipe);
        }
      }
    }

    if (searchBarValue.length > 2 || searchBarValue.length < 3) {
      let a = searchBarValue.length > 2 ? filteredRecipes : recipes;
      recipesContainer.innerHTML = '';
      for (let i = 0; i < a.length; i++) {
        const recipe = a[i];
        const card = createCard(recipe);
        recipesContainer.appendChild(card);
      }
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
  var filters = [];

  // Dropdowns
  for (let menu of dropdownMenu) {
    menu.addEventListener('click', (e) => {
      if (e.target.classList.contains('dropdown-menu__option')) {
        filters = [...filters, e.target.textContent];
        recipesContainer.innerHTML = '';
        const filteredRecipes = [];
  
        for (let i = 0; i < recipes.length; i++) {
          let recipe = recipes[i];
          let isFiltered = true;
  
          for (let j = 0; j < filters.length; j++) {
            let filter = filters[j];
            let ingredientExists = false;
            let utensilExists = false;
  
            for (let k = 0; k < recipe.ingredients.length; k++) {
              let ingredient = recipe.ingredients[k].ingredient;
              if (ingredient === filter) {
                ingredientExists = true;
                break;
              }
            }
  
            if (!ingredientExists && !recipe.appliance.includes(filter)) {
              for (let k = 0; k < recipe.ustensils.length; k++) {
                let utensil = recipe.ustensils[k];
                if (utensil === filter) {
                  utensilExists = true;
                  break;
                }
              }
            }
  
            if (!ingredientExists && !recipe.appliance.includes(filter) && !utensilExists) {
              isFiltered = false;
              break;
            }
          }
  
          if (isFiltered) {
            filteredRecipes.push(recipe);
          }
        }
  
        // afficher les recettes filtrées
        for (let i = 0; i < filteredRecipes.length; i++) {
          let recipe = filteredRecipes[i];
          const card = createCard(recipe);
          recipesContainer.appendChild(card);
        }
  
        // afficher mais pas de doublons dans les dropdowns
        const filteredIngredients = [];
        const filteredAppliances = [];
        const filteredUtensils = [];
  
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
  
        dropdownMenuOptionsIngredients.innerHTML = '';
        for (let ingredient of filteredIngredients) {
          dropdownMenuOptionsIngredients.innerHTML += `<li class="dropdown-menu__option ingredients">${ingredient}</li>`;
        }
  
        dropdownMenuOptionsAppliances.innerHTML = '';
        for (let appliance of filteredAppliances) {
          dropdownMenuOptionsAppliances.innerHTML += `<li class="dropdown-menu__option devices">${appliance}</li>`;
        }
  
        dropdownMenuOptionsUtensils.innerHTML = '';
        for (let utensil of filteredUtensils) {
          dropdownMenuOptionsUtensils.innerHTML += `<li class="dropdown-menu__option utensils">${utensil}</li>`;
        }
      }
    });
  }
  
  // Quand on clique sur la croix, on supprime le filtre
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('tag__cross')) {
      var tagText = e.target.previousSibling.previousSibling.textContent

      let index = -1
      for (let i = 0; i < filters.length; i++) {
        if (filters[i] === tagText) {
          index = i
          break
        }
      }
      if (index > -1) {
        const newFilters = [];
        for (let i = 0; i < filters.length; i++) {
          if (i !== index) {
            newFilters[newFilters.length] = filters[i];
          }
        }
        filters = newFilters;
      }
      
      // actualise les recettes affichées en fonction des filtres restants dans le tableau filters 
      recipesContainer.innerHTML = ''
      const filteredRecipes = []

      for (let i = 0; i < recipes.length; i++) {
        let recipe = recipes[i]
        let isFiltered = true

        for (let j = 0; j < filters.length; j++) {
          let filter = filters[j]
          let isFilterFound = false

          for (let k = 0; k < recipe.ingredients.length; k++) {
            let ingredient = recipe.ingredients[k].ingredient
            if (ingredient === filter) {
              isFilterFound = true
              break
            }
          }

          if (!isFilterFound && !recipe.appliance.includes(filter) && !recipe.ustensils.includes(filter)) {
            isFiltered = false
            break
          }
        }

        if (isFiltered) {
          let index = filteredRecipes.length
          filteredRecipes[index] = recipe
        }
      }

      for (let i = 0; i < filteredRecipes.length; i++) {
        let recipe = filteredRecipes[i]
        const card = createCard(recipe)
        recipesContainer.appendChild(card)
      }
  
      // afficher les filtres des recettes filtrées
      const filteredIngredients = [];
      for (let i = 0; i < filteredRecipes.length; i++) {
        const ingredients = filteredRecipes[i].ingredients;
        for (let j = 0; j < ingredients.length; j++) {
          filteredIngredients.push(ingredients[j].ingredient);
        }
      }
      const uniqueIngredients = [];
      for (let i = 0; i < filteredIngredients.length; i++) {
        let isUnique = true;
        for (let j = 0; j < uniqueIngredients.length; j++) {
          if (filteredIngredients[i] === uniqueIngredients[j]) {
            isUnique = false;
            break;
          }
        }
        if (isUnique) {
          uniqueIngredients.push(filteredIngredients[i]);
        }
      }
      dropdownMenuOptionsIngredients.innerHTML = '';
      for (let i = 0; i < uniqueIngredients.length; i++) {
        dropdownMenuOptionsIngredients.innerHTML += `<li class="dropdown-menu__option ingredients">${uniqueIngredients[i]}</li>`;
      }

      const filteredAppliances = [];
      for (let i = 0; i < filteredRecipes.length; i++) {
        const appliance = filteredRecipes[i].appliance;
        if (!filteredAppliances.includes(appliance)) {
          filteredAppliances.push(appliance);
        }
      }
      const uniqueAppliances = [];
      for (let i = 0; i < filteredAppliances.length; i++) {
        let isUnique = true;
        for (let j = 0; j < uniqueAppliances.length; j++) {
          if (filteredAppliances[i] === uniqueAppliances[j]) {
            isUnique = false;
            break;
          }
        }
        if (isUnique) {
          uniqueAppliances.push(filteredAppliances[i]);
        }
      }
    }
  })
}

/**
 * Filter ingredients
**/
export function filterIngredients() {
  const recipes = getRecipes();
  const dropdownMenuIngredients = document.querySelector('.dropdown-menu--ingredients');
  const dropdownMenuOptions = dropdownMenuIngredients.querySelector('.dropdown-menu__options--ingredients');
  const searchBar = document.querySelector('.main-index__input');
  let searchBarValue = searchBar.value;

  // par default, afficher tous les ingredients et si plusiers fois le meme ingredient, ne pas le repeter
  const ingredients = [];
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    for (let j = 0; j < recipe.ingredients.length; j++) {
      ingredients.push(recipe.ingredients[j].ingredient);
    }
  }
  const uniqueIngredients = [];
  for (let i = 0; i < ingredients.length; i++) {
    const ingredient = ingredients[i];
    let isUnique = true;
    for (let j = 0; j < uniqueIngredients.length; j++) {
      if (ingredient === uniqueIngredients[j]) {
        isUnique = false;
        break;
      }
    }
    if (isUnique) {
      uniqueIngredients.push(ingredient);
    }
  }
  dropdownMenuOptions.innerHTML = '';
  for (let i = 0; i < uniqueIngredients.length; i++) {
    dropdownMenuOptions.innerHTML += `<li class="dropdown-menu__option ingredients">${uniqueIngredients[i]}</li>`;
  }

  searchBar.addEventListener('keyup', (e) => {
    searchBarValue = e.target.value;
    const filteredRecipes = [];
    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      const ingredients = recipe.ingredients.map(object => object.ingredient).join('').toLowerCase();
      if (recipe.name.toLowerCase().includes(searchBarValue.toLowerCase()) || recipe.description.toLowerCase().includes(searchBarValue.toLowerCase()) || ingredients.includes(searchBarValue.toLowerCase())) {
        filteredRecipes.push(recipe);
      }
    }

    if (searchBarValue.length > 2) {
      const filteredIngredients = [];
      for (let i = 0; i < filteredRecipes.length; i++) {
        const recipe = filteredRecipes[i];
        for (let j = 0; j < recipe.ingredients.length; j++) {
          filteredIngredients.push(recipe.ingredients[j].ingredient);
        }
      }
      const uniqueIngredients = [];
      for (let i = 0; i < filteredIngredients.length; i++) {
        const ingredient = filteredIngredients[i];
        if (!uniqueIngredients.includes(ingredient)) {
          uniqueIngredients.push(ingredient);
        }
      }
      dropdownMenuOptions.innerHTML = '';
      for (let i = 0; i < uniqueIngredients.length; i++) {
        dropdownMenuOptions.innerHTML += `<li class="dropdown-menu__option ingredients">${uniqueIngredients[i]}</li>`;
      }
    } else if (searchBarValue.length < 3) {
      const ingredients = [];
      for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        for (let j = 0; j < recipe.ingredients.length; j++) {
          ingredients.push(`<li class="dropdown-menu__option ingredients">${recipe.ingredients[j].ingredient}</li>`);
        }
      }
      dropdownMenuOptions.innerHTML = ingredients.join('');
    }
  });
}

/**
 * Filter appliances
 **/
export function filterAppliances() {
  const recipes = getRecipes();
  const dropdownMenuAppliances = document.querySelector('.dropdown-menu--devices');
  const dropdownMenuOptions = dropdownMenuAppliances.querySelector('.dropdown-menu__options--devices');
  const searchBar = document.querySelector('.main-index__input');
  let searchBarValue = searchBar.value;

  const appliances = [];
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const appliance = recipe.appliance.toLowerCase();
    if (!appliances.includes(appliance)) {
      appliances.push(appliance);
    }
  }
  dropdownMenuOptions.innerHTML = '';
  for (let i = 0; i < appliances.length; i++) {
    const appliance = appliances[i];
    dropdownMenuOptions.innerHTML += `<li class="dropdown-menu__option devices">${appliance}</li>`;
  }

  searchBar.addEventListener('keyup', (e) => {
    searchBarValue = e.target.value;
    const filteredRecipes = recipes.filter((recipe) => {
      return recipe.name.toLowerCase().includes(searchBarValue.toLowerCase()) || recipe.description.toLowerCase().includes(searchBarValue.toLowerCase()) || recipe.ingredients.map(object => object.ingredient).join('').toLowerCase().includes(searchBarValue.toLowerCase())
    });

    if (searchBarValue.length > 2) {
      const filteredAppliances = [];
      for (let i = 0; i < filteredRecipes.length; i++) {
        const recipe = filteredRecipes[i];
        const appliance = recipe.appliance;
        if (!filteredAppliances.includes(appliance)) {
          filteredAppliances.push(appliance);
        }
      }
      dropdownMenuOptions.innerHTML = '';
      for (let i = 0; i < filteredAppliances.length; i++) {
        const appliance = filteredAppliances[i];
        dropdownMenuOptions.innerHTML += `<li class="dropdown-menu__option devices">${appliance}</li>`;
      }
    } else if (searchBarValue.length < 3) {
      dropdownMenuOptions.innerHTML = '';
      for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        const appliance = recipe.appliance;
        dropdownMenuOptions.innerHTML += `<li class="dropdown-menu__option devices">${appliance}</li>`;
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

  const ustensils = []
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i]
    for (let j = 0; j < recipe.ustensils.length; j++) {
      ustensils.push(recipe.ustensils[j])
    }
  }
  dropdownMenuOptions.innerHTML = ''
  for (let i = 0; i < ustensils.length; i++) {
    const ustensil = ustensils[i]
    dropdownMenuOptions.innerHTML += `<li class="dropdown-menu__option utensils">${ustensil}</li>`
  }

  searchBar.addEventListener('keyup', (e) => {
    searchBarValue = e.target.value
    const filteredRecipes = []
    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i]
      if (recipe.name.toLowerCase().includes(searchBarValue.toLowerCase()) || recipe.description.toLowerCase().includes(searchBarValue.toLowerCase())) {
        filteredRecipes.push(recipe)
      } else {
        let found = false
        for (let j = 0; j < recipe.ingredients.length; j++) {
          const ingredient = recipe.ingredients[j].ingredient.toLowerCase()
          if (ingredient.includes(searchBarValue.toLowerCase())) {
            found = true
            break
          }
        }
        if (found) {
          filteredRecipes.push(recipe)
        }
      }
    }

    if (searchBarValue.length > 2) {
      const filteredUstensils = []
      for (let i = 0; i < filteredRecipes.length; i++) {
        const recipe = filteredRecipes[i]
        for (let j = 0; j < recipe.ustensils.length; j++) {
          const ustensil = recipe.ustensils[j]
          let alreadyExists = false
          for (let k = 0; k < filteredUstensils.length; k++) {
            if (filteredUstensils[k] === ustensil) {
              alreadyExists = true
              break
            }
          }
          if (!alreadyExists) {
            filteredUstensils.push(ustensil)
          }
        }
      }
      dropdownMenuOptions.innerHTML = ''
      for (let i = 0; i < filteredUstensils.length; i++) {
        const ustensil = filteredUstensils[i]
        dropdownMenuOptions.innerHTML += `<li class="dropdown-menu__option utensils">${ustensil}</li>`
      }
    } else if (searchBarValue.length < 3) {
      dropdownMenuOptions.innerHTML = ''
      for (let i = 0; i < ustensils.length; i++) {
        const ustensil = ustensils[i]
        dropdownMenuOptions.innerHTML += `<li class="dropdown-menu__option utensils">${ustensil}</li>`
      }
    }
  })
}