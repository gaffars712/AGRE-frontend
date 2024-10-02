import React from "react";
import Image from "next/image";
import Copy from "@/assets/images/privacyBanner.jpg";
import Markdown from "react-markdown";
import { fetchAPI } from "../utils/api-handler";

const getAllPrivacyPolicySection = async (lang) => {
  const path = `/privacy-policies`;
  const urlParamsObject = {
    populate: 'deep',
    locale: lang,
    pagination: {
      start: 0,
      limit: 10,
    },
  };
  const options = {};

  const response = await fetchAPI(path, urlParamsObject, options);
  console.log("response", response);
  if (response?.data) {
    console.log('respo', response?.data)
    return response.data[0]?.attributes;
  } else {
    return null;
  }
}
async function Page({ params }) {

  let data = {};
  data = await getAllPrivacyPolicySection(params?.lang);
  console.log('Fetched data:', data);
  let policyData = await data
  console.log('policyData?.content', policyData?.banner?.data?.attributes)


  return (
    <div>
      <div className='contact-banner position-relative  '>
        <img src={policyData?.banner?.data?.attributes?.url ? policyData?.banner?.data?.attributes?.url : Copy} alt="banner" width={1000} height={0} style={{ height: "180px" }} className='w-100 z-1 policyImgHieght  object-fit-cover' />
        <div className={` text-white ${params?.lang === 'en' ? 'blue-linear-gradient' : 'blue-linear-gradient-ar'}  position-absolute z-2 d-flex align-items-center fs-3 fs-md-1 `} style={{ width: '60%', height: '100%', paddingLeft: params?.lang === 'en' ? '8%' : '', paddingRight: params?.lang === 'ar' ? '8%' : '', top: "0px", fontWeight: "500" }}>
          {policyData?.title}
          {/* <nav className="d-flex flex-wrap" style={{ '--bs-breadcrumb-divider': "'>'" }} aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li style={{color:'#000000',fontWeight:'400px',fontSize:'20px'}} className="breadcrumb-item">Home</li>
              <li style={{color:'#000000',fontWeight:'400px',fontSize:'20px'}} className="breadcrumb-item active" aria-current="page">Rental terms & conditions</li>
            </ol>
          </nav> */}
        </div>
      </div>
      <div className="container" >
        <div className="mt-5 mb-5 px-2" style={{ textAlign: "justify" }}>
          <Markdown >{policyData?.content}</Markdown>      </div>
      </div>
    </div>
  );
}

export default Page;
