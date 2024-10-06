import React from 'react'
import FilterUsingCategories from '../components/FilterByCategories'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

function CategoryPage() {
  return (
    <>
    {/*Specific Category page: displays all recipes found in specific category */}
    <Nav />
    <FilterUsingCategories />
    <Footer />
    </>
  )
}

export default CategoryPage
