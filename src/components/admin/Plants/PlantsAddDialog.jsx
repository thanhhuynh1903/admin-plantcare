import { useState, useMemo, useEffect } from "react";
import {
  Button,
  TextField,
  DialogActions,
  Grid,
  Input,
  Autocomplete,
} from "@mui/material";
import DialogBasic from "../commons/DialogBasic/DialogBasic";
import "./PlantsAddDialog.scss";
import { aget, apost } from "../../utils/util_axios";
import { showErrorToast, showSuccessToast } from "../../utils/util_toastify";
import { uploadFileAndReturnUrl } from "@supabase_client";
import { uuidv4 } from "../../utils/util_string";

const plantFields = [
  { label: "Name", name: "name", section: "Basic Details" },
  { label: "Sub Name", name: "sub_name", section: "Basic Details" },
  {
    label: "Genus ID",
    name: "genus_id",
    type: "select",
    section: "Classification",
  },
  {
    label: "Plant Type ID",
    name: "plant_type_id",
    type: "select",
    section: "Classification",
  },
  { label: "Image", name: "img_url", section: "Media" },
  { label: "Video URL", name: "video_url", section: "Media" },
  { label: "Price", name: "price", type: "number", section: "Pricing" },
  { label: "Height", name: "height", type: "number", section: "Dimensions" },
  { label: "Width", name: "width", type: "number", section: "Dimensions" },
  { label: "Zones", name: "zones", section: "Environmental Needs" },
  { label: "Uses", name: "uses", section: "Environmental Needs" },
  { label: "Tolerance", name: "tolerance", section: "Environmental Needs" },
  { label: "Bloom Time", name: "bloom_time", section: "Environmental Needs" },
  { label: "Light", name: "light", section: "Environmental Needs" },
  { label: "Moisture", name: "moisture", section: "Environmental Needs" },
  { label: "Maintenance", name: "maintenance", section: "Care Instructions" },
  { label: "Growth Rate", name: "growth_rate", section: "Care Instructions" },
  {
    label: "Seasonal Interest",
    name: "plant_seasonal_interest",
    section: "Care Instructions",
  },
  { label: "Description", name: "describe", section: "Care Instructions" },
  {
    label: "Noteworthy Characteristics",
    name: "noteworthy_characteristics",
    section: "Care Instructions",
  },
  { label: "Care", name: "care", section: "Care Instructions" },
  { label: "Propagation", name: "propagation", section: "Care Instructions" },
  { label: "Problems", name: "problems", section: "Care Instructions" },
  { label: "Water", name: "water", section: "Care Instructions" },
  { label: "Humidity", name: "humidity", section: "Care Instructions" },
  { label: "Fertilizer", name: "fertilizer", section: "Care Instructions" },
  { label: "Size", name: "size", section: "Dimensions" },
];

export default function PlantsAddDialog({
  open,
  onClose,
  onFinish,
  fields = plantFields,
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [genusList, setGenusList] = useState([]);
  const [plantTypeList, setPlantTypeList] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const initialFormData = useMemo(
    () => fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {}),
    [fields]
  );

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview("");
    }
  };

  const isFormValid = useMemo(() => {
    return (
      formData.name.trim() !== "" &&
      formData.genus_id !== "" &&
      imageFile != null &&
      formData.plant_type_id !== "" && 
      formData.price !== ""
    );
  }, [formData, imageFile]);

  const handleSubmit = () => {
    setIsProcessing(true);

    uploadFileAndReturnUrl(`/public/plants/${uuidv4()}.jpg`, imageFile)
      .then((url) => {
        const finalForm = {
          ...formData,
          img_url: [url],
        };

        console.log(finalForm);

        return apost('/plants', finalForm);
      })
      .then(() => {
        showSuccessToast("Plant added successfully!");
        onFinish()
        onClose();
      })
      .catch((err) => {
        const status = err?.response?.status;
        if (status === 403) {
          showErrorToast("No permission to use this!");
        } else {
          showErrorToast("Error adding plant.");
        }
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  useEffect(() => {
    if (open) {
      aget("/genus")
        .then((res) => {
          setGenusList(res.data);
          console.log(res.data)
        })
        .catch((err) => {
          console.error(err);
        });

      aget("/plant-types").then((res) => {
        setPlantTypeList(res.data);
        console.log(res.data)
      });
    }
  }, [open]);

  const groupedFields = fields.reduce((acc, field) => {
    const { section } = field;
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(field);
    return acc;
  }, {});

  return (
    <DialogBasic
      className="plants-add-dialog"
      title="Add New Item"
      open={open}
      onClose={onClose}
      footer={
        <DialogActions>
          <Button
            onClick={onClose}
            color="secondary"
            className="btn-cancel"
            disabled={isProcessing}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            className="btn-save"
            disabled={isProcessing || !isFormValid}
          >
            Save
          </Button>
        </DialogActions>
      }
    >
      <div className="add-item-dialog">
        <Grid container spacing={2}>
          {Object.keys(groupedFields).map((sectionTitle, sectionIndex) => (
            <Grid item xs={12} key={sectionIndex}>
              <div className="section-title">{sectionTitle}</div>
              <Grid container spacing={2}>
                {groupedFields[sectionTitle].map((field, index) => (
                  <Grid item xs={12} sm={field.gridSize || 6} key={index}>
                    {field.name === "genus_id" && genusList ? (
                      <Autocomplete
                        options={genusList}
                        getOptionLabel={(option) => option?.name}
                        onChange={(e, value) =>
                          handleSelectChange("genus_id", value ? value._id : "")
                        }
                        renderInput={(params) => (
                          <TextField {...params} label="Genus" fullWidth />
                        )}
                      />
                    ) : field.name === "plant_type_id" && plantTypeList ? (
                      <Autocomplete
                        options={plantTypeList}
                        getOptionLabel={(option) => option?.plant_type_name}
                        onChange={(e, value) =>
                          handleSelectChange(
                            "plant_type_id",
                            value ? value._id : ""
                          )
                        }
                        renderInput={(params) => (
                          <TextField {...params} label="Plant Type" fullWidth />
                        )}
                      />
                    ) : field.name === "img_url" ? (
                      <>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          fullWidth
                        />
                        {imagePreview && (
                          <img
                            src={imagePreview}
                            alt="Preview"
                            style={{ marginTop: 10, maxHeight: 100 }}
                          />
                        )}
                      </>
                    ) : (
                      <TextField
                        label={field.label}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        type={field.type || "text"}
                        fullWidth
                      />
                    )}
                  </Grid>
                ))}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </div>
    </DialogBasic>
  );
}
