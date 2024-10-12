import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
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
import SettingsPage from "./components/admin/Settings/SettingsPage";
import CalendarPage from "./components/admin/Calendar/CalendarPage";
import CalendarDetailPage from "./components/admin/Calendar/CalendarDetail/CalendarDetailPage";
import ReviewsGrid from "./components/admin/Reviews/ReviewsGrid";
import ReviewDetail from "./components/admin/Reviews/ReviewDetail";
import NewsPage from "./components/admin/News/NewsPage";
import NewsCreatePage from "./components/admin/News/NewsCreate/NewsCreatePage";
import NewsEditPage from "./components/admin/News/NewsEdit/NewsEditPage";
import CustomerHomepage from "./components/admin/Customer/CustomerHomepage/CustomerHomepage";
import CustomerEditPage from "./components/admin/Customer/CustomerEditpage/CustomerEditPage";
import TicketsPage from "./components/admin/Tickets/TicketsPage";
import TicketsCreateManualPage from "./components/admin/Tickets/TicketsCreateManual/TicketsCreateManualPage";
import TicketsDetailPage from "./components/admin/Tickets/TicketsDetail/TicketsDetailPage";

import "./App.scss";
import SearchProductPage from "./components/admin/Search/SearchProduct/SearchProductPage";
import PlantersHomepage from "./components/admin/Planters/PlantersHomePage";
import PlantersDetailPage from "./components/admin/Planters/PlantersDetail/PlantersDetailPage";
import PlantsHomepage from "./components/admin/Plants/PlantsHomePage";
import PlantsDetailPage from "./components/admin/Plants/PlantsDetail/PlantsDetailPage";

const ProtectedRoute = ({ element, ...rest }) => {
  const token = getCookie("e_token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return element;
};

const LayoutWithSidebar = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    const contentMain = document.querySelector(".content-main");
    if (contentMain) {
      const timer = setInterval(() => {
        if (contentMain.scrollTop === 0) {
          clearInterval(timer);
        } else {
          contentMain.scrollTop = 0;
        }
      }, 50);
    }
  }, [location]);

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
const publicRoutes = [{ path: "/login", element: <LoginPage /> }];

const protectedRoutes = [
  { path: "*", element: <Navigate to="/" /> },
  { path: "/", element: <Navigate to="/dashboard" /> },
  { path: "/dashboard", element: <DashboardPage /> },
  { path: "/employees", element: <EmployeesHomePage /> },
  { path: "/plants", element: <PlantsHomepage /> },
  { path: "/plants/p/:id", element: <PlantsDetailPage /> },
  { path: "/planters", element: <PlantersHomepage /> },
  { path: "/planters/p/:id", element: <PlantersDetailPage /> },
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
  { path: "/searches/products/:query", element: <SearchProductPage /> },
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

  if (isAuthenticated && isLoginPage) {
    return <Navigate to="/" />;
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
