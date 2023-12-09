import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<h1>Product Listing Components</h1>} />
          <Route path="/add" element={<h1>Add Product Components</h1>} />
          <Route path="/update" element={<h1>Update Product Components</h1>} />
          <Route path="/logout" element={<h1>Logout Components</h1>} />
          <Route path="/profile" element={<h1>Profile Components</h1>} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
