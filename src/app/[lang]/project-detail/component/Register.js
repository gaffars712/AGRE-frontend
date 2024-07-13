"use client";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchAPI, postAPI } from "../../utils/api-handler";

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

const getRegisterLabels = async (lang = "en") => {
  const path = `/register-labels`;
  const urlParamsObject = {
    locale: lang,
    pagination: {
      start: 0,
      limit: 10,
    },
  };
  const options = {};

  const response = await fetchAPI(path, urlParamsObject, options);
  if (response?.data) {
    return response?.data[0]?.attributes;
  } else {
    return null;
  }
};

const Register = ({ params, projectName }) => {
  console.log(projectName)
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
    projectName: projectName ? projectName : ''
  });
  const [errors, setErrors] = useState({});
  const [labels, setLabels] = useState({});
  const [terms, setTerms] = useState({
    firstResult: '',
    secondPart: '',
    thirdPart: '',
    fourthPart: '',
    fifthPart: ''
  });

  const unitTypes = ["Kilograms", "Liters", "Meters", "Pieces"];
  const unitTypesAR = ["كيلوجرامات", "لترات", "أمتار", "قطع"];
  const Nationality = ["indian", "american", "UAE national", "European"];
  const NationalityAr = ["هندي", "أمريكي", "مواطن إماراتي", "أوروبي"];

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
      errorMessages.fullName = params?.lang === 'en' ? "Full Name is required" : 'الإسم الكامل ضروري';
    } else {
      errorMessages.fullName = "";
    }

    if (!fields.email) {
      errorMessages.email = params?.lang === 'en' ? "Email is required" : 'البريد الالكتروني مطلوب';
    } else if (!/\S+@\S+\.\S+/.test(fields.email)) {
      errorMessages.email = params?.lang === 'en' ? "Email address is invalid" : 'عنوان البريد الإلكتروني غير صالح';
    } else {
      errorMessages.email = "";
    }

    if (!fields.mobile) {
      errorMessages.mobile = params?.lang === 'en' ? "Mobile Number is required" : 'رقم الجوال مطلوب';
    } else {
      errorMessages.mobile = "";
    }

    if (!fields.unitType) {
      errorMessages.unitType = params?.lang === 'en' ? "Unit Type is required" : 'نوع الوحدة مطلوب';
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
        const registrationResponse = await postRegisterData(params?.lang, dataToSubmit);
        alert("Data submitted...");
        setFormData({});
      } catch (error) {
        console.error("Error registering:", error);
      }
    } else {
      if (!isAgreed) {
        setTermsError(params?.lang === 'en' ? "Please agree to the Terms and Conditions" : 'يرجى الموافقة على الشروط والأحكام');
      }
    }
  };

  const fetchLabels = async () => {
    const fetchedLabels = await getRegisterLabels(params?.lang);
    setLabels(fetchedLabels);

    if (fetchedLabels) {
      const data = fetchedLabels.termsLable;
      const termsIndexEn = data.indexOf("Terms & Conditions");
      const termsIndexAr = data.indexOf("الشروط والأحكام");
      const privacyIndexEn = data.indexOf("Privacy Policy");
      const privacyIndexAr = data.indexOf("سياسة الخصوصية");

      const termsIndex = termsIndexEn !== -1 ? termsIndexEn : termsIndexAr;
      const privacyIndex = privacyIndexEn !== -1 ? privacyIndexEn : privacyIndexAr;

      const firstResult = termsIndex !== -1 ? data.substring(0, termsIndex) : data;
      const secondPart = termsIndex === termsIndexEn ? 'Terms & Conditions' : 'الشروط والأحكام';
      const thirdPart = termsIndex !== -1 && privacyIndex !== -1 ? '&' : '';
      const fourthPart = privacyIndex === privacyIndexEn ? 'Privacy Policy' : 'سياسة الخصوصية';
      const fifthPart = privacyIndex !== -1 ? data.substring(privacyIndex + (privacyIndex === privacyIndexEn ? 'Privacy Policy'.length : 'سياسة الخصوصية'.length)) : '';

      setTerms({
        firstResult,
        secondPart,
        thirdPart,
        fourthPart,
        fifthPart
      });
    }
  };

  useEffect(() => {
    fetchLabels();
  }, [params?.lang]);

  return (
    <div
      className="my-5 rounded-4 px-3 px-sm-5"
      style={{
        backgroundColor: "rgba(0, 51, 102, 0.15)",
        padding: "40px 0px  40px 0px",
      }}
    >
      <div>
        <h2 className="mb-4">{labels?.formTitle}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">{labels?.propertyTypeLabel}</label>
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
                <label className="form-check-label">{labels?.oneType}</label>
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
                <label className="form-check-label">{labels?.twoType}</label>
              </div>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="fullName" className="form-label">
                {labels?.nameLabel} *
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
                {labels?.emailLabel} *
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
            <div className={`form-group col-md-6  ${params?.lang === 'ar' ? 'phone-input-ar' : ''}`}>
              <label htmlFor="mobile" className="form-label">
                {labels?.numberLabel} *
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
              <label htmlFor="nationality" className="form-label">
                {labels?.nationalityLabel}
              </label>
              <select
                className="form-select"
                id="nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
              >
                <option value="" disabled>
                  {params?.lang === 'ar' ? '- يختار -' : '- Select -'}
                </option>
                {params?.lang === 'ar' ?
                  NationalityAr.map((unit, index) => (
                    <option key={index} value={unit}>
                      {unit}
                    </option>
                  ))
                  :
                  Nationality.map((unit, index) => (
                    <option key={index} value={unit}>
                      {unit}
                    </option>
                  ))
                }
              </select>
              {errors.nationality && (
                <div className="text-danger mt-1" style={{ fontSize: "12px" }}>
                  {errors.nationality}
                </div>
              )}
            </div>
            <div className="col-md-6">
              <label htmlFor="unitType" className="form-label">
                {labels?.UnitLabel} *
              </label>
              <select
                className="form-select"
                id="unitType"
                name="unitType"
                value={formData.unitType}
                onChange={handleChange}
              >
                <option value="" disabled>
                  {params?.lang === 'ar' ? '- يختار -' : '- Select -'}
                </option>
                {params?.lang === 'ar' ?
                  unitTypesAR.map((unit, index) => (
                    <option key={index} value={unit}>
                      {unit}
                    </option>
                  ))
                  :
                  unitTypes.map((unit, index) => (
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
            <label className="form-label">{labels?.messageLabel}</label>
            <textarea
              className="form-control"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <div className="form-check mb-3">
            <input style={{ float: params?.lang === 'ar' ? 'right' : "" }}
              type="checkbox"
              className="form-check-input"
              id="termsCheckbox"
              checked={isAgreed}
              onChange={() => {
                setIsAgreed(!isAgreed);
                setTermsError("");
              }}
            />
            <label style={{ marginRight: params?.lang === 'ar' ? '22px' : "" }} className="form-check-label" htmlFor="termsCheckbox">
              {terms.firstResult}
              <a href="/terms-and-conditions">{terms.secondPart}</a> {terms.thirdPart}{" "}
              <a href="/privacy-policy">{terms.fourthPart}</a>
              {terms.fifthPart}
            </label>
          </div>
          {termsError && (
            <div className="text-danger" style={{ fontSize: "12px" }}>
              {termsError}
            </div>
          )}

          <div className="text-end">
            <button type="submit" className="btn btn-primary">
              {labels?.formBTN}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
