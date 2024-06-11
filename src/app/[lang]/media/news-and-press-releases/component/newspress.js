import React from "react";
import Image from "next/image";
import image18 from "@/assets/images/image18.png";
import image19 from "@/assets/images/image19.png";
import image20 from "@/assets/images/image20.png";
import image21 from "@/assets/images/image21.png";
import image22 from "@/assets/images/image22.png";
import image23 from "@/assets/images/image23.png";
import { fetchAPI } from "../../../utils/api-handler";
import Markdown from "react-markdown";

const getnewsHeroSection = async (lang = "en") => {
  const path = `/news-and-presses`;
  const urlParamsObject = {
    sort: { createdAt: "desc" },
    populate: "deep",
    locale: lang,
    pagination: {
      start: 0,
      limit: 10,
    },
  };
  const options = {};

  const response = await fetchAPI(path, urlParamsObject, options);

  if (response?.data?.[0]?.attributes) {
    console.log("respo", response?.data[0]?.attributes);
    return response.data[0].attributes;
  } else {
    return null;
  }
};
const getallNews = async (lang = "en") => {
  const path = `/news`;
  const urlParamsObject = {
    sort: { createdAt: "Desc" },
    populate: "deep",
    locale: lang,
    pagination: {
      start: 0,
      limit: 10,
    },
  };
  const options = {};

  const response = await fetchAPI(path, urlParamsObject, options);

  console.log("respo", response);
  if (response?.data) {
    return response.data;
  } else {
    return null;
  }
};

async function Newspress() {
  let homeData = {};
  let newsData = {};
  homeData = await getnewsHeroSection();
  console.log(homeData);
  newsData = await getallNews();
  console.log(newsData);

  return (
    <div className="section-padding navbar-padding mb-4">
      <div className=" py-4">
        <p style={{ fontSize: "27px" }}>{homeData?.hero[0]?.title}</p>
        <p style={{ fontSize: "14px" }}>{homeData?.hero[0]?.Desc}</p>
      </div>
      <div
        style={{
          backgroundColor: "rgba(0, 51, 102, 0.15)",
          borderRadius: "16px",
        }}
      >
        <div className=" row py-4 px-2">
          <div className="col-lg-6 col-12 col-md-6 px-4">
            <Image
              src={newsData[0]?.attributes?.img?.data?.attributes?.formats?.small?.url}
              width={1000}
              height={1000}
              className="img-fluid"
            />
          </div>
          <div className="col-lg-6 col-12 col-md-6 px-4">
            <div style={{ color: "2B2A28" }} className="text-capitalize">
              <p
                style={{
                  fontSize: "28px",
                  fontWeight: "400",
                  color: "#2B2A28",
                  lineHeight: "36px",
                }}
                className=" text-capitalize"
              >
                {newsData[0]?.attributes?.title}
              </p>
            </div>
            <div>
              {/* <p style={{ fontSize: "16px", color: "2B2A28" }}> */}
              <Markdown  > {newsData[0]?.attributes?.Desc} </Markdown>
              {/* </p> */}
            </div>
            <p>Read More</p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        {newsData && newsData.filter((item,index)=> index !== 0).map((post) => (
          <div
            style={{
              borderRadius: "16px",
            }}
            className="mb-2 px-3 border flex-column flex-sm-row gap-3 d-flex align-items-center bg-white "
            key={post.id}
          >
            <div
              className="img-left  px-sm-0 py-3 w-100"
              style={{ flex: "0 0 203px", minWidth: "203px" }}
            >
              <Image
                src={post?.attributes?.img?.data?.attributes?.url}
                width={1000}
                height={1000}
                className="img-fluid w-100 "
                alt="Tips for Renting"
              />
            </div>
            <div className="" style={{ flex: "1 1 auto" }}>
              <span className="fw-bolder" style={{ fontSize: "17px" }}>
                {post?.attributes?.title}
              </span>
              <p style={{ fontSize: "14px" }}>&nbsp;{post?.attributes?.Desc}</p>
              <div className="d-flex gap-3 justify-content-between">
                {post?.attributes?.date ? (
                  <span
                    style={{
                      backgroundColor: "rgba(0, 51, 102, 0.15)",
                      fontSize: "15px",
                      maxWidth: '160px'
                    }}
                    className="p-1 cardcolor rounded fs-6"
                  >
                    Date: {post?.attributes?.date}
                  </span>
                ) : null}
                <span className="newsAndMedia px-5 ">Read More</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Newspress;
