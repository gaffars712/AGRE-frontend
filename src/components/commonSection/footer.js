import React from "react";
import fb from "@/assets/images/fb.png";
import tw from "@/assets/images/tw.png";
import insta from "@/assets/images/insta.png";
import yut from "@/assets/images/yut.png";
import In from "@/assets/images/in.png";
import Image from "next/image";
import Link from "next/link";
import { fetchAPI } from "@/app/[lang]/utils/api-handler";

const getFooter = async (lang = "en") => {
  const path = `/footers`;
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
    return response.data[0].attributes;
  } else {
    return null;
  }
};

async function Footer({ localeLang , segmentPath }) {
  let data = {};
  let Year;
  data = await getFooter(segmentPath ? segmentPath : localeLang);
  let homecontentSection = await data?.main;
  console.log(data)

  let date = new Date()
  Year = date?.getFullYear()
  return (
    <div className="bg-backgroundClr" style={{ paddingTop: "40px" }}>
      <div className="container bg-backgroundClr text-white">
        <div className="row justify-content-between mb-5 ">
          {homecontentSection?.length &&
            homecontentSection[0]?.main?.map((item, index) => (
              <div
                key={index}
                className="col-lg-2 col-md-4 col-sm-6 mb-4 mb-lg-0"
              >
                <div className="mb-3">{item?.name}</div>
                {item.subName.map((it, ix) => (
                  <>
                  {it?.type ? <div className="mb-1">{it?.type}</div> : null}
                  <Link
                    key={ix}
                    href={`/${segmentPath ? segmentPath : localeLang}${it?.path}`}
                    style={{ textDecoration: "none", color: "white" }}
                    className="d-flex flex-column gap-1"
                  >
                    <span>{it?.name}</span>
                  </Link>
                  </> ))}
              </div>
            ))}
        </div>
        <hr style={{ color: "#FFFFFF" }}></hr>
        <div className="d-flex justify-content-center flex-wrap  gap-3 fontSize3 py-4">
          {/* <Link href={"/privacy-policy"} className="text-decoration-none text-white">Privacy Policy</Link> */}
          {data?.Info[0]?.info[0]?.title?.length &&
            data?.Info[0]?.info[0]?.title?.map((item, index) => (
              <div key={index}>
                {index === 0 ? null : (
                  <span
                    style={{
                      borderLeft: `${segmentPath ? segmentPath === 'en' ? '1px solid white' : '' : localeLang === 'en' ? '1px solid white' : ''}`,
                      borderRight: `${segmentPath ? segmentPath === 'ar' ? '1px solid white' : '' : localeLang === 'ar' ? '1px solid white' : ''}`,
                      height: "10px",
                      paddingRight: "10px",
                    }}
                  ></span>
                )}
                <Link
                  // href={item?.path}
                  href={`/${segmentPath ? segmentPath : localeLang}${item?.path}`}
                  className="text-decoration-none text-white"
                >
                  {item?.name}
                </Link>
              </div>
            ))}
        </div>
        <hr style={{ color: "#FFFFFF" }}></hr>
        <div className="d-flex flex-sm-row align-items-center flex-column gap-2  pb-4">
          <span>{data?.followOn[0]?.title ? data?.followOn[0]?.title : ''}</span>
          <div className="d-flex gap-2">
            {data?.followLinks?.length &&
              data?.followLinks?.map((item, index) => (
                <Link key={index} href={item?.link ? item?.link : '/'} target="_blank">
                  <Image
                    src={item?.img?.data?.attributes?.url}
                    width={22}
                    height={22}
                    alt="img"
                  />
                </Link>
              ))}
          </div>
        </div>
      </div>
      <div
        className=" footer-end text-center py-4 text-secondary"
        style={{ backgroundColor: "rgba(219, 226, 233, 1)" }}
      >
        © {Year} {data?.copy[0]?.title}
      </div>
    </div>
  );
}

export default Footer;
