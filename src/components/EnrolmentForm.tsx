// EnrolmentForm.tsx
import React, { useEffect, useState } from 'react';
import gender from '../json/gender.json';
import titles from '../json/titles.json';
import { storeData } from './storeData';

const EnrolmentForm: React.FC = () => {
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

    return (
        <form>
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
                        />
                    </div>
                </div>

                {/* Legal Name Row */}
                <div className="row g-3 align-items-center mb-3">
                    <div className="col-12 col-sm-6 col-md-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <select id="title" name="title" className="form-select" required defaultValue="">
                            <option value="" disabled>Select Title</option>
                            {titles.map((title, index) => (
                                <option key={index} value={title}>
                                    {title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="first_name" className="form-label">First Name</label>
                        <input type="text" id="first_name" name="givenName" className="form-control" placeholder="First Name" required />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="middle_name" className="form-label">Middle Name(s)</label>
                        <input type="text" id="middle_name" name="middle_name" className="form-control" placeholder="Middle Name" />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="last_name" className="form-label">Last Name</label>
                        <input type="text" id="last_name" name="last_name" className="form-control" placeholder="Last Name" required />
                    </div>
                </div>

           

                {/* Birth Details Row */}
                <div className="row mb-3">
                    <div className="col-md-4">
                        <label htmlFor="birthDate" className="form-label">Date of Birth</label>
                        <input type="date" id="birthDate" name="birth_date" className="form-control" required />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="placeOfBirth" className="form-label">Place of Birth</label>
                        <input type="text" id="placeOfBirth" name="place_of_birth" className="form-control" placeholder="Place of Birth" required />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="countryOfBirth" className="form-label">Country of Birth</label>
                        <select id="countryOfBirth" name="country_of_birth" className="form-select" required defaultValue="">
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
                                    required
                                    className="form-check-input"                                    
                                    onChange={() => {
                                        document.getElementById('genderDropdownContainer')!.classList.add('d-none');
                                        document.getElementById('pleaseSpecifyInput')!.classList.add('d-none');
                                    }}
                                />
                                <label htmlFor="male" className="form-check-label">Male</label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    name="gender"
                                    id="female"
                                    required
                                    value="Female"
                                    className="form-check-input"
                                    onChange={() => {
                                        document.getElementById('genderDropdownContainer')!.classList.add('d-none');
                                        document.getElementById('pleaseSpecifyInput')!.classList.add('d-none');
                                    }}
                                />
                                <label htmlFor="female" className="form-check-label">Female</label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    name="gender"
                                    id="gender-other"
                                    value="Other"
                                    required
                                    className="form-check-input"
                                    onChange={() => {
                                        document.getElementById('genderDropdownContainer')!.classList.remove('d-none');
                                        document.getElementById('pleaseSpecifyInput')!.classList.remove('d-none');
                                    }}
                                />
                                <label htmlFor="gender-other" className="form-check-label">Other (Please specify)</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="genderDropdownContainer" className="mt-3 d-none">
                    <label htmlFor="genderOptions" className="form-label">Select Gender Identity</label>
                    <select id="genderOptions" className="form-select" defaultValue="">
                        <option value="" disabled>Please state if other</option>
                        {gender.map((g, index) => (
                            <option key={index} value={g}>{g}</option>
                        ))}
                    </select>
                </div>

                <div id="pleaseSpecifyInput" className="mt-3 d-none">
                    <label htmlFor="pleaseSpecify" className="form-label">Please specify</label>
                    <input
                        type="text"
                        id="pleaseSpecify"
                        name="pleaseSpecify"
                        className="form-control"
                        placeholder="Specify gender identity"
                    />
                </div>
            </div>

            {/* Residential and Postal Address Row */}
            <div className="bg-light border p-4">
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
                            name="residential_address"
                            placeholder="House Number, Street Name"
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="resSuburb" className="form-label">Suburb</label>
                        <input
                            type="text"
                            className="form-control"
                            id="resSuburb"
                            name="residential_suburb"
                            placeholder="Suburb"
                            required
                        />
                    </div>
                    <div className="col-md-6 mt-3">
                        <label htmlFor="resCity" className="form-label">City</label>
                        <input
                            type="text"
                            className="form-control"
                            id="resCity"
                            name="residential_city"
                            placeholder="City"
                            required
                        />
                    </div>
                    <div className="col-md-6 mt-3">
                        <label htmlFor="resPostcode" className="form-label">Postcode</label>
                        <input
                            type="text"
                            className="form-control"
                            id="resPostcode"
                            name="residential_postcode"
                            placeholder="Postcode"
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
                                    defaultChecked
                                    required
                                    onChange={() => document.getElementById('postalAddressContainer')!.classList.add('d-none')}
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
                                    required
                                    onChange={() => document.getElementById('postalAddressContainer')!.classList.remove('d-none')}
                                />
                                <label htmlFor="postalNo" className="form-check-label">No</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="postalAddressContainer" className="row d-none mt-3">
                    <div className="col-12">
                        <label className="form-label fw-bold">Postal Address <span className="text-danger">*</span></label>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="postalAddress" className="form-label">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="postalAddress"
                            name="postal_address"
                            placeholder="House Number, PO Box, Street Name"
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="postalSuburb" className="form-label">Suburb</label>
                        <input
                            type="text"
                            className="form-control"
                            id="postalSuburb"
                            name="postal_suburb"
                            placeholder="Suburb"
                        />
                    </div>
                    <div className="col-md-6 mt-3">
                        <label htmlFor="postalCity" className="form-label">City</label>
                        <input
                            type="text"
                            className="form-control"
                            id="postalCity"
                            name="postal_city"
                            placeholder="City"
                        />
                    </div>
                    <div className="col-md-6 mt-3">
                        <label htmlFor="postalPostcode" className="form-label">Postcode</label>
                        <input
                            type="text"
                            className="form-control"
                            id="postalPostcode"
                            name="postal_postcode"
                            placeholder="Postcode"
                        />
                    </div>
                </div>
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
                                    onChange={() => {
                                        document.getElementById('communityStartContainer')!.classList.remove('d-none');
                                        document.getElementById('communityExpiryContainer')!.classList.remove('d-none');
                                        document.getElementById('communityCardNumberContainer')!.classList.remove('d-none');
                                    }}
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
                                    onChange={() => {
                                        document.getElementById('communityStartContainer')!.classList.add('d-none');
                                        document.getElementById('communityExpiryContainer')!.classList.add('d-none');
                                        document.getElementById('communityCardNumberContainer')!.classList.add('d-none');
                                    }}
                                />
                                <label htmlFor="communityNo" className="form-check-label">No</label>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3 d-none" id="communityStartContainer">
                        <label htmlFor="communityStart" className="form-label">Starting Date</label>
                        <input
                            id="communityStart"
                            name="communityStart"
                            type="date"
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-3 d-none" id="communityExpiryContainer">
                        <label htmlFor="communityExpiry" className="form-label">Expiry Date</label>
                        <input
                            id="communityExpiry"
                            name="communityExpiry"
                            type="date"
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-3 d-none" id="communityCardNumberContainer">
                        <label htmlFor="communityCardNumber" className="form-label">Card Number</label>
                        <input
                            id="communityCardNumber"
                            name="communityCardNumber"
                            type="text"
                            className="form-control"
                            placeholder="000-000-000"
                            maxLength={9}
                            onInput={e => (e.currentTarget.value = e.currentTarget.value.replace(/\D/g, ''))}
                        />
                    </div>
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
                                    onChange={() => {
                                        document.getElementById('highUserStartContainer')!.classList.remove('d-none');
                                        document.getElementById('highUserExpiryContainer')!.classList.remove('d-none');
                                        document.getElementById('highUserCardNumberContainer')!.classList.remove('d-none');
                                    }}
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
                                    onChange={() => {
                                        document.getElementById('highUserStartContainer')!.classList.add('d-none');
                                        document.getElementById('highUserExpiryContainer')!.classList.add('d-none');
                                        document.getElementById('highUserCardNumberContainer')!.classList.add('d-none');
                                    }}
                                />
                                <label htmlFor="highUserNo" className="form-check-label">No</label>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3 d-none" id="highUserStartContainer">
                        <label htmlFor="highUserStart" className="form-label">Starting Date</label>
                        <input
                            id="highUserStart"
                            name="highUserStart"
                            type="date"
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-3 d-none" id="highUserExpiryContainer">
                        <label htmlFor="highUserExpiry" className="form-label">Expiry Date</label>
                        <input
                            id="highUserExpiry"
                            name="highUserExpiry"
                            type="date"
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-3 d-none" id="highUserCardNumberContainer">
                        <label htmlFor="highUserCardNumber" className="form-label">Card Number</label>
                        <input
                            id="highUserCardNumber"
                            name="highUserCardNumber"
                            type="text"
                            className="form-control"
                            placeholder="000-000-000"
                            maxLength={9}
                            onInput={e => (e.currentTarget.value = e.currentTarget.value.replace(/\D/g, ''))}
                        />
                    </div>
                </div>
            </div>

            {/* Transfer of Records */}
            <div className="bg-light border p-4">
                <label className="form-label fw-bold">Transfer of Records</label>
                <p>In order to get the best care possible, I agree to the Practice obtaining my records from my previous Doctor. I also understand that I will be removed from their practice register.</p>
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
                                onChange={() => document.getElementById('transferInputs')!.classList.remove('d-none')}
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
                                onChange={() => document.getElementById('transferInputs')!.classList.add('d-none')}
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
                                onChange={() => document.getElementById('transferInputs')!.classList.add('d-none')}
                            />
                            <label htmlFor="notApplicable" className="form-check-label">Not applicable</label>
                        </div>
                    </div>
                </div>
                <div id="transferInputs" className="d-none">
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="previousDoctor" className="form-label">Previous Doctor and/or Practice Name</label>
                            <input
                                type="text"
                                id="previousDoctor"
                                name="previousDoctor"
                                className="form-control"
                                placeholder="Previous Doctor/Practice Name"
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
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Terms and Debt Record */}
            <div className="bg-light border p-4">
                <div className="row mb-3">
                    <div className="col-md-8">
                        <label className="form-label">Acceptance of terms and conditions of credit:</label>
                        <ul>
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
                            />
                            <label htmlFor="debtNo" className="form-check-label">No</label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ethnicity Details */}
            <div className="bg-light border p-4">
                <label className="form-label fw-bold">Ethnicity Details <span className="text-danger">*</span></label>
                <p>Which ethnic group(s) do you belong to? (Tick the space or spaces which apply to you)</p>
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-check">
                            <input type="checkbox" id="ethnicityNZEuropean" name="ethnicityNZEuropean" className="form-check-input" />
                            <label htmlFor="ethnicityNZEuropean" className="form-check-label">New Zealand European (11)</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" id="ethnicityMaori" name="ethnicityMaori" className="form-check-input" />
                            <label htmlFor="ethnicityMaori" className="form-check-label">Maori (21)</label>
                            <input type="text" id="ethnicityMaori-detail" className="form-control mt-2 d-none" placeholder="Enter your iwi (if applicable)" />
                        </div>
                        <div className="form-check">
                            <input type="checkbox" id="ethnicitySamoan" name="ethnicitySamoan" className="form-check-input" />
                            <label htmlFor="ethnicitySamoan" className="form-check-label">Samoan (31)</label>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-check">
                            <input type="checkbox" id="ethnicityCookIsland" name="ethnicityCookIsland" className="form-check-input" />
                            <label htmlFor="ethnicityCookIsland" className="form-check-label">Cook Island Maori (32)</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" id="ethnicityTongan" name="ethnicityTongan" className="form-check-input" />
                            <label htmlFor="ethnicityTongan" className="form-check-label">Tongan (33)</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" id="ethnicityNiuean" name="ethnicityNiuean" className="form-check-input" />
                            <label htmlFor="ethnicityNiuean" className="form-check-label">Niuean (34)</label>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-check">
                            <input type="checkbox" id="ethnicityChinese" name="ethnicityChinese" className="form-check-input" />
                            <label htmlFor="ethnicityChinese" className="form-check-label">Chinese (42)</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" id="ethnicityIndian" name="ethnicityIndian" className="form-check-input" />
                            <label htmlFor="ethnicityIndian" className="form-check-label">Indian (43)</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" id="ethnicityOther" name="ethnicityOther" className="form-check-input" />
                            <label htmlFor="ethnicityOther" className="form-check-label">Other (Please specify)</label>
                            <input type="text" id="ethnicityOther-detail" className="form-control mt-2 d-none" placeholder="Please specify (if applicable)" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Patient Survey */}
            <div className="bg-light border p-4">
                <div className="row mb-3">
                    <div className="col-md-12">
                        <label className="form-label fw-bold">Patient Survey</label>
                        <p>I understand that the Practice participates in a national survey about people's health care experience and how their overall care is managed. Taking part is voluntary and all responses will be anonymous. I can decline the survey or opt out of the survey by informing the Practice. The survey provides important information that is used to improve health services.</p>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="patientSurvey" id="surveyYes" value="Yes" required />
                            <label className="form-check-label" htmlFor="surveyYes">I wish to participate in the Patient Survey</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="patientSurvey" id="surveyNo" value="No" required />
                            <label className="form-check-label" htmlFor="surveyNo">I do not wish to participate in the Patient Survey</label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Buttons */}
        
        </form>
    );   
};

export default EnrolmentForm;
