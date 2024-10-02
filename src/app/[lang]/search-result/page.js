import React from 'react'
import Searchresult from './component/searchresult'
import Image from "next/image";
import banner from "@/assets/images/search-banner.jpg"

function page({ params, searchParams }) {
  return (
    <div>
      <div className='contact-banner position-relative  ' style={{ height: "110px" }}>
        {/* <div className="position-relative">
          <Image src={banner} alt="banner" className="w-100 object-fit-cover position-absolute z-0" />
          <div className="container">
            <div style={{  marginTop: '40px' }} className="   position-absolute  z-3 ">
              <h3 style={{ fontSize: '30px', fontWeight:"600",  }} className=''>{params?.lang === 'en' ? 'Web Search Result' : 'نتيجة بحث الويب'}</h3>

            </div>
          </div>
        </div> */}
        <div className='position-relative d-flex align-items-center'>
          <Image src={banner} style={{ maxHeight: "150px", minHeight: "80px" }} alt='image 1 ' className='w-100 z-1 banner-image-project-desc object-fit-cover' />
          <div className={`${params?.lang === 'en' ? 'blue-linear-gradient' : 'blue-linear-gradient-ar'} text-white  position-absolute z-2 d-flex align-items-center fs-1 fs-md-1  `} style={{ fontWeight: "600", width: '60%', height: '100%', paddingLeft: '8%', paddingRight: params?.lang === 'ar' ? '8%' : '' }} >
            <div className='container text-white' style={{ fontSize: '30px', fontWeight: "600", }}>
              {params?.lang === 'en' ? 'Web Search Result' : 'نتيجة بحث الويب'}
            </div>
          </div>
        </div>
      </div>
      <div className='mt-5'>
        <Searchresult key={searchParams?.search} params={params} search={searchParams?.search} />
      </div>
    </div>
  )
}

export default page
