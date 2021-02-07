const searchInput = document.getElementById('search-input');
const detailsArea = document.getElementById('details-area');
const itemDetailsArea = document.getElementById('item-details');

const clickToSearch = () => {
  const itemsName = searchInput.value;
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${itemsName}`)
    .then((res) => res.json())
    .then((data) => {
      const foodItems = document.getElementById('food-items');
      let dataItem = '';

      if (itemsName === '') {
        itemDetailsArea.innerHTML = `
          <h2>The search box cannot be empty.</h2>
          <button onclick="closeBtn()" class="close">X</button>
      `;
        detailsArea.style.top = '0';
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
        itemDetailsArea.innerHTML = `
          <h2>Sorry, We do not have this item at this time.</h2>
          <button onclick="closeBtn()" class="close">X</button>
      `;
        detailsArea.style.top = '0';
      }
    });
  searchInput.value = '';
};

const itemDetails = (itemName) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${itemName}`)
    .then((res) => res.json())
    .then((data) => {
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
          <li><span class="check-icon">&#x2714;</span>${mealsItem.strMeasure1} ${mealsItem.strIngredient1}</li>
          <li><span class="check-icon">&#x2714;</span>${mealsItem.strMeasure2} ${mealsItem.strIngredient2}</li>
          <li><span class="check-icon">&#x2714;</span>${mealsItem.strMeasure3} ${mealsItem.strIngredient3}</li>
          <li><span class="check-icon">&#x2714;</span>${mealsItem.strMeasure4} ${mealsItem.strIngredient4}</li>
          <li><span class="check-icon">&#x2714;</span>${mealsItem.strMeasure5} ${mealsItem.strIngredient5}</li>
          <li><span class="check-icon">&#x2714;</span>${mealsItem.strMeasure6} ${mealsItem.strIngredient6}</li>
        </ul>
        <button onclick="closeBtn()" class="close">X</button>
      `;
      detailsArea.style.top = '0';
    });
};

const closeBtn = () => {
  detailsArea.style.top = '-100%';
};
