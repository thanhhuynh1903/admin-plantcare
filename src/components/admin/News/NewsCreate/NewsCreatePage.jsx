import "./NewsCreatePage.scss";

import Button from "@mui/material/Button";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { Link } from "react-router-dom";

export default function NewsCreatePage() {
  return (
    <div className="news-create-page">
      <div className="main-label">
        <Button component={Link} to="/news">
          <ArrowCircleLeftOutlinedIcon className="btn-back" />
        </Button>
        <p>Create news</p>
      </div>
    </div>
  );
}
