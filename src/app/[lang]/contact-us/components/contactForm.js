"use client";
import React, { useState } from 'react';
import { postAPI } from "../../utils/api-handler";

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

function contactForm() {
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
          } catch (error) {
            console.error("Error registering:", error);
          }
          alert('Form submitted successfully!');
          
        }
      };
        
    return (
        <>
      
        <div style={{ backgroundColor: '#dbe2ea' }} className='  border   rounded     d-flex flex-wrap justify-content-center align-items-center'>
          <div style={{ width: '796px' }} className='contact-form border p-5 m-5 bg-white rounded'>
            <form className='' onSubmit={handleSubmit}>
              <div className='mt-'>
                <h4 className='text-center'>Contact us</h4>
              </div>
              <div className='mt-5'>
                <div style={{fontSize:'16px'}} className='row'>
                  <div className='form-group col-lg-6 mb-3'>
                    <strong>Full Name*</strong>
                    <input
                      type='text'
                      className='form-control mt-2'
                      name='fullName'
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder='Enter value here'
                    />
                    {errors.fullName && <p style={{ color: 'red' }}>{errors.fullName}</p>}
                  </div>

                  <div className='form-group col-lg-6'>
                    <strong>Mobile Number*</strong>
                    <input
                      type='text'
                      className='form-control mt-2'
                      name='mobileNumber'
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      placeholder='Enter your mobile number'
                    />
                    {errors.mobileNumber && <p style={{ color: 'red' }}>{errors.mobileNumber}</p>}
                  </div>
                </div>
                <div className='row'>
                  <div className='form-group col-lg-6'>
                    <strong>Email Address*</strong>
                    <input
                      type='text'
                      className='form-control mt-2'
                      name='email'
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder='Enter your email address'
                    />
                    {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                  </div>

                  <div className='form-group col-lg-6'>
                    <strong>Interested in*</strong>
                    <input
                      type='text'
                      className='form-control mt-2'
                      name='interestedIn'
                      value={formData.interestedIn}
                      onChange={handleInputChange}
                      placeholder='Enter your interest'
                    />
                    {errors.interestedIn && <p style={{ color: 'red' }}>{errors.interestedIn}</p>}
                  </div>
                </div>
              </div>
              <div className="mt-4 form-check">
                <input
                  type="checkbox"
                  className="form-check-input mt-2"
                  id="exampleCheck1"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleInputChange}
                />
                <label className="form-check-label" htmlFor="exampleCheck1">By clicking Register Now you’re agreeing with terms & condition *</label>
                {errors.termsAccepted && <p style={{ color: 'red' }}>{errors.termsAccepted}</p>}
              </div>
              <div className='mt-3 text-center p-4'>
                <button
                  type="submit"
                  style={{ backgroundColor: "#003366", width: '195px', height: '42px', borderRadius: '8px', fontSize: '16px' }}
                  className='text-white'
                >
                  Submit your interest
                </button>
              </div>
            </form>
          </div>
        </div>
      
    </>
  );
                
}

export default contactForm
