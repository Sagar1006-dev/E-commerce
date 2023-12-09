import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import PriviteComponent from "./components/PrivateComponent";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>

          <Route element={<PriviteComponent/>}>
          <Route path="/" element={<h1>Product Listing Components</h1>} />
          <Route path="/add" element={<h1>Add Product Components</h1>} />
          <Route path="/update" element={<h1>Update Product Components</h1>} />
          <Route path="/logout" element={<h1>Logout Components</h1>} />
          <Route path="/profile" element={<h1>Profile Components</h1>} />
          </Route>
          
          <Route path="/signup" element={<SignUp/>} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
