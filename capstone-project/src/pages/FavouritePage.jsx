import FavouritesResults from "../components/FavouritesResults"
import Footer from "../components/Footer"
import Nav from "../components/Nav"


function FavouritePage() {

  return (
    <>
    {/*Favourites Page: displays all favourite recipes */}
    <Nav />
    <div className="flex justify-normal items-center md:mx-14 mx-10 my-8 text-3xl pb-4 font-extralight border-b-2 border-black">
    <img className="w-8 p-1 mx-4 bg-[#2EC4B6] rounded-2xl " src="/Images/3643770_favorite_heart_like_likes_love_icon.png"/>
    <p>Favourites</p>
    </div>
    <FavouritesResults />
    <Footer />
    </>
  )
}

export default FavouritePage
