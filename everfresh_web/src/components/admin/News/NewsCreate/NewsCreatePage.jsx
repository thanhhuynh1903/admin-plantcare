import "./NewsCreatePage.scss";

import Button from "@mui/material/Button";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { Link } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import TextFieldBasic from "../../commons/TextFieldBasic/TextFieldBasic";
import { useEffect, useState } from "react";
import SelectField from "../../commons/SelectField/SelectField";
import TextEditor from "../../commons/TextEditor/TextEditor";
import { setPageHeadTitle } from "../../../utils/util_web";
import Checkbox from "../../commons/Checkbox/Checkbox";

export default function NewsCreatePage() {
  const TAGS = ["Tech", "Business", "Science"];

  const [tagList, setTagList] = useState([]);
  const [tag, setTag] = useState(null);

  const handleTagChange = (event) => {
    setTag(tagList[event.target.value]);
  };

  useEffect(() => {
    const tags = TAGS.map((tag, i) => ({ prop: i, value: tag }));
    setTagList(tags);
    setTag(tags[0]);

    setPageHeadTitle("Create new article");
  }, []);

  return (
    <div className="news-create-page">
      <div className="main-label">
        <Button component={Link} to="/news">
          <ArrowCircleLeftOutlinedIcon className="btn-back" />
        </Button>
        <p>News - Create new article</p>
      </div>

      <div className="content">
        {/* Title Section */}
        <p className="title-label">Title</p>
        <div className="title-section">
          <FormControl className="tags-select">
            {tag && (
              <SelectField
                prop={tag?.prop}
                items={tagList}
                onChange={handleTagChange}
              />
            )}
          </FormControl>
          <TextFieldBasic
            className="title-input"
            id="news-title"
            variant="outlined"
            placeholder="Enter title here..."
            fullWidth
          />
        </div>

        {/* Content Editor */}
        <div className="editor-label">
          <p className="title-label">Contents</p>
          <Button className="btn-use-template">Use template</Button>
        </div>

        <div className="editor-section">
          <TextEditor />
        </div>

        {/* Options Section */}
        <div className="options-section">
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="Silent publish from email (no broadcast)"
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Also broadcast it on Facebook"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Also broadcast it on X"
            />
            <FormControlLabel control={<Checkbox />} label="Private article" />
          </FormGroup>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <Button variant="contained" className="save-draft-btn">
            Save as draft
          </Button>
          <Button variant="contained" color="success" className="publish-btn">
            Publish new page
          </Button>
        </div>
      </div>
    </div>
  );
}
