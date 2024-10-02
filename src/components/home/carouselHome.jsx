'use client'
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from "next/image";
import styled from "styled-components";

// Styled-component for custom fade effect and cursor change
const FadeCarousel = styled.div`
  .carousel .slide {
    opacity: 0;
    transition-property: opacity;
    transition-duration: 900ms;
  }
  .carousel .slide.selected {
    opacity: 1;
  }
  .carousel .slider-wrapper {
    cursor: grab; // Change cursor to pointer
  }
`;

const HomeCarousel = ({ heroDetails }) => {
    return (
        <div dir="ltr">
            {/* <FadeCarousel> */}
                <Carousel
                    autoPlay
                    interval={5000}
                    infiniteLoop
                    showThumbs={false}
                    showStatus={false}
                    swipeable={true}
                    emulateTouch={true}
                    stopOnHover={true}
                    dynamicHeight={true}
                >
                    {heroDetails ? heroDetails.map((item, index) => {
                        const imageUrl = item?.heroImg?.data[0]?.attributes?.url || item?.heroImg?.data[0]?.attributes?.formats?.large?.url;
                        return (
                            <div key={index}>
                                <img
                                    src={imageUrl}
                                    alt="cover-image"
                                    className="object-fit-cover cover-image"
                                    style={{ width: "100%" }}
                                    width={11000}
                                    height={1000}
                                />
                                <div className="main-screen-content position-absolute w-100 d-flex justify-content-end navbar-padding">
                                    <div className="bg-backgroundClr main-screen-subcontainer">
                                        {item?.heroContent || "A great choice of premium apartments with a promise of luxury and convenience"}
                                    </div>
                                </div>
                            </div>
                        );
                    }) : null}
                </Carousel>
            {/* </FadeCarousel> */}
        </div>
    );
};

export default HomeCarousel;
