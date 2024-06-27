"use client"
import React, { useState } from 'react'
import Image from "next/image"
import logo from "@/assets/images/webLogo.svg"
import navbarlogo from "@/assets/images/earthlogo.svg"


// import SearchIcon from '@mui/icons-material/Search';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import { useRouter } from 'next/navigation'


const Navbar = ({ localeLang, navData, segmentPath }) => {
  console.log(localeLang)
  const [showMenu, setShowMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      router.push(`/${segmentPath ? segmentPath : localeLang}/search-result?search=${searchTerm}`);
    }
  }
  const changeLang = async (cvalue) => {
    let clang = getCookie('locale');
    console.log(clang)
    if (clang != cvalue || clang == cvalue) {
      document.cookie = `locale=${cvalue}`;
      window.location.pathname = `/${cvalue}/${window.location.pathname.split("/").slice(2).join('/')}`
    }
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-padding bg-light">
      <div className="d-flex justify-content-between w-100 align-items-center">
        <Link href={`/${segmentPath ? segmentPath : localeLang}/`} className="navbar-brand ">
          <Image className=' logoimgwidth  ' width={navData[0]?.attributes?.titleImg?.data?.attributes?.width ? 400 : 100} height={navData[0]?.attributes?.titleImg?.data?.attributes?.height ? 100 : 100} style={{ position: "relative", left: segmentPath === 'en' || localeLang === 'en' ? '-30px' : '30px' }} src={navData[0]?.attributes?.titleImg?.data?.attributes?.url ? navData[0]?.attributes?.titleImg?.data?.attributes?.url : logo} alt="wasl-logo" />
        </Link>
        <button className="custom-navbar-toggler d-lg-none" type="button" onClick={() => setShowMenu(!showMenu)}>
          <span className="custom-toggler-icon">☰</span>
        </button>
        <div className={`collapse navbar-collapse justify-content-end mt-4 mt-lg-0 ${showMenu ? 'show' : ''}`} id="navbarNav"
          style={{ width: 'w-100', zIndex: '10' }}>
          <div style={{ width: 'w-100' }} className="justify-content-end ">
            <div className=" d-md-flex d-lg-flex justify-content-end gap-3 w-100 mt-2">
              <div
                style={{
                  borderLeft: segmentPath === 'ar' ? '2px solid #003366' : 'none',
                  borderRight: segmentPath !== 'ar' ? '2px solid #003366' : 'none'
                }}
                className="px-3 py-2">
                <span><Image src={navbarlogo} alt="wasl-logo" className="mx-1" /></span>
                <span className={`${segmentPath === 'en' ? 'd-none' : ''}`} style={{ cursor: "pointer" }} onClick={() => changeLang('en')}> English </span>  <span className={`${segmentPath === 'ar' ? 'd-none' : ''}`} style={{ cursor: "pointer" }} onClick={() => changeLang('ar')}> عربي                </span>
              </div>
              <div className="mx-1 my-1 mt-2">
                <div style={{ background: '#F4F4F4' }} className="relative d-flex align-items-center p-1 px-2">
                  <input
                    className='w-100'
                    style={{ outline: 'none', border: 'none', background: '#F4F4F4' }}
                    type="text"
                    placeholder={navData[0]?.attributes?.searchPlaceholder ? navData[0]?.attributes?.searchPlaceholder : "Search"}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <div className="absolute "><SearchIcon /></div>
                </div>
              </div>
            </div>
            <div className="p-1 mt-2 w-100">
              <div style={{ borderTop: '2px solid #003366' }} className={`p-1 ${showMenu ? 'd-flex' : 'd-none d-lg-flex'}`}>
                <ul className="d-flex flex-column justify-content-end w-100 flex-lg-row flex-wrap gap-3">
                  {navData[0]?.attributes?.navList && navData[0]?.attributes?.navList.map((item, index) => (
                    <span key={index} onClick={() => setShowMenu(false)}><Link style={{ fontSize: segmentPath === 'ar' ? '19px' : '' }} href={item?.listPath ? `/${segmentPath ? segmentPath : localeLang}${item?.listPath}` : `/${segmentPath ? segmentPath : localeLang}`} className="nav-link">{item?.listName}</Link></span>
                  ))}
                  {/* <span onClick={()=>setShowMenu(false)}><li className="nav-link"> Renting </li></span>
                  <span onClick={()=>setShowMenu(false)}><li className="nav-link"> Industrial </li></span>
                  <span onClick={()=>setShowMenu(false)}><Link  href="/contact-us" className="nav-link"> Our Communities </Link></span>
                  <span onClick={()=>setShowMenu(false)}> <Link href="/contact-us" className="nav-link">Contact Us</Link></span>
                  <span onClick={()=>setShowMenu(false)}><Link href="/about-us/history" className="nav-link">About Us</Link></span> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;