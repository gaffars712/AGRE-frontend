"use client";
import React, { useState } from "react";
import Image from "next/image";
import bed from "@/assets/images/bed.png";
import floorPlanIcon from "@/assets/images/plan.svg";

function ProjectFloor({floorDetails}) {
  const [selected, setSelected] = useState(floorDetails[0].id);

  const handleChange = (event) => {
    setSelected(event.target.value);
  }; 

  return (
    <div className="p-0">
      <div className="py-4 m-0">
        <h5>PLANS</h5>
      </div>
      <div
        className="row text-white bg-backgroundClr p-2 m-0 floor-plan-heading "
        style={{
         
        }}
      >
        <div className="d-flex align-items-center my-2 w-100">
          <div className="pb-2">
            <Image
              src={floorPlanIcon}
              alt="Floor Plan Icon"
              className="img-fluid" 
              />
          </div>
          <div>
            <h6 className="mr-3 mt-1 px-2">Floor Plan</h6>
          </div>
        </div>
      </div>
      <div className="floor-plan-container " style={{ fontSize: "16px", backgroundColor: "rgba(0, 51, 102, 0.15)" , borderEndEndRadius:'16px', borderBottomLeftRadius:'16px' }}>
        <div className="">
          <nav className="nav-bar d-flex flex-md-row flex-column  flex-wrap floor-plan-nav rounded-4 border border-backgroundClr" style={{fontSize:'16px'}}>
          {
            floorDetails.map((item, index)=>{
            return(
              <div key={index}>
              <label className=" d-flex gap-3 align-items-center" >
              <input
                type="radio"
                value={item?.id}
                style={{
                  width: '16px',
                  height: '16px',
                  accentColor: 'rgba(0, 51, 102, 1)',
                }}
                checked={selected == item?.id}
                onChange={handleChange}
                
              />
              {item?.title}
            </label>
            </div> )})
          }
          </nav>
        </div>
        <div className="content mt-4 text-backgroundClr" >
          
              {floorDetails.map((item, index)=>{
               return (
                selected == item?.id && (
                  <div key={index} className="row">
              <div className="col-md-4">
                <Image src={item?.img?.data?.attributes?.url} alt="2 Bedroom" className="img-fluid" width={349} height={431}/>
              </div>
              <div className="col-md-8 p-4">
                <h1>{item?.title}</h1>
                <p>
                 {item?.Desc}
                </p>
              </div>
            </div>
                )
               
              )})}
        </div>
      </div>
    </div>
  );
}

export default ProjectFloor;
