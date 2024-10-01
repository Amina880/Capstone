import axios from "axios";

const url = 'https://www.themealdb.com/api/json/v1/1/'

//Search Recipe By Name
const searchRecipes = async(recipeName) => {

    try {
        const response = await axios.get(`${url}search.php?s=${recipeName}`);
        return response.data;
    } 
    catch (error) {
        console.error('Error fetching recipes:', error);
        throw error;
    }
}

export default searchRecipes

//Get Recipe details by Id
export const getRecipeById = async(recipeId) => {

    try {
        const response = await axios.get(`${url}lookup.php?i=${recipeId}`);
        return response.data;
    } 
    catch (error) {
        console.error('Error fetching recipe details:', error);
        throw error;
    }
}

//Fetch all Recipe Categories 
export const fetchRecipeCategories = async() => {

    try {
        const response = await axios.get(`${url}categories.php`);
        return response.data;
    } 
    catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
}

//Filter Recipes by Category
export const filterbyCategories = async(categoryName) => {

    try {
        const response = await axios.get(`${url}filter.php?c=${categoryName}`);
        return response.data;
    } 
    catch (error) {
        console.error('Error filtering by category:', error);
        throw error;
    }
}

//Fetch a Random Recipe
export const fetchRandomRecipe = async() => {

    try {
        const response = await axios.get(`${url}random.php`);
        return response.data;
    } 
    catch (error) {
        console.error('Error fetching recipe:', error);
        throw error;
    }
}

