import { useState } from "react";
import options from "../json/options.json";

function DeclarationForm() {
    const [declarationData, setDeclarationData] = useState(() => {
        return JSON.parse(localStorage.getItem("declaration") || "{}");
    });
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = e.target.files ? Array.from(e.target.files) : [];
        const existingFiles = declarationData.documents || [];

        newFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const dataUrl = event.target?.result;
                if (dataUrl) {
                    const updatedFiles = [...existingFiles, { name: file.name, url: dataUrl }];
                    updateData("documents", updatedFiles);
                }
            };
            reader.readAsDataURL(file);
        });

        // Reset the file input
        e.target.value = "";
    };
    const removeFile = (fileName: string) => {
        const updatedFiles = declarationData.documents.filter((file: any) => file.name !== fileName);
        updateData("documents", updatedFiles);
    };
    const updateData = (key: string, value: string | any[]) => {
        const updatedData = { ...declarationData, [key]: value };
        setDeclarationData(updatedData);
        localStorage.setItem("declaration", JSON.stringify(updatedData));
    };
    const addVisaDetail = () => {
        const newVisaDetails = [...(declarationData.visaDetails || []), { visa: "", startDate: "", endDate: "" }];
        updateData("visaDetails", newVisaDetails);
    };
    const removeVisaDetail = (index: number) => {
        const updatedVisaDetails = declarationData.visaDetails.filter((_: any, i: number) => i !== index);
        updateData("visaDetails", updatedVisaDetails);
    };
    const updateVisaDetail = (index: number, field: string, value: string) => {
        const updatedVisaDetails = declarationData.visaDetails.map((detail: any, i: number) =>
            i === index ? { ...detail, [field]: value } : detail
        );
        updateData("visaDetails", updatedVisaDetails);
    };

    return (
        <>
            {/* Header Section */}
            <div className="p-4 border bg-light text-center">
                <label className="fw-bold">MY DECLARATION OF ENTITLEMENT AND ELIGIBILITY</label>
                <p>
                    I am entitled to enrol because I am residing permanently in New Zealand. The definition of residing
                    permanently in NZ is that you intend to be resident in New Zealand for at least 183 days in the next 12 months.
                </p>
            </div>
            {/* I am a NZ citizen section */}
            <div className="p-4 border bg-light">
                <div className="mb-3">
                    <label className="fw-bold">I am a New Zealand citizen <span style={{ color: "red" }}>*</span></label>
                    <div className="d-flex gap-3">
                        <div className="form-check">
                            <input
                                type="radio"
                                id="nzCitizenYes"
                                name="nzCitizen"
                                required
                                value="Yes"
                                checked={declarationData.nzCitizen === "Yes"}
                                onChange={() => updateData("nzCitizen", "Yes")}
                                className="form-check-input"
                            />
                            <label htmlFor="nzCitizenYes" className="form-check-label">
                                Yes
                            </label>
                        </div>

                        <div className="form-check">
                            <input
                                type="radio"
                                id="nzCitizenNo"
                                name="nzCitizen"
                                value="No"
                                checked={declarationData.nzCitizen === "No"}
                                onChange={() => updateData("nzCitizen", "No")}
                                className="form-check-input"
                            />
                            <label htmlFor="nzCitizenNo" className="form-check-label">
                                No
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            {/* NZ Citizen Section */}
            <div>
                {declarationData.nzCitizen === "No" && (
                    <div className="p-4 border bg-light">
                        <label className="fw-bold ">Please select your eligibility option:</label>
                        {options.requirements.map((option) => (
                            <div className="form-check mt-2 " key={option.id}>
                                <input
                                    required
                                    type="radio"
                                    id={`option-${option.id}`}
                                    name="eligibilityOption"
                                    value={option.id.toString()}
                                    checked={declarationData.eligibilityOption === option.id.toString()}
                                    onChange={() => updateData("eligibilityOption", option.id.toString())}
                                    className="form-check-input"
                                />
                                <label htmlFor={`option-${option.id}`} className="form-check-label">
                                    {option.option}
                                </label>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {/* Proof of Eligibility Section */}
            <div className="p-4 border bg-light">
                <div className="mb-3">
                    <label className="fw-bold">
                        I confirm that, if requested, I can provide proof of my eligibility <span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="d-flex gap-3">
                        <div className="form-check">
                            <input
                                type="radio"
                                required
                                id="proofYes"
                                name="proofEligibility"
                                className="form-check-input"
                                checked={declarationData.proofEligibility === "Yes"}
                                onChange={() => updateData("proofEligibility", "Yes")}
                            />
                            <label htmlFor="proofYes" className="form-check-label">Yes</label>
                        </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                id="proofNo"
                                name="proofEligibility"
                                className="form-check-input"
                                checked={declarationData.proofEligibility === "No"}
                                onChange={() => updateData("proofEligibility", "No")}
                            />
                            <label htmlFor="proofNo" className="form-check-label">No</label>
                        </div>
                    </div>
                </div>
            </div>
            {/* Acknowledgment of Supporting Evidence Section */}
            <div className="p-4 border bg-light">
                <div className="mb-3">
                    <label className="fw-bold">
                        I acknowledge that I must bring in supporting evidence of my eligibility within 48hrs of submitting this form, should I choose not to upload them. <span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="d-flex gap-3">
                        <div className="form-check">
                            <input
                                required
                                type="radio"
                                id="ackYes"
                                name="ackEvidence"
                                className="form-check-input"
                                checked={declarationData.ackEvidence === "Yes"}
                                onChange={() => updateData("ackEvidence", "Yes")}
                            />
                            <label htmlFor="ackYes" className="form-check-label">Yes</label>
                        </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                id="ackNo"
                                name="ackEvidence"
                                className="form-check-input"
                                checked={declarationData.ackEvidence === "No"}
                                onChange={() => updateData("ackEvidence", "No")}
                            />
                            <label htmlFor="ackNo" className="form-check-label">No</label>
                        </div>
                    </div>
                </div>
            </div>
            {/* Eligibility Description Section */}
            {declarationData.nzCitizen === "Yes" ? (
                <div className="p-4 border bg-light">
                    <label className="fw-bold">Evidence required to prove eligibility:</label>
                    <p>
                        One of:<br />
                        - NZ passport OR<br />
                        - NZ certificate of identity OR<br />
                        - NZ birth certificate OR<br />
                        - Cook Islands, Niue or Tokelau birth certificate OR<br />
                        - NZ certificate of citizenship OR<br />
                        - Certified copy of a descent registration certificate OR<br />
                        - Social security benefit papers (except emergency benefit)<br />
                        <br />
                        AND:<br />
                        - Two forms of supporting identity information, one with a photo (unless passport is provided).
                    </p>
                </div>
            ) : (
                declarationData.eligibilityOption && (
                    <div className="p-4 border bg-light">
                        <label className="fw-bold">Evidence required to prove eligibility:</label>
                        <p>
                            {
                                options.requirements
                                    .find(option => option.id.toString() === declarationData.eligibilityOption)
                                    ?.description
                                    .split("\n")
                                    .map((line, index) => (
                                        <span key={index}>
                                            {line}
                                            <br />
                                        </span>
                                    ))
                            }
                        </p>
                    </div>
                )
            )}
            {/* Visa Details Section */}
            {declarationData.nzCitizen !== "Yes" &&
                !["2", "5", "6"].includes(declarationData.eligibilityOption) && (
                    <div className="p-4 border bg-light">
                        <label className="fw-bold mb-3">Visa Details (Please state the details of your visas held for the previous 24 months)</label>

                        {/* Default Input if No Visa Details */}
                        {(!declarationData.visaDetails || declarationData.visaDetails.length === 0) && (
                            <div className="d-flex gap-2 mb-2 align-items-center">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Please state the visa held"
                                    value=""
                                    onChange={(e) => updateVisaDetail(0, "visa", e.target.value)}
                                />
                                <input
                                    type="date"
                                    className="form-control"
                                    value=""
                                    onChange={(e) => updateVisaDetail(0, "startDate", e.target.value)}
                                />
                                <input
                                    type="date"
                                    className="form-control"
                                    value=""
                                    onChange={(e) => updateVisaDetail(0, "endDate", e.target.value)}
                                />
                            </div>
                        )}

                        {/* Existing Visa Details */}
                        {declarationData.visaDetails?.map((visa: any, index: number) => (
                            <div className="d-flex gap-2 mb-2 align-items-center" key={index}>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Please state the visa held"
                                    value={visa.visa}
                                    onChange={(e) => updateVisaDetail(index, "visa", e.target.value)}
                                />
                                <input
                                    type="date"
                                    className="form-control"
                                    value={visa.startDate}
                                    onChange={(e) => updateVisaDetail(index, "startDate", e.target.value)}
                                />
                                <input
                                    type="date"
                                    className="form-control"
                                    value={visa.endDate}
                                    onChange={(e) => updateVisaDetail(index, "endDate", e.target.value)}
                                />
                                {index > 0 && (
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm"
                                        onClick={() => removeVisaDetail(index)}
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))}

                        <button type="button" className="btn btn-secondary w-100" onClick={addVisaDetail}>
                            + Add
                        </button>
                    </div>
                )}
            {/* Upload Documents Section */}
            {/* Supporting Documentation Section */}
            <div className="p-4 border bg-light">
                <label className="fw-bold">
                    Supporting Documents (e.g., ID, Passport, etc.) <span style={{ color: "red" }}>*</span>
                </label>

                {/* Display Existing Files */}
                {declarationData.documents?.map((file: any, index: number) => (
                    <div key={index} className="d-flex justify-content-between align-items-center mt-2">
                        <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-primary">
                            {file.name}
                        </a>
                        <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => removeFile(file.name)}
                        >
                            Remove
                        </button>
                    </div>
                ))}

                {/* File Input */}
                <input
                    type="file"
                    className="form-control mt-2"
                    onChange={handleFileChange}
                    multiple
                    required={declarationData.documents?.length === 0}
                />
            </div>
        </>
    );
}

export default DeclarationForm;
