export function createCard(recipe) {
  // Create a new card element
  const card = document.createElement('div');
  card.classList.add('card');
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
        </ul>
      </div>
    </div>
  `;

  // Insert the ingredients into the card
  const ingredientsList = card.querySelector('.card__recipe-details--ingredients-list');
  
  for (const ingredient of recipe.ingredients) {
    const ingredientElement = document.createElement('li');
    ingredientElement.classList.add('card__recipe-details--ingredient');
    ingredientElement.innerHTML = `
      <span class="card__recipe-details--ingredient-name">${ingredient.ingredient ? ingredient.ingredient : ''}:</span>
      <span class="card__recipe-details--ingredient-quantity">${ingredient.quantity ? ingredient.quantity : ''}</span>
      <span class="card__recipe-details--ingredient-unit">${ingredient.unit ? ingredient.unit : ''}</span>
    `;
    ingredientsList.appendChild(ingredientElement);
  }
  
  return card;
}