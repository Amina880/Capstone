import Categories from "../components/Categories"
import Footer from "../components/Footer"
import Nav from "../components/Nav"

function AllCategories() {
  return (
    <>
    {/*Categories page: diplays all categories */}
    <Nav />
    <div className="md:mx-16 mx-10 md:my-8 my-4 text-3xl pb-4 font-extralight border-b-2 border-black">
    <p>Categories</p>
    </div>
    <Categories />
    <Footer />
    </>
  )
}

export default AllCategories
