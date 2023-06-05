// RecipeFinder class
class RecipeFinder {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = "https://api.spoonacular.com/recipes/complexSearch";
    }

    async findRecipesByIngredients(ingredients) {
        const url = `${this.baseUrl}?apiKey=${this.apiKey}&includeIngredients=${ingredients.join(',')}`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('API request failed');
            const data = await response.json();
            this.displayRecipes(data.results);
        } catch (error) {
            console.error(error);
        }
    }

    displayRecipes(recipes) {
        recipes.forEach(recipe => {
            console.log(`Title: ${recipe.title}`);
            console.log(`Image: ${recipe.image}`);
            console.log(`Used ingredients count: ${recipe.usedIngredientCount}`);
            console.log(`Missed ingredients count: ${recipe.missedIngredientCount}`);
            console.log('----');
        });
    }
}

// Instantiate the class with your API key
const recipeFinder = new RecipeFinder('07b172f893d44c94b46e5e7f1b18cac0');

// Call the method to find recipes by ingredients
recipeFinder.findRecipesByIngredients(['tomatoes', 'onions']);
