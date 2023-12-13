const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");

const Jwt = require('jsonwebtoken')
const jwtKey = "e-comm";

const app = express();

app.use(express.json());
app.use(cors());

// Registration route
app.post("/register", async (req, res) => {
  try {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        res.send({
          result: "something went wrong, Please try after sometime",
        });
      }
      res.send({ result, auth: token });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Login route
// app.post("/login", async (req, res) => {
//   console.log(req.body);
//   if (req.body.password && req.body.email) {
//     let user = await User.findOne(req.body).select("-password");
//     if (!user) {
//       res.send(user);
//     } else {
//       res.send({ result: "No User Found" });
//     }
//   } else {
//     res.send({ result: "No User Found..." });
//   }
// });
app.post("/login", async (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;

  try {
    if (email && password) {
      let user = await User.findOne({ email, password }).select("-password");

      if (user) {
        Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
          if (err) {
            res.send({
              result: "something went wrong, Please try after sometime",
            });
          }
          res.send({ user, auth: token });
        });
      } else {
        res.send({ result: "No User Found" });
      }
    } else {
      res.send({ result: "Email or Password is missing" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ result: "Internal Server Error" });
  }
});

//Add-Product route
app.post("/add-product",varifyToken, async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
});

// Product-Listing
app.get("/products",varifyToken, async (req, res) => {
  let products = await Product.find();
  if (products.length) {
    res.send(products);
  } else {
    res.send({ result: "No Products found" });
  }
});

// Delete

app.delete("/product/:id",varifyToken, async (req, res) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});

// Update
app.get("/product/:id",varifyToken, async (req, res) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No Records Found." });
  }
});

//put
// app.put("/product/:id", async(req,res)=>{
//   let result = await Product.updateOne(
//     {_id: req.params.id},
//     {
//       $set : req.body
//     }
//   )
//   res.send(result)
// })
app.put("/product/:id",varifyToken, async (req, res) => {
  try {
    let result = await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: req.body,
      }
    );
    res.send(result);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Search

app.get("/search/:key",varifyToken, async (req, res) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
    ],
  });
  res.send(result)
});

// function varifyToken(req,res,next){
//   let token  = req.headers['authorization']
//   if (token) {
//     token = token.split('')[1]
//     Jwt.verify(token, jwtKey, (err, valid)=>{
//       if (err){
//         res.status(401).send({result : "Please Provide valid token"})
//       }else{
//         next()
//       }
//     })
      
//   }else{
//      res.send({result: "Please Add token with header"})
//   }

// }
function varifyToken(req, res, next) {
  let token = req.headers['authorization'];
  if (token) {
    token = token.split(' ')[1];
    Jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        return res.status(401).send({ result: "Please Provide a valid token" });
      } else {
        next();
      }
    });
  } else {
    res.send({ result: "Please Add token with header" });
  }
}

// Start the server on port 5000
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
