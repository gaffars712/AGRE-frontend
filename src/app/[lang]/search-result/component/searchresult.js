'use client'
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import residential from "@/assets/images/residential.png";
import resid6etial6 from "@/assets/images/resid6etial6.png";
import residetial1 from "@/assets/images/residetial1.png";
import residetial2 from "@/assets/images/residetial2.png";
import residetial3 from "@/assets/images/residetial3.png";
import residetial4 from "@/assets/images/residetial4.png";
import residetial5 from "@/assets/images/residetial5.png";
import residetial7 from "@/assets/images/residetial7.png";
import flag from "@/assets/images/flag.svg";
import building from "@/assets/images/building.svg";
import bedroomImage from "@/assets/images/bedroom.svg";
import CloseIcon from '@mui/icons-material/Close';
import money from "@/assets/images/money.svg";
import size from "@/assets/images/size.svg";
import { fetchAPI } from '../../utils/api-handler';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Loader from '@/components/commonSection/loader';
import CartLoader from '@/components/commonSection/cartLoader';
function Searchresult({ params, search }) {

    const Router = useRouter()
    const properties = [
        {
            id: 'P856',
            title: 'Riggat Al Buteen – B62',
            unit: 'Unit No.A0411',
            price: '90,199 / Year',
            size: '1,825.00',
            type: '3 bedroom',
            image: residential,
        },
        {
            id: 'P857',
            title: 'Downtown – B12',
            unit: 'Unit No.B0211',
            price: '120,000 / Year',
            size: '2,000.00',
            type: '4 bedroom',
            image: resid6etial6,
        },
        {
            id: 'P858',
            title: 'Marina – B14',
            unit: 'Unit No.C0311',
            price: '150,000 / Year',
            size: '2,500.00',
            type: '5 bedroom',
            image: residetial2,
        },
        {
            id: 'P859',
            title: 'Marina – B14',
            unit: 'Unit No.C0311',
            price: '150,000 / Year',
            size: '2,500.00',
            type: '5 bedroom',
            image: residetial1,
        },
        {
            id: 'P859',
            title: 'Marina – B14',
            unit: 'Unit No.C0311',
            price: '150,000 / Year',
            size: '2,500.00',
            type: '5 bedroom',
            image: residetial2,
        },
        {
            id: 'P859',
            title: 'Marina – B14',
            unit: 'Unit No.C0311',
            price: '150,000 / Year',
            size: '2,500.00',
            type: '5 bedroom',
            image: residetial3,
        },
        {
            id: 'P859',
            title: 'Marina – B14',
            unit: 'Unit No.C0311',
            price: '150,000 / Year',
            size: '2,500.00',
            type: '5 bedroom',
            image: residetial4,
        },
        {
            id: 'P859',
            title: 'Marina – B14',
            unit: 'Unit No.C0311',
            price: '150,000 / Year',
            size: '2,500.00',
            type: '5 bedroom',
            image: residetial5,
        },
        {
            id: 'P859',
            title: 'Marina – B14',
            unit: 'Unit No.C0311',
            price: '150,000 / Year',
            size: '2,500.00',
            type: '5 bedroom',
            image: residetial7,
        },
    ]
    const [searchText, setSearchText] = useState(search)
    const [commercialPropertiesData, setCommercialPropertiesData] = useState([])
    const [residentialPropertiesData, setResidentialPropertiesData] = useState([])
    const [pageLoader, setpageLoader] = useState(true)
    const [blogs, setblogs] = useState([])
    const getAllblogSection = async (lang) => {
        try {
            // setpageLoader(true)
            const path = `/blog-sections`;
            const urlParamsObject = {
                sort: { createdAt: "desc" },
                populate: "deep",
                locale: lang,
                filters: {
                    title: { $contains: searchText },
                }
            };

            const response = await fetchAPI(path, urlParamsObject);
            if (response?.data) {
                setblogs(response.data);
                setpageLoader(false)
            } else {
            }
        } catch (error) {
            console.log(error);

        } finally {
            setpageLoader(false)
        }
    };
    const getPropertiesData = async (lang, empty) => {
        setpageLoader(true)
        const commercialPath = `/commercial-projects`
        const residentialPath = `/residential-projects`
        console.log('asdfasdf', searchText)
        const urlParamsObject = {
            populate: '*',
            locale: lang,
            filters: {
                proName: { $contains: empty === true ? "" : searchText },
            }
        }

        try {
            const commercialResponse = await fetchAPI(commercialPath, urlParamsObject);
            const residentialResponse = await fetchAPI(residentialPath, urlParamsObject);
            console.log(residentialResponse);

            if (commercialResponse?.data?.length) {
                setCommercialPropertiesData(commercialResponse?.data)
            } else {
                setCommercialPropertiesData([])
            }
            if (residentialResponse?.data?.length) {
                setResidentialPropertiesData(residentialResponse?.data)
            } else {
                setResidentialPropertiesData([])
            }
        } catch (error) {
            console.log(error);

        } finally {
            setpageLoader(false)
        }
    }
    const truncateText = (text, length) => {
        if (text?.length > length) {
            return text.substring(0, length) + '...';
        }
        return text;
    };
    useEffect(() => {
        setSearchText(search)
        const fetchData = async () => {
            try {
                await getPropertiesData(params?.lang);
                console.log('ji');
                await getAllblogSection(params?.lang);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        console.log(residentialPropertiesData);
    }, []);
    const handleKeyPress = async (event) => {
        if (event?.key === 'Enter') {
            await getPropertiesData(params?.lang);
        }
    }

    const handleclearText = () => {
        setSearchText('')
        const empty = true;
        const timer = setTimeout(async () => await getPropertiesData(params?.lang, empty), 500);
        return () => clearTimeout(timer);
    }
    return (
        <>

            <div className='mt-5'>
                <div className="container   mb-5 d-flex flex-column flex-md-row justify-content-between align-items-center  ">
                    <div className="searchbox mb-3 mb-md-0">
                        <p style={{ fontSize: '28px', fontWeight: '500', color: "gray" }}>{params?.lang === 'en' ? "Search Result" : "نتيجة البحث"}</p>
                        <div style={{ fontSize: '24px', fontWeight: '500' }}>
                            {searchText}
                        </div>
                    </div>
                    <div className="searchbox    d-flex-row align-items-center sm:w-100 ">
                        <input
                            style={{
                                height: '45px',
                                outline: 'none',
                                maxWidth: '300px',
                                border: '1px solid #ccc',
                                borderRadius: params?.lang === 'ar' ? '0px 8px 8px 0px' : '8px 0px 0px 8px'
                            }}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            type="text"
                            onKeyDown={(e) => handleKeyPress(e)}
                            className=" px-3"
                        />
                        {searchText ? <span
                            onClick={handleclearText}
                            style={{ width: '50px', marginLeft: params?.lang === 'en' ? '-46px' : "", padding: '8.5px 12px', cursor: 'pointer' }}
                        >
                            <CloseIcon className='border-0' />
                        </span> : ''}
                        <button
                            onClick={() => getPropertiesData()}
                            style={{ width: '100px', marginLeft: params?.lang === 'en' ? '-8px' : "", padding: '8.5px 0' }}
                            className={` ${params?.lang === 'en' ? "btn-new" : 'btn-new-ar'} `}
                        >
                            {params?.lang === 'en' ? 'Search' : "يبحث"}
                        </button>
                    </div>
                </div>
                <div className='container'>
                    <div className='mb-5 mt-5'>
                        {/* <div className="project-result">
                        <p style={{ fontSize: '28px', fontWeight: '500' }}>{params?.lang === 'en' ? 'Blog Results' : "نتائج المدونة"}</p>
                        <div className="row mt-4">

                            {blogs.length && blogs?.map(post => (
                                <div className="col-md-4 col-sm-12 mb-5" key={post?.attributes?.id}>
                                    <div className="rounded">
                                        <div className="img-box">
                                            <Image src={post?.attributes?.img?.data?.attributes?.formats?.thumbnail?.url} width={1000} height={1000} className="img-fluid rounded" alt={post?.attributes?.title} />
                                        </div>
                                        <p style={{ minHeight: '52px' }}>{post?.attributes.title}</p>
                                        <p style={{ fontSize: '14px' }}>{truncateText(post?.attributes?.Desc, 80)}</p>
                                        <button className="btn btn-outline-primary w-100 p-2 rounded">{params?.lang === 'en' ? 'Read More' : "اقرأ أكثر"}</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div> */}

                        <p style={{ fontSize: '30px', fontWeight: '600' }}>{params?.lang === 'en' ? " Properties Result" : "نتيجة الخصائص"}</p>
                        {pageLoader === true ? <CartLoader params={params?.lang} />
                            :
                            <div className="row w-100 ">

                                {commercialPropertiesData?.length > 0 ? <div style={{ fontSize: "22px", fontWeight: "600" }} className='py-4'>{params?.lang === 'en' ? "Commercial Properties" : "العقارات التجارية"} :</div> : ''}
                                {commercialPropertiesData?.length ? commercialPropertiesData.map((property) => {
                                    return (
                                        // <Link href={`/${params?.lang}/project-detail/commercial/${property?.attributes?.proShortName}`} key={property.id} className='col-12 col-md-6 col-lg-4 mb-3 text-decoration-none text-black'>
                                        //     <div className='rounded-3 border p-3' style={{ maxWidth: '356px' }}>
                                        //         <div className='img-box  mb-2'>
                                        //             <Image width={326} height={170} src={property?.attributes?.bannerImg?.data?.attributes?.formats?.large?.url} className='object-fit-cover w-100 rounded' alt={property?.attributes?.proName} />
                                        //         </div>
                                        //         <div className=''> {property?.attributes?.proName}</div>
                                        //         <div style={{ fontSize: '14px' }} className=''>
                                        //             <ul style={{ listStyle: 'none', lineHeight: '30px' }} className='nav-link'>
                                        //                 <li className=''><Image src={flag} alt="Flag" /> <span className='mx-2 ' style={{ fontSize: '12px', color: 'rgba(43, 42, 40, 0.7)' }}>{property?.attributes?.ProAddress}</span></li>
                                        //                 <li><Image src={building} alt="Building" /> <span className='mx-2'>{params?.lang === 'en' ? 'Unit No' : 'رقم الوحدة'} : {property?.attributes?.proUnit}</span></li>
                                        //                 <li><Image src={money} alt="Money" /> <span className='mx-2'>{params?.lang === 'en' ? 'Price' : 'سعر'} : {property?.attributes?.proPrice} ({params?.lang === 'en' ? 'AED' : 'درهم'})</span></li>
                                        //                 <li><Image src={size} alt="Size" /> <span className='mx-2'>{params?.lang === 'en' ? 'Size' : 'مقاس'} : {property?.attributes?.proSize} ({params?.lang === 'en' ? 'Sq.ft.' : "قدم مربع."})</span></li>
                                        //                 <li><Image src={bedroomImage} alt="Bedroom" /><span className='mx-2'> {params?.lang === 'en' ? 'Type :' : 'يكتب :'} {property?.attributes?.proType}</span></li>
                                        //             </ul>
                                        //         </div>
                                        //         <p></p>
                                        //     </div>
                                        // </Link>
                                        <div key={property.id} className='col-6 rounded-4 col-md-6 col-lg-4 col-xl-3 col-2xl-2 mb-3 text-decoration-none h-100 text-black'>
                                            <Link href={`/${params?.lang}/project-detail/commercial/${property?.attributes?.proShortName}`} className='position-relative d-flex h-100 w-100 text-decoration-none text-black'>
                                                <Image height={100}
                                                    width={250}
                                                    className='object-fit-cover w-100 rounded-4 h-100'
                                                    src={property?.attributes?.SliderImg?.data?.attributes?.url}
                                                    alt={property?.attributes?.proName}
                                                />
                                                <div
                                                    style={{ backgroundColor: "rgba(4, 115, 169, 0.5)", height: "53px", fontWeight: "600" }}
                                                    className='position-absolute rounded-bottom-4 bottom-0 z-3 d-flex align-items-center w-100 justify-content-center text-white'>
                                                    {property?.attributes?.proName}
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                })
                                    :
                                    null
                                }

                                {residentialPropertiesData?.length > 0 ? <div style={{ fontSize: "22px", fontWeight: "600" }} className='py-4'>{params?.lang === 'en' ? "Residential Properties" : "العقارات السكنية"} : </div> : ' '}

                                {residentialPropertiesData?.length ? residentialPropertiesData.map((property) => (
                                    // <Link href={`/${params?.lang}/project-detail/residential/${property?.attributes?.proShortName}`} key={property.id} className='col-12 col-md-6 col-lg-4 mb-3 text-decoration-none text-black'>
                                    //     <div className='rounded-3 border p-3' style={{ maxWidth: '356px' }}>
                                    //         <div className='img-box  mb-2'>
                                    //             <Image width={326} height={170} src={property?.attributes?.bannerImg?.data?.attributes?.formats?.large?.url} className='object-fit-cover w-100 rounded' alt={property?.attributes?.proName} />
                                    //         </div>
                                    //         <div className=''> {property?.attributes?.proName}</div>
                                    //         <div style={{ fontSize: '14px' }} className=''>
                                    //             <ul style={{ listStyle: 'none', lineHeight: '30px' }} className='nav-link'>
                                    //                 <li className=''><Image src={flag} alt="Flag" /> <span className='mx-2 ' style={{ fontSize: '12px', color: 'rgba(43, 42, 40, 0.7)' }}>{property?.attributes?.ProAddress}</span></li>
                                    //                 <li><Image src={building} alt="Building" /> <span className='mx-2'>{params?.lang === 'en' ? 'Unit No' : 'رقم الوحدة'} : {property?.attributes?.proUnit}</span></li>
                                    //                 <li><Image src={money} alt="Money" /> <span className='mx-2'>{params?.lang === 'en' ? 'Price' : 'سعر'} : {property?.attributes?.proPrice} ({params?.lang === 'en' ? 'AED' : 'درهم'})</span></li>
                                    //                 <li><Image src={size} alt="Size" /> <span className='mx-2'>{params?.lang === 'en' ? 'Size' : 'مقاس'} : {property?.attributes?.proSize} ({params?.lang === 'en' ? 'Sq.ft.' : "قدم مربع."})</span></li>
                                    //                 <li><Image src={bedroomImage} alt="Bedroom" /><span className='mx-2'> {params?.lang === 'en' ? 'Type :' : 'يكتب :'} {property?.attributes?.proType}</span></li>
                                    //             </ul>
                                    //         </div>
                                    //         <p></p>
                                    //     </div>
                                    // </Link>
                                    <div key={property.id} className='col-6 rounded-4 col-md-6 col-lg-4 col-xl-3 col-2xl-2 mb-3 text-decoration-none h-100 text-black'>
                                        <Link href={`/${params?.lang}/project-detail/residential/${property?.attributes?.proShortName}`} className='position-relative d-flex h-100 w-100 text-decoration-none text-black'>
                                            <Image height={100}
                                                width={250}
                                                className='object-fit-cover w-100 rounded-4 h-100'
                                                src={property?.attributes?.SliderImg?.data?.attributes?.url}
                                                alt={property?.attributes?.proName}
                                            />
                                            <div
                                                style={{ backgroundColor: "rgba(4, 115, 169, 0.5)", height: "53px", fontWeight: "600" }}
                                                className='position-absolute rounded-bottom-4 bottom-0 z-3 d-flex align-items-center w-100 justify-content-center text-white'>
                                                {property?.attributes?.proName}
                                            </div>
                                        </Link>
                                    </div>
                                ))
                                    : null
                                }

                            </div>
                        }
                    </div>
                </div>
            </div>

        </>
    )
}

export default Searchresult
