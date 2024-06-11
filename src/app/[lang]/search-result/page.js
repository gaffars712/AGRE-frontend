import React from 'react'
import Searchresult from './component/searchresult'
import Image from "next/image";
import banner from "@/assets/images/search-banner.jpg"

function page({ searchParams }) {
  return (
    <div>
      <div className='contact-banner position-relative  '>
        <Image src={banner} alt="wasl-banner" className='w-100 object-fit-cover'  />
        <div className='position-absolute section-padding   ' style={{top:'-40px'}}>
          <h3 className=''>Web Search Result</h3>

          <nav className="d-flex flex-wrap" style={{ '--bs-breadcrumb-divider': "'>'" }} aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li style={{ color: '#000000', fontWeight: '1000px' }} className="breadcrumb-item">Home</li>
              <li style={{ color: '#000000', fontWeight: '1000px' }} className="breadcrumb-item active " aria-current="page">Web Search Result</li>
            </ol>
          </nav>
        </div>
      </div>
      <Searchresult search={searchParams?.search} />
    </div>
  )
}

export default page
