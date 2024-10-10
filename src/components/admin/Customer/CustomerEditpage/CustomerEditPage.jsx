import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Modal,
} from "@mui/material";
import "./CustomerEditPage.scss";
import { showErrorToast, showSuccessToast } from "../../../utils/util_toastify";
import { apostfile } from "../../../utils/util_axios";
import TextFieldPassword from "../../commons/TextFieldPassword/TextFieldPassword";
import ModalDelete from "../ModalDelete/ModalDelete";
import logo from "@assets/pages/Employees/EmployeesAddPage/ImageUpload.png";
import { aget } from "../../../utils/util_axios";
import { useParams } from "react-router-dom";

// Validation schema removed since we're not using formik anymore

export default function CustomerEditPage() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState({});
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    dob: "",
    email: "",
    address: "",
    contactNumber: "",
    city: "",
    state: "",
    password: "",
  });

  let { userId } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    fetchUserId();
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  const fetchUserId = async () => {
    try {
      const response = await aget(`/users/${userId}`);
      const userData = response.data;
      setProfile(userData);
      setFormData({
        lastName: userData?.name?.split(" ")[0] || "",
        firstName: userData?.name?.split(" ")[1] || "",
        dob: formatDate(userData.createdAt),
        email: userData.email || "",
        address: "33062 Zboncak Isle",
        contactNumber: "58077.79",
        city: "Mehrab",
        state: "Bozorgi",
        password: userData.password || "",
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("lastName", formData.lastName);
    data.append("firstName", formData.firstName);
    data.append("dob", formData.dob);
    data.append("email", formData.email);
    data.append("address", formData.address);
    data.append("contactNumber", formData.contactNumber);
    data.append("city", formData.city);
    data.append("state", formData.state);
    data.append("password", formData.password);
    data.append("image", image);

    // Implement the submission logic here
    // For example, you could call the API to update the user
    try {
      await apostfile("/users/update", data); // Adjust the endpoint accordingly
      showSuccessToast("User updated successfully!");
    } catch (error) {
      showErrorToast("Failed to update user.");
    }
  };

  return (
    <div className="employees-edit-page">
      <p className="main-label">Customer Detail</p>

      <form onSubmit={handleSubmit} className="form-container">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              fontSize: "32px",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
            }}
          >
            Profile customer
          </div>
          <div>
            <div
              className="input-file-avatar"
              style={{
                backgroundImage: `url(${imagePreview ? imagePreview : logo})`,
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
            value={formData.firstName}
            onChange={handleChange}
            // Add error handling if needed
          />

          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            margin="normal"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            // Add error handling if needed
          />

          <TextField
            label="Date of birth"
            variant="outlined"
            fullWidth
            margin="normal"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            // Add error handling if needed
          />
        </Box>

        {/* Email */}
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          // Add error handling if needed
        />

        {/* Address and Contact Number */}
        <TextField
          label="Address"
          variant="outlined"
          fullWidth
          margin="normal"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          // Add error handling if needed
        />

        <TextField
          label="Contact Number"
          variant="outlined"
          fullWidth
          margin="normal"
          id="contactNumber"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          // Add error handling if needed
        />

        {/* City and State Dropdowns */}
        <div className="dropdown-fields">
          <FormControl fullWidth margin="normal">
            <InputLabel>City</InputLabel>
            <Select
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
            >
              <MenuItem value="Mehrab">Mehrab</MenuItem>
              {/* Add more cities */}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>State</InputLabel>
            <Select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
            >
              <MenuItem value="Bozorgi">Bozorgi</MenuItem>
              {/* Add more states */}
            </Select>
          </FormControl>
        </div>

        {/* Password with Verified Checkmark */}
        <TextFieldPassword
          sx={{ marginTop: "25px" }}
          label="Password"
          variant="outlined"
          fullWidth
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          // Add error handling if needed
        />

        {/* Action Buttons */}
        <div className="action-buttons">
          <Button
            variant="outlined"
            color="error"
            className="cancel-button"
            onClick={handleOpen}
          >
            Delete
          </Button>

          {/* <Button variant="contained" color="success" type="submit" className="save-button">
            Save
          </Button> */}

          <Modal open={open} onClose={handleClose}>
            <ModalDelete open={open} onClose={handleClose} />
          </Modal>
        </div>
      </form>
    </div>
  );
}
