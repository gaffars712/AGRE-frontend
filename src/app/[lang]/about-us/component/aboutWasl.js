"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Link from "next/link";
import { useParams } from "next/navigation";
import Markdown from "react-markdown";
import CorporateImg2 from "@/assets/images/CorporateSectionImage2.png";
import Carousel from "react-elastic-carousel";

function Aboutwasl({ params, aboutDetails }) {
  const [selectedIndex, setSelectedIndex] = useState("History");
  const pram = useParams();
  console.log(pram)

  const buttonArray = [
    "history",
    "our-values",
    "investment-philosophy",
    "ExecutiveTeam",
    "corporate-socialResponsibility",
    "career-opportunities",
  ];

  const handleButtonClick = (index) => {
    setSelectedIndex(index);
  };
  useEffect(() => {
    setSelectedIndex(pram?.item);
  }, [pram?.item]);
  console.log(aboutDetails);
  let reversedAboutDetails;
  if (params?.lang === 'ar') {
    console.log('para', params);
    reversedAboutDetails = [...aboutDetails].reverse()
  } else {
    reversedAboutDetails = [...aboutDetails].reverse()
  }
  return (
    <div className="container">
      <div className="d-flex mt-5 mb-5 flex-column flex-md-row gap-sm-2 gap-lg-5">
        <div class="dropdown d-md-none my-5 ">
          {reversedAboutDetails?.length &&
            reversedAboutDetails
              .filter((it) => it?.attributes?.path === selectedIndex)
              .map((item, index) => (
                <button
                  key={index}
                  class="btn btn-secondary dropdown-toggle w-100"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {item?.attributes?.title}
                </button>
              ))}

          <ul class="dropdown-menu">
            {reversedAboutDetails?.length &&
              reversedAboutDetails.map((item, index) => (
                <Link key={index}
                  className="text-decoration-none"
                  href={item?.attributes?.path ? item?.attributes?.path : "#"}
                >
                  <li>
                    <div
                      className="dropdown-item"
                      key={index}
                      onClick={() => handleButtonClick(item?.attributes?.path)}
                    >
                      {item?.attributes?.title}
                    </div>
                  </li>
                </Link>
              ))}
          </ul>
        </div>
        <div
          className="d-none d-md-flex  d-flex flex-column"
          style={{ minWidth: "300px" }}
        >
          {reversedAboutDetails?.length &&
            reversedAboutDetails.map((item, index) => (
              <Link
                key={index}
                className="rounded-4 text-start  p-4 mb-2 text-decoration-none"
                style={{
                  backgroundColor:
                    selectedIndex === item?.attributes?.path
                      ? "rgba(0, 51, 102, 0.15)"
                      : "white",
                  color: "#585754",
                  border: "1px solid #E4E4DC",
                  borderLeft:
                    selectedIndex === item?.attributes?.path
                      ? "4px solid black"
                      : "1px solid #E4E4DC",
                      
                }}
                href={item?.attributes?.path ? item?.attributes?.path : "#"}
              >
                {item?.attributes?.title}
              </Link>
            ))}
        </div>
        {reversedAboutDetails?.length &&
          reversedAboutDetails
            .filter((item) => item?.attributes?.path == selectedIndex)
            .map((item, index) => (
              <div key={index} className="border rounded-4 p-4">
                <div className="fs-4">{item?.attributes?.title}</div>
                <hr className="my-6" />
                <div className="row mb-5">
                  <h3 className="mb-2">{item?.attributes?.shortDes}</h3>
                  <div className="col-lg-7" style={{textAlign:"justify"}}>
                    <Markdown >{item?.attributes?.Desc}</Markdown>
                  </div>
                  <div className="col-lg-5 d-flex flex-column align-items-center gap-5">
                    <div className="mt-4 position-relative w-100">
                      <div
                        style={{
                          position: "absolute",
                          left: "-14px",
                          top: "-14px",
                          backgroundColor: "rgba(0, 51, 102, 0.15)",
                          width: "50%",
                          height: "80%",
                          borderRadius: "15px",
                        }}
                      ></div>
                      {item?.attributes?.firstImg && <img
                        src={item?.attributes?.firstImg?.data?.attributes?.url}
                        style={{ position: "relative", zIndex: "1" }}
                        className="w-100 h-auto rounded-4"
                        alt="our-value image1"
                        width={292}
                        height={195}
                      />}
                      <div
                        style={{
                          position: "absolute",
                          right: "-10px",
                          bottom: "-10px",
                          backgroundColor: "rgba(0, 51, 102, 0.15)",
                          width: "50%",
                          height: "50%",
                          borderRadius: "15px",
                        }}
                      ></div>
                    </div>
                    {item?.attributes?.secondImg?.data?.attributes?.url && (
                      <img
                        src={item?.attributes?.secondImg?.data?.attributes?.url}
                        className="mt-5 w-100 h-auto"
                        alt="our-value image2"
                        width={292}
                        height={195}
                      />
                    )}
                  </div>
                </div>
                {item?.attributes?.fullImg?.data && (
                  <TextCard imgUrl={item?.attributes?.fullImg?.data?.attributes?.formats?.thumbnail?.url} />
                )}
              </div>
            ))}
      </div>
    </div>
  );
}

export default Aboutwasl;

const TextCard = ({ imgUrl }) => {
  const breakPoints = [{ width: 1, itemsToShow: 1 }];

  const residentialContent = [
    {
      id: 1,
      text: "We believe we have the most impact when we bring together our business expertise, philanthropic support and employee commitment.",
    },
    {
      id: 2,
      text: "We believe we have the most impact when we bring together our business expertise, philanthropic support and employee commitment.",
    },
    {
      id: 3,
      text: "We believe we have the most impact when we bring together our business expertise, philanthropic support and employee commitment.",
    },
    {
      id: 4,
      text: "hi rohan",
    },
    {
      id: 5,
      text: "hi harshal",
    },
  ];

  return (
    <div style={{ position: "relative" }} className="d-flex align-items-center">
      <Image
        src={imgUrl}
        className="object-fit-cover w-100"
        alt="our-value image2"
        width={790}
        height={363}
      />
      {/* <div
        style={{
          position: "absolute",
          gap: "100px",
        }}
        className="d-flex flex-column  w-100 text-center text-white "
      >
        <div className="" style={{ fontSize: "41px" }}>
          Serving Communities
        </div>
        <Carousel breakPoints={breakPoints}>
          {residentialContent.map((item, index) => (
            <div key={index} className="fs-5">
              {item.text}
            </div>
          ))}
        </Carousel>
      </div> */}
    </div>
  );
};
