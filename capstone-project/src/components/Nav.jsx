import { Link } from "react-router-dom";


function Nav() {
  return (
    <nav>
        <Link to="/">Home</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/favourites">Favorites</Link>
      
    </nav>
  )
}

export default Nav
