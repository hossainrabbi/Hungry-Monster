const searchInput = document.getElementById('search-input');
function clickToSearch() {
  const itemsName = searchInput.value; //'chicken_breast'
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${itemsName}`)
    .then((res) => res.json())
    .then((data) => {
      const foodItems = document.getElementById('food-items');
      //   const itemsData = data.meals;
      let dataItem = '';

      data.meals.forEach((item) => {
        dataItem += `<div> ${item.strMeal} </div>`;
      });

      foodItems.innerHTML = dataItem;
    });
  searchInput.value = '';
}
