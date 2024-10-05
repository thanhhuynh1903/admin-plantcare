import "./App.scss";
import { Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./components/admin/Login/LoginPage/LoginPage";
import DashboardPage from "./components/admin/Dashboard/DashboardPage";
import SideBar from "./components/admin/commons/SideBar/SideBar";
import NavBar from "./components/admin/commons/NavBar/Navbar";
import EmployeesHomePage from "./components/admin/Employees/EmployeeHomePage/EmployeesHomePage";
import EmployeeAddPage from "./components/admin/Employees/EmployeeAddPage/EmployeeAddPage";
import EmployeesEditPage from "./components/admin/Employees/EmployeesEditPage/EmployeesEditPage";
import OrderHomePage from "./components/admin/Orders/OrderHomePage";
import { useEffect } from "react";
import SettingsPage from "./components/admin/Settings/SettingsPage";
import OrderDetail from "./components/admin/Orders/OrderDetail";
import CalendarPage from "./components/admin/Calendar/CalendarPage";
import ReviewsGrid from "./components/admin/Reviews/ReviewsGrid";
import CalendarDetailPage from "./components/admin/Calendar/CalendarDetail/CalendarDetailPage";
import NewsPage from "./components/admin/News/NewsPage";
import NewsCreatePage from "./components/admin/News/NewsCreate/NewsCreatePage";
import NewsEditPage from "./components/admin/News/NewsEdit/NewsEditPage";
import ReviewDetail from "./components/admin/Reviews/ReviewDetail";
// import ReviewsTable from "./components/admin/Reviews/ReviewsTable";
import CustomerHomepage from "./components/admin/Customer/CustomerHomepage/CustomerHomepage";
import CustomerEditPage from "./components/admin/Customer/CustomerEditpage/CustomerEditPage";

const LayoutWithSidebar = ({ children }) => {

  useEffect(() => {
    const resetScroll = () => {
      const contentMain = document.querySelector('.content-main')
      if (contentMain) {
        setTimeout(() => {
          contentMain.scrollTop = 0
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
            <Route path="/customers" element={<CustomerHomepage />} />
            <Route path="/customers/edit/:id" element={<CustomerEditPage />} />
            <Route path="/employees/add" element={<EmployeeAddPage />} />
            <Route path="/orders/orderdetail" element={<OrderDetail />} />
            <Route path="/employees/edit/:id" element={<EmployeesEditPage />} />
            <Route path="/orders" element={<OrderHomePage />} />
            <Route path="/reviews" element={<ReviewsGrid />} />
            <Route path="/reviews/detail" element={<ReviewDetail />} />
            <Route path='/settings' element={<SettingsPage />}></Route>
            <Route path='/calendar' element={<CalendarPage />}></Route>
            <Route path='/calendar/:date' element={<CalendarDetailPage />}></Route>
            <Route path='/news' element={<NewsPage />}></Route>
            <Route path="/news/create" element={<NewsCreatePage />} />
            <Route path='/news/edit/:id' element={<NewsEditPage />} />
          </Routes>
        </LayoutWithSidebar>
      )}
    </div>
  );
}

export default App;
