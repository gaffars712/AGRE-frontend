/** @format */

import React from "react";
import upimg1 from "@/assets/images/upcommingImg1.png";
import upimg2 from "@/assets/images/upcommingImg2.png";
import Image from "next/image";
import Link from "next/link";

function upcommingproject({ upCommingDetails, sliderImgData }) {
    console.log(sliderImgData);

    console.log(upCommingDetails);
    return (
        <>
            <div className=" section-padding row m-0">
                <div className="col-lg-4 col-md-6 col-6 gap-4 ">
                    <div style={{marginLeft:'37px'}}>
                        <div
                            className="imagbox1"
                        style={{ width: "291px", height: "458px" }}
                        >
                            <div className="position-relative">
                                <div
                                    className="position-absolute top-0 rounded-4 z-0 d-none  d-md-block d-lg-block"
                                    style={{
                                        background: "rgba(0, 51, 102, 0.5)",
                                        height: "265px",
                                        width: "292px",
                                        marginTop: "-38px",
                                        left: "-20px",
                                    }}
                                ></div>
                                <Image
                                    src={sliderImgData[0].sliderImg.data.attributes.url}
                                    alt=""
                                    className="z-4 position-absolute  h-auto imgresize"
                                    width={292}
                                    height={457}
                                />
                            </div>
                        </div>
                        <h6 className="text-center  " style={{  }}>
                            {upCommingDetails?.length ? upCommingDetails[0]?.img?.data[0]?.attributes?.caption : "6 Villas, Jumeirah"}
                        </h6>
                    </div>
                </div>
                <div className="imgsecond col-lg-4 col-md-6 col-6">
                    <div className="imagbox2" style={{ }}>
                        <Image src={sliderImgData[1].sliderImg.data.attributes.url} alt="" width={292}
                            height={457} className="h-auto imgresize" />
                        <h6 className="text-center mt-2">{upCommingDetails?.length ? upCommingDetails[0]?.img?.data[1]?.attributes?.caption : "6 Villas, Jumeirah"}</h6>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-12">
                    <div
                        className="d-flex sm:flex-row align-items-center"
                    style={{
                         width: "100%",
                         maxWidth: "428px",
                        marginTop: "100px",
                    }}
                    >
                        <div className="mt-4 ">
                            <h3 className="text-headingClr ">{upCommingDetails?.length ? upCommingDetails[0]?.title : "Upcoming Projects"}</h3>
                            <div
                                className="mt-4 mb-5 d-flex align-items-center w-100"
                                style={{
                                    fontSize: "18px",
                                    lineHeight: "27px",
                                    fontWeight: "400",
                                    textAlign: "",
                                    color: "#8D8D87",
                                }}
                            >
                                {upCommingDetails?.length ? upCommingDetails[0]?.desc : " Our uniquely designed spacious villas are sure to impress anyone seeking a modern, peaceful an elegant home."}
                            </div>
                            <Link href={'/upcoming-projects'} className="">
                                <button
                                    className="btn btn-backgroundClr w-100"
                                    style={{ maxWidth: "125px" }}
                                >
                                    View All
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>


            {/* <div className="pb-4 d-flex w-100 justify-content-center">
            <div className="section-padding d-flex  flex-md-row gap-5 ">
                <div >
                    <div
                        className="imagbox1"
                        style={{ width: "291px", height: "458px" }}
                    >
                        <div className="position-relative">
                            <div
                                className="position-absolute top-0 rounded-4 z-0"
                                style={{
                                    background: "rgba(0, 51, 102, 0.5)",
                                    height: "265px",
                                    width: "292px",
                                    top: "-20px",
                                    left: "-20px",
                                }}
                            ></div>
                            <Image
                                src={sliderImgData[0].sliderImg.data.attributes.url}
                                alt=""
                                className="z-4 position-absolute  mt-4 h-auto"
                                width={292}
                                height={457}
                            />
                        </div>
                    </div>
                    <h6 className="text-center  " style={{ marginTop: "32px" }}>
                        {upCommingDetails?.length ?  upCommingDetails[0]?.img?.data[0]?.attributes?.caption : "6 Villas, Jumeirah"}
                    </h6>
                </div>
                <div className="imagbox2" style={{ marginTop: "24px" }}>
                    <Image src={sliderImgData[1].sliderImg.data.attributes.url} alt="" width={292}
                                height={457} className="h-auto" />
                    <h6 className="text-center mt-2">{upCommingDetails?.length ?  upCommingDetails[0]?.img?.data[1]?.attributes?.caption : "6 Villas, Jumeirah"}</h6>
                </div>
                <div
                    className="d-flex sm:flex-row align-items-center"
                    style={{
                         width: "100%",
                         maxWidth: "428px",
                        marginTop: "24px",
                    }}
                >
                    <div className="">
                        <h3 className="text-headingClr">{upCommingDetails?.length ? upCommingDetails[0]?.title : "Upcoming Projects"}</h3>
                        <div
                            className="mt-4 mb-5 align-items-center w-100"
                            style={{
                                fontSize: "18px",
                                lineHeight: "27px",
                                fontWeight: "400",
                                textAlign: "justify",
                                color: "#8D8D87",
                            }}
                        >
                           {upCommingDetails?.length ? upCommingDetails[0]?.desc : " Our uniquely designed spacious villas are sure to impress anyone seeking a modern, peaceful an elegant home."}
                        </div>
                        <Link href={'/upcoming-projects'} className="">
                            <button
                                className="btn btn-backgroundClr w-100"
                                style={{ maxWidth: "125px" }}
                            >
                                View All
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div> */}
        </>
    );
}

export default upcommingproject;
