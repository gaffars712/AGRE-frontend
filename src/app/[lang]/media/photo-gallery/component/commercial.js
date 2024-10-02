"use client";
import React from "react";
import Carousel from "react-elastic-carousel";

const Commercial = ({ commercialData, params }) => {
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 650, itemsToShow: 2 },
    { width: 1008, itemsToShow: 3 },
    { width: 1500, itemsToShow: 4 },
  ];

  const CustomPagination = ({ pages, activePage, onClick }) => {
    return (
      <div className="carousel-pagination-for-photos">
        <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"15px", marginTop:"10px"}}>
          {pages.map((page, i) => {
            if (i === activePage - 1 || i === activePage || i === activePage + 1) {
              return (
                <button
                  className={`carousel-dot-for-photos  ${i !== activePage ? 'notActiveImg' : '   activeDot '}`}
                  key={i}
                  onClick={() => onClick(i)}
                  type="button"
                >

                </button>
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  };
  return (
    <div className="section-padding ">
      <div className="container">
        <div
          className="text-headingClr text-center mb-5"
          style={{ fontSize: "34px", fontWeight: "500" }}
        >
          {params?.lang === 'en' ? 'Our Commercial' : 'التجارية لدينا'}
        </div>
        <Carousel breakPoints={breakPoints} renderPagination={({ pages, activePage, onClick }) => (
          <CustomPagination pages={pages} activePage={activePage} onClick={onClick} />
        )}>
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
    </div >
  );
};

export default Commercial;

const Card = ({ image, title, key, id }) => {
  return (
    <div
      key={key}
      className="rounded-4 position-relative"
      style={{ width: "321px" }}
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
