"use client"
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import Banner from "@/assets/images/faqBanners.jpg"
import { fetchAPI } from "../utils/api-handler";
import { useEffect, useState } from "react";
import Loader from "@/components/commonSection/loader";

export default function PropertiesLayout({ children }) {
    const [properties, setproperties] = useState(null)
    const [localeLang, setlocaleLang] = useState(null)
    const [pageLoader, setpageLoader] = useState(true)
    const [params, setparams] = useState('')
    const pathname = usePathname();
    const getNavList = async (lang = "en") => {
        setpageLoader(true)
        const path = `/properties`;
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
        setproperties(response?.data[0]?.attributes)
        if (response?.data) {
            setpageLoader(false)
            return response?.data;
        } else {
            setpageLoader(false)
            return null;
        }

    }
    console.log(properties);
    useEffect(() => {
        if (pathname.includes('/ar/')) {
            setparams('ar')
            getNavList('ar')
            setlocaleLang('ar')
        } else if (pathname.includes('/en/')) {
            setparams('en')
            getNavList('en')
            setlocaleLang('en')
        }
    }, [])
    return (
        <div>
            {pageLoader === true ? <Loader params={params ? params : 'en'} /> : (<>
                <div >
                    {/* <div className="position-relative">
                        <Image src={Banner} style={{maxHeight:"110px", minHeight:"60px"}} alt="" className="w-100 object-fit-cover position-absolute z-0" />
                        <div className="container">
                        <div style={{ fontSize: '28px', marginTop: '40px' }} className="   position-absolute  z-3 text-white">{properties?.mainTitle}</div>
                    </div>
                    </div> */}
                    <div className='position-relative d-flex align-items-center'>
                        <Image src={Banner} style={{ maxHeight: "110px", minHeight: "60px" }} alt='image 1 ' className='w-100 z-1 banner-image-project-desc object-fit-cover' />
                        <div className={`${params === 'en' ? 'blue-linear-gradient' : 'blue-linear-gradient-ar'} text-white  position-absolute z-2 d-flex align-items-center fs-1 fs-md-1  `} style={{ fontWeight: "600", width: '70%', height: '100%', paddingLeft: '8%', paddingRight: params?.lang === 'ar' ? '8%' : '' }} >
                            <div className='container text-white' style={{ fontSize: '28px',}}>
                               {properties?.mainTitle}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-backgroundClr  text-white"  >
                    <div className="container" >
                        <nav className="d-flex  gap-4 pt-2 " >
                            <li className={` d-flex justify-content-center align-items-center ${pathname.includes("/properties/commercial") ? "active-tab" : ""}`} style={{ listStyleType: "none", padding: "10px 15px" }}>
                                <Link href={`/${localeLang}/properties/commercial`} style={{ textDecoration: 'none', color: pathname.includes("/properties/commercial") ? "black" : "white" }}>{properties?.titleOne}</Link>
                            </li>
                            <li className={`${pathname.includes("/properties/residential") ? "active-tab" : ""}`} style={{ listStyleType: "none", padding: "10px 15px" }}>
                                <Link href={`/${localeLang}/properties/residential`} style={{ textDecoration: 'none', color: pathname.includes("/properties/residential") ? "black" : "white" }}>{properties?.titleTwo}</Link>
                            </li>
                        </nav>
                    </div>
                </div>
                {children}
            </>)}
        </div>
    );
}
