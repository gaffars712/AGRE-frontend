import React from 'react'
import Framecomp from './component/framecomp'
import frameimage from "@/assets/images/property-banner.png"
import { fetchAPI } from "../utils/api-handler";

import Image from "next/image";
import flag from "@/assets/images/flag.svg";

const getAllupcomingeSection = async (lang = "en") => {
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

async function  page() {
  let data = {};
  data = await getAllupcomingeSection();

  
  return (
    <>
        <section>
                <div className='contact-banner  position-relative  '>
                    <Image src={frameimage} alt="wasl-banner" className='w-100' />
                    <div className='position-absolute  section-padding navbar-padding top-0 lh-lg'>
                        <h3 className=' mt-1'>{data?.hero[0]?.title}</h3>
                        <div><Image src={flag}/> 2 Properties Found</div>

                        {/* <ul  className='d-flex ' style={{listStyle:'none',color:"##2B2A28"}}>
                          <li><Image src={flag}/> 2 Properties Found</li>
                        </ul> */}
                    </div>
                </div>
        </section>
        <section>
                <Framecomp properties={data}/>
         </section>
         </>
        
  )
}

export default page