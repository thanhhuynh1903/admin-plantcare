import { useEffect, useState } from "react";
import Tabs from "../commons/Tabs/Tabs";
import {setPageHeadTitle} from "../../utils/util_web";
import "./CalendarPage.scss";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import CalendarViewDay from "./CalendarViewDay";
import CalendarViewMonth from "./CalendarViewMonth";
import CalendarViewYear from "./CalendarViewYear";

export default function CalendarPage() {
  const TabArr = [
    { id: 0, name: "Day" },
    { id: 1, name: "Month" },
    { id: 2, name: "Year" },
  ];

  const [selTab, setSelTab] = useState(TabArr[0]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleChangeTab = (tab, newVal) => {
    setSelTab(TabArr[newVal]);
  };

  const handleMonthChange = (direction) => {
    let newMonth = currentDate.getMonth() + direction;
    let newYear = currentDate.getFullYear();

    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }

    setCurrentDate(new Date(newYear, newMonth));
  };

  const handleSelectMonth = (month) => {
    setCurrentDate(new Date(currentDate.getFullYear(), month));
    setSelTab(TabArr[0]); // Switch to Day view
  };

  const handleSelectYear = (year) => {
    setCurrentDate(new Date(year, currentDate.getMonth()));
    setSelTab(TabArr[1]); // Switch to Month view
  };

  const getRelativeDateLabel = () => {
    const today = new Date();
    const diffYears = currentDate.getFullYear() - today.getFullYear();
    const diffMonths = currentDate.getMonth() - today.getMonth() + diffYears * 12;

    if (diffMonths === 0) {
      return "This month";
    } else if (diffMonths < 0) {
      const absMonths = Math.abs(diffMonths);
      return absMonths < 12
        ? `${absMonths} month${absMonths > 1 ? "s" : ""} ago`
        : `${Math.floor(absMonths / 12)} year${Math.floor(absMonths / 12) > 1 ? "s" : ""} ago`;
    } else {
      return diffMonths < 12
        ? `In ${diffMonths} month${diffMonths > 1 ? "s" : ""}`
        : `In ${Math.floor(diffMonths / 12)} year${Math.floor(diffMonths / 12) > 1 ? "s" : ""}`;
    }
  };

  useEffect(() => {
    setPageHeadTitle("Calendar");
  }, [])

  return (
    <div className="page-calendar">
      <p className="main-label">Calendar</p>
      <div className="content">
        <div className="header">
          <p>{getRelativeDateLabel()}</p>
          <div className="date-control">
            <ArrowLeftIcon className="btn-nav btn-prev" onClick={() => handleMonthChange(-1)} />
            <p className="date-label">{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</p>
            <ArrowRightIcon className="btn-nav btn-next" onClick={() => handleMonthChange(1)} />
          </div>
          <Tabs
            items={TabArr}
            index={selTab.id}
            handleChange={handleChangeTab}
          />
        </div>
        {selTab.id === 0 && <CalendarViewDay currentDate={currentDate} />}
        {selTab.id === 1 && <CalendarViewMonth currentDate={currentDate} onSelectMonth={handleSelectMonth} />}
        {selTab.id === 2 && <CalendarViewYear currentDate={currentDate} onSelectYear={handleSelectYear} />}
      </div>
    </div>
  );
}
