'use client'
import React, { useEffect, useState } from 'react'

import Image from "next/image";

import NO_RECORD_FOUND from "@/assets/images/no-record-found.png"

import flag from "@/assets/images/flag.svg";
import building from "@/assets/images/building.svg";
import bedroomImage from "@/assets/images/bedroom.svg";
import money from "@/assets/images/money.svg";
import size from "@/assets/images/size.svg";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Filter from '../components/filter';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { fetchAPI } from '../../utils/api-handler';
import Loader from '@/components/commonSection/loader';
import CartLoader from '@/components/commonSection/cartLoader';

const Page = ({ params, searchParams }) => {
    const { searchText, type, bedroom } = searchParams;
    const pathname = usePathname()
    const [commercialProperties, setCommercialProperties] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [search, setSearch] = useState(searchText);
    const [selectedOption, setSelectedOption] = useState(type);
    const [selectedBedroom, setSelectedBedroom] = useState(bedroom);
    const [typeLabels, setTypeLabels] = useState({})
    const [properties, setproperties] = useState(null)
    const [pageLoader, setpageLoader] = useState(true)
    const [cartLoader, setcartLoader] = useState(true)
    const [debouncedSearch, setDebouncedSearch] = useState(search);


    const getNavList = async (lang = "en") => {
        try {
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
                return response?.data;
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
        } finally {
            // setpageLoader(false)
        }


    }
    const getfilterLabels = async (lang = "en") => {
        try {
            const path = `/filters`;
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
                setTypeLabels(response?.data?.[0]?.attributes)
                return response?.data?.[0]?.attributes;
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
        } finally {
            // setpageLoader(false)
        }

    };
    const getData = async (lang) => {
        setcartLoader(true)
        const path = `/commercial-projects`;

        const urlParamsObject = {
            populate: '*',
            locale: lang,
            pagination: {
                page: currentPage,
                pageSize: 9,
            },
            filters: {
                proName: { $contains: search },
                proType: { $contains: selectedOption }
            }
        }

        try {
            const response = await fetchAPI(path, urlParamsObject);
            console.log(response?.data?.length);

            if (response?.data?.length) {
                setCommercialProperties(response?.data)
                setTotalResults(response?.meta?.pagination?.total)
                setTotalPages(response?.meta?.pagination?.pageCount);
            } else {
                setCommercialProperties([]);
            }

        } catch (error) {
            console.log(error);
        } finally {
            setpageLoader(false)
            setcartLoader(false)
        }
    }

    useEffect(() => {

        getData(params?.lang);
        getNavList(params?.lang)
        getfilterLabels(params?.lang)
    }, [debouncedSearch, currentPage, searchParams]);

    const handleSearch = () => {
        setCurrentPage(1);
        getData(params?.lang);
    }

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 1000); // Adjust the delay as needed

        return () => {
            clearTimeout(handler);
        };
    }, [search]);

    return (
        pageLoader === true
            ?
            <Loader params={params?.lang} />
            :
            <div className=' container'>
                <div className='mt-5 mb-5'>
                    <Filter
                        typeLabels={typeLabels}
                        params={params}
                        handleSearch={handleSearch}
                        search={search}
                        setSearch={setSearch}
                        selectedOption={selectedOption}
                        setSelectedOption={setSelectedOption}
                        selectedBedroom={selectedBedroom}
                        setSelectedBedroom={setSelectedBedroom}
                    />

                    <h3 style={{ fontWeight: "600", fontSize: "30px" }}>{properties?.titleTwoTitle && pathname.includes('/residential') ? properties?.titleTwoTitle : properties?.titleOneTitle}</h3>
                    <div className='mb-4 ' style={{ fontSize: '14px', marginLeft: '2px' }}>{commercialProperties?.length > 0 ? `${"1 - " + commercialProperties?.length + ` ${params?.lang === 'ar' ? 'ل' : 'of'} ` + " " + totalResults + " " + properties?.shortDes}` : params?.lang === 'en' ? 'No Records Found' : 'لا توجد سجلات'}</div>


                    {/* <div className='border rounded-3 py-2 px-4 mb-3'>
                <div style={{ fontSize: '16px', fontWeight: '400' }} className=''>Select type</div>
            <div style={{ fontSize: '12px',  }} className='selectype d-flex mt-3 gap-5  align-items-center'>
                    <div className='text-decoration-underline' style={{cursor:'pointer'}}>Office (2)</div>
                    <div className='text-decoration-underline' style={{cursor:'pointer'}}>Retail(1)</div>
                </div>
            </div> */}
                    {cartLoader === true ?
                        <CartLoader params={params?.lang} />
                        : <div className='row'>
                            {commercialProperties?.length ? commercialProperties.map((property, index) => {
                                return (
                                    // <Link href={`/project-detail/commercial/${property?.attributes?.proShortName}`} key={property.id} className='col-12 col-md-6 col-lg-4 mb-3 text-decoration-none text-black'>
                                    //     <div className='rounded-3 border p-3' style={{ maxWidth: '356px' }}>
                                    //         <div className='img-box  mb-2'>
                                    //             <Image width={326} height={170} src={property?.attributes?.bannerImg?.data?.attributes?.formats?.large?.url} className='object-fit-cover w-100 rounded' alt={property?.attributes?.proName} />
                                    //         </div>
                                    //         <div className=''> {property?.attributes?.proName}</div>
                                    //         <div style={{ fontSize: '14px' }} className=''>
                                    //             <ul style={{ listStyle: 'none', lineHeight: '30px' }} className='nav-link'>
                                    //                 <li className=''><Image src={flag} alt="Flag" /> <span className='mx-2 ' style={{ fontSize: '12px', color: 'rgba(43, 42, 40, 0.7)' }}>{property?.attributes?.ProAddress}</span></li>
                                    //                 <li><Image src={building} alt="Building" /> <span className='mx-2'>{ params?.lang === 'en' ? 'Unit No' : 'رقم الوحدة'} : {property?.attributes?.proUnit}</span></li>
                                    //                 <li><Image src={money} alt="Money" /> <span className='mx-2'>{ params?.lang === 'en' ? 'Price' : 'سعر'} : {property?.attributes?.proPrice} ( { params?.lang === 'en' ? 'AED' : 'درهم'})</span></li>
                                    //                 <li><Image src={size} alt="Size" /> <span className='mx-2'>{ params?.lang === 'en' ? 'Size' : 'مقاس'} : {property?.attributes?.proSize} ( {params?.lang === 'en' ? 'Sq.ft.' : "قدم مربع."})</span></li>
                                    //                 <li><Image src={bedroomImage} alt="Bedroom" /><span className='mx-2'>  {params?.lang === 'en' ? 'Type :' : 'يكتب :'} {property?.attributes?.proType}</span></li>
                                    //             </ul>
                                    //         </div>
                                    //         <p></p>
                                    //     </div>
                                    // </Link>
                                    <div key={index} className='col-6 rounded-4 col-md-6  col-lg-4 col-xl-3 col-2xl-2 mb-3 text-decoration-none h-100 text-black'>
                                        <Link href={`/${params?.lang}/project-detail/commercial/${property?.attributes?.proShortName}`} key={property.id} className='position-relative d-flex h-100 text-decoration-none w-100 text-black'>
                                            <Image height={100} width={250} alt='img' className='object-fit-cover w-100 rounded-4 h-100' src={property?.attributes?.SliderImg?.data?.attributes?.url} />
                                            <div
                                                style={{
                                                    backgroundColor: "rgba(4, 115, 169, 0.5)",
                                                    fontWeight: "600"
                                                }}
                                                className='position-absolute projectNameFont rounded-bottom-4 bottom-0 z-3 d-flex align-items-center w-100 justify-content-center text-white'>
                                                {property?.attributes?.proName}
                                            </div>
                                        </Link>
                                    </div>
                                )
                            }) :
                                <div className='w-full ' style={{ display: 'flex', justifyContent: "center" }}>
                                    <div >
                                        <Image src={NO_RECORD_FOUND} width={300} height={250} className='  object-fit-cover' alt={'no record found'} />
                                        <div style={{ fontSize: "30px", fontWeight: "600", textAlign: "center", marginTop: "25px" }}>
                                            {params?.lang === 'en' ? 'No Record Found' : 'لا توجد سجلات'}
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    }
                    {commercialProperties?.length ? <div dir='ltr' className="d-flex justify-content-center mt-4">
                        <Stack spacing={2}>
                            <Pagination
                                count={totalPages}
                                variant="outlined"
                                shape="rounded"
                                page={currentPage}
                                onChange={(event, value) => setCurrentPage(value)}
                            />
                        </Stack>
                    </div> : ''}
                </div>
            </div>

    );
};

export default Page;
