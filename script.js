const searchInput = document.getElementById('search-input');
function clickToSearch() {
  const itemsName = searchInput.value; //'chicken_breast'
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${itemsName}`)
    .then((res) => res.json())
    .then((data) => {
      const foodItems = document.getElementById('food-items');
      let dataItem = '';

      if (itemsName === '') {
        alert('The search box cannot be empty');
      } else if (data.meals) {
        data.meals.forEach((item) => {
          dataItem += `
          <div onclick="itemDetails('${item.strMeal}')" class="food-item"> 
            <img src="${item.strMealThumb}" />
            <h4>${item.strMeal}</h4>
          </div>`;
        });
        foodItems.innerHTML = dataItem;
      } else {
        alert('Sorry, We do not have this item at this time.');
      }
    });
  searchInput.value = '';
}

function itemDetails(itemName) {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${itemName}`)
    .then((res) => res.json())
    .then((data) => {
      const itemDetailsArea = document.getElementById('item-details');
      const mealsItem = data.meals[0];
      itemDetailsArea.innerHTML = `
        <div class="details-img">
          <img
            src="${mealsItem.strMealThumb}"
            alt="${mealsItem.strMeal}"
          />
        </div>
        <h2>${mealsItem.strMeal}</h2>
        <h4>Ingredient</h4>
        <ul>
          <li><span class="check-icon">&#x2714;</span>${mealsItem.strIngredient1}</li>
          <li><span class="check-icon">&#x2714;</span>${mealsItem.strIngredient2}</li>
          <li><span class="check-icon">&#x2714;</span>${mealsItem.strIngredient3}</li>
          <li><span class="check-icon">&#x2714;</span>${mealsItem.strIngredient4}</li>
          <li><span class="check-icon">&#x2714;</span>${mealsItem.strIngredient5}</li>
          <li><span class="check-icon">&#x2714;</span>${mealsItem.strIngredient6}</li>
        </ul>
        <button class="close">X</button>
      `;
      console.log(itemDetailsArea, mealsItem);
    });
}
