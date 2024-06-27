'use client'
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from "next/image";
import CoverImage from "@/assets/images/cover-image.svg";


const HomeCarousel = ({ heroDetails }) => {
    console.log(heroDetails[0]?.heroImg?.data?.attributes?.formats?.large?.url);
    const state = {
        items: [
            { id: 1, title: 'item #1' },
            { id: 2, title: 'item #2' },
            { id: 3, title: 'item #3' },
            { id: 4, title: 'item #4' },
            { id: 5, title: 'item #5' }
        ]
    }
    // https://sdlc-scrapi.s3.us-east-1.amazonaws.com/abrajcenter_banner_627e57f80a.png" alt="First slide" />
    // </div>
    // <div class="carousel-item">
    //     <img class="d-block w-100" src="
    return (
        <div dir='ltr'>
        <Carousel transitionTime={900} autoPlay interval={5000} infiniteLoop showThumbs={false} showStatus={false}>
            <div>
                <Image src={heroDetails[0]?.heroImg?.data?.attributes?.url ? heroDetails[0]?.heroImg?.data?.attributes?.url : heroDetails[0]?.heroImg?.data?.attributes?.formats?.large?.url}
                    alt="cover-image"
                    className=" object-fit-cover cover-image"
                    style={{ width: "100%" }}
                    width={11000}
                    height={1000}
                />
            </div>
            <div>
                <Image src={heroDetails?.length ? heroDetails[0]?.heroImg?.data?.attributes?.url : CoverImage}
                    alt="cover-image"
                    className=" object-fit-cover cover-image"
                    style={{ width: "100%" }}
                    width={11000}
                    height={1000}
                />
            </div>
            <div>
                <Image src={heroDetails?.length ? heroDetails[0]?.heroImg?.data?.attributes?.url : CoverImage}
                    alt="cover-image"
                    className=" object-fit-cover cover-image"
                    style={{ width: "100%" }}
                    width={11000}
                    height={1000}
                />
            </div>
        </Carousel>
        </div>
    )
};
export default HomeCarousel;