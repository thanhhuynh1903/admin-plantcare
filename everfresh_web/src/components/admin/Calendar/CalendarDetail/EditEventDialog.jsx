import React from "react";
import { DialogContent, Button, TextField, MenuItem, Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { Formik, Form } from "formik";
import DialogBasic from "../../commons/DialogBasic/DialogBasic";
import * as Yup from "yup";
import "./EditEventDialog.scss";

const tags = ["Custom", "Important", "News", "Optional", "Event"];

// Yup validation schema
const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  startTime: Yup.date().required("Start time is required").nullable(),
  endTime: Yup.date()
    .required("End time is required")
    .nullable()
    .min(Yup.ref("startTime"), "End time cannot be before start time"),
});

export default function EditEventDialog({
  open,
  onClose,
  onSubmit,
  initialEvent,
}) {
  const isEdit = Boolean(initialEvent)

  return (
    <DialogBasic
      title={isEdit ? "Edit Event" : "Add Event"}
      open={open}
      onClose={onClose}
      className="calendar-edit-event-dialog"
      maxWidth={"sm"}
      footer={
        <>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">{isEdit ? "Save Changes" : "Add Event"}</Button>
        </>
      }
    >
      <Formik
        initialValues={{
          title: initialEvent?.title || "",
          description: initialEvent?.description || "",
          tag: initialEvent?.tag || "Custom",
          startTime: initialEvent?.startTime || null,
          endTime: initialEvent?.endTime || null,
          location: initialEvent?.location || "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          onSubmit(values); // Call onSubmit for both add and edit actions
          onClose();
          setSubmitting(false);
        }}
      >
        {({
          values,
          setFieldValue,
          handleChange,
          handleSubmit,
          touched,
          errors,
        }) => (
          <Form onSubmit={handleSubmit}>
            <DialogContent>
              {/* Title */}
              <TextField
                fullWidth
                name="title"
                label="Title"
                value={values.title}
                onChange={handleChange}
                error={touched.title && Boolean(errors.title)}
                helperText={touched.title && errors.title}
                margin="normal"
              />

              {/* Description */}
              <TextField
                fullWidth
                name="description"
                label="Description"
                multiline
                rows={4}
                value={values.description}
                onChange={handleChange}
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
                margin="normal"
              />

              {/* Tag */}
              <TextField
                fullWidth
                select
                name="tag"
                label="Tag"
                value={values.tag}
                onChange={handleChange}
                margin="normal"
              >
                {tags.map((tag) => (
                  <MenuItem key={tag} value={tag}>
                    {tag}
                  </MenuItem>
                ))}
              </TextField>

              {/* Date and Time Pickers */}
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 2,
                  }}
                >
                  {/* Start Time */}
                  <DateTimePicker
                    label="Start Time"
                    value={values.startTime}
                    onChange={(newValue) =>
                      setFieldValue("startTime", newValue)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        margin="normal"
                        error={touched.startTime && Boolean(errors.startTime)}
                        helperText={touched.startTime && errors.startTime}
                      />
                    )}
                  />

                  {/* End Time */}
                  <DateTimePicker
                    label="End Time"
                    value={values.endTime}
                    onChange={(newValue) => setFieldValue("endTime", newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        margin="normal"
                        error={touched.endTime && Boolean(errors.endTime)}
                        helperText={touched.endTime && errors.endTime}
                      />
                    )}
                  />
                </Box>
              </LocalizationProvider>

              {/* Location */}
              <TextField
                fullWidth
                name="location"
                label="Location (Optional)"
                value={values.location}
                onChange={handleChange}
                margin="normal"
              />
            </DialogContent>
          </Form>
        )}
      </Formik>
    </DialogBasic>
  );
}
