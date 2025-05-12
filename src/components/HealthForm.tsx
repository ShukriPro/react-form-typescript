import { useState } from "react";

function HealthForm() {
  const [health, setHealth] = useState(() => {
    return JSON.parse(localStorage.getItem("health") || "{}");
  });

  const updateHealth = (key: string, value: string) => {
    const updated = { ...health, [key]: value };
    setHealth(updated);
    localStorage.setItem("health", JSON.stringify(updated));
  };

  return (
    <form>
      {/* Personal Information Section */}
      <div className="p-3 border bg-light text-center">
        <h6 className="fw-bold mb-1">New Patient Health Questionnaire</h6>
        <p className="text-muted small mb-0">
          Welcome to the Health Hub Project. This questionnaire is to help us to get to know your medical history. We recommend anybody over the age of 25, or who has a significant medical history to book an introductory New Patient Health check.
        </p>
      </div>

      {/* Female Patients Section */}
      {health.familyHistory === "Yes" && (
        <div className="p-3 border bg-light">

          {/* Aged 20-70 (Date of Last Smear) */}
          <h6 className="fw-bold mb-3">Female Patients</h6>
          <div className="row mb-3 align-items-center">
            <div className="col-md-5 fw-bold">Aged 20-70 yrs (date of last smear)</div>
            <div className="col-md-7">
              <input
                type="text"
                className="form-control"
                placeholder="dd/mm/yyyy"
                value={health.lastSmear || ""}
                onChange={(e) => {
                  const updated = { ...health, lastSmear: e.target.value };
                  setHealth(updated);
                  localStorage.setItem("health", JSON.stringify(updated));
                }}
              />
            </div>
          </div>

          {/* Aged 45-70 (Date of Last Mammogram) */}
          <div className="row mb-3 align-items-center">
            <div className="col-md-5 fw-bold">Aged 45-70 yrs (date of last mammogram)</div>
            <div className="col-md-7">
              <input
                type="text"
                className="form-control"
                placeholder="dd/mm/yyyy"
                value={health.lastMammogram || ""}
                onChange={(e) => {
                  const updated = { ...health, lastMammogram: e.target.value };
                  setHealth(updated);
                  localStorage.setItem("health", JSON.stringify(updated));
                }}
              />
            </div>
          </div>

          {/* Decline to Have */}
          <div className="row mb-3 align-items-center">
            <div className="col-md-5 fw-bold">OR please state if you DECLINE to have them</div>
            <div className="col-md-7">
              <input
                type="text"
                className="form-control"
                placeholder="Enter reason to decline"
                value={health.declineReason || ""}
                onChange={(e) => {
                  const updated = { ...health, declineReason: e.target.value };
                  setHealth(updated);
                  localStorage.setItem("health", JSON.stringify(updated));
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Personal Information Section */}
      <div className="p-3 border bg-light">
        <h6 className="fw-bold mb-3">Personal Details</h6>

        <div className="mb-3">
          <label className="form-label">Height (cm) <span className="text-danger">*</span></label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter height"
            value={health.height || ""}
            onChange={(e) => updateHealth("height", e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Weight (kg) <span className="text-danger">*</span></label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter weight"
            value={health.weight || ""}
            onChange={(e) => updateHealth("weight", e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Your main or first language <span className="text-danger">*</span></label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter language"
            value={health.language || ""}
            onChange={(e) => updateHealth("language", e.target.value)}
            required
          />
        </div>
      </div>
      {/* Medical History Section */}
      <div className="p-3 border bg-light">
        <h6 className="fw-bold mb-3">Medical History</h6>

        {/* Asthma COPD */}
        <div className="row mb-3 align-items-center">
          <div className="col-md-3 fw-bold">
            Asthma COPD <span className="text-danger">*</span>
          </div>
          <div className="col-md-2">
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="asthma-yes"
                name="asthma"
                value="Yes"
                className="form-check-input"
                onChange={(e) => {
                  const updated = { ...health, asthma: { status: e.target.value, date: "", medication: "" } };
                  setHealth(updated);
                  localStorage.setItem("health", JSON.stringify(updated));
                }}
                checked={health.asthma?.status === "Yes"}
                required
              />
              <label className="form-check-label" htmlFor="asthma-yes">Yes</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="asthma-no"
                name="asthma"
                value="No"
                className="form-check-input"
                onChange={(e) => {
                  const updated = { ...health, asthma: { status: e.target.value, date: "", medication: "" } };
                  setHealth(updated);
                  localStorage.setItem("health", JSON.stringify(updated));
                }}
                checked={health.asthma?.status === "No"}
                required
              />
              <label className="form-check-label" htmlFor="asthma-no">No</label>
            </div>
          </div>
          {health.asthma?.status === "Yes" && (
            <>
              <div className="col-md-3">
                <input
                  type="date"
                  placeholder="dd/mm/yyyy"
                  className="form-control"
                  value={health.asthma?.date || ""}
                  onChange={(e) => {
                    const updated = { ...health, asthma: { ...health.asthma, date: e.target.value } };
                    setHealth(updated);
                    localStorage.setItem("health", JSON.stringify(updated));
                  }}
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  placeholder="Medication Name"
                  className="form-control"
                  value={health.asthma?.medication || ""}
                  onChange={(e) => {
                    const updated = { ...health, asthma: { ...health.asthma, medication: e.target.value } };
                    setHealth(updated);
                    localStorage.setItem("health", JSON.stringify(updated));
                  }}
                />
              </div>
            </>
          )}
        </div>
        {/* Breathing Difficulties */}
        <div className="row mb-3 align-items-center">
          <div className="col-md-3 fw-bold">
            Breathing Difficulties <span className="text-danger">*</span>
          </div>
          <div className="col-md-2">
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="breathing-yes"
                name="breathing"
                value="Yes"
                className="form-check-input"
                onChange={(e) => {
                  const updated = { ...health, breathing: { status: e.target.value, date: "", medication: "" } };
                  setHealth(updated);
                  localStorage.setItem("health", JSON.stringify(updated));
                }}
                checked={health.breathing?.status === "Yes"}
                required
              />
              <label className="form-check-label" htmlFor="breathing-yes">Yes</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="breathing-no"
                name="breathing"
                value="No"
                className="form-check-input"
                onChange={(e) => {
                  const updated = { ...health, breathing: { status: e.target.value, date: "", medication: "" } };
                  setHealth(updated);
                  localStorage.setItem("health", JSON.stringify(updated));
                }}
                checked={health.breathing?.status === "No"}
                required
              />
              <label className="form-check-label" htmlFor="breathing-no">No</label>
            </div>
          </div>
          {health.breathing?.status === "Yes" && (
            <>
              <div className="col-md-3">
                <input
                  type="date"
                  className="form-control"
                  value={health.breathing?.date || ""}
                  onChange={(e) => {
                    const updated = { ...health, breathing: { ...health.breathing, date: e.target.value } };
                    setHealth(updated);
                    localStorage.setItem("health", JSON.stringify(updated));
                  }}
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  placeholder="Medication Name"
                  className="form-control"
                  value={health.breathing?.medication || ""}
                  onChange={(e) => {
                    const updated = { ...health, breathing: { ...health.breathing, medication: e.target.value } };
                    setHealth(updated);
                    localStorage.setItem("health", JSON.stringify(updated));
                  }}
                />
              </div>
            </>
          )}
        </div>

        {/* Heart Attack Stroke */}
        <div className="row mb-3 align-items-center">
          <div className="col-md-3 fw-bold">
            Heart Attack Stroke <span className="text-danger">*</span>
          </div>
          <div className="col-md-2">
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="heart-yes"
                name="heart"
                value="Yes"
                className="form-check-input"
                onChange={(e) => {
                  const updated = { ...health, heart: { status: e.target.value, date: "", medication: "" } };
                  setHealth(updated);
                  localStorage.setItem("health", JSON.stringify(updated));
                }}
                checked={health.heart?.status === "Yes"}
                required
              />
              <label className="form-check-label" htmlFor="heart-yes">Yes</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="heart-no"
                name="heart"
                value="No"
                className="form-check-input"
                onChange={(e) => {
                  const updated = { ...health, heart: { status: e.target.value, date: "", medication: "" } };
                  setHealth(updated);
                  localStorage.setItem("health", JSON.stringify(updated));
                }}
                checked={health.heart?.status === "No"}
                required
              />
              <label className="form-check-label" htmlFor="heart-no">No</label>
            </div>
          </div>
          {health.heart?.status === "Yes" && (
            <>
              <div className="col-md-3">
                <input
                  type="date"
                  className="form-control"
                  value={health.heart?.date || ""}
                  onChange={(e) => {
                    const updated = { ...health, heart: { ...health.heart, date: e.target.value } };
                    setHealth(updated);
                    localStorage.setItem("health", JSON.stringify(updated));
                  }}
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  placeholder="Medication Name"
                  className="form-control"
                  value={health.heart?.medication || ""}
                  onChange={(e) => {
                    const updated = { ...health, heart: { ...health.heart, medication: e.target.value } };
                    setHealth(updated);
                    localStorage.setItem("health", JSON.stringify(updated));
                  }}
                />
              </div>
            </>
          )}
        </div>

        {/* Blood Pressure */}
        <div className="row mb-3 align-items-center">
          <div className="col-md-3 fw-bold">
            Blood Pressure <span className="text-danger">*</span>
          </div>
          <div className="col-md-2">
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="blood-pressure-yes"
                name="bloodPressure"
                value="Yes"
                className="form-check-input"
                onChange={(e) => {
                  const updated = { ...health, bloodPressure: { status: e.target.value, date: "", medication: "" } };
                  setHealth(updated);
                  localStorage.setItem("health", JSON.stringify(updated));
                }}
                checked={health.bloodPressure?.status === "Yes"}
                required
              />
              <label className="form-check-label" htmlFor="blood-pressure-yes">Yes</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="blood-pressure-no"
                name="bloodPressure"
                value="No"
                className="form-check-input"
                onChange={(e) => {
                  const updated = { ...health, bloodPressure: { status: e.target.value, date: "", medication: "" } };
                  setHealth(updated);
                  localStorage.setItem("health", JSON.stringify(updated));
                }}
                checked={health.bloodPressure?.status === "No"}
                required
              />
              <label className="form-check-label" htmlFor="blood-pressure-no">No</label>
            </div>
          </div>
          {health.bloodPressure?.status === "Yes" && (
            <>
              <div className="col-md-3">
                <input
                  type="date"
                  className="form-control"
                  value={health.bloodPressure?.date || ""}
                  onChange={(e) => {
                    const updated = { ...health, bloodPressure: { ...health.bloodPressure, date: e.target.value } };
                    setHealth(updated);
                    localStorage.setItem("health", JSON.stringify(updated));
                  }}
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  placeholder="Medication Name"
                  className="form-control"
                  value={health.bloodPressure?.medication || ""}
                  onChange={(e) => {
                    const updated = { ...health, bloodPressure: { ...health.bloodPressure, medication: e.target.value } };
                    setHealth(updated);
                    localStorage.setItem("health", JSON.stringify(updated));
                  }}
                />
              </div>
            </>
          )}
        </div>

        {/* Epilepsy */}
        <div className="row mb-3 align-items-center">
          <div className="col-md-3 fw-bold">
            Epilepsy <span className="text-danger">*</span>
          </div>
          <div className="col-md-2">
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="epilepsy-yes"
                name="epilepsy"
                value="Yes"
                className="form-check-input"
                onChange={(e) => {
                  const updated = { ...health, epilepsy: { status: e.target.value, date: "", medication: "" } };
                  setHealth(updated);
                  localStorage.setItem("health", JSON.stringify(updated));
                }}
                checked={health.epilepsy?.status === "Yes"}
                required
              />
              <label className="form-check-label" htmlFor="epilepsy-yes">Yes</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="epilepsy-no"
                name="epilepsy"
                value="No"
                className="form-check-input"
                onChange={(e) => {
                  const updated = { ...health, epilepsy: { status: e.target.value, date: "", medication: "" } };
                  setHealth(updated);
                  localStorage.setItem("health", JSON.stringify(updated));
                }}
                checked={health.epilepsy?.status === "No"}
                required
              />
              <label className="form-check-label" htmlFor="epilepsy-no">No</label>
            </div>
          </div>
          {health.epilepsy?.status === "Yes" && (
            <>
              <div className="col-md-3">
                <input
                  type="date"
                  className="form-control"
                  value={health.epilepsy?.date || ""}
                  onChange={(e) => {
                    const updated = { ...health, epilepsy: { ...health.epilepsy, date: e.target.value } };
                    setHealth(updated);
                    localStorage.setItem("health", JSON.stringify(updated));
                  }}
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  placeholder="Medication Name"
                  className="form-control"
                  value={health.epilepsy?.medication || ""}
                  onChange={(e) => {
                    const updated = { ...health, epilepsy: { ...health.epilepsy, medication: e.target.value } };
                    setHealth(updated);
                    localStorage.setItem("health", JSON.stringify(updated));
                  }}
                />
              </div>
            </>
          )}
        </div>

        {/* Irregular Heartbeat */}
        <div className="row mb-3 align-items-center">
          <div className="col-md-3 fw-bold">
            Irregular Heartbeat <span className="text-danger">*</span>
          </div>
          <div className="col-md-2">
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="irregular-yes"
                name="irregular"
                value="Yes"
                className="form-check-input"
                onChange={(e) => {
                  const updated = { ...health, irregular: { status: e.target.value, date: "", medication: "" } };
                  setHealth(updated);
                  localStorage.setItem("health", JSON.stringify(updated));
                }}
                checked={health.irregular?.status === "Yes"}
                required
              />
              <label className="form-check-label" htmlFor="irregular-yes">Yes</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="irregular-no"
                name="irregular"
                value="No"
                className="form-check-input"
                onChange={(e) => {
                  const updated = { ...health, irregular: { status: e.target.value, date: "", medication: "" } };
                  setHealth(updated);
                  localStorage.setItem("health", JSON.stringify(updated));
                }}
                checked={health.irregular?.status === "No"}
                required
              />
              <label className="form-check-label" htmlFor="irregular-no">No</label>
            </div>
          </div>
          {health.irregular?.status === "Yes" && (
            <>
              <div className="col-md-3">
                <input
                  type="date"
                  className="form-control"
                  value={health.irregular?.date || ""}
                  onChange={(e) => {
                    const updated = { ...health, irregular: { ...health.irregular, date: e.target.value } };
                    setHealth(updated);
                    localStorage.setItem("health", JSON.stringify(updated));
                  }}
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  placeholder="Medication Name"
                  className="form-control"
                  value={health.irregular?.medication || ""}
                  onChange={(e) => {
                    const updated = { ...health, irregular: { ...health.irregular, medication: e.target.value } };
                    setHealth(updated);
                    localStorage.setItem("health", JSON.stringify(updated));
                  }}
                />
              </div>
            </>
          )}
        </div>


        {/* Diabetes */}
        <div className="row mb-3 align-items-center">
          <div className="col-md-3 fw-bold">
            Diabetes <span className="text-danger">*</span>
          </div>
          <div className="col-md-2">
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="diabetes-yes"
                name="diabetes"
                value="Yes"
                className="form-check-input"
                onChange={(e) => {
                  const updated = { ...health, diabetes: { status: e.target.value, date: "", medication: "" } };
                  setHealth(updated);
                  localStorage.setItem("health", JSON.stringify(updated));
                }}
                checked={health.diabetes?.status === "Yes"}
                required
              />
              <label className="form-check-label" htmlFor="diabetes-yes">Yes</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="diabetes-no"
                name="diabetes"
                value="No"
                className="form-check-input"
                onChange={(e) => {
                  const updated = { ...health, diabetes: { status: e.target.value, date: "", medication: "" } };
                  setHealth(updated);
                  localStorage.setItem("health", JSON.stringify(updated));
                }}
                checked={health.diabetes?.status === "No"}
                required
              />
              <label className="form-check-label" htmlFor="diabetes-no">No</label>
            </div>
          </div>
          {health.diabetes?.status === "Yes" && (
            <>
              <div className="col-md-3">
                <input
                  type="date"
                  className="form-control"
                  value={health.diabetes?.date || ""}
                  onChange={(e) => {
                    const updated = { ...health, diabetes: { ...health.diabetes, date: e.target.value } };
                    setHealth(updated);
                    localStorage.setItem("health", JSON.stringify(updated));
                  }}
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  placeholder="Medication Name"
                  className="form-control"
                  value={health.diabetes?.medication || ""}
                  onChange={(e) => {
                    const updated = { ...health, diabetes: { ...health.diabetes, medication: e.target.value } };
                    setHealth(updated);
                    localStorage.setItem("health", JSON.stringify(updated));
                  }}
                />
              </div>
            </>
          )}
        </div>

        {/* Cancer */}
        <div className="row mb-3 align-items-center">
          <div className="col-md-3 fw-bold">
            Cancer <span className="text-danger">*</span>
          </div>
          <div className="col-md-2">
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="cancer-yes"
                name="cancer"
                value="Yes"
                className="form-check-input"
                onChange={(e) => {
                  const updated = { ...health, cancer: { status: e.target.value, date: "", medication: "" } };
                  setHealth(updated);
                  localStorage.setItem("health", JSON.stringify(updated));
                }}
                checked={health.cancer?.status === "Yes"}
                required
              />
              <label className="form-check-label" htmlFor="cancer-yes">Yes</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="cancer-no"
                name="cancer"
                value="No"
                className="form-check-input"
                onChange={(e) => {
                  const updated = { ...health, cancer: { status: e.target.value, date: "", medication: "" } };
                  setHealth(updated);
                  localStorage.setItem("health", JSON.stringify(updated));
                }}
                checked={health.cancer?.status === "No"}
                required
              />
              <label className="form-check-label" htmlFor="cancer-no">No</label>
            </div>
          </div>
          {health.cancer?.status === "Yes" && (
            <>
              <div className="col-md-3">
                <input
                  type="date"
                  className="form-control"
                  value={health.cancer?.date || ""}
                  onChange={(e) => {
                    const updated = { ...health, cancer: { ...health.cancer, date: e.target.value } };
                    setHealth(updated);
                    localStorage.setItem("health", JSON.stringify(updated));
                  }}
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  placeholder="Medication Name"
                  className="form-control"
                  value={health.cancer?.medication || ""}
                  onChange={(e) => {
                    const updated = { ...health, cancer: { ...health.cancer, medication: e.target.value } };
                    setHealth(updated);
                    localStorage.setItem("health", JSON.stringify(updated));
                  }}
                />
              </div>
            </>
          )}
        </div>

        {/* Thyroid Disease */}
        <div className="row mb-3 align-items-center">
          <div className="col-md-3 fw-bold">
            Thyroid Disease <span className="text-danger">*</span>
          </div>
          <div className="col-md-2">
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="thyroid-yes"
                name="thyroid"
                value="Yes"
                className="form-check-input"
                onChange={(e) => {
                  const updated = { ...health, thyroid: { status: e.target.value, date: "", medication: "" } };
                  setHealth(updated);
                  localStorage.setItem("health", JSON.stringify(updated));
                }}
                checked={health.thyroid?.status === "Yes"}
                required
              />
              <label className="form-check-label" htmlFor="thyroid-yes">Yes</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="thyroid-no"
                name="thyroid"
                value="No"
                className="form-check-input"
                onChange={(e) => {
                  const updated = { ...health, thyroid: { status: e.target.value, date: "", medication: "" } };
                  setHealth(updated);
                  localStorage.setItem("health", JSON.stringify(updated));
                }}
                checked={health.thyroid?.status === "No"}
                required
              />
              <label className="form-check-label" htmlFor="thyroid-no">No</label>
            </div>
          </div>
          {health.thyroid?.status === "Yes" && (
            <>
              <div className="col-md-3">
                <input
                  type="date"
                  className="form-control"
                  value={health.thyroid?.date || ""}
                  onChange={(e) => {
                    const updated = { ...health, thyroid: { ...health.thyroid, date: e.target.value } };
                    setHealth(updated);
                    localStorage.setItem("health", JSON.stringify(updated));
                  }}
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  placeholder="Medication Name"
                  className="form-control"
                  value={health.thyroid?.medication || ""}
                  onChange={(e) => {
                    const updated = { ...health, thyroid: { ...health.thyroid, medication: e.target.value } };
                    setHealth(updated);
                    localStorage.setItem("health", JSON.stringify(updated));
                  }}
                />
              </div>
            </>
          )}
        </div>
        {/* Other */}
        <div className="row mb-3 align-items-center">
          <div className="col-md-3 fw-bold">
            Other <span className="text-danger">*</span>
          </div>
          <div className="col-md-2">
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="other-yes"
                name="other"
                value="Yes"
                className="form-check-input"
                onChange={(e) => {
                  const updated = { ...health, other: { status: e.target.value, date: "", medication: "" } };
                  setHealth(updated);
                  localStorage.setItem("health", JSON.stringify(updated));
                }}
                checked={health.other?.status === "Yes"}
                required
              />
              <label className="form-check-label" htmlFor="other-yes">Yes</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="other-no"
                name="other"
                value="No"
                className="form-check-input"
                onChange={(e) => {
                  const updated = { ...health, other: { status: e.target.value, date: "", medication: "" } };
                  setHealth(updated);
                  localStorage.setItem("health", JSON.stringify(updated));
                }}
                checked={health.other?.status === "No"}
                required
              />
              <label className="form-check-label" htmlFor="other-no">No</label>
            </div>
          </div>
          {health.other?.status === "Yes" && (
            <>
              <div className="col-md-3">
                <input
                  type="date"
                  className="form-control"
                  value={health.other?.date || ""}
                  onChange={(e) => {
                    const updated = { ...health, other: { ...health.other, date: e.target.value } };
                    setHealth(updated);
                    localStorage.setItem("health", JSON.stringify(updated));
                  }}
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  placeholder="Medication Name"
                  className="form-control"
                  value={health.other?.medication || ""}
                  onChange={(e) => {
                    const updated = { ...health, other: { ...health.other, medication: e.target.value } };
                    setHealth(updated);
                    localStorage.setItem("health", JSON.stringify(updated));
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>
      {/* All Patients Section */}
      <div className="p-3 border bg-light ">
        <h6 className="fw-bold mb-3">All Patients</h6>

        {/* Serious Illnesses or Operations */}
        <div className="row mb-3 align-items-center">
          <div className="col-md-3 fw-bold">Have you had any serious illnesses or operations? <span className="text-danger">*</span></div>
          <div className="col-md-2">
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="illness-yes"
                name="illness"
                value="Yes"
                className="form-check-input"
                onChange={(e) => {
                  const updated = { ...health, illness: { status: e.target.value, details: "" } };
                  setHealth(updated);
                  localStorage.setItem("health", JSON.stringify(updated));
                }}
                checked={health.illness?.status === "Yes"}
              />
              <label className="form-check-label" htmlFor="illness-yes">Yes</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="illness-no"
                name="illness"
                value="No"
                className="form-check-input"
                onChange={(e) => {
                  const updated = { ...health, illness: { status: e.target.value, details: "" } };
                  setHealth(updated);
                  localStorage.setItem("health", JSON.stringify(updated));
                }}
                checked={health.illness?.status === "No"}
              />
              <label className="form-check-label" htmlFor="illness-no">No</label>
            </div>
          </div>
          {health.illness?.status === "Yes" && (
            <div className="col-md-7">
              <input
                type="text"
                className="form-control"
                placeholder="Enter details"
                value={health.illness?.details || ""}
                onChange={(e) => {
                  const updated = { ...health, illness: { ...health.illness, details: e.target.value } };
                  setHealth(updated);
                  localStorage.setItem("health", JSON.stringify(updated));
                }}
              />
            </div>
          )}
        </div>

        {/* Allergies */}
        <div className="row mb-3 align-items-center">
          <div className="col-md-3 fw-bold">Do you have any known allergies? <span className="text-danger">*</span></div>
          <div className="col-md-2">
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="allergies-yes"
                name="allergies"
                value="Yes"
                className="form-check-input"
                onChange={(e) => {
                  const updated = { ...health, allergies: { status: e.target.value, details: "" } };
                  setHealth(updated);
                  localStorage.setItem("health", JSON.stringify(updated));
                }}
                checked={health.allergies?.status === "Yes"}
              />
              <label className="form-check-label" htmlFor="allergies-yes">Yes</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="allergies-no"
                name="allergies"
                value="No"
                className="form-check-input"
                onChange={(e) => {
                  const updated = { ...health, allergies: { status: e.target.value, details: "" } };
                  setHealth(updated);
                  localStorage.setItem("health", JSON.stringify(updated));
                }}
                checked={health.allergies?.status === "No"}
              />
              <label className="form-check-label" htmlFor="allergies-no">No</label>
            </div>
          </div>
          {health.allergies?.status === "Yes" && (
            <div className="col-md-7">
              <input
                type="text"
                className="form-control"
                placeholder="Enter allergies"
                value={health.allergies?.details || ""}
                onChange={(e) => {
                  const updated = { ...health, allergies: { ...health.allergies, details: e.target.value } };
                  setHealth(updated);
                  localStorage.setItem("health", JSON.stringify(updated));
                }}
              />
            </div>
          )}
        </div>

        {/* Carer */}
        <div className="row mb-3 align-items-center">
          <div className="col-md-3 fw-bold">Do you have a carer? <span className="text-danger">*</span></div>
          <div className="col-md-2">
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="carer-yes"
                name="carer"
                value="Yes"
                className="form-check-input"
                onChange={(e) => {
                  const updated = { ...health, carer: { status: e.target.value, details: "" } };
                  setHealth(updated);
                  localStorage.setItem("health", JSON.stringify(updated));
                }}
                checked={health.carer?.status === "Yes"}
              />
              <label className="form-check-label" htmlFor="carer-yes">Yes</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="carer-no"
                name="carer"
                value="No"
                className="form-check-input"
                onChange={(e) => {
                  const updated = { ...health, carer: { status: e.target.value, details: "" } };
                  setHealth(updated);
                  localStorage.setItem("health", JSON.stringify(updated));
                }}
                checked={health.carer?.status === "No"}
              />
              <label className="form-check-label" htmlFor="carer-no">No</label>
            </div>
          </div>
          {health.carer?.status === "Yes" && (
            <div className="col-md-7">
              <input
                type="text"
                className="form-control"
                placeholder="Please state"
                value={health.carer?.details || ""}
                onChange={(e) => {
                  const updated = { ...health, carer: { ...health.carer, details: e.target.value } };
                  setHealth(updated);
                  localStorage.setItem("health", JSON.stringify(updated));
                }}
              />
            </div>
          )}
        </div>
        {/* Social Services Help */}
        <div className="row mb-3 align-items-center">
          <div className="col-md-3 fw-bold">Do you have Social Services help? <span className="text-danger">*</span></div>
          <div className="col-md-2">
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="social-yes"
                name="social"
                value="Yes"
                className="form-check-input"
                onChange={(e) => {
                  const updated = { ...health, social: { status: e.target.value, details: "" } };
                  setHealth(updated);
                  localStorage.setItem("health", JSON.stringify(updated));
                }}
                checked={health.social?.status === "Yes"}
              />
              <label className="form-check-label" htmlFor="social-yes">Yes</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="social-no"
                name="social"
                value="No"
                className="form-check-input"
                onChange={(e) => {
                  const updated = { ...health, social: { status: e.target.value, details: "" } };
                  setHealth(updated);
                  localStorage.setItem("health", JSON.stringify(updated));
                }}
                checked={health.social?.status === "No"}
              />
              <label className="form-check-label" htmlFor="social-no">No</label>
            </div>
          </div>
        </div>

        {/* Registered Partially Sighted or Blind */}
        <div className="row mb-3 align-items-center">
          <div className="col-md-3 fw-bold">Are you registered either partially sighted or blind? <span className="text-danger">*</span></div>
          <div className="col-md-2">
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="sighted-yes"
                name="sighted"
                value="Yes"
                className="form-check-input"
                onChange={(e) => {
                  const updated = { ...health, sighted: { status: e.target.value, details: "" } };
                  setHealth(updated);
                  localStorage.setItem("health", JSON.stringify(updated));
                }}
                checked={health.sighted?.status === "Yes"}
              />
              <label className="form-check-label" htmlFor="sighted-yes">Yes</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="sighted-no"
                name="sighted"
                value="No"
                className="form-check-input"
                onChange={(e) => {
                  const updated = { ...health, sighted: { status: e.target.value, details: "" } };
                  setHealth(updated);
                  localStorage.setItem("health", JSON.stringify(updated));
                }}
                checked={health.sighted?.status === "No"}
              />
              <label className="form-check-label" htmlFor="sighted-no">No</label>
            </div>
          </div>
          {health.sighted?.status === "Yes" && (
            <div className="col-md-7">
              <input
                type="text"
                className="form-control"
                placeholder="Please state"
                value={health.sighted?.details || ""}
                onChange={(e) => {
                  const updated = { ...health, sighted: { ...health.sighted, details: e.target.value } };
                  setHealth(updated);
                  localStorage.setItem("health", JSON.stringify(updated));
                }}
              />
            </div>
          )}
        </div>

        {/* Have You Ever Smoked */}
        <div className="row mb-3 align-items-center">
          <div className="col-md-3 fw-bold">Have you ever smoked? <span className="text-danger">*</span></div>
          <div className="col-md-2">
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="smoked-yes"
                name="smoked"
                value="Yes"
                className="form-check-input"
                onChange={(e) => {
                  const updated = { ...health, smoked: { status: e.target.value } };
                  setHealth(updated);
                  localStorage.setItem("health", JSON.stringify(updated));
                }}
                checked={health.smoked?.status === "Yes"}
              />
              <label className="form-check-label" htmlFor="smoked-yes">Yes</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="smoked-no"
                name="smoked"
                value="No"
                className="form-check-input"
                onChange={(e) => {
                  const updated = { ...health, smoked: { status: e.target.value } };
                  setHealth(updated);
                  localStorage.setItem("health", JSON.stringify(updated));
                }}
                checked={health.smoked?.status === "No"}
              />
              <label className="form-check-label" htmlFor="smoked-no">No</label>
            </div>
          </div>
        </div>

        {/* Do You Currently Smoke */}
        <div className="row mb-3 align-items-center">
          <div className="col-md-3 fw-bold">Do you currently smoke? <span className="text-danger">*</span></div>
          <div className="col-md-4">
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="current-smoke-yes"
                name="currentSmoke"
                value="Yes"
                className="form-check-input"
                onChange={(e) => {
                  const updated = { ...health, currentSmoke: { status: e.target.value, amount: "" } };
                  setHealth(updated);
                  localStorage.setItem("health", JSON.stringify(updated));
                }}
                checked={health.currentSmoke?.status === "Yes"}
              />
              <label className="form-check-label" htmlFor="current-smoke-yes">Yes</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="current-smoke-no"
                name="currentSmoke"
                value="No"
                className="form-check-input"
                onChange={(e) => {
                  const updated = { ...health, currentSmoke: { status: e.target.value, amount: "" } };
                  setHealth(updated);
                  localStorage.setItem("health", JSON.stringify(updated));
                }}
                checked={health.currentSmoke?.status === "No"}
              />
              <label className="form-check-label" htmlFor="current-smoke-no">No</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="current-smoke-prefer"
                name="currentSmoke"
                value="Prefer not to state"
                className="form-check-input"
                onChange={(e) => {
                  const updated = { ...health, currentSmoke: { status: e.target.value, amount: "" } };
                  setHealth(updated);
                  localStorage.setItem("health", JSON.stringify(updated));
                }}
                checked={health.currentSmoke?.status === "Prefer not to state"}
              />
              <label className="form-check-label" htmlFor="current-smoke-prefer">Prefer not to state</label>
            </div>
          </div>
          {health.currentSmoke?.status === "Yes" && (
            <div className="col-md-5">
              <input
                type="number"
                className="form-control"
                placeholder="How many do you smoke per day?"
                value={health.currentSmoke?.amount || ""}
                onChange={(e) => {
                  const updated = { ...health, currentSmoke: { ...health.currentSmoke, amount: e.target.value } };
                  setHealth(updated);
                  localStorage.setItem("health", JSON.stringify(updated));
                }}
              />
            </div>
          )}
        </div>
      </div>
      {/* Alcohol Consumption */}
      <div className="p-3 border bg-light ">
        <h6 className="fw-bold mb-3">How often do you drink alcohol? <span className="text-danger">*</span></h6>

        <div className="mb-2">
          <div className="form-check">
            <input
              type="radio"
              id="alcohol-prefer"
              name="alcohol"
              value="Prefer not to state"
              className="form-check-input"
              onChange={(e) => {
                const updated = { ...health, alcohol: e.target.value };
                setHealth(updated);
                localStorage.setItem("health", JSON.stringify(updated));
              }}
              checked={health.alcohol === "Prefer not to state"}
            />
            <label className="form-check-label" htmlFor="alcohol-prefer">Prefer not to state</label>
          </div>

          <div className="form-check">
            <input
              type="radio"
              id="alcohol-never"
              name="alcohol"
              value="Never"
              className="form-check-input"
              onChange={(e) => {
                const updated = { ...health, alcohol: e.target.value };
                setHealth(updated);
                localStorage.setItem("health", JSON.stringify(updated));
              }}
              checked={health.alcohol === "Never"}
            />
            <label className="form-check-label" htmlFor="alcohol-never">Never</label>
          </div>

          <div className="form-check">
            <input
              type="radio"
              id="alcohol-monthly"
              name="alcohol"
              value="Monthly or less"
              className="form-check-input"
              onChange={(e) => {
                const updated = { ...health, alcohol: e.target.value };
                setHealth(updated);
                localStorage.setItem("health", JSON.stringify(updated));
              }}
              checked={health.alcohol === "Monthly or less"}
            />
            <label className="form-check-label" htmlFor="alcohol-monthly">Monthly or less</label>
          </div>

          <div className="form-check">
            <input
              type="radio"
              id="alcohol-2-4"
              name="alcohol"
              value="2-4 times per month"
              className="form-check-input"
              onChange={(e) => {
                const updated = { ...health, alcohol: e.target.value };
                setHealth(updated);
                localStorage.setItem("health", JSON.stringify(updated));
              }}
              checked={health.alcohol === "2-4 times per month"}
            />
            <label className="form-check-label" htmlFor="alcohol-2-4">2-4 times per month</label>
          </div>

          <div className="form-check">
            <input
              type="radio"
              id="alcohol-2-3"
              name="alcohol"
              value="2-3 times per week"
              className="form-check-input"
              onChange={(e) => {
                const updated = { ...health, alcohol: e.target.value };
                setHealth(updated);
                localStorage.setItem("health", JSON.stringify(updated));
              }}
              checked={health.alcohol === "2-3 times per week"}
            />
            <label className="form-check-label" htmlFor="alcohol-2-3">2-3 times per week</label>
          </div>

          <div className="form-check">
            <input
              type="radio"
              id="alcohol-4plus"
              name="alcohol"
              value="4+ times per week"
              className="form-check-input"
              onChange={(e) => {
                const updated = { ...health, alcohol: e.target.value };
                setHealth(updated);
                localStorage.setItem("health", JSON.stringify(updated));
              }}
              checked={health.alcohol === "4+ times per week"}
            />
            <label className="form-check-label" htmlFor="alcohol-4plus">4+ times per week</label>
          </div>
        </div>
      </div>
      {/* Family History */}
      <div className="p-3 border bg-light ">
        <h6 className="fw-bold mb-3">
          Is there a history of any of the following in your family (father, mother, brother, or sister) before age 65? <span className="text-danger">*</span>
        </h6>

        <div className="mb-2">
          <div className="form-check form-check-inline">
            <input
              type="radio"
              id="family-history-yes"
              name="familyHistory"
              value="Yes"
              className="form-check-input"
              onChange={(e) => {
                const updated = { ...health, familyHistory: e.target.value };
                setHealth(updated);
                localStorage.setItem("health", JSON.stringify(updated));
              }}
              checked={health.familyHistory === "Yes"}
              required
            />
            <label className="form-check-label" htmlFor="family-history-yes">Yes</label>
          </div>

          <div className="form-check form-check-inline">
            <input
              type="radio"
              id="family-history-no"
              name="familyHistory"
              value="No"
              className="form-check-input"
              onChange={(e) => {
                const updated = { ...health, familyHistory: e.target.value };
                setHealth(updated);
                localStorage.setItem("health", JSON.stringify(updated));
              }}
              checked={health.familyHistory === "No"}
              required
            />
            <label className="form-check-label" htmlFor="family-history-no">No</label>
          </div>
        </div>
      </div>

      {/* Family History Details */}
      {health.familyHistory === "Yes" && (
        <div className="p-3 border bg-light mb-3">

          {/* Family Member */}
          <div className="row mb-3 align-items-center">
            <div className="col-md-3 fw-bold">Family Member <span className="text-danger">*</span></div>
            <div className="col-md-9">
              <input
                type="text"
                className="form-control"
                placeholder="Enter family member"
                value={health.familyMember || ""}
                onChange={(e) => {
                  const updated = { ...health, familyMember: e.target.value };
                  setHealth(updated);
                  localStorage.setItem("health", JSON.stringify(updated));
                }}
                required
              />
            </div>
          </div>

          {/* Heart Disease */}
          <div className="row mb-3 align-items-center">
            <div className="col-md-3 fw-bold">Heart Disease <span className="text-danger">*</span></div>
            <div className="col-md-3">
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  id="heartDisease-yes"
                  name="heartDisease"
                  value="Yes"
                  className="form-check-input"
                  onChange={(e) => {
                    const updated = { ...health, heartDisease: e.target.value };
                    setHealth(updated);
                    localStorage.setItem("health", JSON.stringify(updated));
                  }}
                  checked={health.heartDisease === "Yes"}
                  required
                />
                <label className="form-check-label" htmlFor="heartDisease-yes">Yes</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  id="heartDisease-no"
                  name="heartDisease"
                  value="No"
                  className="form-check-input"
                  onChange={(e) => {
                    const updated = { ...health, heartDisease: e.target.value };
                    setHealth(updated);
                    localStorage.setItem("health", JSON.stringify(updated));
                  }}
                  checked={health.heartDisease === "No"}
                  required
                />
                <label className="form-check-label" htmlFor="heartDisease-no">No</label>
              </div>
            </div>
          </div>

          {/* Stroke */}
          <div className="row mb-3 align-items-center">
            <div className="col-md-3 fw-bold">Stroke <span className="text-danger">*</span></div>
            <div className="col-md-3">
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  id="stroke-yes"
                  name="stroke"
                  value="Yes"
                  className="form-check-input"
                  onChange={(e) => {
                    const updated = { ...health, stroke: e.target.value };
                    setHealth(updated);
                    localStorage.setItem("health", JSON.stringify(updated));
                  }}
                  checked={health.stroke === "Yes"}
                  required
                />
                <label className="form-check-label" htmlFor="stroke-yes">Yes</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  id="stroke-no"
                  name="stroke"
                  value="No"
                  className="form-check-input"
                  onChange={(e) => {
                    const updated = { ...health, stroke: e.target.value };
                    setHealth(updated);
                    localStorage.setItem("health", JSON.stringify(updated));
                  }}
                  checked={health.stroke === "No"}
                  required
                />
                <label className="form-check-label" htmlFor="stroke-no">No</label>
              </div>
            </div>
          </div>

          {/* Cancer */}
          <div className="row mb-3 align-items-center">
            <div className="col-md-3 fw-bold">Cancer <span className="text-danger">*</span></div>
            <div className="col-md-3">
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  id="cancer-yes"
                  name="cancer"
                  value="Yes"
                  className="form-check-input"
                  onChange={(e) => {
                    const updated = { ...health, cancer: e.target.value };
                    setHealth(updated);
                    localStorage.setItem("health", JSON.stringify(updated));
                  }}
                  checked={health.cancer === "Yes"}
                  required
                />
                <label className="form-check-label" htmlFor="cancer-yes">Yes</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  id="cancer-no"
                  name="cancer"
                  value="No"
                  className="form-check-input"
                  onChange={(e) => {
                    const updated = { ...health, cancer: e.target.value };
                    setHealth(updated);
                    localStorage.setItem("health", JSON.stringify(updated));
                  }}
                  checked={health.cancer === "No"}
                  required
                />
                <label className="form-check-label" htmlFor="cancer-no">No</label>
              </div>
            </div>
          </div>

          {/* Concerns */}
          <div className="row mb-3 align-items-center">
            <div className="col-md-3 fw-bold">Concerns</div>
            <div className="col-md-9">
              <input
                type="text"
                className="form-control"
                placeholder="Enter your concerns"
                value={health.concerns || ""}
                onChange={(e) => {
                  const updated = { ...health, concerns: e.target.value };
                  setHealth(updated);
                  localStorage.setItem("health", JSON.stringify(updated));
                }}
              />
            </div>
          </div>

        </div>
      )}



    </form>
  );
}

export default HealthForm;
