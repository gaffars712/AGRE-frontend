"use client"
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { fetchAPI } from "../utils/api-handler";
import { useEffect, useState } from "react";


export default function MediaLayout({ children }) {
   const [data, setData]=useState()
    const getNavData = async (lang) => {
        console.log(lang);
        const path = `/media-navs`;
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
        console.log(response);
        if (response?.data) {
            if(lang === 'ar'){
                setData(response?.data)
            }else{
                setData(response?.data)
            }
            return response?.data;
        } else {
            return null;
        }
    };
    const pathname = usePathname();
    const getFuction = async () => {
        if (pathname.includes("/ar/")) {
             getNavData('ar')
        } else if (pathname.includes("/en/")) {
             getNavData('en')
        }
    }
    useEffect(() => {
        getFuction()
    }, [])
    return (
        <div>
            <div className="bg-backgroundClr pt-2  text-white" >
                <nav className="d-flex  gap-4  navbar-padding overflow-x-auto white text-nowrap" >
                   { console.log(data)}
                    {data && data.map((item, i) => {
                        console.log(item);
                        return(
                            <li className={` d-flex justify-content-center align-items-center ${pathname.includes(item?.attributes?.path) ? "active-tab" : ""}`} style={{ listStyleType: "none", padding: "10px 15px" }}>
                                <Link href={item?.attributes?.path} style={{ textDecoration: 'none', color: pathname.includes(item?.attributes?.path) ? "black" : "white" }}>{item?.attributes?.name}</Link>
                            </li>
                        )
                    })}

                    {/* <li className={`${pathname.includes("/media/video-gallery") ? "active-tab" : ""}`} style={{ listStyleType: "none", padding: "10px 15px" }}>
                        <Link href={"/media/video-gallery"} style={{ textDecoration: 'none', color: pathname.includes("/media/video-gallery") ? "black" : "white" }}>Video Gallery</Link>
                    </li>
                    <li className={`${pathname.includes("/media/photo-gallery") ? "active-tab" : ""}`} style={{ listStyleType: "none", padding: "10px 15px" }}>
                        <Link href={"/media/photo-gallery"} style={{ textDecoration: 'none', color: pathname.includes("/media/photo-gallery") ? "black" : "white" }}>Photo Gallery</Link>
                    </li>
                    <li className={`${pathname.includes("/media/news-and-press-releases") ? "active-tab" : ""}`} style={{ listStyleType: "none", padding: "10px 15px" }}>
                        <Link href={"/media/news-and-press-releases"} style={{ textDecoration: 'none', color: pathname.includes("/media/news-and-press-releases") ? "black" : "white" }}>News and Press Releases</Link>
                    </li> */}
                </nav>
            </div>
            {children}

        </div>
    );
}
