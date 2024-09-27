import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import TextFieldBasic from "../commons/TextFieldBasic/TextFieldBasic";
import "./SettingsPage.scss";
import SelectField from "../commons/SelectField/SelectField";
import {
  callSaveAPI,
  getCountryLanguageById,
  getCountryLanguages,
  getTimeZoneById,
  getTimeZones,
} from "./SettingsPage.prop";
import TextAreaBasic from "../commons/TextAreaBasic/TextAreaBasic";
import SwitchBasic from "../commons/SwitchBasic/SwitchBasic";
import { setPageHeadTitle } from "../../utils/util_web";

export default function SettingsPage() {
	const [logo, setLogo] = useState("/src/assets/logo.png");

  const [timeZone, setTimeZone] = useState(getTimeZones()[0]);
  const [countryLanguage, setCountryLanguage] = useState(
    getCountryLanguages()[0]
  );

  const [storageData, setStorageData] = useState({
    name: "Amazon S3",
    totalStorage: "200MB/1TB",
    avgResponseTime: "1.0ms",
    fileReadSpeed: "10MB/s",
    fileWriteSpeed: "700MB/s",
    performanceDataCPU: {
      val: "100MB",
      percentage: 40,
    },
    performanceDataRAM: {
      val: "100MB",
      percentage: 80,
    },
    performanceDataBandwidth: {
      val: "100kb/s",
      percentage: 25,
    },
  });
  const [maintenance, setMaintenance] = useState({
    active: false,
    reason: "",
  });

	const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result); // Set the image URL
      };
      reader.readAsDataURL(file);
    }
  };

  const saveChanges = () => {
    callSaveAPI();
  };

	useState(() => {
		setPageHeadTitle("System configuration")
	}, [])

  useState((p) => {}, [timeZone, countryLanguage]);

  return (
    <div className="page-settings">
      {/* Header */}
      <p className="main-label">System configuration</p>
      <Button variant="contained" className="btn-save" onClick={saveChanges}>
        Save settings
      </Button>

			<Box className="settings-card">
      <div className="card-content-grid">
        <div>
          <p className="card-title">General settings</p>
          <div className="content-field">
            <p className="label">Application name</p>
            <TextFieldBasic />
          </div>
          <div className="content-field">
            <p className="label">Default system timezone</p>
            <SelectField
              prop={timeZone.prop}
              items={getTimeZones()}
              onChange={(e) => {
                setTimeZone(getTimeZoneById(e.target.value));
              }}
            />
          </div>
          <div className="content-field">
            <p className="label">Default country language</p>
            <SelectField
              prop={countryLanguage.prop}
              items={getCountryLanguages()}
              onChange={(e) => {
                setCountryLanguage(getCountryLanguageById(e.target.value));
              }}
            />
          </div>
        </div>
        <div>
          <p className="card-title">Logo</p>
          <div className="logo-upload">
            <img src={logo} alt="Logo" className="logo-image" />
            <Button
              className="btn-logo-upload"
              onClick={() => document.getElementById("logo-upload-input").click()}
            >
              Change logo
            </Button>
            <input
              id="logo-upload-input"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleLogoUpload}
            />
          </div>
        </div>
      </div>
    </Box>

      {/* Performance Monitor Section */}
      <Box className="settings-card">
        <div className="card-content-grid">
          <div>
            <p className="card-title">Performance monitor</p>
            <div className="performance-content">
              <div
                id="performance-stat-cpu"
                style={{
                  background: `conic-gradient(red ${storageData.performanceDataCPU.percentage}%, #e4e4e4 ${storageData.performanceDataCPU.percentage}%)`,
                }}
              ></div>
              <div
                id="performance-stat-ram"
                style={{
                  background: `conic-gradient(green ${storageData.performanceDataRAM.percentage}%, #e4e4e4 ${storageData.performanceDataRAM.percentage}%)`,
                }}
              ></div>
              <div
                id="performance-stat-bandwidth"
                style={{
                  background: `conic-gradient(blue ${storageData.performanceDataBandwidth.percentage}%, #e4e4e4 ${storageData.performanceDataBandwidth.percentage}%)`,
                }}
              ></div>

              <div id="performance-stats">
                <div>
                  <p className="performance-value">
                    {storageData.performanceDataCPU.val}
                  </p>
                  <div className="performance-label">
                    <div
                      className="performance-label-color"
                      style={{ backgroundColor: "red" }}
                    ></div>
                    <span>CPU</span>
                  </div>
                </div>
                <div>
                  <p className="performance-value">
                    {storageData.performanceDataRAM.val}
                  </p>
                  <div className="performance-label">
                    <div
                      className="performance-label-color"
                      style={{ backgroundColor: "green" }}
                    ></div>
                    <span>RAM</span>
                  </div>
                </div>
                <div>
                  <p className="performance-value">
                    {storageData.performanceDataBandwidth.val}
                  </p>
                  <div className="performance-label">
                    <div
                      className="performance-label-color"
                      style={{ backgroundColor: "blue" }}
                    ></div>
                    <span>Bandwidth</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="card-title">Storages</p>
            <p className="storage-name">Now using: {storageData.name}</p>
            <div className="storage-grid">
              <div>
                <p className="storage-label">Total storage</p>
                <p className="storage-value">{storageData.totalStorage}</p>
              </div>
              <div>
                <p className="storage-label">Average response time</p>
                <p className="storage-value">{storageData.avgResponseTime}</p>
              </div>
            </div>
            <div className="storage-grid">
              <div>
                <p className="storage-label">File read speed</p>
                <p className="storage-value">{storageData.fileReadSpeed}</p>
              </div>
              <div>
                <p className="storage-label">File write speed</p>
                <p className="storage-value">{storageData.fileWriteSpeed}</p>
              </div>
            </div>
          </div>
        </div>
      </Box>
      <Box className="settings-card">
        <div className="card-content-grid">
          <div>
            <p className="card-title">Maintenance mode</p>
            <div className="content-field">
              <p className="label">Set maintenance status</p>
              <SwitchBasic />
            </div>
            <div className="content-field">
              <p className="label">Set reason for maintenance</p>
              <TextAreaBasic
                value={maintenance.reason}
                onChange={(e) =>
                  setMaintenance({ ...maintenance, reason: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
}
