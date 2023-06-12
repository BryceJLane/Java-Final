class RecipeFinder {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = "https://api.spoonacular.com/recipes";
    }

    async findRecipesByIngredients(ingredients) {
        const url = `${this.baseUrl}/complexSearch?apiKey=${this.apiKey}&includeIngredients=${ingredients.join(',')}`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('API request failed');
            const data = await response.json();
            if (data.results.length === 0) {
                this.displayError('No recipes found for the given ingredients.');
            } else {
                this.getRecipeDetails(data.results[0].id); // Get details of the first recipe
            }
        } catch (error) {
            this.displayError(error.message);
        }
    }

    async getRecipeDetails(id) {
        const url = `${this.baseUrl}/${id}/information?apiKey=${this.apiKey}`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('API request failed');
            const data = await response.json();
            this.displayRecipe(data);
        } catch (error) {
            this.displayError(error.message);
        }
    }

    displayRecipe(recipe) {
        if (!recipe) return;
        const results = document.getElementById('results');
        results.innerHTML = `
            <div class="card">
                <img class="card-img-top" src="${recipe.image}" alt="${recipe.title}">
                <div class="card-body">
                    <h5 class="card-title">${recipe.title}</h5>
                    <p class="card-text">${recipe.instructions}</p>
                    <a href="${recipe.sourceUrl}" class="btn btn-primary" target="_blank">Go to recipe</a>
                </div>
            </div>
        `;
    }

    displayError(message) {
        const results = document.getElementById('results');
        results.innerHTML = `<div class="alert alert-danger">${message}</div>`;
    }
}

// Instantiate the class with your API key
const recipeFinder = new RecipeFinder('07b172f893d44c94b46e5e7f1b18cac0');

// Set up event listener for the search button
document.getElementById('search').addEventListener('click', () => {
    const ingredients = document.getElementById('ingredients').value.split(',').map(ingredient => ingredient.trim());
    recipeFinder.findRecipesByIngredients(ingredients);
});
