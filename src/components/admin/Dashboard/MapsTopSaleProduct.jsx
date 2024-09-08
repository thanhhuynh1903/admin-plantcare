import React, { useState } from "react";
import "./MapsTopSaleProduct.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

export default function MapsTopSaleProduct() {
  const TreeItems = [
    {
      id: 0,
      name: "Tree 1",
      image: (
        <img
          src="src/assets/pages/Dashboard/TreeSample.png"
          alt="Tree 1"
        />
      ),
      content: <div>Content 1</div>,
      price: 100000,
      currency: "đ",
    },
    {
      id: 1,
      name: "Tree 2",
      image: (
        <img
          src="src/assets/pages/Dashboard/TreeSample.png"
          alt="Tree 2"
        />
      ),
      content: <div>Content 2</div>,
      price: 200000,
      currency: "đ",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % TreeItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? TreeItems.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="dashboard-maps-top-sale-product">
      <div className="controls">
        <div className="controls-container">
          <p className="controls-label">Top sales product</p>
        </div>
        <div className="controls-btn-more">
          <MoreVertIcon className="btn-more" />
        </div>
      </div>
      <div className="chart-container">
        <div className="btn-navigate btn-prev" onClick={handlePrev}>
          <ArrowLeftIcon />
        </div>
        <div className="content">
          {TreeItems[currentIndex].image}
          <p className="content-label">{TreeItems[currentIndex].content}</p>
          <p className="content-price">
            {TreeItems[currentIndex].price}
            {TreeItems[currentIndex].currency}
          </p>
        </div>
        <div className="btn-navigate btn-next" onClick={handleNext}>
          <ArrowRightIcon />
        </div>
      </div>
    </div>
  );
}
