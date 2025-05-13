import { useState } from "react";
import SignatureModal from "./SignatureModal";
import Relationships from "../json/relationships.json";
function AgreementForm() {
    
    const [agreementData, setAgreementData] = useState(() => {
        return JSON.parse(localStorage.getItem("agreement") || "{}");
    });

    const updateData = (key: string, value: string | boolean) => {
        const updatedData = { ...agreementData, [key]: value };
        setAgreementData(updatedData);
        localStorage.setItem("agreement", JSON.stringify(updatedData));
    };

    const [isSignatureModalOpen, setSignatureModalOpen] = useState(false);

    const openSignatureModal = () => {
        setSignatureModalOpen(true);
    };

    const closeSignatureModal = () => {
        setSignatureModalOpen(false);
    };

    const clearSignature = () => {
        localStorage.removeItem("signature");
        window.location.reload(); // Simple way to update the component
    };
    return (
        <>
            {/* Header Section */}
            <div className="p-4 border bg-light text-center">
                <label className="fw-bold">MY AGREEMENT TO THE ENROLMENT PROCESS</label>
                <p className="small text-muted">
                    NB. Parent or Caregiver to sign if you are under 16 years
                </p>
            </div>
            {/* Patient Details Section */}
            <div>
                {/* Question 1 */}
                <div className="p-4 border bg-light d-flex justify-content-between align-items-center">
                    <label className="  me-3">
                        <strong>I intend to use this practice</strong> as my regular and on-going provider of general practice / GP / health care services. <span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="form-check">
                        <input
                            type="radio"
                            id="practiceUsage"
                            name="practiceUsage"
                            value="Yes"
                            checked={agreementData.practiceUsage === "Yes"}
                            onChange={() => updateData("practiceUsage", "Yes")}
                            className="form-check-input"
                            required
                        />
                        <label htmlFor="practiceUsage" className="form-check-label">Yes</label>
                    </div>
                </div>

                {/* Question 2 */}
                <div className="p-4 border bg-light d-flex justify-content-between align-items-center">
                    <label className="  me-3">
                        <strong>I understand</strong> that by enrolling with this practice I will be included in the enrolled population of the Primary Health Organisation (PHO) [Central PHO]. <span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="form-check">
                        <input
                            type="radio"
                            id="enrolmentUnderstanding"
                            name="enrolmentUnderstanding"
                            value="Yes"
                            checked={agreementData.enrolmentUnderstanding === "Yes"}
                            onChange={() => updateData("enrolmentUnderstanding", "Yes")}
                            className="form-check-input"
                            required
                        />
                        <label htmlFor="enrolmentUnderstanding" className="form-check-label">Yes</label>
                    </div>
                </div>

                {/* Question 3 */}
                <div className="p-4 border bg-light d-flex justify-content-between align-items-center">
                    <label className="  me-3">
                        <strong>I understand</strong> that if I visit another health care provider where I am not enrolled I may be charged a higher fee. <span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="form-check">
                        <input
                            type="radio"
                            id="otherProvider"
                            name="otherProvider"
                            value="Yes"
                            checked={agreementData.otherProvider === "Yes"}
                            onChange={() => updateData("otherProvider", "Yes")}
                            className="form-check-input"
                            required
                        />
                        <label htmlFor="otherProvider" className="form-check-label">Yes</label>
                    </div>
                </div>

                {/* Question 4 */}
                <div className="p-4 border bg-light d-flex justify-content-between align-items-center">
                    <label className="  me-3">
                        <strong>I have read and I agree</strong> with the Use of Health Information Statement. <span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="form-check">
                        <input
                            type="radio"
                            id="readAndAgree"
                            name="readAndAgree"
                            value="Yes"
                            checked={agreementData.readAndAgree === "Yes"}
                            onChange={() => updateData("readAndAgree", "Yes")}
                            className="form-check-input"
                            required
                        />
                        <label htmlFor="readAndAgree" className="form-check-label">Yes</label>
                    </div>
                </div>

                {/* Question 5 */}
                <div className="p-4 border bg-light d-flex justify-content-between align-items-center">
                    <label className="  me-3">
                        <strong>I agree</strong> to inform the practice of any changes in my contact details and entitlement and/or eligibility to be enrolled. <span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="form-check">
                        <input
                            type="radio"
                            id="contactDetails"
                            name="contactDetails"
                            value="Yes"
                            checked={agreementData.contactDetails === "Yes"}
                            onChange={() => updateData("contactDetails", "Yes")}
                            className="form-check-input"
                            required
                        />
                        <label htmlFor="contactDetails" className="form-check-label">Yes</label>
                    </div>
                </div>

                {/* Question 6 */}
                <div className="p-4 border bg-light d-flex justify-content-between align-items-center">
                    <label className="  me-3">
                        <strong>I agree</strong> to receive Text Messages relating to my Healthcare service and to receive Electronic Patient updates. <span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="form-check">
                        <input
                            type="radio"
                            id="textMessages"
                            name="textMessages"
                            value="Yes"
                            checked={agreementData.textMessages === "Yes"}
                            onChange={() => updateData("textMessages", "Yes")}
                            className="form-check-input"
                            required
                        />
                        <label htmlFor="textMessages" className="form-check-label">Yes</label>
                    </div>
                </div>
            </div>
            {/* SWEVNZ Portal Enrollment */}
            <div className="p-4 border bg-light">
                <label className="fw-bold">Will you like to enrol into SWEVNZ Portal? <span style={{ color: "red" }}>*</span></label>
                <div className="d-flex gap-3">
                    <div className="form-check">
                        <input
                            type="radio"
                            id="swevnzYes"
                            name="swevnzEnroll"
                            value="Yes"
                            checked={agreementData.swevnzEnroll === "Yes"}
                            onChange={() => updateData("swevnzEnroll", "Yes")}
                            className="form-check-input"
                            required
                        />
                        <label htmlFor="swevnzYes" className="form-check-label">Yes</label>
                    </div>
                    <div className="form-check">
                        <input
                            type="radio"
                            id="swevnzNo"
                            name="swevnzEnroll"
                            value="No"
                            checked={agreementData.swevnzEnroll === "No"}
                            onChange={() => updateData("swevnzEnroll", "No")}
                            className="form-check-input"
                            required
                        />
                        <label htmlFor="swevnzNo" className="form-check-label">No</label>
                    </div>
                </div>
            </div>
            {/* SWEVNZ Portal Consent Form Checklist */}
            {agreementData.swevnzEnroll === "Yes" && (
                <div className="p-4 border bg-light">
                    <label className="fw-bold">SWEVNZ Portal Consent Form Checklist <span style={{ color: "red" }}>*</span></label>
                    <p>Please check all that apply:</p>

                    {[
                        { id: "consent1", text: "I am 16 years or older" },
                        { id: "consent2", text: "I am the only person who uses this email address" },
                        { id: "consent3", text: "I have read and understand the information regarding Patient Portal on this form." },
                        { id: "consent4", text: "I have read and accept the terms and conditions of use, in the booklet provided." },
                        { id: "consent5", text: "I am aware that this is a non-urgent service and for acute serious problems I will call the medical centre on 06 358 7282 or phone 111 in an emergency." },
                        { id: "consent6", text: "I am aware that misuse of this service will result in suspension of my Patient Portal account" }
                    ].map(({ id, text }) => (
                        <div className="form-check" key={id}>
                            <input
                                type="checkbox"
                                id={id}
                                name={id}
                                checked={agreementData[id] === true}
                                onChange={() => updateData(id, !agreementData[id])}
                                className="form-check-input"
                                required
                            />
                            <label htmlFor={id} className="form-check-label">{text}</label>
                        </div>
                    ))}
                </div>
            )}
            {/* Signature Section */}
            {isSignatureModalOpen && (
                <SignatureModal onClose={closeSignatureModal} />
            )}
            <div className="p-3 border bg-light">
                {localStorage.signature ? (
                    <div className="position-relative p-2 bg-light rounded shadow-sm">
                        <button
                            className="position-absolute top-0 end-0 btn btn-close p-2"
                            onClick={clearSignature}
                            style={{ cursor: "pointer" }}
                        ></button>

                        <div className="d-flex flex-column align-items-center mb-2">
                            <img
                                src={JSON.parse(localStorage.signature).signatureData}
                                alt="Signature"
                                className="mb-2"
                                style={{ width: "100%", height: "120px", objectFit: "contain", border: "none" }}
                            />
                            <div className="text-muted small">
                                <strong>Signed by:</strong> {JSON.parse(localStorage.signature).name}
                            </div>
                            <div className="text-muted small">
                                <strong>Signed on:</strong> {JSON.parse(localStorage.signature).date}
                            </div>
                        </div>
                    </div>


                ) : (
                    <div className="d-flex align-items-center gap-3 p-3  bg-light">
                        <label className="fw-bold mb-0" style={{ minWidth: "100px" }}>
                            Signature <span className="text-danger">*</span>
                        </label>

                        <div style={{ cursor: "pointer", width: "35%" }} onClick={openSignatureModal}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                value={agreementData.fullName || ""}

                                required
                            />
                        </div>

                        <div style={{ cursor: "pointer", width: "35%" }} onClick={openSignatureModal}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="dd/mm/yyyy"
                                value={agreementData.signatureDate || ""}

                                required
                            />
                        </div>

                        <button type="button" className="btn btn-secondary" onClick={openSignatureModal}>
                            Add Signature
                        </button>

                    </div>


                )}
            </div>
            {/* Authority Details Section */}
            <div className="p-3 border bg-light ">
                <h6 className="fw-bold mb-1">Authority Details (where signatory is not the enrolling person)</h6>
                <p className="text-muted small mb-3">
                    An authority has the legal right to sign for another person if for some reason they are unable to consent on their own behalf.
                </p>

                <div className="d-flex gap-3">
                    <div className="form-check">
                        <input
                            type="radio"
                            id="selfSigning"
                            name="authorityType"
                            required
                            value="Self-Signing"
                            checked={agreementData.authorityType === "Self-Signing"}
                            onChange={() => updateData("authorityType", "Self-Signing")}
                            className="form-check-input"
                        />
                        <label htmlFor="selfSigning" className="form-check-label">Self-Signing</label>
                    </div>

                    <div className="form-check">
                        <input
                            type="radio"
                            id="authority"
                            name="authorityType"
                            value="Authority"
                            checked={agreementData.authorityType === "Authority"}
                            onChange={() => updateData("authorityType", "Authority")}
                            className="form-check-input"
                        />
                        <label htmlFor="authority" className="form-check-label">Authority</label>
                    </div>
                </div>
            </div>
            {/* Conditional Authority Details Form */}
            {agreementData.authorityType === "Authority" && (
                <div className="p-3 border bg-light ">
                    <h6 className="fw-bold mb-3">Authority Details</h6>

                    <div className="mb-3">
                        <label className="form-label">Full Name <span className="text-danger">*</span></label>
                        <input
                            type="text"
                            className="form-control"
                            value={agreementData.fullName || ""}
                            onChange={(e) => updateData("fullName", e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Relationship <span className="text-danger">*</span></label>
                        <select
                            className="form-select"
                            value={agreementData.relationship || ""}
                            onChange={(e) => updateData("relationship", e.target.value)}
                            required
                        >
                            <option value="" disabled>Select Relationship</option>
                            {Relationships.map((relationship: string, index: number) => (
                                <option key={index} value={relationship}>
                                    {relationship}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Contact Phone <span className="text-danger">*</span></label>
                        <input
                            type="text"
                            className="form-control"
                            value={agreementData.contactPhone || ""}
                            onChange={(e) => updateData("contactPhone", e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Basis of Authority <span className="text-danger">*</span></label>
                        <input
                            type="text"
                            className="form-control"
                            value={agreementData.basisOfAuthority || ""}
                            onChange={(e) => updateData("basisOfAuthority", e.target.value)}
                            required
                        />
                    </div>
                </div>
            )}
           
        </>
    );
}

export default AgreementForm;
