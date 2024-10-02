
import React from "react";
import CoverImage from "@/assets/images/cover-image.svg";
import Image from "next/image";
import Filter from "./filter";
import HomeCarousel from "./carouselHome";
const MainScreen = ({ params, heroDetails, filters }) => {
console.log(heroDetails);
    return (
        <div className="w-100 main-screen-container" >
            <div className="position-relative text-white  ">
                {/* <Image
                    src={heroDetails?.length ? heroDetails[0]?.heroImg?.data?.attributes?.url : CoverImage}
                    alt="cover-image"
                    className=" object-fit-cover cover-image"
                    style={{ width: "100%" }}
                    width={11000}
                    height={1000}
                /> */}
                <HomeCarousel heroDetails={heroDetails} />
               
                <Filter filters={filters} params={params} />
            </div>
        </div>
    );
};

export default MainScreen;
