import { ArrowRightIcon } from "lucide-react";
import { fetchRandomRecipe } from "../services/recipeService"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";

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
    //Runs function and the useEffect hook runs only once when component mounts
    fetchRandomMeal();
  },[])

  if (loading) return <p>Loading...</p>;
  if (errors) return <p>{errors}</p>;
  if (!featuredRecipe) return <p>Sorry, the featured recipe is unavailable</p>

  return (
    <>
    {/*Featured recipe section linking to recipe-details */}
    <Link to={`/recipe-details/${featuredRecipe.idMeal}`}>
      {/*Renders the name and image of the featured recipe*/}
      <div className="md:flex justify-items-center md:justify-between " key={featuredRecipe.idMeal}>
        <img className="w-96 hover:shadow-lg md:rounded-none rounded-t-xl" src={featuredRecipe.strMealThumb} alt="Featured Recipe image"/>
          <div className="text-left mx-auto md:rounded-none rounded-b-xl px-8 pb-10 bg-[#FF9F1C] bg-opacity-25">
            <p className="md:text-3xl text-2xl pt-12 pb-7 font-semibold">{featuredRecipe.strMeal}</p>
            <div className="font-light ">
              <p className="md:text-lg text-base italic">Looking for something new to spice up your kitchen routine? </p>
              <br></br>
              <p className="md:text-base text-sm">Our <span className="font-semibold">{featuredRecipe.strMeal}</span> offers the perfect balance of flavor and simplicity, making it a must-try for any home cook. Whether it’s for a cozy family dinner or a special occasion, this recipe will quickly become a favorite in your rotation.<br></br>With easy-to-follow steps and accessible ingredients, you’ll have a delicious, restaurant-quality meal on the table in no time. Click here to explore the full recipe.</p>
              <br></br>
            </div>
            <ArrowRightIcon className="ml-auto mr-2 bg-slate-50 rounded-2xl"/>
          </div>
      </div>
    </Link>
    </>
  )
}

export default Featured
