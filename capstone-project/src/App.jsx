import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import AllCategories from "./pages/AllCategories"
import SearchResults from "./pages/SearchResults"
import RecipeDetailsPage from "./pages/RecipeDetailsPage"
import CategoryPage from "./pages/CategoryPage"
import FavouritePage from "./pages/FavouritePage"
function App() {
  document.title = "Taste Quest Recipe Finder"
  return (
    <>
    {/*Set up Routing */}
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/categories" element={<AllCategories />}/>
        <Route path="/categories/:categoryName" element={<CategoryPage />}/>
        <Route path="/results" element={<SearchResults />}/> {/* Search queries are unknown to us  */}
        <Route path="/recipe-details/:recipeId" element={<RecipeDetailsPage />}/> {/*Recipe id is known to us */}
        <Route path="/favourites" element={<FavouritePage />}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
