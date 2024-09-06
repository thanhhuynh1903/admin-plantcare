import "./App.scss";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/admin/Login/LoginPage/LoginPage";
import DashboardPage from "./components/admin/Dashboard/DashboardPage";

function App() {

  return <div className="app">
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  </div>;
}

export default App;
