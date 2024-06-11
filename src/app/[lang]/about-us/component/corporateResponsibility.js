import React from 'react'
import CorporateImg1 from "@/assets/images/CorporateSectionImage.png";
import CorporateImg2 from "@/assets/images/CorporateSectionImage2.png";
import Image from "next/image";

function corporateResponsibility() {
  return (
    <div>
      <div className="border rounded-4 p-4">
          <div className='fs-4'>Corporate Social Responsibility</div>
          <hr className="my-6"/>
          <div className="row">
            <div className="col-lg-7">
             <p> At Al Ghandi Properties, we are conscious of the social and environmental impact we create within our properties and Dubai communities at large. We strive to make a positive impact in whatever we do, be it responsible sourcing, employee well being, community development and sustainability. The unique customer services and our philanthropic efforts touch many people living and working in our properties in every day life.</p>
            </div>
            <div className="col-lg-5 d-flex flex-column align-items-center gap-5">
            <div className="mt-4 position-relative w-100">
              <div style={{position:'absolute', left: "-14px", top: '-14px', backgroundColor: 'rgba(0, 51, 102, 0.15)', width:'50%', height: '80%', borderRadius: '15px'}} ></div>
                    <Image src={CorporateImg1} style={{position: 'relative', zIndex:'1'}} className='w-100 h-auto' alt="our-value image1" />
                    <div style={{position:'absolute', right: "-10px", bottom: '-10px', backgroundColor: 'rgba(0, 51, 102, 0.15)', width:'50%', height: '50%', borderRadius: '15px'}} ></div>
            </div>
              
            </div>
          </div>
          <div style={{position: 'relative'}} >
          <Image src={CorporateImg2}  className="mt-5 w-100" alt="our-value image2" />
            <div style={{position: 'absolute', top: '100px', paddingLeft: ''}} className='d-flex flex-column align-items-center w-100 text-center text-white'>
                <div className='' style={{fontSize:'41px', marginBottom: '130px'}}>Serving Communities</div>
                <div className='fs-5'>We believe we have the most impact when we bring together our business expertise, philanthropic support and employee commitment.</div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default corporateResponsibility
