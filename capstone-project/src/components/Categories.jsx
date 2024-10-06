import { fetchRecipeCategories } from "../services/recipeService"
import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom";
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
        //Runs function and the useEffect hook runs only once when component mounts
        getCategories();
    }, [])

    if (loading) return <p>Loading...</p>;
    if (errors) return <p>{errors}</p>;
    if (!categories || categories.length === 0) return <p>Sorry there are no categories to diplay</p>

  return (
    <>
    <div className=" md:flex pb-14 grid grid-cols-3 gap-2 ">
        {/*Conditional rendering for home page */}
        {location.pathname === "/" && categories.slice(0,6).map((category) => (
            (<Link to={`/categories/${category.strCategory}`}>
            <div className="mx-2"key={category.idCategory} >
                <img src={category.strCategoryThumb} alt="Category image" />
                <p className="text-center py-4 font-semibold">{category.strCategory}</p>
            </div>
            </Link>)
        ))}
    </div>

    <div className="grid md:grid-cols-5 grid-cols-3 md:gap-8 gap-6 md:mx-16 mx-8 pb-10">
        {/*Conditional rendering for categories page */}
        {location.pathname === "/categories" && categories.map((c) => (
            (<Link to={`/categories/${c.strCategory}`}>
            <div className="hover:shadow-lg rounded-md" key={c.idCategory} >
                <img className="hover:scale-105" src={c.strCategoryThumb} alt="Category image" />
                <p className="text-center py-4 font-semibold md:text-base text-sm">{c.strCategory}</p>
            </div>
            </Link>)
        ))}
    </div>
    </>
  )
}

export default Categories

