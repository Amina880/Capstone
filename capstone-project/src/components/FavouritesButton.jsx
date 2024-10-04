import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
function FavouritesButton() {
  //Get recipeId from url
  const {recipeId} = useParams();
  //State Management
  const [faveRecipes, setFaveRecipes] = useState([]);

  useEffect(() => {
    //Gets already stored favourite recipes when the component mounts
    const storedFaves = JSON.parse(localStorage.getItem('favRecipes')) || [];
    setFaveRecipes(storedFaves);
  }, [])
  //Adds the new recipeId to the favRecipes array if it's not already there
  const onClick = () => {
    if(!faveRecipes.includes(recipeId)){
    const updatedFaves = [...faveRecipes, recipeId];
    setFaveRecipes(updatedFaves);
    localStorage.setItem('favRecipes', JSON.stringify(updatedFaves))
    }
  }

return (
  <div>
      <button type="submit" onClick={onClick}>Fave</button>
  </div>
)
}

export default FavouritesButton
