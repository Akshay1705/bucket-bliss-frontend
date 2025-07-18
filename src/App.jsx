import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<WelcomePage />} /> {/* Default Landing */}
        <Route path="/login" element={<LoginPage />} /> {/* Login */}
        <Route path="/register" element={<RegisterPage />} /> {/* Register */}
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* Dashboard */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
