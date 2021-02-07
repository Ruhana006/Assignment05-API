const getMeal = mealName => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            displayMeals(data.meals);
        })
        .catch(error=>console.log(error));
        
    const displayMeals = meals => {
        const mealsDiv = document.getElementById('food-list');
        meals.forEach(meal => {
            const mealDiv = document.createElement('div');
            mealDiv.className = 'food';
            const mealInfo = `
            <div onclick = "displayMealDetails('${meal.idMeal}')">
            <h4 class="food-name ">${meal.strMeal}</h4>
            <img class="img-fluid rounded-bottom" src="${meal.strMealThumb}">
            </div>
            `;
            mealDiv.innerHTML = mealInfo;
            mealsDiv.appendChild(mealDiv);
        });
    }
}
const displayMealDetails = name => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${name}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            renderMealInfo(data.meals[0]);
            console.log(data.meals[0]);
        })
}
const renderMealInfo = meal => {
    const mealDetails = document.getElementById('mealDetails');
    mealDetails.innerHTML = `
    <div>
    <img class="img-fluid src="${meal.strMeal.Thumb}">
    <h4 id="item-name">${meal.strMeal}</h4>
    <ul  list-style-type:circle>
        <li>${meal.strMeasure1},${meal.strIngredient1}</li>
        <li>${meal.strMeasure2},${meal.strIngredient2}</li>
        <li>${meal.strMeasur31},${meal.strIngredient3}</li>
        <li>${meal.strMeasure4},${meal.strIngredient4}</li>
        <li>${meal.strMeasure5},${meal.strIngredient5}</li>
        <li>${meal.strMeasure6},${meal.strIngredient6}</li>
        <li>${meal.strMeasure7},${meal.strIngredient7}</li>
    </ul>
    </div>
    `;

}
const container = document.getElementById("food-list");
container.value = '';
const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', () => {
    const mealName = document.getElementById('mealName').value;
    container.innerHTML='';
    getMeal(mealName)
})