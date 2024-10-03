import { useState, useEffect } from "react";
import searchRecipes from "../services/recipeService";
import { useLocation } from "react-router-dom";

function RecipeList() {
    //Get search params from url 
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('s')

    //State Management
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        const getSearchResults = async () => {
            setLoading(true);

            try {
                //Calls the searchRecipes function with the searchQuery as the recipeName
                const response = await searchRecipes({recipeName: searchQuery})
                //Updates recipes array to be the search results
                setRecipes(response.meals)
            } 
            catch (error) {
                //Error handling
                console.error('Error fetching search results:', error);
                setErrors('Unable to load search results')
            }

            setLoading(false)
        }
        //Runs function and the useEffect hook runs when the component mounts for the first time or when searchQuery changes
        getSearchResults();
    }, [searchQuery])

    if(loading) return <p>Loading...</p>;
    if(errors) return <p>{errors}</p>;
    if(!recipes) return <div><p>Sorry, no recipes match '{searchQuery}'</p><p>But don't give up. Please check the spelling or try again with a different term. </p></div>
    
    
    return (
    <>
    <div>
        <p>Search Results for '{searchQuery}'</p>
        {/*Renders recipe title, image, category and cuisine */}
        {recipes.map(recipe => (
                <div key={recipe.idMeal}>
                    <img src={recipe.strMealThumb} alt="Meal picture"/>
                    <p>{recipe.strMeal}</p>
                    <p>{recipe.strCategory}</p>
                    <p>{recipe.strArea}</p>
                </div>
            
        ))}  
    </div>
   
    </>
  )
}

export default RecipeList
