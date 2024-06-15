import React from "react";
import Image from "next/image";
import Copy from "@/assets/location/copy.svg";
import Markdown from "react-markdown";
import { fetchAPI } from "../utils/api-handler";

  const getAllInformationSecuritiesSection = async (lang) => {
    console.log(lang);
    const path = `/information-securities`;
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
     console.log("response",response);
  if (response?.data) {
    console.log('respo', response?.data)
    return response.data[0]?.attributes;
  } else {
    return null;
  }
}
   async function Page({params}) {

    let data = {};
    data = await getAllInformationSecuritiesSection(params?.lang);
    console.log('Fetched data:', data);
    let infoData = await data
    console.log(infoData?.content)
   


    return (
      <div>
      <div className='contact-banner position-relative  '>
      <Image src={Copy} alt="wasl-banner" width={100} height={200}  className='w-100 z-1 policyImgHieght  object-fit-cover' />
        <div className={` text-white ${params?.lang === 'en' ? 'blue-linear-gradient' : 'blue-linear-gradient-ar' } position-absolute z-2 d-flex align-items-center fs-3 fs-md-1 `} style={{ width: '60%', height: '100%', paddingLeft:params?.lang ==='en' ? '8%' : '',  paddingRight: params?.lang ==='ar' ? '8%' : '' , top:"0px",fontWeight:"500" }}>
        Information Security
          {/* <nav className="d-flex flex-wrap" style={{ '--bs-breadcrumb-divider': "'>'" }} aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li style={{color:'#000000',fontWeight:'400px',fontSize:'20px'}} className="breadcrumb-item">Home</li>
              <li style={{color:'#000000',fontWeight:'400px',fontSize:'20px'}} className="breadcrumb-item active" aria-current="page">Rental terms & conditions</li>
            </ol>
          </nav> */}
        </div>
        </div>
      <div className="section-padding" style={{ textAlign: "justify",fontSize:'16px'}}>
        <Markdown >{infoData?.content}</Markdown>
      </div>
    </div>
    )
  }
 export default Page