

//         import { useQuery } from "@tanstack/react-query";
// import { useEffect, useState } from "react";

// const Home = () => {

//   const [productPerPage, setProductPerPage] = useState(6);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [count, setCount] = useState(0);
//   const [search, setSearch] = useState('');

//   // Fetching product data with pagination and search
//   const { data: product = [], isLoading } = useQuery({
//     queryKey: ['product', search, currentPage, productPerPage],
//     queryFn: async () => {
//       const response = await fetch(`http://localhost:5000/product?search=${search}&page=${currentPage}&size=${productPerPage}`);
//       const data = await response.json(); // Parse the response to JSON
//       return data;
//     }
//   });

//   // Fetching the total product count
//   useEffect(() => {
//     const getProductCount = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/product-count');
//         const data = await response.json(); // Parse the response to JSON
//         setCount(data.count); // Ensure the API response has a 'count' field
//       } catch (error) {
//         console.error('Failed to fetch product count:', error);
//       }
//     };
//     getProductCount();
//   }, []);

//   const numberOfPages = Math.ceil(count / productPerPage);
//   const pages = [...Array(numberOfPages).keys()].map(
//     element => element + 1
//   );

//   // Pagination button handler
//   const handlePaginationBtn = (value) => {
//     setCurrentPage(value);
//   };

//   // Search handler
//   const handleSearch = e => {
//     e.preventDefault();
//     const searchText = e.target.search.value;
//     setSearch(searchText);
//   };

//   if (isLoading) {
//     return <span className="loading loading-bars loading-lg"></span>;
//   }

//   return (
//     <div className="max-w-6xl">
//       {/* Search */}
//       <div className="text-center my-10">
//         <h2 className="text-2xl text-[#8A3324] mb-5">Search class by the name</h2>
//         <form onSubmit={handleSearch}>
//           <input type="text" name="search" placeholder="type here" className="py-2 mr-1" />
//           <input type="submit" value="Search" className="btn bg-[#CD5C5C] text-white" />
//         </form>
//       </div>
//       {/* Card */}
//       <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//         {
//           product?.map(item => (
//             <div key={item._id} className="card bg-base-100 w-96 shadow-xl">
//               <figure>
//                 <img src={item.productImage} alt="" />
//               </figure>
//               <div className="card-body">
//                 <h2 className="card-title">{item.category}</h2>
//                 <p>{item.description}</p>
//                 <div className="card-actions justify-end">
//                   <button className="btn btn-primary">Buy Now</button>
//                 </div>
//               </div>
//             </div>
//           ))
//         }
//       </div>
      
//       {/* Pagination */}
//       <div className="text-center mt-10">
//         <button
//           disabled={currentPage === 1}
//           onClick={() => handlePaginationBtn(currentPage - 1)}
//           type="submit" className="btn mx-2 text-white bg-[#CD5C5C]">
//           Previous
//         </button>
//         {
//           pages?.map(btnNum =>
//             <button
//               onClick={() => handlePaginationBtn(btnNum)}
//               className={`btn mx-2 ${currentPage === btnNum ? 'text-white bg-[#CD5C5C]' : ''}`} key={btnNum}>
//               {btnNum}
//             </button>)
//         }
//         <button
//           disabled={currentPage === numberOfPages}
//           onClick={() => handlePaginationBtn(currentPage + 1)}
//           type="submit" className="btn text-white bg-[#CD5C5C] mx-2">
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Home;

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const Home = () => {

  const [productPerPage, setProductPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState('');

  // Fetching product data with pagination and search
  const { data: product = [], isLoading, error } = useQuery({
    queryKey: ['product', search, currentPage, productPerPage],
    queryFn: async () => {
      const response = await fetch(`http://localhost:5000/product?search=${search}&page=${currentPage}&size=${productPerPage}`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json(); // Parse the response to JSON
      console.log("Fetched products:", data); // Debugging log to check fetched data
      return data;
    }
  });

  // Fetching the total product count
  useEffect(() => {
    const getProductCount = async () => {
      try {
        const response = await fetch('http://localhost:5000/product-count');
        if (!response.ok) {
          throw new Error("Failed to fetch product count");
        }
        const data = await response.json(); // Parse the response to JSON
        setCount(data.count); // Ensure the API response has a 'count' field
        console.log("Total products count:", data.count); // Debugging log for total count
      } catch (error) {
        console.error('Failed to fetch product count:', error);
      }
    };
    getProductCount();
  }, []);

  const numberOfPages = Math.ceil(count / productPerPage);
  const pages = [...Array(numberOfPages).keys()].map(
    element => element + 1
  );

  // Pagination button handler
  const handlePaginationBtn = (value) => {
    setCurrentPage(value);
  };

  // Search handler
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
      {/* Search */}
      <div className="text-center my-10">
        <h2 className="text-2xl text-[#8A3324] mb-5">Search class by the name</h2>
        <form onSubmit={handleSearch}>
          <input type="text" name="search" placeholder="type here" className="py-2 mr-1" />
          <input type="submit" value="Search" className="btn bg-[#CD5C5C] text-white" />
        </form>
      </div>
      {/* Card */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {
          Array.isArray(product) && product.length > 0 ? product.map(item => (
            <div key={item._id} className="card bg-base-100 w-96 shadow-xl">
              <figure>
                <img  className="h-48 w-full object-cover" src={item.productImage} alt={item.category} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{item.category}</h2>
                <p>{item.description}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
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
          type="submit" className="btn mx-2 text-white bg-[#CD5C5C]">
          Previous
        </button>
        {
          pages.map(btnNum =>
            <button
              onClick={() => handlePaginationBtn(btnNum)}
              className={`btn mx-2 ${currentPage === btnNum ? 'text-white bg-[#CD5C5C]' : ''}`} key={btnNum}>
              {btnNum}
            </button>)
        }
        <button
          disabled={currentPage === numberOfPages}
          onClick={() => handlePaginationBtn(currentPage + 1)}
          type="submit" className="btn text-white bg-[#CD5C5C] mx-2">
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
