import "./App.scss";
import { Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./components/admin/Login/LoginPage/LoginPage";
import DashboardPage from "./components/admin/Dashboard/DashboardPage";
import SideBar from "./components/admin/commons/SideBar/SideBar";
import NavBar from "./components/admin/commons/NavBar/Navbar";
import EmployeesHomePage from "./components/admin/Employees/EmployeeHomePage/EmployeesHomePage";
import EmployeeAddPage from "./components/admin/Employees/EmployeeAddPage/EmployeeAddPage";

const LayoutWithSidebar = ({ children }) => {
  return (
    <div className="content-sidebar">
      <SideBar />
      <div className="content">
        <div className="content-navbar">
          <NavBar />
        </div>
        <div className="content-main">{children}</div>
      </div>
    </div>
  );
};

const LayoutWithoutSidebar = ({ children }) => {
  return <div className="content">{children}</div>;
};

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="app">
      {isLoginPage ? (
        <LayoutWithoutSidebar>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </LayoutWithoutSidebar>
      ) : (
        <LayoutWithSidebar>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/employees" element={<EmployeesHomePage />} />
            <Route path="/employees/add" element={<EmployeeAddPage />} />
          </Routes>
        </LayoutWithSidebar>
      )}
    </div>
  );
}

export default App;
