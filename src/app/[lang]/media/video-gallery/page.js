import React from "react";
import Image from "next/image";
import youtubeLogo from "@/assets/images/youtubeLogo.png";
import VideoComponent from "./component/videoComponent";
import { fetchAPI } from "../../utils/api-handler";
import { Link } from "@mui/material";

const getAllVideoGallery = async (lang ) => {
  const path = `/video-galleries`;
  const urlParamsObject = {
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
    return response.data[0].attributes;
  } else {
    return null;
  }
};

async function VideoGallery  ({params}) {

  let videoData = {};
  videoData = await getAllVideoGallery(params?.lang);
  console.log(videoData);
  return (
    <div>
      <div className="section-padding w-100 row">
        <div className="col-12 col-sm-7">
          <div className="fs-2 fw-medium mb-4">{videoData.hero[0].title}</div>
          <div className="fs-4">{videoData.hero[0].Desc}</div>
        </div>
        <div className="col-12 col-sm-5  d-flex  justify-content-end align-items-center">
          <Image src={youtubeLogo} alt="youtube-logo" />
          <button className="rounded-3 px-4 py-2 ms-4 border-0 " style={{backgroundColor: '#636363'}}><a href={videoData.hero[0].channelLink} target="_blank" className="text-decoration-none  text-white">Subscribe Now</a></button>
        </div>
      </div>
      <VideoComponent videoDetails={videoData} />
    </div>
  );
};

export default VideoGallery;
