import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import AllCategories from "./pages/AllCategories"
import SearchResults from "./pages/SearchResults"
import RecipeDetailsPage from "./pages/RecipeDetailsPage"
import FilterUsingCategories from "./components/FilterByCategories"
function App() {
  
  return (
    <>
    {/*Set up Routing */}
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/categories" element={<AllCategories />}/>
        <Route path="/categories/:categoryName" element={<FilterUsingCategories />}/>
        <Route path="/results" element={<SearchResults />}/> {/* Search queries are unknown to us  */}
        <Route path="/recipe-details/:recipeId" element={<RecipeDetailsPage />}/> {/*Recipe id is known to us */}
      </Routes>
    </Router>
    </>
  )
}

export default App
