import { useEffect } from "react";
import "./DashboardPage.scss";
import { setPageHeadTitle } from "../../utils/util_web";
import SideBar from "../commons/SideBar/SideBar";
import { Routes, Route } from "react-router-dom";

export default function DashboardPage() {
  useEffect(() => {
    setPageHeadTitle("Dashboard");
  }, []);

  return (
    <div className="page-dashboard">


    </div>
  );
}
