import Image from "next/image";
import React from "react";
import map from "@/assets/images/map-1.svg";
import COMMON from "@/components/common";
import Map from "@/components/commonSection/map";


const location = [
  "Dubai Frame",
  "Zabeel Park",
  "Wifi Mall",
  "Dubai Creek",
  "Dubai Garden Glow",
  "Dubai World Trade Center (DWTC)",
  "Al Seef",

]

const MapComponent = ({ params, mapDetails, mapUrl }) => {
  return (
    <div>
      <div className="row mb-3 mt-5 d-flex justify-content-md-between">
        <div className="col-md-6 gap-4 mb-6 p-0 ">
          <div className="mb-4">
            <h5 className="mb-3">{mapDetails?.locationTitle}</h5>
            <p style={{ textAlign: 'justify' }}>
              {mapDetails?.locationDesc}
            </p>
          </div>
          <div className="d-flex flex-wrap w-100 justify-content-start gap-3" >
            {mapDetails?.locationFeature && params?.lang === 'en'
              ?
              mapDetails?.locationFeature?.map((loc, index) => (
                <div key={index} className=' d-flex align-items-center flex-column' style={{ width: '90px' }}>
                  <div className='d-flex justify-content-center align-items-center' style={{ height: '90px' }}>
                    {COMMON.LOCATION[loc]}
                  </div>
                  <div className=' d-flex text-center' style={{ fontSize: '14px', minHeight: '30px', lineHeight: '20px' }}>{loc}</div>
                </div>
              ))
              :
              mapDetails?.locationFeatureAR?.map((loc, index) => (
                <div key={index} className=' d-flex align-items-center flex-column' style={{ width: '90px' }}>
                  <div className='d-flex justify-content-center align-items-center' style={{ height: '90px' }}>
                    {COMMON.LOCATION[loc]}
                  </div>
                  <div className=' d-flex text-center' style={{ fontSize: '14px', minHeight: '30px', lineHeight: '20px' }}>{loc}</div>
                </div>
              ))
            }
          </div>
        </div>
        <div className="col-md-5 p-0 ">
          <div className="flex justify-content-md-end">
            <Map height={302} mapUrl={mapUrl} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MapComponent;


