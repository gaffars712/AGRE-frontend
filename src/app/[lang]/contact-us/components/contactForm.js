"use client";
import React, { useState } from 'react';
import { postAPI } from "../../utils/api-handler";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // Make sure you have this import for styles

const postRegisterData = async (lang = "en", transformedData) => {
  const path = `/contact-us-forms`;
  const urlParamsObject = {
    locale: lang,
    pagination: {
      start: 0,
      limit: 10,
    },
  };
  const options = {};

  const payloadData = {
    data: transformedData,
  };

  const response = await postAPI(path, urlParamsObject, options, payloadData);

  if (response?.data) {
    return response.data;
  } else {
    return null;
  }
};

function ContactForm({ params, formLabels }) {
  console.log(formLabels);
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    interestedIn: '',
    termsAccepted: true,
    // termsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [btnLoader, setbtnLoader] = useState(false);
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handlePhoneChange = (value) => {
    setFormData({
      ...formData,
      mobileNumber: value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName) newErrors.fullName = params?.lang === 'en' ? 'Full Name is required.' : 'الإسم الكامل ضروري';
    if (!formData.mobileNumber) newErrors.mobileNumber = params?.lang === 'en' ? 'Mobile Number is required.' : 'رقم الجوال مطلوب';
    if (!formData.email) newErrors.email = params?.lang === 'en' ? 'Email Address is required.' : 'عنوان البريد الإلكتروني مطلوب';
    if (!formData.interestedIn) newErrors.interestedIn = params?.lang === 'en' ? 'Interest is required.' : 'الفائدة مطلوبة';
    // if (!formData.termsAccepted) newErrors.termsAccepted = params?.lang === 'en' ? 'You must accept the terms and conditions.' : 'يجب عليك قبول الأحكام والشروط.';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    setbtnLoader(true)
    e.preventDefault();
    const formErrors = validate();
    console.log(formErrors);
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      const transformedData = {
        name: formData.fullName,
        number: formData.mobileNumber,
        email: formData.email,
        interest: formData.interestedIn,
      };
      console.log(transformedData);
      try {
        const registrationResponse = await postRegisterData("en", transformedData);
        setFormData({
          fullName: '',
          mobileNumber: '',
          email: '',
          interestedIn: '',
          termsAccepted: false,
        });
        setbtnLoader(false)
        alert('Form submitted successfully!');
      } catch (error) {
        setbtnLoader(false)
        console.error("Error registering:", error);
        alert('Error submitting form.');
      }
    } else {
      setbtnLoader(false)
    }
  };

  return (
    <div style={{ backgroundColor: '#dbe2ea' }} className='container border rounded d-flex flex-wrap justify-content-center align-items-center'>
      <div style={{ maxWidth: "750px" }} className='contact-form border p-3 p-md-5 my-2 m-md-5 bg-white rounded w-100'>
        <form className='row' onSubmit={handleSubmit}>
          <div className='col-12 my-3 my-md-0'>
            <h4 className='text-center'>{formLabels[0]?.formTitle} </h4>
          </div>
          <div className='col-12 col-md-6 mt-3'>
            <strong>{formLabels[0]?.nameLabel}*</strong>
            <input
              type='text'
              className='form-control mt-2'
              name='fullName'
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder={params?.lang === 'ar' ? 'أدخل عنوان بريدك الإلكتروني' : 'Enter Value here'} // Dynamic placeholder
            />
            {errors.fullName && <p style={{ color: 'red' }}>{errors.fullName}</p>}
          </div>
          <div className='col-12 col-md-6 mt-3'>
            <strong>{formLabels[0]?.numberLabel}*</strong>
            <div dir='ltr'>
            <PhoneInput dir='ltr'
              country={"ae"}
              value={formData.mobileNumber}
              onChange={handlePhoneChange}
              className="mt-2"
              inputProps={{
                name: "mobileNumber",
                required: true,
                className: "form-control",
                id: "mobile",
                placeholder: params?.lang === 'ar' ? 'أدخل رقم هاتفك المحمول' : 'Enter Your Mobile Number',
              }}
              containerStyle={{ width: "100%" }}
              inputStyle={{
                width: "100%",
                direction: params?.lang === 'ar' ? 'rtl' : 'ltr',
                textAlign: params?.lang === 'ar' ? 'right' : 'left',
                marginTop: '18px',
                // backgroundColor: 'red'
              }}
            />
            </div>
            {errors.mobileNumber && <p style={{ color: 'red' }}>{errors.mobileNumber}</p>}
          </div>
          <div className='col-12 col-md-6 mt-3'>
            <strong>{formLabels[0]?.emailLabel}*</strong>
            <input
              type='email'
              className='form-control mt-2'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              placeholder={params?.lang === 'ar' ? 'أدخل عنوان بريدك الإلكتروني' : 'Enter your Email Address'}
            />
            {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
          </div>
          <div className='col-12 col-md-6 mt-3'>
            <strong>{formLabels[0]?.interestLabel}*</strong>
            <select
              className="form-select mt-2"
              id="interestedIn"
              name="interestedIn"
              value={formData.interestedIn}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                {params?.lang === 'ar' ? 'اختار القيمة' : 'Select value'}
              </option>
              {params?.lang === 'ar' ?
                formLabels[0]?.inerestedOptionsAR && formLabels[0]?.inerestedOptionsAR.map((unit, index) => (
                  <option key={index} value={unit}>
                    {unit}
                  </option>
                ))
                :
                formLabels[0]?.inerestedOptionsEN && formLabels[0]?.inerestedOptionsEN.map((unit, index) => (
                  <option key={index} value={unit}>
                    {unit}
                  </option>
                ))
              }
            </select>
            {errors.interestedIn && <p style={{ color: 'red' }}>{errors.interestedIn}</p>}
          </div>
          <div className='col-12 text-center p-4'>
            <button
              type="submit"
              style={{ backgroundColor: "#003366", borderRadius: '8px', fontSize: '16px' }}
              className='text-white btn-with-loaderbtn'
            >
              {btnLoader === true
                ?
                <div className="loaderbtn"></div>
                :
                <span style={{ fontWeight: "500" }}> {formLabels[0]?.formBTN} </span>
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;
