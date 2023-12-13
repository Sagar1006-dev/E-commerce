import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    console.log(params);
    let result = await fetch(`http://localhost:5000/product/${params.id}`,{
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
    );
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Product updated:", { name, price, category, company });
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: "PUT",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    console.log(result);
    navigate("/")
  };

  return (
    <div className="p-container">
      <div className="add-product">
        <h2>Update Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="productName">Product Name:</label>
            <input
              type="text"
              id="productName"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="productPrice">Product Price:</label>
            <input
              type="text"
              id="productPrice"
              placeholder="Enter product price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="productCategory">Product Category:</label>
            <input
              type="text"
              id="productCategory"
              placeholder="Enter product category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="productCompany">Product Company:</label>
            <input
              type="text"
              id="productCompany"
              placeholder="Enter product company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          <button type="submit">Update Product</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
