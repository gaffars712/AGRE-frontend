"use client";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { postAPI } from "../../utils/api-handler";

const postRegisterData = async (lang = "en", formData) => {
  const path = `/register-forms`;
  const urlParamsObject = {
    locale: lang,
    pagination: {
      start: 0,
      limit: 10,
    },
  };
  const options = {};

  const payloadData = {
    data: formData,
  };

  const response = await postAPI(path, urlParamsObject, options, payloadData);

  if (response?.data) {
    return response.data;
  } else {
    return null;
  }
};

const Register = () => {
  const [propertyType, setPropertyType] = useState("residential");
  const [phone, setPhone] = useState("");
  const [isValidEID, setIsValidEID] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [termsError, setTermsError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    nationality: "",
    unitType: "",
    comment: "",
  });
  const [errors, setErrors] = useState({});

  const unitTypes = ["Kilograms", "Liters", "Meters", "Pieces"];
  const Nationality = ["indian", "american", "UAE national", "European"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handlePhoneChange = (value) => {
    setPhone(value);

    setErrors((prevErrors) => ({
      ...prevErrors,
      mobile: "",
    }));
  };

  const handleValidation = (fields) => {
    let errorMessages = {};

    if (!fields.fullName) {
      errorMessages.fullName = "Full Name is required";
    } else {
      errorMessages.fullName = "";
    }

    if (!fields.email) {
      errorMessages.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(fields.email)) {
      errorMessages.email = "Email address is invalid";
    } else {
      errorMessages.email = "";
    }

    if (!fields.mobile) {
      errorMessages.mobile = "Mobile Number is required";
    } else {
      errorMessages.mobile = "";
    }

    if (!fields.unitType) {
      errorMessages.unitType = "Unit Type is required";
    } else {
      errorMessages.unitType = "";
    }

    setErrors(errorMessages);

    return Object.values(errorMessages).every((msg) => msg === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fieldsToValidate = {
      fullName: formData.fullName,
      email: formData.email,
      mobile: phone,
      unitType: formData.unitType,
      isValidEID,
      maritalStatus,
    };

    const isValid = handleValidation(fieldsToValidate);
    console.log(isValid);
    if (isValid && isAgreed) {
      const dataToSubmit = {
        ...formData,
        number: phone,
        formType: propertyType,
      };
      setFormData({
        fullName: "",
        email: "",
        nationality: "",
        unitType: "",
        comment: "",
      });
      setPhone("");
      try {
        const registrationResponse = await postRegisterData("en", dataToSubmit);
        alert("Data submitted...");
        formData("");
      } catch (error) {
        console.error("Error registering:", error);
      }
    } else {
      if (!isAgreed) {
        setTermsError("Please agree to the Terms and Conditions");
      }
    }
  };

  return (
    <div
      className="my-5 rounded-4 px-3 px-sm-5 "
      style={{
        backgroundColor: "rgba(0, 51, 102, 0.15)",
        padding: "40px 0px  40px 0px",
      }}
    >
      <div className="">
        <h2 className="mb-4">Register Now</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Property Type *</label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="propertyType"
                  value="residential"
                  checked={propertyType === "residential"}
                  onChange={() => setPropertyType("residential")}
                />
                <label className="form-check-label">Residential</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="propertyType"
                  value="commercial"
                  checked={propertyType === "commercial"}
                  onChange={() => setPropertyType("commercial")}
                />
                <label className="form-check-label">Commercial</label>
              </div>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="fullName" className="form-label">
                Full Name *
              </label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && (
                <div className="text-danger mt-1" style={{ fontSize: "12px" }}>
                  {errors.fullName}
                </div>
              )}
            </div>
            <div className="col-md-6">
              <label htmlFor="email" className="form-label">
                Email Address *
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <div className="text-danger mt-1" style={{ fontSize: "12px" }}>
                  {errors.email}
                </div>
              )}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="mobile" className="form-label">
                Mobile Number *
              </label>
              <PhoneInput
                country={"in"}
                value={phone}
                onChange={handlePhoneChange}
                inputProps={{
                  name: "mobile",
                  required: true,
                  className: "form-control",
                  id: "mobile",
                }}
                containerStyle={{ width: "100%" }}
                inputStyle={{ width: "100%" }}
              />
              {errors.mobile && (
                <div className="text-danger mt-1" style={{ fontSize: "12px" }}>
                  {errors.mobile}
                </div>
              )}
            </div>
            <div className="col-md-6">
              <label htmlFor="unitType" className="form-label">
                Nationality *
              </label>
              <select
                className="form-select"
                id="nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
              >
                <option value="" disabled>
                  - Select -
                </option>
                {Nationality.map((unit, index) => (
                  <option key={index} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
              {errors.unitType && (
                <div className="text-danger mt-1" style={{ fontSize: "12px" }}>
                  {errors.unitType}
                </div>
              )}
            </div>
            <div className="col-md-6">
              <label htmlFor="unitType" className="form-label">
                Unit Types*
              </label>
              <select
                className="form-select"
                id="unitType"
                name="unitType"
                value={formData.unitType}
                onChange={handleChange}
              >
                <option value="" disabled>
                  - Select -
                </option>
                {unitTypes.map((unit, index) => (
                  <option key={index} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
              {errors.unitType && (
                <div className="text-danger mt-1" style={{ fontSize: "12px" }}>
                  {errors.unitType}
                </div>
              )}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Message or Comment</label>
            <textarea
              className="form-control"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="termsCheckbox"
              checked={isAgreed}
              onChange={() => {
                setIsAgreed(!isAgreed);
                setTermsError("");
              }}
            />
            <label className="form-check-label" htmlFor="termsCheckbox">
              I agree to the{" "}
              <a href="/terms-and-conditions">Terms and Conditions</a> &{" "}
              <a href="/privacy-policy">Privacy Policy</a>
            </label>
          </div>
          {termsError && (
            <div className="text-danger" style={{ fontSize: "12px" }}>
              {termsError}
            </div>
          )}

          <div className="text-end">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
