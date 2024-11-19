
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Components/Home";
import BarcodeScanner from "./Components/BarcodeScanner";

const App = () => {
  return (
    <Router>
      <nav className="p-4 bg-blue-600 text-white">
        <Link to="/" className="mr-4">Home</Link>
        <Link to="/scanner">Barcode Scanner</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scanner" element={<BarcodeScanner />} />
      </Routes>
    </Router>
  );
};

export default App;
