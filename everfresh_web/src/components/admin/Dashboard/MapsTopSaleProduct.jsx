import React, { useEffect, useState } from "react";
import "./MapsTopSaleProduct.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { formatNumber } from "../../utils/util_string";

export default function MapsTopSaleProduct({ topSaleItems = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % topSaleItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? topSaleItems.length - 1 : prevIndex - 1
    );
  };

  const getCurrentItem = () => {
    const currentItem = topSaleItems[currentIndex];
    return {
      image: currentItem?.image || "",
      name:
        currentItem?.name && currentItem.name.en
          ? currentItem.name.en
          : currentItem?.name || "",
      description: currentItem?.description || "",
      price: currentItem?.price || 0,
      currency: currentItem?.currency || "",
    };
  };

  useEffect(() => {
    setCurrentIndex(0);
  }, [topSaleItems]);

  return (
    <div className="dashboard-maps-top-sale-product">
      <div className="controls">
        <div className="controls-container">
          <p className="controls-label">Top Sales Product</p>
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
          <div
            className="content-image"
            style={{
              width: "150px",
              height: "150px",
              backgroundImage: `url(${getCurrentItem().image})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          ></div>
          <p className="content-label">{getCurrentItem().name}</p>
          <p className="content-description">{getCurrentItem().description}</p>
          <p className="content-price">
            {formatNumber(getCurrentItem().price)} {getCurrentItem().currency}
          </p>
        </div>
        <div className="btn-navigate btn-next" onClick={handleNext}>
          <ArrowRightIcon />
        </div>
      </div>
    </div>
  );
}

