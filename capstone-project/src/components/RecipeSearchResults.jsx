import { useState, useEffect } from "react";
import searchRecipes from "../services/recipeService";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

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
    if(!recipes) return <div className="md:mx-16 mx-10 md:w-full w-56 pb-12 "><p className="text-2xl " >Sorry, no recipes match '{searchQuery}'</p><p>But don't give up. Please check the spelling or try again with a different term. </p></div>
    
    
    return (
    <>
    <div>
        <p className="md:mx-14 mx-8 my-8 md:text-3xl text-2xl pb-4 font-extralight border-b-2 border-black">Search Results for '{searchQuery}'</p>
        {/*Renders recipe title, image, category and cuisine */}
        <div className="md:mx-14 mx-8 grid md:grid-cols-3 grid-cols-2 gap-6 pb-12 ">
            {recipes.map(recipe => (
                <div className="hover:shadow-xl rounded-xl hover:scale-95" key={recipe.idMeal}>
                    <Link to={`/recipe-details/${recipe.idMeal}`}>
                    <img className="rounded-t-xl pb-2" src={recipe.strMealThumb} alt="Meal picture"/>
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
    </div>
   
    </>
  )
}

export default RecipeList
