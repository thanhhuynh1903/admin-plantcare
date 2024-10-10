import { Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCookie } from "./components/utils/util_cookie";
import LoginPage from "./components/admin/Login/LoginPage/LoginPage";
import DashboardPage from "./components/admin/Dashboard/DashboardPage";
import SideBar from "./components/admin/commons/SideBar/SideBar";
import NavBar from "./components/admin/commons/NavBar/NavBar";
import EmployeesHomePage from "./components/admin/Employees/EmployeeHomePage/EmployeesHomePage";
import EmployeeAddPage from "./components/admin/Employees/EmployeeAddPage/EmployeeAddPage";
import EmployeesEditPage from "./components/admin/Employees/EmployeesEditPage/EmployeesEditPage";
import OrderHomePage from "./components/admin/Orders/OrderHomePage";
import OrderDetail from "./components/admin/Orders/OrderDetail";
import SettingsPage from "./components/admin/Settings/SettingsPage";
import CalendarPage from "./components/admin/Calendar/CalendarPage";
import CalendarDetailPage from "./components/admin/Calendar/CalendarDetail/CalendarDetailPage";
import ReviewsGrid from "./components/admin/Reviews/ReviewsGrid";
import ReviewDetail from "./components/admin/Reviews/ReviewDetail";
import NewsPage from "./components/admin/News/NewsPage";
import NewsCreatePage from "./components/admin/News/NewsCreate/NewsCreatePage";
import NewsEditPage from "./components/admin/News/NewsEdit/NewsEditPage";
import ProductHomepage from "./components/admin/Products/ProductHomePage";
import CustomerHomepage from "./components/admin/Customer/CustomerHomepage/CustomerHomepage";
import CustomerEditPage from "./components/admin/Customer/CustomerEditpage/CustomerEditPage";
import TicketsPage from "./components/admin/Tickets/TicketsPage";
import TicketsCreateManualPage from "./components/admin/Tickets/TicketsCreateManual/TicketsCreateManualPage";
import TicketsDetailPage from "./components/admin/Tickets/TicketsDetail/TicketsDetailPage";
import "./App.scss";

const ProtectedRoute = ({ element, ...rest }) => {
  const token = getCookie("e_token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return element;
};

const LayoutWithSidebar = ({ children }) => {
  useEffect(() => {
    const resetScroll = () => {
      const contentMain = document.querySelector('.content-main');
      if (contentMain) {
        setTimeout(() => {
          contentMain.scrollTop = 0;
        }, 1000);
      }
    };
    
    resetScroll();
  }, []);

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

// Routes configuration
const publicRoutes = [
  { path: "/login", element: <LoginPage /> }
];

const protectedRoutes = [
  { path: "/", element: <DashboardPage /> },
  { path: "/dashboard", element: <DashboardPage /> },
  { path: "/employees", element: <EmployeesHomePage /> },
  { path: "/products", element: <ProductHomepage /> },
  { path: "/customers", element: <CustomerHomepage /> },
  { path: "/customers/edit/:userId", element: <CustomerEditPage /> },
  { path: "/employees/add", element: <EmployeeAddPage /> },
  { path: "/employees/edit/:id", element: <EmployeesEditPage /> },
  { path: "/orders", element: <OrderHomePage /> },
  { path: "/reviews", element: <ReviewsGrid /> },
  { path: "/reviews/detail", element: <ReviewDetail /> },
  { path: "/settings", element: <SettingsPage /> },
  { path: "/calendar", element: <CalendarPage /> },
  { path: "/calendar/:date", element: <CalendarDetailPage /> },
  { path: "/news", element: <NewsPage /> },
  { path: "/news/create", element: <NewsCreatePage /> },
  { path: "/news/edit/:id", element: <NewsEditPage /> },
  { path: "/tickets", element: <TicketsPage /> },
  { path: "/tickets/create", element: <TicketsCreateManualPage /> },
  { path: "/tickets/t/:id", element: <TicketsDetailPage /> },
];

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = getCookie("e_token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [location]);

  if (isAuthenticated === null) {
    return null;
  }

  return (
    <div className="app">
      {isLoginPage ? (
        <LayoutWithoutSidebar>
          <Routes>
            {publicRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </LayoutWithoutSidebar>
      ) : isAuthenticated ? (
        <LayoutWithSidebar>
          <Routes>
            {protectedRoutes.map(({ path, element }) => (
              <Route
                key={path}
                path={path}
                element={<ProtectedRoute element={element} />}
              />
            ))}
          </Routes>
        </LayoutWithSidebar>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
}

export default App;
