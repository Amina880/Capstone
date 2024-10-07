import { Link, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { Menu, X } from "lucide-react";


function Nav() {
    const location = useLocation();
    //Toggling navbar
    const[ isOpen , setIsOpen] = useState(false);
    const toggleNav = () => setIsOpen(!isOpen);

    return (
    <>
    {/*Nav bar for larger pages */}
    <nav className="hidden md:flex mx-auto w-full justify-center items-center ">
        {/*Logo*/}
        <Link to="/"><img className="w-28 m-8" src="/Images/taste-quest-high-resolution-logo-black-transparent.png" alt="logo"/></Link>

        {/*Links */}
        <div className="flex w-full mx-auto items-center justify-evenly px-12 py-8 ">
            <Link to="/"><p className="mr-28 font-semibold text-base">Home</p></Link>
            <Link to="/categories"><p className="mr-32 font-semibold text-base">Categories</p></Link>
            {/*Search Bar Conditional Rendering */}
            {location.pathname !=="/" && <SearchBar />}
            <Link to="/favourites">
            <img
            className="w-8"
            src="/Images/3643770_favorite_heart_like_likes_love_icon.png"
            alt="favourite icon"
            />
            </Link>
        </div>
        
    </nav>

    {/*Hamburger Menu */}
    <nav className="md:hidden flex w-full md:justify-between justify-evenly items-center py-3 px-3">
        {/*Logo*/}
        <Link to="/"><img className="md:w-28 w-16 m-6 md:m-8" src="/Images/taste-quest-high-resolution-logo-black-transparent.png" alt="logo"/></Link>
        {/*Search Bar Conditional Rendering */}
        {location.pathname !=="/" && <SearchBar />}
        {/* Toggle Menu Icons */}
        <button className="mx-4" onClick={toggleNav}>
            {isOpen ? <X className="w-8 h-6"/> : <Menu className="w-8 h-6"/>}
        </button>
    </nav>

    {/*Mobile Links when isOpen is true */}
    {isOpen && (
        <div className="flex flex-col items-center justify-center w-full left-0 bg-white h-screen ">
            <Link to="/" onClick={toggleNav}><p className="py-2 font-semibold text-base">Home</p></Link>
            <Link to="/categories" onClick={toggleNav}><p className=" py-2 font-semibold text-base">Categories</p></Link>
        </div>
    )}
   
    </>
    )
}

export default Nav
