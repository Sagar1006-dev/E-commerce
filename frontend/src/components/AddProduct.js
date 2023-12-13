import React, { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    console.log(name);
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }
    setError(false);
    e.preventDefault();
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:5000/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-Type": "application/json",

        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    console.log(result);
    setName("");
    setPrice("");
    setCategory("");
    setCompany("");
  };

  return (
    <div className="p-container">
      <div className="add-product">
        <h2>Add Product</h2>
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
            {error && !name && (
              <span className="invalid-input">Product Name is required</span>
            )}
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
            {error && !price && (
              <span className="invalid-input">Product Price is required</span>
            )}
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
            {error && !category && (
              <span className="invalid-input">
                Product Category is required
              </span>
            )}
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
            {error && !company && (
              <span className="invalid-input">Product Company is required</span>
            )}
          </div>

          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
