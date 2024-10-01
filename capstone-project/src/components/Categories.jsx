import { fetchRecipeCategories } from "../services/recipeService"
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom";
function Categories() {
    //State Management
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    //Conditional rendering based on path
    const location = useLocation();

    useEffect(()=> {
        const getCategories = async () => {
            setLoading(true);

            try {
              //Calls the fetchRecipeCategories function
              const response = await fetchRecipeCategories();
              //Updates categories by setting it as an array of all categories  
              setCategories(response.categories);
            } 
            catch (error) {
              //Error handling
              console.error('Error fetching categories:', error)
              setErrors('Unable to fetch categories')
            }
            setLoading(false);
        }
        //Runs function only once when component mounts
        getCategories();
    }, [])

    if (loading) return <p>Loading...</p>;
    if (errors) return <p>{errors}</p>;
    if (!categories || categories.length === 0) return <p>Sorry there are no categories to diplay</p>

  return (
    <>
    <div>
    {/*Conditional rendering based on path */}
    {location.pathname === "/" && categories.slice(0,6).map((category) => (
        <div key={category.idCategory} >
            <p>{category.strCategory}</p>
            <img src={category.strCategoryThumb} alt="Category image" />
        </div>
    ))}
    {location.pathname === "/categories" && categories.map((c) => (
        <div key={c.idCategory} >
            <p>{c.strCategory}</p>
            <img src={c.strCategoryThumb} alt="Category image" />
        </div>
    ))}
    </div>
    </>
  )
}

export default Categories

