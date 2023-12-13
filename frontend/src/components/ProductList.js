import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom"

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      let result = await fetch("http://localhost:5000/products",{
        headers:{
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
        }
      });
      if (!result.ok) {
        throw new Error("Network response was not ok");
      }
      result = await result.json();
      setProducts(result);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("An error occurred while fetching products.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  const deleteProduct = async (id) => {
    try {
      let result = await fetch(`http://localhost:5000/product/${id}`, {
        method: "DELETE",
        headers: {
            authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },

      });

      if (!result.ok) {
        throw new Error("Network response was not ok");
      }

      result = await result.json();

      if (result) {
        alert("Record is deleted");
        getProducts();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      setError("An error occurred while deleting the product.");
    } finally {
      setLoading(false);
    }
  };
  const searchHandle = async (e) => {
    e.preventDefault();
    let key = e.target.value;
    if (key) {
      try {
        let result = await fetch(`http://localhost:5000/search/${key}`, {
          headers: {
            authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
        });
        result = await result.json();
        if (result) {
          setProducts(result);
        }
      } catch (error) {
        console.error("Error during search:", error);
      }
    } else {
      getProducts();
    }
  };
  


  return (
    <div className="product-list">
      <h2>Product List</h2>
      <input 
      className='search-product'
       type="text" 
       placeholder="Search Product"
       onChange={searchHandle}
      />
      <table className="p-table">
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {
          products.length > 0 ? products.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>${item.price}</td>
              <td>{item.category}</td>
              <td>
                <button onClick={() => deleteProduct(item._id)}>Delete</button>
                <button><Link to={`/update/${item._id}`}>Update</Link></button>
              </td>
            </tr>
          ))
          :  <h1 style={{ color: 'red', fontSize: '20px', textAlign: 'center' }}>
          No Result Found
        </h1>
        }
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;

// import React, { useEffect, useState } from "react";

// const ProductList = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     getProducts();
//   }, []);

//   const getProducts = async () => {
//     try {
//       let result = await fetch("http://localhost:5000/products");
//       result = await result.json();
//       setProducts(result);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   console.log("products:", products);

//   return (
//     <div className="product-list">
//       <h2>Product List</h2>
//       <ul className="p-header">
//         <li>Sr. No</li>
//         <li>Name</li>
//         <li>Price</li>
//         <li>Category</li>
//       </ul>
//       {products.map((item, index) => (
//         <ul key={index}>
//           <li>{index + 1}</li>
//           <li>{item.name}</li>
//           <li>${item.price}</li>
//           <li>{item.category}</li>
//         </ul>
//       ))}
//     </div>
//   );
// };

// export default ProductList;