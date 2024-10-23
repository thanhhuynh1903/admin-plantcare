import React, { useState, useEffect } from "react";

import "./VariantsPage.scss";
import { setPageHeadTitle } from "../../utils/util_web";
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import { Link, redirect } from "react-router-dom";
import { Box } from "@mui/material";
import ParkIcon from '@mui/icons-material/Park';
import ForestIcon from '@mui/icons-material/Forest';
import DynamicFormIcon from '@mui/icons-material/DynamicForm';

const items = [
  {
    id: 1,
    name: "Plant genus",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...",
    count: 25,
    redirect: "genus",
    icon: <ForestIcon />
  },
  {
    id: 2,
    name: "Plant types",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...",
    count: 20,
    redirect: "plant-types",
    icon: <ParkIcon />
  },
  {
    id: 3,
    name: "Form templates",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...",
    count: 0,
    redirect: "form-templates",
    icon: <DynamicFormIcon />
  }
]

export default function VariantsPage() {

  useEffect(() => {
    setPageHeadTitle("Variants");
  }, []);

  return (
    <div className="page-variants">
      <div className="main-label">
        <CategoryOutlinedIcon />
        <p>Variants</p>
      </div>
      <div className="content">
        <p className="title">Choose a variant</p>
        {
          items.map((item) => (
            <Box className="item" key={item.id} component={Link} to={`/variants/${item.redirect}`}>
              <div>
                <div className="item-title">
                  <div className="item-icon">{item.icon}</div>
                  <p className="item-name">{item.name}</p>
                </div>
                <p className="item-description">{item.description}</p>
              </div>
              <div>
                <p>{item.count || 0}</p>
              </div>
            </Box>
          ))
        }
      </div>
    </div>
  );
}
