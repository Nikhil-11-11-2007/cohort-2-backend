// import { useQuery } from '@tanstack/react-query'
// import React from 'react'
// import { fetchProducts } from './api/api'

// const App = () => {

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["products"],
//     queryFn: fetchProducts,
//     // staleTime: 1000*10
//     // gcTime: 1000*10
//   })


//   if (isLoading) return <p>Loading...</p>
//   if (isError) return <p>Error...</p>
//   console.log(data)

//   return (
//     <div>
//       {data.map((product) => (
//         <div key={product.id}>
//           <img loading='lazy' src={product.image} alt="" />
//           <h1>{product.title}</h1>
//         </div>
//       ))}
//     </div>
//   )
// }

// export default App

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchProducts } from "./api/api";
import "./App.css";

const App = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return (
      <div className="status">
        <div className="loader"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="status error">
        <h2>Something went wrong 😕</h2>
        <p>Unable to fetch products.</p>
      </div>
    );
  }

  return (
    <main className="container">
      <header className="header">
        <div>
          <p className="subtitle">OUR COLLECTION</p>
          <h1>Products</h1>
        </div>

        <span className="count">{data.length} Products</span>
      </header>

      <section className="products">
        {data.map((product) => (
          <article className="product-card" key={product.id}>
            <div className="image-box">
              <img
                loading="lazy"
                src={product.image}
                alt={product.title}
              />
            </div>

            <div className="product-info">
              <h2>{product.title}</h2>

              <p className="price">
                ${product.price}
              </p>

              <button>View Product</button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};

export default App;