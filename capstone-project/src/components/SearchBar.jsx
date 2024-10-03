import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
    //State management
    const [recipeName, setRecipeName] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

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
        

  return (
    <>
    {/*Search bar input form */}
    <form onSubmit={onSearch} >
    <input type="text" value={recipeName} placeholder="Search for a Recipe" onChange={onChange} required />
    {errors.recipeName && <p>{errors.recipeName}</p>}
    <button type="submit" >Search</button>
    </form>

    </>
  )
}

export default SearchBar


//pop up search bar on mobile and maybe categories pop up or just nav