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
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});

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

    if (!formData.fullName) newErrors.fullName = 'Full Name is required.';
    if (!formData.mobileNumber) newErrors.mobileNumber = 'Mobile Number is required.';
    if (!formData.email) newErrors.email = 'Email Address is required.';
    if (!formData.interestedIn) newErrors.interestedIn = 'Interest is required.';
    if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept the terms and conditions.';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
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
        alert('Form submitted successfully!');
      } catch (error) {
        console.error("Error registering:", error);
        alert('Error submitting form.');
      }
    }
  };

  return (
    <>
      <div style={{ backgroundColor: '#dbe2ea' }} className='border rounded d-flex flex-wrap justify-content-center align-items-center'>
        <div style={{ width: '796px' }} className='contact-form border p-5 m-5 bg-white rounded'>
          <form className='' onSubmit={handleSubmit}>
            <div className='mt-'>
              {console.log(formLabels)}
              <h4 className='text-center'>{formLabels[0]?.formTitle} </h4>
            </div>
            <div className='mt-5'>
              <div style={{ fontSize: '16px' }} className='row'>
                <div className='form-group col-lg-6 mb-3'>
                  <strong>{formLabels[0]?.nameLabel}*</strong>
                  <input
                    type='text'
                    className='form-control mt-2'
                    name='fullName'
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder=''
                  />
                  {errors.fullName && <p style={{ color: 'red' }}>{errors.fullName}</p>}
                </div>

                <div className={`form-group col-lg-6 mt-2 ${params?.lang === 'ar' ? 'phone-input-ar' : ''}`}>
                  <strong>{formLabels[0]?.numberLabel}*</strong>
                  <PhoneInput
                    country={"in"}
                    value={formData.mobileNumber}
                    onChange={handlePhoneChange}
                    className=""
                    inputProps={{
                      name: "mobileNumber",
                      required: true,
                      className: "form-control",
                      id: "mobile",
                      style: { textAlign: 'left' } // Default alignment is left for LTR languages

                    }}
                    containerStyle={{ width: "100%" }}
                    inputStyle={{ width: "100%", direction: 'rtl', marginTop: '18px', backgroundColor: 'red' }}
                    style={{ Left: params?.lang === 'ar' ? '' : "" }}
                  />
                  {errors.mobileNumber && <p style={{ color: 'red' }}>{errors.mobileNumber}</p>}
                </div>
              </div>
              <div className='row'>
                <div className='form-group col-lg-6'>
                  <strong>{formLabels[0]?.emailLabel}*</strong>
                  <input
                    type='email' // Changed to 'email' type
                    className='form-control mt-2'
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder=''
                  />
                  {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                </div>

                <div className='form-group col-lg-6' >
                  <strong>{formLabels[0]?.interestLabel}*</strong>
                  <input

                    type='text'
                    className='form-control mt-2'
                    name='interestedIn'
                    value={formData.interestedIn}
                    onChange={handleInputChange}
                    placeholder=''
                  />
                  {errors.interestedIn && <p style={{ color: 'red' }}>{errors.interestedIn}</p>}
                </div>
              </div>
            </div>
            <div className="mt-4 form-check" >
              <input style={{ float: params?.lang === 'ar' ? 'right' : '' }}
                type="checkbox"
                className="form-check-input mt-2"
                id="exampleCheck1"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleInputChange}
              />
              <label style={{ marginRight: params?.lang === 'ar' ? '22px' : "" }} className="form-check-label" htmlFor="exampleCheck1">{formLabels[0]?.formTerms} *</label>
              {errors.termsAccepted && <p style={{ color: 'red' }}>{errors.termsAccepted}</p>}
            </div>
            <div className='mt-3 text-center p-4'>
              <button
                type="submit"
                style={{ backgroundColor: "#003366", width: '195px', height: '42px', borderRadius: '8px', fontSize: '16px' }}
                className='text-white'
              >
                {formLabels[0]?.formBTN}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ContactForm;
