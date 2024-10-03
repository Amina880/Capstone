import { filterbyCategories } from "../services/recipeService";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
      <p>{categoryName}</p>
      {/*Renders the recipe image and title */}
      {recipes.map(recipe => (
        <div key={recipe.idMeal} >
          <img src={recipe.strMealThumb} alt="Recipe Image"/>
          <p>{recipe.strMeal}</p>
        </div>
      ))}
    </div>
      
    </>
  )
}

export default FilterUsingCategories

