"use client";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function WhistleBlowing() {
    const [isAnonymous, setIsAnonymous] = useState(true);
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        email: "",
        incidentTypes: [],
        incidentDescription: "",
        incidentDetails: "",
        fileAttachment: null,
    });

    const checkBoxText = [
        "Fraud",
        "Conflict of Interest",
        "Other (please specify)",
        "Theft",
        "Health/Safety & Security",
        "Discrimination",
        "Information Security Breaches",
        "Harassment",
        "Infringement of applicable law/legislation"
    ]

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handlePhoneChange = (value) => {
        setFormData({
            ...formData,
            phone: value,
        });
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prevState) => {
            const newIncidentTypes = checked
                ? [...prevState.incidentTypes, value]
                : prevState.incidentTypes.filter((type) => type !== value);
            return { ...prevState, incidentTypes: newIncidentTypes };
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            fileAttachment: e.target.files[0],
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        // Validate anonymous selection
        if (!isAnonymous) {
            const { fullName, phone, email } = formData;
            if (!fullName) {
                newErrors.fullName = "Full Name is required.";
            }
            if (!phone) {
                newErrors.phone = "Mobile Number is required.";
            }
            if (!email) {
                newErrors.email = "Email is required.";
            }
        }

        // Validate incident type selection
        if (formData.incidentTypes.length === 0) {
            newErrors.incidentTypes = "At least one incident type must be selected.";
        }

        // Validate incident description
        if (!formData.incidentDescription) {
            newErrors.incidentDescription = "Incident description is required.";
        }

        // Validate incident details
        if (!formData.incidentDetails) {
            newErrors.incidentDetails = "Incident details are required.";
        }

        // Validate file attachment
        if (!formData.fileAttachment) {
            newErrors.fileAttachment = "File attachment is required.";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            alert("Form submitted successfully!");
            // Handle form submission (e.g., send data to server)
        }
    };

    return (
        <div className="section-padding">
            <div className="border p-4 rounded-3">
                <div>
                    <div style={{ fontSize: '16px', color: 'black', fontWeight: '500' }} className="mb-4">Whistleblowing Incident Report</div>
                    <div className="mb-4 border border-start-0 border-end-0 py-2">
                        <p style={{ fontSize: '13px', marginTop: '12px' }}>Do you wish to report this incident anonymously*</p>
                        <div className="d-flex gap-2 mb-4 mt-3">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="reportAnonymously"
                                    id="reportAnonymouslyYes"
                                    value="yes"
                                    checked={isAnonymous}
                                    onChange={() => setIsAnonymous(true)}
                                />
                                <label className="form-check-label" htmlFor="reportAnonymouslyYes">Yes</label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="reportAnonymously"
                                    id="reportAnonymouslyNo"
                                    value="no"
                                    checked={!isAnonymous}
                                    onChange={() => setIsAnonymous(false)}
                                />
                                <label className="form-check-label" htmlFor="reportAnonymouslyNo">No</label>
                            </div>
                        </div>
                    </div>

                    {!isAnonymous && (
                        <div style={{ fontSize: '12px' }}>
                            <div style={{ fontSize: '16px', color: 'black', fontWeight: '700' }}>Contact Information</div>
                            <p>*The fields below are optional. If you do not wish to remain anonymous, please provide us with your information.</p>
                            <div className="form">
                                <div className="row">
                                    <div style={{ fontSize: '14px' }} className="mt-3">
                                        <div className="row">
                                            <div className="form-group col-lg-6 mb-3">
                                                <label>Full Name*</label>
                                                <input
                                                    style={{ fontSize: '12px' }}
                                                    type="text"
                                                    className="form-control mt-2 p-2"
                                                    name="fullName"
                                                    value={formData.fullName}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter value here"
                                                />
                                                {errors.fullName && <p style={{ color: 'red' }}>{errors.fullName}</p>}
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="mobile" className="form-label">
                                                    Mobile Number *
                                                </label>
                                                <PhoneInput
                                                    country={"in"}
                                                    value={formData.phone}
                                                    onChange={handlePhoneChange}
                                                    inputStyle={{ width: "100%" }}
                                                />
                                                {errors.phone && <div className="text-danger mt-1" style={{ fontSize: '12px' }}>{errors.phone}</div>}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-lg-6 p-2">
                                                <label>Email*</label>
                                                <input
                                                    style={{ fontSize: '12px' }}
                                                    type="email"
                                                    className="form-control mt-2"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter your email address"
                                                />
                                                {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div style={{ backgroundColor: '#E4E4DC' }} className="incidenttype px-4 rounded-3 mt-4">
                        <div style={{ fontWeight: '600' }} className="py-3">Type of incident*</div>
                        <div style={{ fontSize: "12px" }} className="check-box d-flex mt-4 gap-5">
                            <div>
                                <div className="form-check mb-2">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value="Fraud"
                                        id="incidentTypeFraud"
                                        onChange={handleCheckboxChange}
                                    />
                                    <label className="form-check-label" htmlFor="incidentTypeFraud">Fraud</label>
                                </div>
                                <div className="form-check mb-4">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value="Conflict of Interest"
                                        id="incidentTypeConflict"
                                        onChange={handleCheckboxChange}
                                    />
                                    <label className="form-check-label" htmlFor="incidentTypeConflict">Conflict of Interest</label>
                                </div>
                                <div className="form-check mb-4">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value="Other (please specify)"
                                        id="incidentTypeOther"
                                        onChange={handleCheckboxChange}
                                    />
                                    <label className="form-check-label" htmlFor="incidentTypeOther">Other (please specify)</label>
                                </div>
                            </div>
                            <div>
                                <div className="form-check mb-2">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value="Theft"
                                        id="incidentTypeTheft"
                                        onChange={handleCheckboxChange}
                                    />
                                    <label className="form-check-label" htmlFor="incidentTypeTheft">Theft</label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value="Health/Safety & Security"
                                        id="incidentTypeHealthSafety"
                                        onChange={handleCheckboxChange}
                                    />
                                    <label className="form-check-label" htmlFor="incidentTypeHealthSafety">Health/Safety & Security</label>
                                </div>
                            </div>
                            <div>
                                <div className="form-check mb-2">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value="Discrimination"
                                        id="incidentTypeDiscrimination"
                                        onChange={handleCheckboxChange}
                                    />
                                    <label className="form-check-label" htmlFor="incidentTypeDiscrimination">Discrimination</label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value="Information Security Breaches"
                                        id="incidentTypeInfoSecurity"
                                        onChange={handleCheckboxChange}
                                    />
                                    <label className="form-check-label" htmlFor="incidentTypeInfoSecurity">Information Security Breaches</label>
                                </div>
                            </div>
                            <div>
                                <div className="form-check mb-2">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value="Harassment"
                                        id="incidentTypeHarassment"
                                        onChange={handleCheckboxChange}
                                    />
                                    <label className="form-check-label" htmlFor="incidentTypeHarassment">Harassment</label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value="Infringement of applicable law/legislation"
                                        id="incidentTypeInfringement"
                                        onChange={handleCheckboxChange}
                                    />
                                    <label className="form-check-label" htmlFor="incidentTypeInfringement">Infringement of applicable law/legislation</label>
                                </div>
                            </div>
                        </div>
                        {errors.incidentTypes && <p style={{ color: 'red', fontSize: '12px' }}>{errors.incidentTypes}</p>}
                        <div className="py-4">
                            <textarea
                                className="form-control"
                                placeholder="Enter here"
                                id="floatingTextarea"
                                name="incidentDescription"
                                value={formData.incidentDescription}
                                onChange={handleInputChange}
                            />
                            {errors.incidentDescription && <label style={{ color: 'red', fontSize: '12px' }}>{errors.incidentDescription}</label>}
                        </div>
                    </div>

                    <div style={{ fontSize: '12px' }} className="mt-4">
                        <label htmlFor="incidentDetails">Please describe the incident you have witnessed in as much detail as possible in the text box below *</label>
                        <textarea
                            className="form-control"
                            placeholder="Enter here"
                            id="floatingTextarea"
                            name="incidentDetails"
                            value={formData.incidentDetails}
                            onChange={handleInputChange}
                        />
                        {errors.incidentDetails && <p style={{ color: 'red' }}>{errors.incidentDetails}</p>}
                        <div>
                            <label>Attach File/Image *</label>
                            <input
                                type="file"
                                className="form-control"
                                onChange={handleFileChange}
                            />
                            {errors.fileAttachment && <p style={{ color: 'red' }}>{errors.fileAttachment}</p>}
                        </div>
                        <div className="d-flex justify-content-end p-4">
                            <button
                                className="btn btn-backgroundClr w-100 p-3"
                                style={{ maxWidth: "125px", backgroundColor: '#2B2A28', fontSize: '12px' }}
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WhistleBlowing;
