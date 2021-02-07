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
    .then((data) => console.log(data));
}
