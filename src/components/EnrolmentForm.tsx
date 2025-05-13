// EnrolmentForm.tsx
import React, { useEffect, useState } from 'react';
import gender from '../json/gender.json';
import titles from '../json/titles.json';
import { storeData } from './storeData';

function EnrolmentForm() {
    const [countries, setCountries] = useState<any[]>([]);
    useEffect(() => {
        // Ensure data is stored first
        storeData();
        // Retrieve countries data from localStorage
        const storedCountries = localStorage.getItem('countries');
        if (storedCountries) {
            setCountries(JSON.parse(storedCountries));
        }
    }, []);
    const [enrolment, setEnrolment] = useState(() => {
        return JSON.parse(localStorage.getItem("enrolment") || "{}");
    });
    const updateEnrolment = (key: string, value: string) => {
        const enrolmentUpdated = { ...enrolment, [key]: value };
        setEnrolment(enrolmentUpdated);
        localStorage.setItem("enrolment", JSON.stringify(enrolmentUpdated));
    }
    const [communityCard, setCommunityCard] = useState<string>("");
    const [highUserCard, setHighUserCard] = useState<string>("");
    //---------------Search for occupation function-----------------//
    const [searchTerm, setSearchTerm] = useState(() => {
        const saved = JSON.parse(localStorage.getItem("enrolment") || "{}");
        return saved.occupation || "";
    });
    const [filteredOccupations, setFilteredOccupations] = useState<[string, string][]>([]);
    const handleOccupationChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setSearchTerm(value);

        const storedOccupations = JSON.parse(localStorage.getItem("occupations") || "{}");

        const filtered: [string, string][] = Object.entries(storedOccupations)
            .filter(([_, val]) => typeof val === "string" && val.toLowerCase().includes(value.toLowerCase()))
            .map(([key, val]) => [key, val as string]);

        setFilteredOccupations(filtered);

        const updatedEnrolment = { ...JSON.parse(localStorage.getItem("enrolment") || "{}"), occupation: value };
        localStorage.setItem("enrolment", JSON.stringify(updatedEnrolment));
    };
    const handleOccupationSelect = (value: string): void => {
        setSearchTerm(value);

        const updatedEnrolment = { ...JSON.parse(localStorage.getItem("enrolment") || "{}"), occupation: value };
        localStorage.setItem("enrolment", JSON.stringify(updatedEnrolment));

        setFilteredOccupations([]);
    };
    //---------------End of search for occupation function-----------------//

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    };

    return (
        <>
            {/* Personal Information */}
            <div className="bg-light border p-4">
                {/* NHI Box */}
                <div className="row mb-4 align-items-center">
                    <div className="col-md-6">
                        <label className="fw-bold">ENROLMENT FORM</label>
                    </div>
                    <div className="col-md-6 text-end">
                        <label htmlFor="nhi" className="form-label">NHI (Office use only)</label>
                        <input
                            type="text"
                            id="nhi"
                            name="nhi"
                            className="form-control d-inline-block w-auto"
                            placeholder="NHI"
                            value={enrolment.nhi || ""}
                            onChange={(e) => updateEnrolment("nhi", e.target.value)}
                        />
                    </div>
                </div>

                {/* Legal Name Row */}
                <div className="row g-3 align-items-center mb-3">
                    {/* Title */}
                    <div className="col-md-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <select
                            id="title"
                            className="form-select"
                            value={enrolment.title || ""}
                            onChange={(e) => updateEnrolment("title", e.target.value)}
                            required
                        >
                            <option value="" disabled style={{ color: "#6c757d" }}>Select Title</option>
                            {titles.map((title, index) => (
                                <option key={index} value={title}>{title}</option>
                            ))}
                        </select>
                    </div>

                    {/* First Name */}
                    <div className="col-md-3">
                        <label htmlFor="first_name" className="form-label">First Name</label>
                        <input
                            type="text"
                            id="first_name"
                            className="form-control"
                            placeholder="First Name"
                            value={enrolment.firstName || ""}
                            onChange={(e) => updateEnrolment("firstName", e.target.value)}
                            required
                        />
                    </div>
                    {/* Middle Name */}
                    <div className="col-md-3">
                        <label htmlFor="middle_name" className="form-label">Middle Name(s)</label>
                        <input
                            type="text"
                            id="middle_name"
                            className="form-control"
                            placeholder="Middle Name"
                            value={enrolment.middleName || ""}
                            onChange={(e) => updateEnrolment("middleName", e.target.value)}
                        />
                    </div>
                    {/* Last Name */}
                    <div className="col-md-3">
                        <label htmlFor="last_name" className="form-label">Last Name</label>
                        <input
                            type="text"
                            id="last_name"
                            className="form-control"
                            placeholder="Last Name"
                            value={enrolment.lastName || ""}
                            onChange={(e) => updateEnrolment("lastName", e.target.value)}
                            required
                        />
                    </div>
                </div>

                {/* Other Name and Occupation */}
                <div className="bg-light  ">
                    <div className="row mb-3">
                        {/* Other Name */}
                        <div className="col-md-6">
                            <label className="form-label">Other Name</label>
                            <div className="d-flex gap-3">
                                <div className="form-check">
                                    <input
                                        type="radio"
                                        id="legalName"
                                        name="otherNameType"
                                        value="Legal Name"
                                        className="form-check-input"
                                        required
                                        onChange={(e) => {
                                            const updated = { ...enrolment, otherNameType: e.target.value, otherName: "" };
                                            setEnrolment(updated);
                                            localStorage.setItem("enrolment", JSON.stringify(updated));
                                        }}
                                        checked={enrolment.otherNameType === "Legal Name"}
                                    />
                                    <label htmlFor="legalName" className="form-check-label">Legal Name</label>
                                </div>
                                <div className="form-check">
                                    <input
                                        type="radio"
                                        id="otherName"
                                        name="otherNameType"
                                        value="Other Name"
                                        className="form-check-input"
                                        required
                                        onChange={(e) => {
                                            const updated = { ...enrolment, otherNameType: e.target.value };
                                            setEnrolment(updated);
                                            localStorage.setItem("enrolment", JSON.stringify(updated));
                                        }}
                                        checked={enrolment.otherNameType === "Other Name"}
                                    />
                                    <label htmlFor="otherName" className="form-check-label">Other Name</label>
                                </div>
                            </div>

                            {enrolment.otherNameType === "Other Name" && (
                                <div className="mt-3">
                                    <label className="form-label">Other Name(s)</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Preferred Name"
                                        value={enrolment.otherName || ""}
                                        onChange={(e) => {
                                            const updated = { ...enrolment, otherName: e.target.value };
                                            setEnrolment(updated);
                                            localStorage.setItem("enrolment", JSON.stringify(updated));
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Occupation */}
                        <div className="col-md-6 position-relative">
                            <label className="form-label">Occupation</label>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search Occupation"
                                    value={searchTerm}
                                    onChange={handleOccupationChange}
                                />
                                <span className="input-group-text">
                                    <i className="bi bi-search" style={{ fontWeight: "bold" }}></i>
                                </span>
                            </div>

                            {searchTerm && filteredOccupations.length > 0 && (
                                <div
                                    className="position-absolute w-100 bg-white border mt-1"
                                    style={{ zIndex: 1000, maxHeight: "150px", overflowY: "auto" }}
                                >
                                    {filteredOccupations.map(([key, value]) => (
                                        <div
                                            key={key}
                                            className="p-2 hover-bg-light"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleOccupationSelect(value)}
                                        >
                                            {value}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>


                    </div>
                </div>

                {/* Birth Details Row */}
                <div className="row mb-3">
                    <div className="col-md-4">
                        <label htmlFor="birthDate" className="form-label">Date of Birth</label>
                        <input
                            type="date"
                            id="birthDate"
                            className="form-control"
                            value={enrolment.birthDate || ""}
                            onChange={(e) => updateEnrolment("birthDate", e.target.value)}
                            required
                        />
                    </div>

                    <div className="col-md-4">
                        <label htmlFor="placeOfBirth" className="form-label">Place of Birth</label>
                        <input
                            type="text"
                            id="placeOfBirth"
                            className="form-control"
                            placeholder="Place of Birth"
                            value={enrolment.placeOfBirth || ""}
                            onChange={(e) => updateEnrolment("placeOfBirth", e.target.value)}
                            required
                        />
                    </div>

                    <div className="col-md-4">
                        <label htmlFor="countryOfBirth" className="form-label">Country of Birth</label>
                        <select
                            id="countryOfBirth"
                            className="form-select"
                            value={enrolment.countryOfBirth || ""}
                            onChange={(e) => updateEnrolment("countryOfBirth", e.target.value)}
                            required
                        >
                            <option value="" disabled>Select Country</option>
                            {countries.map((country, index) => (
                                <option key={index} value={country.code}>{country.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Gender Row */}
                <div className="row mb-3">
                    <div className="col-md-12">
                        <label className="form-label">Gender <span className="text-danger">*</span></label>
                        <div className="d-flex align-items-center gap-3">
                            <div className="form-check">
                                <input
                                    type="radio"
                                    name="gender"
                                    id="male"
                                    value="Male"
                                    className="form-check-input"
                                    checked={enrolment.gender === "Male"}
                                    onChange={() => updateEnrolment("gender", "Male")}
                                />
                                <label htmlFor="male" className="form-check-label">Male</label>
                            </div>

                            <div className="form-check">
                                <input
                                    type="radio"
                                    name="gender"
                                    id="female"
                                    value="Female"
                                    className="form-check-input"
                                    checked={enrolment.gender === "Female"}
                                    onChange={() => updateEnrolment("gender", "Female")}
                                />
                                <label htmlFor="female" className="form-check-label">Female</label>
                            </div>

                            <div className="form-check">
                                <input
                                    type="radio"
                                    name="gender"
                                    id="other"
                                    value="Other"
                                    className="form-check-input"
                                    checked={enrolment.gender === "Other"}
                                    onChange={() => updateEnrolment("gender", "Other")}
                                />
                                <label htmlFor="other" className="form-check-label">Other (Please specify)</label>
                            </div>
                        </div>
                    </div>
                </div>

                {enrolment.gender === "Other" && (
                    <div className="mt-3">
                        <label htmlFor="genderOptions" className="form-label">Select Gender Identity</label>
                        <select
                            id="genderOptions"
                            className="form-select"
                            value={enrolment.genderOption || ""}
                            onChange={(e) => updateEnrolment("genderOption", e.target.value)}
                        >
                            <option value="" disabled>Please state if other</option>
                            {gender.map((g, index) => (
                                <option key={index} value={g}>{g}</option>
                            ))}
                        </select>
                    </div>
                )}

                {enrolment.genderOption === "Other" && (
                    <div className="mt-3">
                        <label htmlFor="pleaseSpecify" className="form-label">Please specify</label>
                        <input
                            type="text"
                            id="pleaseSpecify"
                            className="form-control"
                            placeholder="Specify gender identity"
                            value={enrolment.pleaseSpecify || ""}
                            onChange={(e) => updateEnrolment("pleaseSpecify", e.target.value)}
                        />
                    </div>
                )}

            </div>

            {/* Residential and Postal Address Row */}
            <div className="bg-light border p-4">

                {/* Residential Address */}
                <div className="row mb-4">
                    <div className="col-12">
                        <label className="form-label fw-bold">Residential Address <span className="text-danger">*</span></label>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="resAddress" className="form-label">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="resAddress"
                            placeholder="House Number, Street Name"
                            value={enrolment.resAddress || ""}
                            onChange={(e) => updateEnrolment("resAddress", e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="resSuburb" className="form-label">Suburb</label>
                        <input
                            type="text"
                            className="form-control"
                            id="resSuburb"
                            placeholder="Suburb"
                            value={enrolment.resSuburb || ""}
                            onChange={(e) => updateEnrolment("resSuburb", e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-md-6 mt-3">
                        <label htmlFor="resCity" className="form-label">City</label>
                        <input
                            type="text"
                            className="form-control"
                            id="resCity"
                            placeholder="City"
                            value={enrolment.resCity || ""}
                            onChange={(e) => updateEnrolment("resCity", e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-md-6 mt-3">
                        <label htmlFor="resPostcode" className="form-label">Postcode</label>
                        <input
                            type="text"
                            className="form-control"
                            id="resPostcode"
                            placeholder="Postcode"
                            value={enrolment.resPostcode || ""}
                            onChange={(e) => updateEnrolment("resPostcode", e.target.value)}
                            required
                        />
                    </div>
                </div>

                {/* Postal Address Toggle */}
                <div className="row mb-3">
                    <div className="col-12">
                        <label className="form-label fw-bold">Is this your postal address? <span className="text-danger">*</span></label>
                        <div className="d-flex gap-3">
                            <div className="form-check">
                                <input
                                    type="radio"
                                    name="isPostalAddress"
                                    id="postalYes"
                                    value="Yes"
                                    className="form-check-input"
                                    checked={enrolment.isPostalAddress === "Yes"}
                                    onChange={() => updateEnrolment("isPostalAddress", "Yes")}
                                    required
                                />
                                <label htmlFor="postalYes" className="form-check-label">Yes</label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    name="isPostalAddress"
                                    id="postalNo"
                                    value="No"
                                    className="form-check-input"
                                    checked={enrolment.isPostalAddress === "No"}
                                    onChange={() => updateEnrolment("isPostalAddress", "No")}
                                    required
                                />
                                <label htmlFor="postalNo" className="form-check-label">No</label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Postal Address - Show if No */}
                {enrolment.isPostalAddress === "No" && (
                    <div className="row mt-3">
                        <div className="col-12">
                            <label className="form-label fw-bold">Postal Address <span className="text-danger">*</span></label>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="postalAddress" className="form-label">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                id="postalAddress"
                                placeholder="House Number, PO Box, Street Name"
                                value={enrolment.postalAddress || ""}
                                onChange={(e) => updateEnrolment("postalAddress", e.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="postalSuburb" className="form-label">Suburb</label>
                            <input
                                type="text"
                                className="form-control"
                                id="postalSuburb"
                                placeholder="Suburb"
                                value={enrolment.postalSuburb || ""}
                                onChange={(e) => updateEnrolment("postalSuburb", e.target.value)}
                            />
                        </div>
                        <div className="col-md-6 mt-3">
                            <label htmlFor="postalCity" className="form-label">City</label>
                            <input
                                type="text"
                                className="form-control"
                                id="postalCity"
                                placeholder="City"
                                value={enrolment.postalCity || ""}
                                onChange={(e) => updateEnrolment("postalCity", e.target.value)}
                            />
                        </div>
                        <div className="col-md-6 mt-3">
                            <label htmlFor="postalPostcode" className="form-label">Postcode</label>
                            <input
                                type="text"
                                className="form-control"
                                id="postalPostcode"
                                placeholder="Postcode"
                                value={enrolment.postalPostcode || ""}
                                onChange={(e) => updateEnrolment("postalPostcode", e.target.value)}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Cards Section */}
            <div className="bg-light border p-4">
                <label className="form-label fw-bold">Cards</label>

                {/* Community Services Card */}
                <div className="row mb-3 align-items-end">
                    <div className="col-md-3">
                        <label className="form-label">Community Services Card</label>
                        <div className="d-flex gap-3">
                            <div className="form-check">
                                <input
                                    type="radio"
                                    name="communityCard"
                                    id="communityYes"
                                    value="Yes"
                                    className="form-check-input"
                                    required
                                    checked={enrolment.communityCard === "Yes"}
                                    onChange={() => updateEnrolment("communityCard", "Yes")}
                                />
                                <label htmlFor="communityYes" className="form-check-label">Yes</label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    name="communityCard"
                                    id="communityNo"
                                    value="No"
                                    className="form-check-input"
                                    required
                                    checked={enrolment.communityCard === "No"}
                                    onChange={() => updateEnrolment("communityCard", "No")}
                                />
                                <label htmlFor="communityNo" className="form-check-label">No</label>
                            </div>
                        </div>
                    </div>

                    {enrolment.communityCard === "Yes" && (
                        <>
                            <div className="col-md-3">
                                <label htmlFor="communityStart" className="form-label">Starting Date</label>
                                <input
                                    id="communityStart"
                                    name="communityStart"
                                    type="date"
                                    className="form-control"
                                    required
                                    value={enrolment.communityStart || ""}
                                    onChange={(e) => updateEnrolment("communityStart", e.target.value)}
                                />
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="communityExpiry" className="form-label">Expiry Date</label>
                                <input
                                    id="communityExpiry"
                                    name="communityExpiry"
                                    type="date"
                                    className="form-control"
                                    required
                                    value={enrolment.communityExpiry || ""}
                                    onChange={(e) => updateEnrolment("communityExpiry", e.target.value)}
                                />
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="communityCardNumber" className="form-label">Card Number</label>
                                <input
                                    id="communityCardNumber"
                                    name="communityCardNumber"
                                    type="text"
                                    className="form-control"
                                    placeholder="000-000-000"
                                    maxLength={9}
                                    required
                                    value={enrolment.communityCardNumber || ""}
                                    onChange={(e) => updateEnrolment("communityCardNumber", e.target.value.replace(/\D/g, ""))}
                                />
                            </div>
                        </>
                    )}
                </div>

                {/* High User Health Card */}
                <div className="row mb-3 align-items-end">
                    <div className="col-md-3">
                        <label className="form-label">High User Health Card</label>
                        <div className="d-flex gap-3">
                            <div className="form-check">
                                <input
                                    type="radio"
                                    name="highUserCard"
                                    id="highUserYes"
                                    value="Yes"
                                    className="form-check-input"
                                    required
                                    checked={enrolment.highUserCard === "Yes"}
                                    onChange={() => updateEnrolment("highUserCard", "Yes")}
                                />
                                <label htmlFor="highUserYes" className="form-check-label">Yes</label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    name="highUserCard"
                                    id="highUserNo"
                                    value="No"
                                    className="form-check-input"
                                    required
                                    checked={enrolment.highUserCard === "No"}
                                    onChange={() => updateEnrolment("highUserCard", "No")}
                                />
                                <label htmlFor="highUserNo" className="form-check-label">No</label>
                            </div>
                        </div>
                    </div>

                    {enrolment.highUserCard === "Yes" && (
                        <>
                            <div className="col-md-3">
                                <label htmlFor="highUserStart" className="form-label">Starting Date</label>
                                <input
                                    id="highUserStart"
                                    name="highUserStart"
                                    type="date"
                                    className="form-control"
                                    required
                                    value={enrolment.highUserStart || ""}
                                    onChange={(e) => updateEnrolment("highUserStart", e.target.value)}
                                />
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="highUserExpiry" className="form-label">Expiry Date</label>
                                <input
                                    id="highUserExpiry"
                                    name="highUserExpiry"
                                    type="date"
                                    className="form-control"
                                    required
                                    value={enrolment.highUserExpiry || ""}
                                    onChange={(e) => updateEnrolment("highUserExpiry", e.target.value)}
                                />
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="highUserCardNumber" className="form-label">Card Number</label>
                                <input
                                    id="highUserCardNumber"
                                    name="highUserCardNumber"
                                    type="text"
                                    className="form-control"
                                    placeholder="000-000-000"
                                    maxLength={9}
                                    required
                                    value={enrolment.highUserCardNumber || ""}
                                    onChange={(e) => updateEnrolment("highUserCardNumber", e.target.value.replace(/\D/g, ""))}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>


            {/* Transfer of Records */}
            <div className="bg-light border p-4">
                <label className="form-label fw-bold">Transfer of Records</label>
                <p>
                    In order to get the best care possible, I agree to the Practice obtaining my records from my previous Doctor.
                    I also understand that I will be removed from their practice register.
                </p>
                <div className="mb-3">
                    <div className="d-flex gap-3">
                        <div className="form-check">
                            <input
                                type="radio"
                                name="transferRecords"
                                id="transferYes"
                                value="Yes"
                                className="form-check-input"
                                required
                                onChange={(e) => {
                                    const updated = { ...enrolment, transferRecords: e.target.value };
                                    setEnrolment(updated);
                                    localStorage.setItem("enrolment", JSON.stringify(updated));
                                }}
                                checked={enrolment.transferRecords === "Yes"}
                            />
                            <label htmlFor="transferYes" className="form-check-label">Yes (please request transfer of my records)</label>
                        </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                name="transferRecords"
                                id="transferNo"
                                value="No"
                                className="form-check-input"
                                required
                                onChange={(e) => {
                                    const updated = { ...enrolment, transferRecords: e.target.value };
                                    setEnrolment(updated);
                                    localStorage.setItem("enrolment", JSON.stringify(updated));
                                }}
                                checked={enrolment.transferRecords === "No"}
                            />
                            <label htmlFor="transferNo" className="form-check-label">No transfer</label>
                        </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                name="transferRecords"
                                id="notApplicable"
                                value="Not applicable"
                                className="form-check-input"
                                required
                                onChange={(e) => {
                                    const updated = { ...enrolment, transferRecords: e.target.value };
                                    setEnrolment(updated);
                                    localStorage.setItem("enrolment", JSON.stringify(updated));
                                }}
                                checked={enrolment.transferRecords === "Not applicable"}
                            />
                            <label htmlFor="notApplicable" className="form-check-label">Not applicable</label>
                        </div>
                    </div>
                </div>

                {enrolment.transferRecords === "Yes" && (
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="previousDoctor" className="form-label">Previous Doctor/Practice Name</label>
                            <input
                                type="text"
                                id="previousDoctor"
                                name="previousDoctor"
                                className="form-control"
                                placeholder="Previous Doctor/Practice Name"
                                value={enrolment.previousDoctor || ""}
                                onChange={(e) => {
                                    const updated = { ...enrolment, previousDoctor: e.target.value };
                                    setEnrolment(updated);
                                    localStorage.setItem("enrolment", JSON.stringify(updated));
                                }}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="doctorAddress" className="form-label">Address/Location</label>
                            <input
                                type="text"
                                id="doctorAddress"
                                name="doctorAddress"
                                className="form-control"
                                placeholder="Address/Location"
                                value={enrolment.doctorAddress || ""}
                                onChange={(e) => {
                                    const updated = { ...enrolment, doctorAddress: e.target.value };
                                    setEnrolment(updated);
                                    localStorage.setItem("enrolment", JSON.stringify(updated));
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Terms and Debt Record */}
            <div className="bg-light border p-4">
                <div className="row mb-3">
                    <div className="col-md-8">
                        <label className="form-label fw-bold">Acceptance of Terms and Conditions of Credit:</label>
                        <ul className="mb-0">
                            <li>All Accounts are Payable on the day that services are provided.</li>
                            <li>I shall pay or reimburse you all costs and expenses incurred by you instructing a solicitor and/or debt collecting agency to recover any amount overdue for payment by me.</li>
                            <li>An administration fee of $5.00 per overdue statement period may be added.</li>
                            <li>I agree to be bound by the above terms and conditions in respect to this and all future transactions.</li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">I have a bad debt record or have had my account handed over to a debt collection agency</label>
                        <div className="form-check">
                            <input
                                type="radio"
                                name="debtRecord"
                                id="debtYes"
                                value="Yes"
                                className="form-check-input"
                                required
                                onChange={(e) => {
                                    const updated = { ...enrolment, debtRecord: e.target.value };
                                    setEnrolment(updated);
                                    localStorage.setItem("enrolment", JSON.stringify(updated));
                                }}
                                checked={enrolment.debtRecord === "Yes"}
                            />
                            <label htmlFor="debtYes" className="form-check-label">Yes</label>
                        </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                name="debtRecord"
                                id="debtNo"
                                value="No"
                                className="form-check-input"
                                required
                                onChange={(e) => {
                                    const updated = { ...enrolment, debtRecord: e.target.value };
                                    setEnrolment(updated);
                                    localStorage.setItem("enrolment", JSON.stringify(updated));
                                }}
                                checked={enrolment.debtRecord === "No"}
                            />
                            <label htmlFor="debtNo" className="form-check-label">No</label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ethnicity Details */}
            <div className="bg-light border p-4 ">
                <label className="form-label fw-bold">Ethnicity Details <span className="text-danger">*</span></label>
                <p>Which ethnic group(s) do you belong to? (Tick the space or spaces which apply to you)</p>
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                id="ethnicityNZEuropean"
                                className="form-check-input"
                                onChange={(e) => {
                                    const updated = { ...enrolment, ethnicityNZEuropean: e.target.checked };
                                    setEnrolment(updated);
                                    localStorage.setItem("enrolment", JSON.stringify(updated));
                                }}
                                checked={enrolment.ethnicityNZEuropean || false}
                            />
                            <label htmlFor="ethnicityNZEuropean" className="form-check-label">New Zealand European (11)</label>
                        </div>

                        <div className="form-check">
                            <input
                                type="checkbox"
                                id="ethnicityMaori"
                                className="form-check-input"
                                onChange={(e) => {
                                    const updated = { ...enrolment, ethnicityMaori: e.target.checked };
                                    setEnrolment(updated);
                                    localStorage.setItem("enrolment", JSON.stringify(updated));
                                }}
                                checked={enrolment.ethnicityMaori || false}
                            />
                            <label htmlFor="ethnicityMaori" className="form-check-label">Māori (21)</label>
                            <input
                                type="text"
                                className={`form-control mt-2 ${enrolment.ethnicityMaori ? '' : 'd-none'}`}
                                placeholder="Enter your iwi (if applicable)"
                                value={enrolment.ethnicityMaoriDetail || ""}
                                onChange={(e) => {
                                    const updated = { ...enrolment, ethnicityMaoriDetail: e.target.value };
                                    setEnrolment(updated);
                                    localStorage.setItem("enrolment", JSON.stringify(updated));
                                }}
                            />
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                id="ethnicitySamoan"
                                className="form-check-input"
                                onChange={(e) => {
                                    const updated = { ...enrolment, ethnicitySamoan: e.target.checked };
                                    setEnrolment(updated);
                                    localStorage.setItem("enrolment", JSON.stringify(updated));
                                }}
                                checked={enrolment.ethnicitySamoan || false}
                            />
                            <label htmlFor="ethnicitySamoan" className="form-check-label">Samoan (31)</label>
                        </div>

                        <div className="form-check">
                            <input
                                type="checkbox"
                                id="ethnicityCookIsland"
                                className="form-check-input"
                                onChange={(e) => {
                                    const updated = { ...enrolment, ethnicityCookIsland: e.target.checked };
                                    setEnrolment(updated);
                                    localStorage.setItem("enrolment", JSON.stringify(updated));
                                }}
                                checked={enrolment.ethnicityCookIsland || false}
                            />
                            <label htmlFor="ethnicityCookIsland" className="form-check-label">Cook Island Māori (32)</label>
                        </div>

                        <div className="form-check">
                            <input
                                type="checkbox"
                                id="ethnicityTongan"
                                className="form-check-input"
                                onChange={(e) => {
                                    const updated = { ...enrolment, ethnicityTongan: e.target.checked };
                                    setEnrolment(updated);
                                    localStorage.setItem("enrolment", JSON.stringify(updated));
                                }}
                                checked={enrolment.ethnicityTongan || false}
                            />
                            <label htmlFor="ethnicityTongan" className="form-check-label">Tongan (33)</label>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                id="ethnicityNiuean"
                                className="form-check-input"
                                onChange={(e) => {
                                    const updated = { ...enrolment, ethnicityNiuean: e.target.checked };
                                    setEnrolment(updated);
                                    localStorage.setItem("enrolment", JSON.stringify(updated));
                                }}
                                checked={enrolment.ethnicityNiuean || false}
                            />
                            <label htmlFor="ethnicityNiuean" className="form-check-label">Niuean (34)</label>
                        </div>

                        <div className="form-check">
                            <input
                                type="checkbox"
                                id="ethnicityChinese"
                                className="form-check-input"
                                onChange={(e) => {
                                    const updated = { ...enrolment, ethnicityChinese: e.target.checked };
                                    setEnrolment(updated);
                                    localStorage.setItem("enrolment", JSON.stringify(updated));
                                }}
                                checked={enrolment.ethnicityChinese || false}
                            />
                            <label htmlFor="ethnicityChinese" className="form-check-label">Chinese (42)</label>
                        </div>

                        <div className="form-check">
                            <input
                                type="checkbox"
                                id="ethnicityIndian"
                                className="form-check-input"
                                onChange={(e) => {
                                    const updated = { ...enrolment, ethnicityIndian: e.target.checked };
                                    setEnrolment(updated);
                                    localStorage.setItem("enrolment", JSON.stringify(updated));
                                }}
                                checked={enrolment.ethnicityIndian || false}
                            />
                            <label htmlFor="ethnicityIndian" className="form-check-label">Indian (43)</label>
                        </div>

                        <div className="form-check">
                            <input
                                type="checkbox"
                                id="ethnicityOther"
                                className="form-check-input"
                                onChange={(e) => {
                                    const updated = { ...enrolment, ethnicityOther: e.target.checked };
                                    setEnrolment(updated);
                                    localStorage.setItem("enrolment", JSON.stringify(updated));
                                }}
                                checked={enrolment.ethnicityOther || false}
                            />
                            <label htmlFor="ethnicityOther" className="form-check-label">Other (Please specify)</label>
                            <input
                                type="text"
                                className={`form-control mt-2 ${enrolment.ethnicityOther ? '' : 'd-none'}`}
                                placeholder="Please specify (if applicable)"
                                value={enrolment.ethnicityOtherDetail || ""}
                                onChange={(e) => {
                                    const updated = { ...enrolment, ethnicityOtherDetail: e.target.value };
                                    setEnrolment(updated);
                                    localStorage.setItem("enrolment", JSON.stringify(updated));
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Patient Survey */}
            <div className="bg-light border p-4 ">
                <label className="form-label fw-bold">Patient Survey</label>
                <p>
                    I understand that the Practice participates in a national survey about people's health care experience and how their overall care is managed.
                    Taking part is voluntary and all responses will be anonymous.
                </p>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="patientSurvey"
                        id="surveyYes"
                        value="Yes"
                        required
                        checked={enrolment.patientSurvey === "Yes"}
                        onChange={(e) => {
                            const updated = { ...enrolment, patientSurvey: e.target.value };
                            setEnrolment(updated);
                            localStorage.setItem("enrolment", JSON.stringify(updated));
                        }}
                    />
                    <label className="form-check-label" htmlFor="surveyYes">I wish to participate in the Patient Survey</label>
                </div>

                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="patientSurvey"
                        id="surveyNo"
                        value="No"
                        required
                        checked={enrolment.patientSurvey === "No"}
                        onChange={(e) => {
                            const updated = { ...enrolment, patientSurvey: e.target.value };
                            setEnrolment(updated);
                            localStorage.setItem("enrolment", JSON.stringify(updated));
                        }}
                    />
                    <label className="form-check-label" htmlFor="surveyNo">I do not wish to participate in the Patient Survey</label>
                </div>
            </div>

        </>
    );
};

export default EnrolmentForm;
