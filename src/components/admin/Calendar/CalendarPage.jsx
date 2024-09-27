import { useState } from "react";
import Tabs from "../commons/Tabs/Tabs";
import "./CalendarPage.scss";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import CalendarViewDay from "./CalendarViewDay";

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

  return (
    <div className="page-calendar">
      <p className="main-label">Calendar</p>
      <div className="content">
        <div className="header">
          <p>Today</p>
          <div className="date-control">
            <ArrowLeftIcon className="btn-nav btn-prev" onClick={() => handleMonthChange(-1)} />
            <p>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</p>
            <ArrowRightIcon className="btn-nav btn-next" onClick={() => handleMonthChange(1)} />
          </div>
          <Tabs
            items={TabArr}
            index={selTab.id}
            handleChange={handleChangeTab}
          />
        </div>
        <CalendarViewDay currentDate={currentDate} />
      </div>
    </div>
  );
}
