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
      //Updates the faveRecipes array
      const updatedFaves = [...faveRecipes, recipeId];
      setFaveRecipes(updatedFaves);
      localStorage.setItem('favRecipes', JSON.stringify(updatedFaves))
    }
  }

return (
  <div>
    {/*Favourite button */}
      <button type="submit" onClick={onClick}>
        <img className="w-8 p-1 mx-4 bg-[#2EC4B6] bg-opacity-65 rounded-2xl" src="/Images/3643770_favorite_heart_like_likes_love_icon.png" />
      </button>
  </div>
)
}

export default FavouritesButton
