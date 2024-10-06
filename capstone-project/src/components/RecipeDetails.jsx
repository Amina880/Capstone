import { getRecipeById } from "../services/recipeService";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FavouritesButton from "./FavouritesButton";
import { Link } from "react-router-dom";

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
    const SourceLink = recipe.strSource ? (<Link to={recipe.strSource}>Click here for the link to the full recipe</Link>) 
    : "Sorry, there is currently no source link for this recipe";


  return (
    <>
    <div className="mx-auto md:w-[1020px] sm:w-[600px] min-[460px]:w-96 min-[350px]:w-80  w-64">
        {/*Renders recipe title, embedded video, category, cuisine, list of ingredients with measures, list of instructions and the source link  */}
        <div className="flex justify-between items-center my-8 md:text-4xl text-2xl pb-4 font-semibold border-b-2 border-black">
            <p>{recipe.strMeal}</p>
            <FavouritesButton />
        </div>
        <div key={recipe.idMeal}>
            {youtubeEmbedLink ? (
            <iframe 
            className="w-full md:h-[690px] sm:h-80 h-52 "
            src={youtubeEmbedLink}
            title="Recipe Video" >
            </iframe>
            ):(
                <div className="w-full h-fit"> 
                    <p className="text-xl mx-auto text-center bg-slate-100">No video available for this recipe</p>
                    <img className="mx-auto rounded-lg pt-4" src={recipe.strMealThumb}/>
                </div>
            )}
            <div className="flex justify-end items-center pt-2 pb-8 ">
                <Link to={`/categories/${recipe.strCategory}`}>
                <p className="px-1 mx-2 font-light md:text-lg text-base bg-[#FFBF69] bg-opacity-60">{recipe.strCategory}</p>
                </Link>
                <p className="font-light md:text-lg text-base px-1 bg-[#CBF3F0]">{recipe.strArea}</p>
            </div>
            <p className="font-medium md:text-3xl text-2xl pb-6">Ingredients</p>
            <ul className="list-disc space-y-3 pb-12 mx-4">
                {ingredientsList.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <p className="font-medium md:text-3xl text-2xl pb-6">Instructions</p>
            {youtubeEmbedLink ? (
                <ol className="list-decimal space-y-3 pb-12 mx-4">
                    {instructionsList.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                    ))}
                </ol>
            ):(
                <ol className=" space-y-3 pb-12 mx-4">
                    {instructionsList.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                    ))}
                </ol>
            )}
            <p className="text-right mx-4 pb-8">
                Source Link: {SourceLink}</p>
            <p className="border-b-4 border-[#2EC4B6] border-opacity-65 mx-2 mb-8 "></p>
        </div>
    </div>
    </>
  )
}

export default RecipeDetails

