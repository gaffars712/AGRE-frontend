"use client"
import Link from "next/link";
import { usePathname } from 'next/navigation';


export default function MediaLayout({ children }) {
    const pathname = usePathname();
    return (
        <div>
            <div className="bg-backgroundClr pt-2  text-white" >
                <nav className="d-flex  gap-4  navbar-padding overflow-x-auto white text-nowrap" >
                    <li className={` d-flex justify-content-center align-items-center ${pathname.includes("/media/blogs") ? "active-tab" : ""}`} style={{listStyleType:"none",  padding: "10px 15px"}}>
                        <Link href={"/media/blogs"} style={{textDecoration: 'none', color:pathname.includes("/media/blogs") ? "black" : "white" }}>Blogs</Link>
                    </li>
                    <li className={`${pathname.includes("/media/video-gallery") ? "active-tab" : ""}`} style={{listStyleType:"none",  padding: "10px 15px"}}>
                        <Link href={"/media/video-gallery"} style={{textDecoration: 'none', color:pathname.includes("/media/video-gallery") ? "black" : "white" }}>Video Gallery</Link>
                    </li>
                    <li className={`${pathname.includes("/media/photo-gallery") ? "active-tab" : ""}`} style={{listStyleType:"none",  padding: "10px 15px"}}>
                        <Link href={"/media/photo-gallery"} style={{textDecoration: 'none', color:pathname.includes("/media/photo-gallery") ? "black" : "white" }}>Photo Gallery</Link>
                    </li>
                    <li className={`${pathname.includes("/media/news-and-press-releases") ? "active-tab" : ""}`} style={{listStyleType:"none", padding: "10px 15px"}}>
                        <Link href={"/media/news-and-press-releases"}  style={{textDecoration: 'none', color:pathname.includes("/media/news-and-press-releases") ? "black" : "white" }}>News and Press Releases</Link>
                    </li>
                </nav>
            </div>
            {children}

        </div>
    );
}
