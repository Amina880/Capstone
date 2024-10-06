import { filterbyCategories } from "../services/recipeService";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function FilterUsingCategories() {
  //Get categoryName from url
  const {categoryName} = useParams();

  //State Management
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const filterRecipes = async () => {
      setLoading(true);

      try {
        //Calls the filterbyCategories function
        const response = await filterbyCategories(categoryName);
        //Updates recipes array by setting it as the filtered list of recipes 
        setRecipes(response.meals);
      } 
      catch (error) {
        //Error handling
        console.error('Error filtering recipes', error);
        setErrors('Unable to filter recipies by category');
      }
      setLoading(false);
    }
    //Runs function and the useEffect hook runs when the component mounts for the first time or when categoryName changes.
    filterRecipes();
  },[categoryName]);

  if(loading) return <p>Loading...</p>
  if(errors) return <p>{errors}</p>
  if(!recipes) return <p>Sorry,there are no recipes in this category</p>

  return (
    <>
    <div>
      <p className="md:mx-16 mx-10 my-8 text-3xl pb-4 font-extralight border-b-2 border-black">{categoryName}</p>
      {/*Renders the recipe image and title of each recipe in the category */}
      <div className="md:mx-16 mx-10 grid md:grid-cols-3 grid-cols-2 gap-6 pb-12 ">
        {recipes.map(recipe => (
          <div className="hover:shadow-xl rounded-xl hover:scale-95 bg-gray-100" key={recipe.idMeal} >
            <Link to={`/recipe-details/${recipe.idMeal}`}>
            <img className="rounded-t-xl pb-4" src={recipe.strMealThumb} alt="Recipe Image"/>
            <p className="font-semibold md:text-xl text-base text-center md:pb-8 pb-2 px-1 ">{recipe.strMeal}</p>
            </Link>
          </div>
      ))}
      </div>
    </div>
      
    </>
  )
}

export default FilterUsingCategories

