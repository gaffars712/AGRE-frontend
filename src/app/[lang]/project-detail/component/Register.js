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
  if (response?.message) {
    return response.message;
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

const Register = ({ unitType, unitTypeAR, params, projectName }) => {
  console.log(projectName)
  const [propertyType, setPropertyType] = useState("residential");
  const [phone, setPhone] = useState("");
  const [isValidEID, setIsValidEID] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [btnLoader, setbtnLoader] = useState(false);
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

  const unitTypes = ["1 Bedroom", "2 Bedrooms", "3 Bedrooms"];
  const unitTypesAR = ["غرفة نوم واحدة", "غرفتا نوم", "3 غرف نوم",];
  const Nationality = ["Indian", "American", "UAE national", "European"];
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
      errorMessages.mobile = params?.lang === 'ar' ? 'رقم الجوال مطلوب' : "Mobile Number is required";
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
    setbtnLoader(true)
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

      setPhone("");
      try {
        const registrationResponse = await postRegisterData(params?.lang, dataToSubmit);
        if (registrationResponse == 'Form submitted successfully') {
          setFormData({
            fullName: "",
            email: "",
            nationality: "",
            unitType: "",
            comment: "",
          });
          setIsAgreed(false)
          alert("Form Submitted Successfully.");
          setbtnLoader(false)
        }
      } catch (error) {
        console.error("Error registering:", error);
      }
    } else {
      setbtnLoader(false)
      if (!isAgreed) {
        setTermsError(params?.lang === 'en' ? "Please agree to the Terms and Conditions" : 'يرجى الموافقة على   وأحكام التأجير وسياسة');
      }
    }
  };

  const fetchLabels = async () => {
    const fetchedLabels = await getRegisterLabels(params?.lang);
    setLabels(fetchedLabels);

    if (fetchedLabels) {
      const data = fetchedLabels.termsLable;
      const termsIndexEn = data.indexOf("Rental Terms and Conditions");
      const termsIndexAr = data.indexOf("وأحكام التأجير وسياسة");
      const privacyIndexEn = data.indexOf("Privacy Policy");
      const privacyIndexAr = data.indexOf("سياسة الخصوصية");

      const termsIndex = termsIndexEn !== -1 ? termsIndexEn : termsIndexAr;
      const privacyIndex = privacyIndexEn !== -1 ? privacyIndexEn : privacyIndexAr;

      const firstResult = termsIndex !== -1 ? data.substring(0, termsIndex) : data;
      const secondPart = termsIndex === termsIndexEn ? 'Rental Terms and Conditions' : 'وأحكام التأجير وسياسة';
      const thirdPart = termsIndex !== -1 && privacyIndex !== -1 ? params?.lang === 'en' ? ' & ' : ' و ' : '';
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

  const CustomCheckbox = ({ checked, onChange, id, label }) => {
    return (
      <div style={{ display: "flex", alignItems: "start" }} className={`custom-checkbox ${params?.lang === 'ar' ? 'rtl' : ''}`}>
        <input style={{ width: "20px", height: "20px" }}
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
        />
        <div className="checkbox-box"></div>
        <label htmlFor={id}>{label}</label>
      </div>
    );
  };
  return (
    <div
      className="my-5 rounded-4 px-3 px-sm-5"
      style={{
        backgroundColor: "#dde3eb",
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
                <input style={{ backgroundColor: "transparent", border: "1px solid black" }}
                  className="form-check-input p-2"
                  type="radio"
                  name="propertyType"
                  value="residential"
                  checked={propertyType === "residential"}
                  onChange={() => setPropertyType("residential")}
                />
                <label className="form-check-label">{labels?.oneType}</label>
              </div>
              <div className="form-check form-check-inline">
                <input style={{ backgroundColor: "transparent", border: "1px solid black" }}
                  className="form-check-input p-2"
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

          <div className="row ">
            <div className="col-md-6 mt-3">
              <label htmlFor="fullName" className="form-label">
                {labels?.nameLabel} *
              </label>
              <input
                type="text"
                className="form-control "
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
            <div className="col-md-6 mt-3">
              <label htmlFor="email" className="form-label">
                {labels?.emailLabel} *
              </label>
              <input dir="ltr"
                type="text"
                className="form-control "
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

          <div className="row ">
            <div className={`form-group col-md-6 mt-3  ${params?.lang === 'ar' ? '' : ''}`}>
              <label htmlFor="mobile" className="form-label">
                {labels?.numberLabel} *
              </label>
              <div dir="ltr">
                <PhoneInput
                  country={"ae"}
                  value={phone}
                  onChange={handlePhoneChange}
                  inputProps={{
                    name: "mobile",
                    required: true,
                    className: "form-control ",
                    id: "mobile",
                  }}
                  containerStyle={{ width: "100%" }}
                  inputStyle={{ width: "100%" }}
                />
              </div>
              {errors.mobile && (
                <div className="text-danger mt-1" style={{ fontSize: "12px" }}>
                  {errors.mobile}
                </div>
              )}
            </div>
            {/* <div className="col-md-6">
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
            </div> */}
            <div className="col-md-6 mt-3 ">
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
                  unitTypeAR ?
                    unitTypeAR.map((unit, index) => (
                      <option className="" key={index} value={unit}>
                        {unit}
                      </option>
                    ))
                    :
                    unitTypesAR.map((unit, index) => (
                      <option className="" key={index} value={unit}>
                        {unit}
                      </option>
                    ))
                  :
                  unitType ?
                    unitType.map((unit, index) => (
                      <option className="" key={index} value={unit}>
                        {unit}
                      </option>
                    ))
                    :
                    unitTypes.map((unit, index) => (
                      <option className="" key={index} value={unit}>
                        {unit}
                      </option>
                    ))
                }
              </select>
              {errors.unitType && (
                <div className="text-danger mt-1" style={{ fontSize: "12px" }}>
                  {errors.unitType}
                </div>
              )}
            </div>
          </div>

          <div className="mt-3">
            <label className="form-label">{labels?.messageLabel}</label>
            <textarea
              className="form-control "
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              rows="3"
            />
          </div>
          <div className=" mt-3">

            <CustomCheckbox
              checked={isAgreed}
              onChange={() => {
                setIsAgreed(!isAgreed);
                setTermsError("");
              }}
              id="termsCheckbox"
              label={
                <>
                  {terms.firstResult}
                  <a
                    href={`${params?.lang === 'en' ? '/en/rental-terms-and-conditions' : '/ar/rental-terms-and-conditions'}`}
                  >
                    {terms.secondPart}
                  </a>
                  {terms.thirdPart}
                  <a
                    href={`${params?.lang === 'en' ? '/en/privacy-policy' : '/ar/privacy-policy'}`}
                  >
                    {terms.fourthPart}
                  </a>
                  {terms.fifthPart}
                </>
              }
            />
          </div>
          {termsError && (
            <div className="text-danger" style={{ fontSize: '12px' }}>
              {termsError}
            </div>
          )}

          <div className="text-end mt-3">
            <button type="submit" style={{ border: "none" }} className="btn btn-with-loaderbtn btn-primary">
              {btnLoader === true
                ?
                <div className="loaderbtn"></div>
                :
                <span style={{ fontWeight: "500" }}> {labels?.formBTN} </span>
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
