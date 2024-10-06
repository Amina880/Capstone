import React from 'react'
import Nav from '../components/Nav'
import RecipeList from '../components/RecipeSearchResults'
import Footer from '../components/Footer'

function SearchResults() {
  return (
    <>
    {/*Search Results Page */}
    <Nav/>
    <RecipeList />
    <Footer />
    </> 
  )
}

export default SearchResults
