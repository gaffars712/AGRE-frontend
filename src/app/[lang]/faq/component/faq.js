"use client"
import Image from "next/image";
import React, { useState } from "react";
import arrow from "@/assets/images/aro.svg";
import hd from "@/assets/images/faqBanners.jpg";
import { Construction } from "@mui/icons-material";
import Markdown from 'react-markdown'
import Link from "next/link";

const FAQ = ({ faqcontentSection, params }) => {
  console.log(faqcontentSection);

  const [selectedItem, setSelectedItem] = useState(null);

  const handleOnClick = (index) => {
    setSelectedItem(selectedItem === index ? null : index);
  };
  return (
    <div >
      <div className='contact-banner position-relative '>
        <div className='position-relative d-flex align-items-center'>
          <Image src={hd} style={{ maxHeight: "110px", minHeight: "60px" }} alt="faq-image" className='object-fit-cover w-100  ' />
          {/* <Image src={projectDetails && projectDetails?.attributes?.bannerImg?.data?.attributes?.url} width={1366} height={254} alt='image 1 ' className='w-100 z-1 banner-image-project-desc object-fit-cover' /> */}
          <div className={`${params?.lang === 'en' ? 'blue-linear-gradient' : 'blue-linear-gradient-ar'} text-white  position-absolute z-2 d-flex align-items-center fs-1 fs-md-1  `} style={{ fontWeight: "600", width:params?.lang === 'ar' ? '65%' : '60%', height: '100%', paddingLeft: '8%', paddingRight: params?.lang === 'ar' ? '8%' : '' }} >
            <div className="container">
              <div className='position-absolute     ' style={{ top: "15px", padding: "" }}>
                <h3 className="text-white" style={{ fontSize: "32px", fontWeight: "600" }}>{faqcontentSection?.title}</h3>
                <nav className="d-flex flex-wrap text-white" style={{ fontSize: "18px" }} aria-label="breadcrumb">
                  <ol className="breadcrumb d-flex align-items-center">
                    <li
                      className="breadcrumb-item"
                      style={{ color: '#000000', fontWeight: 400, fontSize: '16px' }}
                    >
                      <Link className="text-white" style={{ textDecorationLine: "none" }} href={faqcontentSection?.fromPagePath ? faqcontentSection?.fromPagePath : '/'}>{faqcontentSection?.fromPage}</Link>
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
                      {faqcontentSection?.title}
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className="container" >
        <div className="" >
          {faqcontentSection?.faqs?.map((item, index) => (
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
          <Markdown >{item?.Desc}</Markdown>
        </div>
      )}
    </div>
  );
};
export default FAQ;