"use client";
import React from "react";
import Carousel, { consts } from "react-elastic-carousel";
// import styled from "styled-components";

// Custom pagination component
const CustomPagination = ({ pages, activePage, onClick }) => {
  return (
    <div className="carousel-pagination-for-photos">
      <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"15px", marginTop:"10px"}}>
        {pages.map((page, i) => {
          if (i === activePage - 1 || i === activePage || i === activePage + 1) {
            return (
              <button
                className={`carousel-dot-for-photos  ${i !== activePage ? 'notActiveImg' : 'activeDot '}`}
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
const Residential = ({ residetialData, params }) => {
  console.log("consoledata", residetialData);
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 650, itemsToShow: 2 },
    { width: 1008, itemsToShow: 3 },
    { width: 1500, itemsToShow: 4 },
  ];

  return (
    <div
      className="section-padding"
      style={{ fontWeight: "500", backgroundColor: "rgba(0, 51, 102, 0.15)" }}
    >
      <div className="container">
        <div
          className="text-headingClr text-center mb-5"
          style={{ fontSize: "32px" }}
        >
          {params?.lang === 'en' ? 'Our Residential' : 'السكنية لدينا'}
        </div>
        <Carousel breakPoints={breakPoints} renderPagination={({ pages, activePage, onClick }) => (
          <CustomPagination pages={pages} activePage={activePage} onClick={onClick} />
        )}>
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
    </div>
  );
};

export default Residential;

const Card = ({ image, title, key, id }) => {
  return (
    <div
      key={key}
      className="rounded-4 position-relative"
      style={{ width: "321px" }}
    >
      <img
        className="w-100 object-fit-cover rounded-4 z-1"
        src={image}
        alt="img"
      ></img>
    </div>
  );
};

// Add some basic styling for the custom pagination dots
// const StyledDiv = styled.div`
//   .carousel-pagination {
//     display: flex;
//     justify-content: center;
//     margin-top: 10px;
//   }

//   .carousel-dot {
//     background: none;
//     border: none;
//     font-size: 20px;
//     margin: 0 5px;
//     cursor: pointer;
//     opacity: 0.5;
//   }

//   .carousel-dot.active {
//     opacity: 1;
//   }
// `;

// const CustomPaginationStyled = ({ pages, activePage, onClick }) => {
//   return (
//     <StyledDiv>
//       <CustomPagination pages={pages} activePage={activePage} onClick={onClick} />
//     </StyledDiv>
//   );
// };
