import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/Auth/RegisterPage";
import LoginPage from "./pages/Auth/LoginPage";
import PetListPage from "./pages/Pets/PetListPage";
import PetDetailPage from "./pages/Pets/PetDetailPage";
import HomePage from "./pages/Common/HomePage";
import ContactPage from "./pages/Common/ContactPage";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import "./App.css";
import AdminEditPage from "./pages/Admin/AdminEditPage";
import FavoritePetsPage from "./pages/Pets/FavsPetPage";

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
