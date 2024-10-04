import { useEffect, useState } from "react";
import { getRecipeById } from "../services/recipeService";

function FavouritesResults() {
    //State Management
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    //Gets the stored recipe Ids 
    const storedRecipeIds = JSON.parse(localStorage.getItem('favRecipes')) || [] ;

    useEffect(() => {
        const getFavRecipes = async() => {
            setLoading(true);

            try {
                //Fetches all stored recipes by their stored id
                const fetchedRecipes = await Promise.all(
                    storedRecipeIds.map(async(id) => {
                         const response = await getRecipeById(id);
                         return response.meals ? response.meals[0] : null;
                    })
                )
                //Updates recipes by setting it as fetchedRecipes, without any recipes that may have failed to fetch
                setRecipes(fetchedRecipes.filter(recipe => recipe != null));

            } 
            catch (error) {
                //Error Hnadling
                console.error('Error fetching favourite recipes', error)
                setErrors('Unable to fetch favourite recipes')
            }

            setLoading(false);
        };
        //Runs function if the storedRecipeIds array has recipeIds in it
        if(storedRecipeIds.length > 0){
            getFavRecipes();
        }
        else{
            setErrors('Sorry, no favourite recipes found')
        }
        //UseEffecthook runs only once when the component mounts
    },[]);
    
    if(loading) return <p>Loading...</p>
    if(errors) return <p>{errors}</p>
        
    return (
        <>
        {/*Renders each favourite recipe's title, image, category and cuisine only when the recipes array contains fetched recipes */}
        {recipes.length > 0 ? (
        recipes.map((recipe)=> (
        <div key={recipe.idMeal}>
            <p>{recipe.strMeal}</p>
            <img src={recipe.strMealThumb} alt="Meal photo" />
            <p>{recipe.strCategory}</p>
            <p>{recipe.strArea}</p>
        </div>  
        ))     
        ):(
            <p> No favourite recipes yet</p>
        )}
        </>
    )
};

export default FavouritesResults

