"use client";
import React from "react";
import Carousel from "react-elastic-carousel";

const Residential = ({residetialData}) => {
  console.log("consoledata",residetialData)
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 650, itemsToShow: 2 },
    { width: 1008, itemsToShow: 3 },
    { width: 1500, itemsToShow: 4 },
  ];
  
  return (
    <div
      className="section-padding "
      style={{ backgroundColor: "rgba(0, 51, 102, 0.15)" }}
    >
      <div
        className="text-headingClr text-center mb-5"
        style={{ fontSize: "32px" }}
      >
        Our Residential
      </div>
      <Carousel breakPoints={breakPoints}>
        {residetialData?.length &&
          residetialData?.map((item, index) => {
            return (
              <Card
                image={item?.residentialImg?.data?.attributes?.url}
                title={item?.title}
                key={index}
                id={item?.id}
              />
            );
          })}
      </Carousel>
    </div>
  );
};

export default Residential;

const Card = ({ image, title, key, id }) => {
  return (
    <div
      key={key}
      className="rounded-4 position-relative"
      // style={{ width: "321px" }}
    >
      <img
        className="w-100  object-fit-cover rounded-4 z-1"
        // style={{ height: "410px" }}
        src={image}
      ></img>
    </div>
  );
};
