
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const Home = () => {
  const [productPerPage, setProductPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [brand, setBrand] = useState('');
  const [sort, setSort] = useState(''); 
  const [asc, setAsc] = useState(true); 
  const [priceRange, setPriceRange] = useState('');

  // Fetching product data with pagination and filters
  const { data: product = [], isLoading, error } = useQuery({
    queryKey: ['product', search, currentPage, productPerPage, sort, asc, type, brand, priceRange],
    queryFn: async () => {
      const [minPrice, maxPrice] = priceRange ? priceRange.split('-').map(Number) : [0, Infinity];
      const response = await fetch(`https://kids-gallery-server.vercel.app/product?search=${search}&page=${currentPage}&size=${productPerPage}&sort=${sort}&sortOrder=${asc ? 'asc' : 'desc'}&type=${type}&brand=${brand}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      return data;
    }
  });

  useEffect(() => {
    const getProductCount = async () => {
      try {
        const [minPrice, maxPrice] = priceRange ? priceRange.split('-').map(Number) : [0, Infinity];
        const response = await fetch(`https://kids-gallery-server.vercel.app/product-count?type=${type}&brand=${brand}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product count");
        }
        const data = await response.json();
        setCount(data.count);
        setCurrentPage(1);
        // console.log("Total products count:", data.count);
      } catch (error) {
        console.error('Failed to fetch product count:', error);
      }
    };
    getProductCount();
  }, [type, brand, priceRange]);

  const numberOfPages = Math.ceil(count / productPerPage);
  const pages = [...Array(numberOfPages).keys()].map(element => element + 1);

  // pagination
  const handlePaginationBtn = (value) => {
    setCurrentPage(value);
  };

  // search
  const handleSearch = e => {
    e.preventDefault();
    const searchText = e.target.search.value;
    setSearch(searchText);
  };

  if (isLoading) {
    return <span className="loading loading-bars loading-lg"></span>;
  }

  if (error) {
    return <span className="text-red-500">Error: {error.message}</span>;
  }

  return (
    <div className="max-w-6xl">
      {/* Search by product name*/}
      <div className="my-10 text-center">
        <h2 className="text-2xl text-orange-500 mb-5">Search by the name</h2>
        <form onSubmit={handleSearch}>
          <input type="text" name="search" placeholder="type here" className="py-2 mr-1" />
          <input type="submit" value="Search" className="btn bg-orange-400 text-white" />
        </form>

        {/* Sort by Price */}
        <div className="my-10">
          <h2 className="text-orange-400 mb-3">Click here to get high to low and low to high price product!!</h2>
          <button className="bg-orange-400 p-3 text-white rounded-lg" onClick={() => {
            setSort('price');
            setAsc(!asc);
          }}>
            {asc ? 'Price: Low to High' : 'Price: High to Low'}
          </button>
        </div>

        {/* Sort by Date */}
         <div>
          <select onChange={e => {
            setSort(e.target.value);
            setAsc(false); 
            setCurrentPage(1);
          }} value={sort} name="sort" id="sort">
            <option value="">Sort By Date</option>
            <option value="date">Newest First</option>
          </select>
        </div>
        {/* Filter by Category */}
        <div>
          <select onChange={e => {
            setType(e.target.value);
            setCurrentPage(1);
          }} value={type} name='category' id='category'>
            <option value="">Filter By Category</option>
            <option value="Clothing">Clothing</option>
            <option value="Toys">Toys</option>
            <option value="Electronics">Electronics</option>
            <option value="Baby Gear">Baby Gear</option>
            <option value="Accessories">Accessories</option>
            <option value="Baby Care">Baby Care</option>
            <option value="Footwear">Footwear</option>
            <option value="Furniture">Furniture</option>
            <option value="Books">Books</option>
          </select>
        </div>

        {/* Filter by Brand */}
        <div>
          <select onChange={e => {
            setBrand(e.target.value);
            setCurrentPage(1);
          }} value={brand} name='brand' id='brand'>
            <option value="">Filter By Brand</option>
            <option value="TinyTrends">TinyTrends</option>
            <option value="BabyEssentials">BabyEssentials</option>
            <option value="SafeTravel">SafeTravel</option>
            <option value="StoryTime">StoryTime</option>
            <option value="CozyWear">CozyWear</option>
          </select>
        </div>

        {/* Filter by Price Range */}
        <div>
          <select onChange={e => {
            setPriceRange(e.target.value);
            setCurrentPage(1);
          }} value={priceRange} name='priceRange' id='priceRange'>
            <option value="">Filter By Price Range</option>
            <option value="0-50">Under $50</option>
            <option value="50-100">$50 - $100</option>
            <option value="100-200">$100 - $200</option>
          </select>
        </div>
      </div>

      {/* Products */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {
          Array.isArray(product) && product.length > 0 ? product.map(item => (
            <div key={item._id} className="card bg-base-100 w-96 shadow-xl">
              <figure>
                <img className="h-56 w-full object-cover" src={item.productImage} alt={item.category} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{item.productName}
                  <div className="badge bg-orange-400 text-white">{item.brandName}</div>
                </h2>
                <div className="flex flex-row justify-between">
                  <h2 className="font-bold">Category: {item.category}</h2>
                  <h2 className="font-bold">Rating: {item.ratings}</h2>
                </div>
                <div className="flex flex-row justify-between">
                  <h2 className="font-bold">Creation Date: {new Date(item.creationDate).toLocaleDateString()}</h2>
                  <h2 className="font-bold">Creation Time: {new Date(item.creationDate).toLocaleTimeString()}</h2>
                </div>
                <h2 className="font-bold">Price: ${item.price}</h2>
                <p>{item.description}</p>
              </div>
            </div>
          )) : <p>No products found</p>
        }
      </div>

      {/* Pagination */}
      <div className="text-center mt-10">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePaginationBtn(currentPage - 1)}
          type="submit" className="btn mx-2 text-white bg-orange-400">
          Previous
        </button>
        {
          pages.map(btnNum =>
            <button
              onClick={() => handlePaginationBtn(btnNum)}
              className={`btn mx-2 ${currentPage === btnNum ? 'text-white bg-orange-400' : ''}`} key={btnNum}>
              {btnNum}
            </button>)
        }
        <button
          disabled={currentPage === numberOfPages}
          onClick={() => handlePaginationBtn(currentPage + 1)}
          type="submit" className="btn text-white bg-orange-400 mx-2">
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;


