"use client"
import Image from "next/image";
import React, { useState } from "react";
import arrow from "@/assets/images/aro.svg";
import hd from "@/assets/images/property-banner.png";
import { Construction } from "@mui/icons-material";
import Markdown from 'react-markdown'
import Link from "next/link";

const FAQ = ({ faqcontentSection }) => {
  console.log(faqcontentSection);

  const [selectedItem, setSelectedItem] = useState(null);

  const handleOnClick = (index) => {
    setSelectedItem(selectedItem === index ? null : index);
  };
  return (
    <div >
      <div className='contact-banner position-relative '>
        <Image src={hd} alt="faq-image" className='object-fit-cover w-100  ' />
        <div className='position-absolute w-100  navbar-padding  ' style={{top:"15px",padding:""}}>
          <h3 className="text-white">FAQs</h3>
          <nav className="d-flex flex-wrap text-white" aria-label="breadcrumb">
            <ol className="breadcrumb d-flex align-items-center">
              <li
                className="breadcrumb-item"
                style={{ color: '#000000', fontWeight: 400, fontSize: '16px' }}
              >
                <Link className="text-white" style={{textDecorationLine:"none"}} href="/">Home</Link>
              </li>
              <li
                className="breadcrumb-divider mx-2"
                style={{ color: 'white' }}
              >
                {'>'}
              </li>
              <li
                className="breadcrumb-item active text-white"
                style={{ color: '#000000', fontWeight: 400, fontSize: '16px' }}
                aria-current="page"
              >
                FAQs
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="section-padding" >
        {faqcontentSection?.map((item, index) => (
          <Child
            key={index}
            item={item}
            index={index}
            isSelected={selectedItem === index}
            onClick={handleOnClick}
          />
        ))}
      </div>
    </div>
  );
};
const Child = ({ item, index, isSelected, onClick }) => {
  console.log(item);

  const rotationStyle = {
    transform: isSelected ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform 0.3s ease-in-out'
  };
  return (
    <div onClick={() => onClick(index)} className="faq-item my-2 p-2 border rounded-4" style={{ cursor: "pointer" }}>
      <div className="d-flex justify-content-between align-items-center" style={{ padding: '10px' }}>
        <span>{item?.faq}</span>
        <Image className="w-18px " src={arrow} alt="arrow-image" style={rotationStyle} />
      </div>
      {isSelected && (
        <div className="faq-answer p-2" style={{ textAlign: 'justify' }}>
          {/* <Markdown {item?.Desc}/> */}
          <Markdown children={item?.Desc} />
        </div>
      )}
    </div>
  );
};
export default FAQ;