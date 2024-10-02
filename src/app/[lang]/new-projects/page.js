import React from 'react'
import Framecomp from './component/framecomp'
import frameimage from "@/assets/images/faqBanners.jpg"
import { fetchAPI } from "../utils/api-handler";

import Image from "next/image";
import flag from "@/assets/images/flag.svg";

const getAllupcomingeSection = async (lang) => {
  const path = `/upcomings`;
  const urlParamsObject = {
    sort: { createdAt: "desc" },
    populate: "deep",
    locale: lang,
    pagination: {
      start: 0,
      limit: 10,
    },
  };
  const options = {};

  const response = await fetchAPI(path, urlParamsObject, options);
  if (response?.data?.[0]?.attributes) {
    return response.data[0].attributes;
  } else {
    return null;
  }
};

async function page({ params }) {
  let data = {};
  data = await getAllupcomingeSection(params?.lang);
  console.log(data);

  return (
    <>
      <section>
        {/* <div className="position-relative" style={{height:"128px"}}>
          <Image style={{maxHeight:"110px", minHeight:"60px"}} src={frameimage} alt="banner"  className="w-100 h-100 object-fit-cover position-absolute z-0" />
          <div className="container">
            <div style={{padding:"20px 0px"}}  className="   position-absolute  z-3 text-white">
              <h3 style={{ fontSize: '32px',fontWeight:"600" }} className=' text-white'>{data?.hero[0]?.title}</h3>
              <div style={{fontSize:"18px"}} className='text-white'><Image src={flag} /> 2 {data?.hero[0]?.countName}</div>
            </div>
          </div>
        </div> */}
        <div className='position-relative d-flex align-items-center'>
          <Image src={frameimage} style={{ maxHeight: "140px", minHeight: "60px" }} alt='image 1 ' className='w-100 z-1 banner-image-project-desc object-fit-cover' />
          <div className={`${params?.lang === 'en' ? 'blue-linear-gradient' : 'blue-linear-gradient-ar'} text-white  position-absolute z-2 d-flex align-items-center fs-1 fs-md-1  `} style={{ fontWeight: "600", width: '70%', height: '100%', paddingLeft: '8%', paddingRight: params?.lang === 'ar' ? '8%' : '' }} >
            <div className='container' style={{ display: "flex", flexDirection: "column" }}>
              <h3 style={{ fontSize: '32px', fontWeight: "600" }} className=' text-white'>{data?.hero[0]?.title}</h3>
              <div style={{ fontSize: "18px" }} className='text-white'><Image src={flag} /> {data?.projects.length - 1} {data?.hero[0]?.countName}</div>
            </div>
          </div>
        </div>
      </section>
      <section className=''>
        <Framecomp properties={data} />
      </section>
    </>

  )
}

export default page