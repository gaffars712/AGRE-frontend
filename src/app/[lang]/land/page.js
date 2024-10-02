import React from "react";
import Image from "next/image";
import Copy from "@/assets/location/copy.svg";
import Markdown from "react-markdown";
import { fetchAPI } from "../utils/api-handler";
import alDurahForLandBanner from "../../../assets/images/alDurahForLandBanner.png";
import Link from "next/link";

const getLandContent = async (lang = "en") => {
    const path = `/lands`;
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
    console.log('asdfasdfasdfasf', response)
    if (response?.data?.[0]?.attributes) {
        return response.data?.[0]?.attributes;
    } else {
        return null;
    }
};
async function Page({ params }) {

    let data = {};
    data = await getLandContent(params?.lang);
    let bannerImg = data?.Land[0]?.image?.data?.attributes?.url
    console.log('Fetched data:', data);




    return (
        <div>
            <div className='position-relative d-flex align-items-center'>
                <img src={bannerImg ? bannerImg : alDurahForLandBanner} width={1366} height={254} alt='image 1 ' className='w-100 z-1 banner-image-project-desc ' />
                <div className={`${params?.lang === 'en' ? 'blue-linear-gradient' : 'blue-linear-gradient-ar'} text-white  position-absolute z-2 d-flex align-items-center fs-1 fs-md-1  `} style={{ fontWeight: "600", width: '60%', height: '100%', paddingLeft: '8%', paddingRight: params?.lang === 'ar' ? '8%' : '' }} >
                    {data?.Land[0]?.title ? data?.Land[0]?.title : 'Discover Your Dream Land'}
                </div>
            </div>
            <div className="container">
                <div className="mt-5 mb-5 row">
                    <div className="col-12 col-lg-8" style={{ textAlign: "justify", paddingRight: params?.lang === 'ar' ? "22px" : '' }}>
                        <Markdown >
                            {data?.Land[0]?.content}
                        </Markdown>

                    </div>
                    <div className="col-12 mt-4 mt-lg-0 col-lg-1">
                    </div>
                    <div className="col-12 mt-4 mt-lg-0 col-lg-3">
                        <Link href={`/${params?.lang}/contact-us`} className="pb-4" style={{ width: "100%", textDecoration: "none", display: "flex", justifyContent: "center", borderBottom: "1px solid black" }}>
                            <div className="px-5 py-1" style={{ backgroundColor: "#003366", fontWeight: "500", width: "100%", borderRadius: "10px" }}>
                                <div className="p-2 text-center text-white w-full" >
                                    {params?.lang === 'ar' ? 'ابقى على تواصل' : 'Get In touch'}
                                </div>
                            </div>
                        </Link>
                        <div className="mt-3">
                            <h5 className="text-center" style={{ fontWeight: "600", fontSize: "25px" }}>{params?.lang === 'ar' ? 'الاتصالات الرئيسية' : 'Key Contacts'} </h5>
                            <p className="text-center" style={{ fontSize: "15px", fontStyle: "italic", fontWeight: "500" }}>
                                {params?.lang === 'ar' ? 'تحدث إلى خبير حول احتياجاتك' : 'Talk to an expert about your needs'}
                            </p>
                        </div>
                        <div className="pb-4" style={{ width: "100%", display: "flex", justifyContent: "center", }}>
                            <Link href={`/${params?.lang}/contact-us`} className="px-5 py-1 " style={{ border: "1px solid black", color: "black", textDecoration: "none", fontWeight: "500", width: "100%", borderRadius: "10px" }}>
                                <div className="p-2 text-center  w-full" >
                                    {params?.lang === 'ar' ? 'اتصل بنا' : 'Contact Us'}
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Page