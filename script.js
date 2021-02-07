function searchResult() {
    const searchTerm = document.getElementById("searchTerm").value;

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
    .then(res => res.json())
    .then(data => showSearchResult(data.meals));
}

function showSearchResult(searchResult) {
    let dataToShow = '';

    if(searchResult === null) {
        dataToShow = `
            <div class="col off-5">
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Sorry!</strong> No meal found for your search term!
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </div>
        `;

        document.getElementById("mealDetails").innerHTML = "";
        document.getElementById("searchResult").innerHTML = dataToShow;
        dataToShow = '';
    }
    else {
        searchResult.forEach(meal => {
            dataToShow += `
                <div class="col-3">
                    <div class="card h-100" style="width: 18rem;" onClick="meal-details(${meal.idMeal})">
                        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                        <div class="card-body mealName">
                            <h3>${meal.strMeal}</h3>
                        </div>
                    </div>
                </div>
            `
        })
        
        document.getElementById("meal-details").innerHTML = "";
        document.getElementById("searchResult").innerHTML = dataToShow;
        dataToShow = '';
    }
}

function mealDetails(id) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res => res.json())
    .then(data => showMealDetails(data.meals[0]));
}

function showMealDetails(meal) {
    
    let mealDetails = '';
    let ingredientList = '';
    const availableIngredients = [];

    for(var i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        
        if(ingredient) {
            availableIngredients.push(ingredient);
        }
    }

    for(var i = 0; i < availableIngredients.length; i++) {
        ingredientList += `
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="flexCheckDefault" checked>
                <label class="form-check-label" for="flexCheckDefault">${availableIngredients[i]}</label>
            </div>
        `
    }

    mealDetails = `
        <div class="row">
            <div class="col-4 offset-3">
                <div class="card">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h2>${meal.strMeal}</h2>
                        <h4>Ingredients</h4>
                        ` + ingredientList + `
                    </div>
                </div>
            </div>
        </div>
    `

    document.getElementById("meal-details").innerHTML = mealDetails;
    mealDetails = '';
    ingredientList = '';
}