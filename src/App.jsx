import "./App.scss";
import { Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./components/admin/Login/LoginPage/LoginPage";
import DashboardPage from "./components/admin/Dashboard/DashboardPage";
import SideBar from "./components/admin/commons/SideBar/SideBar";

const LayoutWithSidebar = ({ children }) => {
  return (
    <div className="content-sidebar">
      <SideBar />
      <div className="content">{children}</div>
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
          </Routes>
        </LayoutWithSidebar>
      )}
    </div>
  );
}

export default App;
