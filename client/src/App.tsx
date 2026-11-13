import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/Auth/RegisterPage.jsx";
import LoginPage from "./pages/Auth/LoginPage.jsx";
import PetListPage from "./pages/Pets/PetListPage.jsx";
import PetDetailPage from "./pages/Pets/PetDetailPage.jsx";
import HomePage from "./pages/Common/HomePage.jsx";
import ContactPage from "./pages/Common/ContactPage.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.js";
import Navbar from "./components/Navbar/Navbar.js";
import Footer from "./components/Footer/Footer.js";
import "./App.css";
import AdminEditPage from "./pages/Admin/AdminEditPage.js";
import FavoritePetsPage from "./pages/Pets/FavsPetPage.jsx";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/pets" element={<PetListPage />} />
            <Route path="/pets/:id" element={<PetDetailPage />} />
            <Route path="/favorite" element={<FavoritePetsPage />} />
            {/* the star means the following or nested paths */}
            <Route path="/dashboard/*" element={<AdminDashboard />} />
            <Route path="/pets/:id/edit" element={<AdminEditPage />} />

            {/* Add other routes here */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
