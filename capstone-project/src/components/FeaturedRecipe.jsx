import { fetchRandomRecipe } from "../services/recipeService"
import { useState, useEffect } from "react"

function Featured() {
  //State Management
  const [featuredRecipe, setFeaturedRecipe]= useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors]= useState(null);
  
  
  useEffect(() => {
    const fetchRandomMeal = async () => {

     setLoading(true);

      try {
        //Calls the fetchRandomRecipes function
        const response = await fetchRandomRecipe();
        //Updates featuredRecipe by setting it as the first object in the meals array 
        setFeaturedRecipe(response.meals[0]);
      } 
      catch (error) {
        //Error handling
        console.error('Error fetching recipe:', error);
        setErrors('Unable to fetch featured recipe');      
      }

     setLoading(false);
    }
    //Runs the function only once when component mounts
    fetchRandomMeal();
  },[])

  if (loading) return <p>Loading...</p>;
  if (errors) return <p>{errors}</p>;
  if (!featuredRecipe) return <p>Sorry, the featured recipe is unavailable</p>

  return (
    <>
    {/*Renders the name and image of the featured recipe*/}
     <div key={featuredRecipe.idMeal}>
        <p>{featuredRecipe.strMeal}</p>
        <img src={featuredRecipe.strMealThumb} alt="Featured Recipe image"/>
    </div>
    </>
  )
}

export default Featured
