import { getRecipeById } from "../services/recipeService";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FavouritesButton from "./FavouritesButton";

function RecipeDetails() {
    //Get recipeId from url
    const {recipeId} = useParams();

    //State Management
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        const fetchRecipe = async() => {
            setLoading(true)

            try {
                //Calls the getRecipeId function
                const response = await getRecipeById(recipeId)
                //Updates recipe by setting it as the first object in the meals array
                setRecipe(response.meals[0])
            } 
            catch (error) {
                //Error handling
                console.error('Error fetching recipe:', error)
                setErrors('Unable to fetch that recipe')
            }
            setLoading(false);
        }
        //Runs function and the useEffect hook runs when the component mounts for the first time or when recipeId changes.
        fetchRecipe();
    }, [recipeId])

    //Function to get ingredients with their measure
    const getIngredientsAndMeasures = (r) => {
        let ingredientsWithMeasures = [];
        //Loop that combines the specific measure with its ingredient only when the ingredient is not blank 
        for(let i=1; i<=20; i++ ){
            const ingredient = r[`strIngredient${i}`];
            const measure = r[`strMeasure${i}`];
        
            if(ingredient && ingredient.trim() !== ''){
                ingredientsWithMeasures.push(`${measure ? measure : ""} ${ingredient}`)
            }
        }
        return ingredientsWithMeasures;
    }


    if(loading) return <p>Loading...</p>;
    if(errors) return <p>{errors}</p>;
    if(!recipe) return <p>Sorry, this recipe's details are unavailable</p>

    //Creates Youtube embed link
    const youtubeEmbedLink = recipe.strYoutube ? recipe.strYoutube.replace("watch?v=", "embed/") : null;
    const ingredientsList = getIngredientsAndMeasures(recipe);
    //Changes the single string of instructions to an array of split up instructions with no spaces between
    const instructionsList = recipe.strInstructions ? recipe.strInstructions.split('\r\n').filter(step => step.trim() !== "") : [];
    //Handles cases where there is no source link for the recipe
    const SourceLink = recipe.strSource ? recipe.strSource : <p>Sorry, there is currently no source link for this recipe</p>;


  return (
    <>
    <div>
        {/*Renders recipe title, embedded video, category, cuisine, list of ingredients with measures, list of instructions and the source link  */}
        <p>{recipe.strMeal}</p>
        <FavouritesButton />
        <div key={recipe.idMeal}>
            {youtubeEmbedLink && (
            <iframe 
            src={youtubeEmbedLink} >
            </iframe>
            )}
            <p>{recipe.strCategory}</p>
            <p>{recipe.strArea}</p>
            <p>Ingredients</p>
            <ul>
                {ingredientsList.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <p>Instructions</p>
            <ol>
                {instructionsList.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                ))}
            </ol>
            <p>Source Link:{SourceLink}</p>
        </div>
    </div>
    </>
  )
}

export default RecipeDetails

