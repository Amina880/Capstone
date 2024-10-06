import { useEffect, useState } from "react";
import { getRecipeById } from "../services/recipeService";
import { Link } from "react-router-dom";

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
                //Error Handling
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
        <div className="md:mx-14 mx-10 grid md:grid-cols-3 grid-cols-2 gap-6 pb-12 ">
            {recipes.map((recipe)=> (
                <div className="hover:shadow-xl rounded-xl hover:scale-95 " key={recipe.idMeal}>
                    <Link to={`/recipe-details/${recipe.idMeal}`}>
                    <img className="rounded-t-xl pb-2" src={recipe.strMealThumb} alt="Meal photo" />
                    <div className="md:flex md:justify-between justify-center items-center pb-8 md:px-1 " >
                        <p className="font-semibold md:text-xl text-lg md:text-left text-center text-wrap md:w-52 w-full">{recipe.strMeal}</p>
                        <Link to={`/categories/${recipe.strCategory}`}>
                        <p className="font-light md:text-lg text-base text-center px-1 bg-[#FFBF69] bg-opacity-60">{recipe.strCategory}</p>
                        </Link>
                        <p className="font-light md:text-lg text-base text-center px-1 bg-[#CBF3F0]">{recipe.strArea}</p>
                    </div>
                    </Link>
                </div> 
            ))} 
        </div>  
        ):(
            <p className="mx-16 w-full text-3xl"> No favourite recipes yet</p>
        )}
        
        </>
    )
};

export default FavouritesResults
