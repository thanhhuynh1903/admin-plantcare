import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  Box,
} from "@mui/material";
import "./CustomerEditPage.scss";
import { showErrorToast, showSuccessToast } from "../../../utils/util_toastify";
import { apostfile } from "../../../utils/util_axios";
import TextFieldPassword from "../../commons/TextFieldPassword/TextFieldPassword";

// Validation Schema using Yup
const validationSchema = yup.object({
  lastName: yup.string().required("Last Name is required"),
  firstName: yup.string().required("First Name is required"),
  dob: yup.string().required("Date of Birth is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  address: yup.string().required("Address is required"),
  contactNumber: yup
    .string()
    .matches(/^[0-9]+$/, "Contact Number must be digits")
    .required("Contact Number is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

export default function CustomerEditPage() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const formik = useFormik({
    initialValues: {
      lastName: "Bozorgi",
      firstName: "Mehrab",
      dob: "19/02/2003",
      email: "Mehrabbozorgi.business@gmail.com",
      address: "33062 Zboncak Isle",
      contactNumber: "58077.79",
      city: "Mehrab",
      state: "Bozorgi",
      password: "sbdfbnd65sfdvb s",
      emailVerified: true,
      passwordVerified: true,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("lastName", values.lastName);
      formData.append("firstName", values.firstName);
      formData.append("dob", values.dob);
      formData.append("email", values.email);
      formData.append("address", values.address);
      formData.append("contactNumber", values.contactNumber);
      formData.append("city", values.city);
      formData.append("state", values.state);
      formData.append("password", values.password);
      formData.append("image", image);

      apostfile("/api/employee/add", formData, (res) => {
        if (res.status === 200) {
          showSuccessToast("Employee added successfully");
        } else {
          showErrorToast(res.data.message);
        }
      });
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="employees-edit-page">
      <p className="main-label">Customer Detail</p>

      <form onSubmit={formik.handleSubmit} className="form-container">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{fontSize:'32px', fontWeight:600,display:'flex',alignItems:'center'}}>Profile customer</div>
          <div>
            <div
              className="input-file-avatar"
              style={{
                backgroundImage: `url(${
                  imagePreview
                    ? imagePreview
                    : "/src/assets/pages/Employees/EmployeesAddPage/ImageUpload.png"
                })`,
              }}
            >
              <input
                type="file"
                id="employees-edit-input-avatar"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />

              <label
                htmlFor="employees-edit-input-avatar"
                className="input-file-avatar-btn"
              >
                <p>Upload</p>
              </label>
            </div>
          </div>
        </div>
        <Box sx={{ display: "flex", gap: 3 }}>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            margin="normal"
            id="firstName"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />

          {/* Form Fields */}
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            margin="normal"
            id="lastName"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />

          {/* <TextField
            label="Date of birth"
            variant="outlined"
            fullWidth
            margin="normal"
            id="dob"
            name="dob"
            value={formik.values.dob}
            onChange={formik.handleChange}
            error={formik.touched.dob && Boolean(formik.errors.dob)}
            helperText={formik.touched.dob && formik.errors.dob}
          /> */}
        </Box>

        {/* Email */}
        <div className="field-with-check">
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </div>

        {/* Address and Contact Number */}
        <TextField
          label="Address"
          variant="outlined"
          fullWidth
          margin="normal"
          id="address"
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
        />

        <TextField
          label="Contact Number"
          variant="outlined"
          fullWidth
          margin="normal"
          id="contactNumber"
          name="contactNumber"
          value={formik.values.contactNumber}
          onChange={formik.handleChange}
          error={
            formik.touched.contactNumber && Boolean(formik.errors.contactNumber)
          }
          helperText={
            formik.touched.contactNumber && formik.errors.contactNumber
          }
        />

        {/* City and State Dropdowns */}
        <div className="dropdown-fields">
          <FormControl fullWidth margin="normal">
            <InputLabel>City</InputLabel>
            <Select
              id="city"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.touched.city && Boolean(formik.errors.city)}
            >
              <MenuItem value="Mehrab">Mehrab</MenuItem>
              {/* Add more cities */}
            </Select>
            {formik.touched.city && formik.errors.city && (
              <p className="error-text">{formik.errors.city}</p>
            )}
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>State</InputLabel>
            <Select
              id="state"
              name="state"
              value={formik.values.state}
              onChange={formik.handleChange}
              error={formik.touched.state && Boolean(formik.errors.state)}
            >
              <MenuItem value="Bozorgi">Bozorgi</MenuItem>
              {/* Add more states */}
            </Select>
            {formik.touched.state && formik.errors.state && (
              <p className="error-text">{formik.errors.state}</p>
            )}
          </FormControl>
        </div>

        {/* Password with Verified Checkmark */}
        <div className="field-with-check">
          <TextFieldPassword
            sx={{ marginTop: "25px" }}
            label="Password"
            variant="outlined"
            fullWidth
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
        <Button variant="outlined" color="error" className="cancel-button">
            Delete
          </Button>
          {/* <Button variant="outlined" color="error" className="cancel-button">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            type="submit"
            className="save-button"
          >
            Save
          </Button> */}
        </div>
      </form>
    </div>
  );
}
