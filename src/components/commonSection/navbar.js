"use client"
import React, { useEffect, useRef, useState } from 'react'
import Image from "next/image"
import logo from "@/assets/images/webLogo.svg"
import navbarlogo from "@/assets/images/earthlogo.svg"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// import SearchIcon from '@mui/icons-material/Search';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import { useRouter } from 'next/navigation'


const Navbar = ({ localeLang, navData, segmentPath }) => {
  console.log(localeLang)
  const [showMenu, setShowMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState({});
  const navbarRef = useRef(null);

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
      setShowMenu(false)
      const timer = setTimeout(setSearchTerm(''), 1500);
      return () => clearTimeout(timer);
    }
  }
  const handleClick = (event) => {
    router.push(`/${segmentPath ? segmentPath : localeLang}/search-result?search=${searchTerm}`);
    setShowMenu(false)
    const timer = setTimeout(setSearchTerm(''), 1500);
    return () => clearTimeout(timer);
  }
  const changeLang = async (cvalue) => {
    let clang = getCookie('locale');
    console.log(clang)
    if (clang != cvalue || clang == cvalue) {
      window.location.pathname = `/${cvalue}/${window.location.pathname.split("/").slice(2).join('/')}`
    }
    document.cookie = `locale=${cvalue}`;
  }
  const toggleDropdown = (index) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };
  const closeAllDropdowns = () => {
    setDropdownOpen({});
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div className='container ' ref={navbarRef}>
      <nav className="navbar  navbar-expand-lg   ">
        <div className="d-flex justify-content-between w-100 align-items-center">
          <Link href={`/${segmentPath ? segmentPath : localeLang}/`} className="navbar-brand ">
            <img className=' logoimgwidth  ' width={navData[0]?.attributes?.titleImg?.data?.attributes?.width ? 400 : 100} height={navData[0]?.attributes?.titleImg?.data?.attributes?.height ? 100 : 100} style={{ position: "relative", left: segmentPath === 'en' ? '-25px' : '25px' }} src={navData[0]?.attributes?.titleImg?.data?.attributes?.url ? navData[0]?.attributes?.titleImg?.data?.attributes?.url : logo} alt="wasl-logo" />
          </Link>
          <button className="custom-navbar-toggler d-lg-none" type="button" onClick={() => setShowMenu(!showMenu)}>
            <span className="custom-toggler-icon">☰</span>
          </button>
          <div className={`collapse navbar-collapse justify-content-end  mt-lg-0 ${showMenu ? 'show' : ''}`} id="navbarNav"
            style={{ width: 'w-100', zIndex: '10', marginTop: "20px" }}>
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
                      onKeyDown={(e) => handleKeyPress(e)}
                    />
                    <div className="absolute  " style={{ cursor: "pointer" }} onClick={handleClick}><SearchIcon /></div>
                  </div>
                </div>
              </div>
              <div style={{ boxShadow: showMenu ? "1px 8px 10px rgba(0, 0, 0, 0.3)" : '' }} className="p-1 mt-2 w-100">
                <div style={{ borderTop: '2px solid #003366' }} className={`p-1 ${showMenu ? 'd-flex' : 'd-none d-lg-flex'}`}>
                  <div
                    onMouseLeave={closeAllDropdowns}
                    style={{ marginRight: segmentPath === 'ar' ? '20px' : '0px', marginLeft: segmentPath === 'en' ? '20px' : '0px' }}
                    className="d-flex flex-column justify-content-end w-100 flex-lg-row flex-wrap gap-3"
                  >
                    {navData[0]?.attributes?.navList && navData[0]?.attributes?.navList.map((item, index) => (
                      <div className="nav-item dropdown" key={index}>
                        <div className='d-flex justify-content-between'>
                          <Link
                            href={item?.listPath ? `/${segmentPath ? segmentPath : localeLang}${item?.listPath}` : `/${segmentPath ? segmentPath : localeLang}`}
                            className="nav-link d-flex justify-content-between"
                            onMouseOver={() => {
                              setShowMenu(false);
                              if (item?.isDropdown === "true") {
                                toggleDropdown(index);
                              }
                            }}
                            id={`navbarDropdown${index}`}
                            role="button"
                            data-bs-toggle={item?.isDropdown === "true" ? "dropdown" : ""}
                            aria-expanded={item?.isDropdown === "true" ? dropdownOpen[index] : false}
                          >
                            <span style={{ fontSize: segmentPath === 'ar' ? '16px' : '14px', fontWeight: "500" }}>{item?.listName}</span>
                          </Link>
                          {item?.isDropdown === "true" ? (
                            <span
                              onClick={() => {
                                if (item?.isDropdown === "true") {
                                  toggleDropdown(index);
                                }
                              }}
                            >
                              <KeyboardArrowDownIcon />
                            </span>
                          ) : null}
                        </div>
                        {item?.isDropdown === "true" && dropdownOpen[index] && (
                          <div
                            dir={segmentPath === 'ar' ? 'rtl' : 'ltr'}
                            style={{ backgroundColor: "#ededed", borderRadius: "10px", }}
                            className={`dropdown_menu dropdown-menu ${dropdownOpen[index] ? 'show' : ''}`}
                            aria-labelledby={`navbarDropdown${index}`}
                          >
                            {item?.dropdownItem && item?.dropdownItem.map((dropItem, dropIndex) => (
                              <React.Fragment key={dropIndex}>
                                <div
                                  onClick={() => {
                                    setShowMenu(false);
                                    if (item?.isDropdown === "true") {
                                      toggleDropdown(index);
                                    }
                                  }}
                                  className="dropdown-item"
                                >
                                  <Link
                                    style={{ textDecoration: "none", color: "black", fontSize: "13px", fontWeight: "500" }}
                                    href={dropItem?.path ? `/${segmentPath ? segmentPath : localeLang}${dropItem?.path}` : `/${segmentPath ? segmentPath : localeLang}`}
                                  >
                                    {dropItem.name}
                                  </Link>
                                </div>
                                {dropIndex < item?.dropdownItem?.length - 1 && <hr style={{ margin: '0px' }} />}
                              </React.Fragment>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {/* <span onClick={()=>setShowMenu(false)}><li className="nav-link"> Renting </li></span>
                  <span onClick={()=>setShowMenu(false)}><li className="nav-link"> Industrial </li></span>
                  <span onClick={()=>setShowMenu(false)}><Link  href="/contact-us" className="nav-link"> Our Communities </Link></span>
                  <span onClick={()=>setShowMenu(false)}> <Link href="/contact-us" className="nav-link">Contact Us</Link></span>
                  <span onClick={()=>setShowMenu(false)}><Link href="/about-us/history" className="nav-link">About Us</Link></span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;