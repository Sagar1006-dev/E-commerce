import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import PriviteComponent from "./components/PrivateComponent";
import Login from "./components/Login";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import UpdateProduct from "./components/UpdateProduct";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route element={<PriviteComponent />}>
            <Route path="/" element={<ProductList />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/update/:id" element={<UpdateProduct />} />
            <Route path="/logout" element={<h1>Logout Components</h1>} />
            <Route path="/profile" element={<h1>Profile Components</h1>} />
          </Route>

          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
