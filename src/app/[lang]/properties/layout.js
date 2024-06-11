"use client"
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import Banner from "@/assets/images/property-banner.png"

export default function PropertiesLayout({ children }) {
    const pathname = usePathname();
    return (
        <div>
            <div>
            <div className="position-relative">
                <Image src={Banner} alt="" className="w-100 object-fit-cover position-absolute z-0"/>
                <div  style={{fontSize:'28px', marginTop:'40px'}} className=" navbar-padding position-absolute  z-3 text-white">Search Result</div>
            </div>
            </div>
            <div className="bg-backgroundClr  text-white" style={{paddingTop:'110px'}} >
                <nav className="d-flex  gap-4 pt-2 navbar-padding" >
                    <li className={` d-flex justify-content-center align-items-center ${pathname.includes("/properties/commercial") ? "active-tab" : ""}`} style={{listStyleType:"none",  padding: "10px 15px"}}>
                        <Link href={"/properties/commercial"} style={{textDecoration: 'none', color:pathname.includes("/properties/commercial") ? "black" : "white" }}>Commercial</Link>
                    </li>
                    <li className={`${pathname.includes("/properties/residential") ? "active-tab" : ""}`} style={{listStyleType:"none",  padding: "10px 15px"}}>
                        <Link href={"/properties/residential"} style={{textDecoration: 'none', color:pathname.includes("/properties/residential") ? "black" : "white" }}>Residential</Link>
                    </li>
                </nav>
            </div>
            {children}

        </div>
    );
}
