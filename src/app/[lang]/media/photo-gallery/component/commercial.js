"use client";
import React from "react";
import Carousel from "react-elastic-carousel";

const Commercial = ({commercialData, params}) => {
  console.log(commercialData);
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 650, itemsToShow: 2 },
    { width: 1008, itemsToShow: 3 },
    { width: 1500, itemsToShow: 4 },
  ];
  

  return (
    <div className="section-padding ">
      <div
        className="text-headingClr text-center mb-5"
        style={{ fontSize: "32px" }}
      >
       {params?.lang === 'en' ? 'Our Commercial' : 'التجارية لدينا'}
      </div>
      <Carousel breakPoints={breakPoints}>
        {commercialData?.length &&
          commercialData?.map((item, index) => {
            return (
              <Card
                image={item?.residentialImg?.data?.attributes?.url}
                
                key={index}
                id={item?.id}
              />
            );
          })}
      </Carousel>
    </div>
  );
};

export default Commercial;

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
        alt="img"
      ></img>
    </div>
  );
};
