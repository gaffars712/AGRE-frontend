
import React from "react";
import CoverImage from "@/assets/images/cover-image.svg";
import Image from "next/image";
import Filter from "./filter";
import HomeCarousel from "./carouselHome";
const MainScreen = ({ params, heroDetails, filters }) => {

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
                <div
                    className=" main-screen-content  position-absolute w-100 d-flex justify-content-end navbar-padding "
                // style={{
                //     top:0
                // }}
                >
                    <div className="bg-backgroundClr main-screen-subcontainer ">{heroDetails?.length ? heroDetails[0]?.heroContent : "A great choice of premium apartments with a promise of luxury and convenience"}</div>
                </div>
                <Filter filters={filters} params={params} />
            </div>
        </div>
    );
};

export default MainScreen;
