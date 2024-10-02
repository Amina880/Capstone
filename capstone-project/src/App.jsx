import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import AllCategories from "./pages/AllCategories"
import SearchResults from "./pages/SearchResults"
function App() {
  
  return (
    <>
    {/*Set up Routing */}
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/categories" element={<AllCategories />}/>
        <Route path="/results" element={<SearchResults />}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
