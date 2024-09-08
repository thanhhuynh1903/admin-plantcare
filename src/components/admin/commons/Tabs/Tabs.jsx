import "./Tabs.scss";
import { Tabs as MuiTabs, Tab as MuiTab } from "@mui/material";
import { useState } from "react";

export default function Tabs({ items = [], index, handleChange = () => {}, sx = {} }) {
    
  return (
    <MuiTabs className='common-tabs' value={index} onChange={handleChange} centered style={sx}>
      {items.map((item, i) => (
        <MuiTab key={i} label={item.name} />
      ))}
    </MuiTabs>
  );
}
