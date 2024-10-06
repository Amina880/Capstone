import { X } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SearchBar() {
    const location = useLocation();
    const navigate = useNavigate();

    //State management
    const [recipeName, setRecipeName] = useState('');
    const [errors, setErrors] = useState({});
    const [isOpen, setIsOpen] =useState(false)

    //Toggle for mobile search bar
    const toggleSearch = () => {
        setIsOpen(!isOpen);
        setRecipeName("");
        setErrors({});
    }

    const onChange = (e) => {
        setRecipeName(e.target.value)
    }

    const onSearch = (e) => {
        //Prevent default behaviour
        e.preventDefault();
        //Validate that recipe name input is not blank
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0){
            setErrors(validationErrors);
        }
        else {
            setErrors({})
        }
        //Navigate to the page with the specific results
        navigate(`/results?s=${recipeName}`)
    }

    //Validate that recipe name input is not blank
    const validate = () => {
        let errors = {};
        if (recipeName.trim() === ''){
            errors.recipeName = 'Please type in a recipe name'
        }
     return errors;
    }
    
    
    const renderSearchBar = () => {
        if(location.pathname === "/"){
            //Conditionally renders a larger search bar component in the home page
            return(
            <form className="flex items-center justify-between border-gray-400 border-b-2" onSubmit={onSearch} >
                <input className="w-3/4" type="text" value={recipeName} placeholder="Search for a Recipe" onChange={onChange} required />
                {errors.recipeName && <p>{errors.recipeName}</p>}
                <button className="w-8 " type="submit" >
                    <img src="/public/Images/211817_search_strong_icon.png"/>
                </button>
            </form>
            
        )}
        else{
            //Conditonally renders a smaller search bar component for the nav bar in all other pages
            return(
                <>
                {/*Only renders on larger screens in the nav of all pages but the home page  */}
                <form className="hidden md:flex items-center justify-between w-fit border-[#CBF3F0]  bg-[#CBF3F0] border-2 rounded-lg" onSubmit={onSearch} >
                    <input className="w-3/4 pl-4 bg-[#CBF3F0]" type="text" value={recipeName} placeholder="Search..." onChange={onChange} required/>
                    {errors.recipeName && <p>{errors.recipeName}</p>}
                    <button className="w-8 " type="submit" >
                        <img src="/public/Images/211817_search_strong_icon.png"/>
                    </button>
                </form>

                {/*Only renders on smaller screens where only the search icon is displayed and expandable when clicked */}
                <button onClick={toggleSearch} className="ml-auto md:hidden ">
                    {isOpen ? isOpen: <img className=" w-6 " src="/public/Images/211817_search_strong_icon.png"/>}
                </button>
                {isOpen && (
                    <form className="md:hidden flex items-center sm:justify-between w-fit right-0 ml-8  border-black border-2 rounded-xl " onSubmit={onSearch} >
                        <div className="flex items-center max-[460px]:w-24 p-1">
                            <button className=" w-5 ml-auto mr-1 " onClick={toggleSearch}><X className="max-[460px]:w-3" /></button>
                            <input className="pb-1 md:ml-8 ml-1 w-16 max-[460px]:w-8 " type="text" value={recipeName} placeholder="Search..." onChange={onChange} required/>
                            {errors.recipeName && <p>{errors.recipeName}</p>}
                            <button className="w-5 m-1" type="submit" >
                                <img className="max-[460px]:w-3" src="/public/Images/211817_search_strong_icon.png"/>
                            </button>
                        </div>
                    </form>
                )}
                </>
            ); 
        }
    }
  
  return (
    <>
    {location.pathname === "/" && renderSearchBar()}
    {location.pathname !== "/" && renderSearchBar()}
    </>
  )

}

export default SearchBar
