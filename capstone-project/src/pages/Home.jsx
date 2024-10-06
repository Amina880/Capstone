import Categories from "../components/Categories";
import Featured from "../components/FeaturedRecipe";
import Nav from "../components/Nav";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
function Home() {
    
  return (
    <>
    {/*Home Page */}
      
      <Nav />
      <div className="mx-auto max-[390px]:w-72 w-96 md:w-[970px] pt-28 ">
        <div className="pb-20">
            <p className="md:text-4xl text-3xl text-center pb-12 font-extralight ">What Would You Like To Eat Today?</p>
            <SearchBar />
        </div>
      
        <div className="pb-20">
            <p className="font-semibold text-xl pb-2">Featured Recipe</p>
            <Featured />
        </div>
        <p className="font-semibold md:text-xl md:pb-4 text-lg pb-8 ">Browse Categories</p>
        <Categories />
      </div>
      <Footer />
       
    </>
  )
}

export default Home

