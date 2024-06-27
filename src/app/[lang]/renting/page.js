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
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { fetchAPI } from '../utils/api-handler';

const Page = ({ params, searchParams }) => {
    const { searchText, type, bedroom } = searchParams;
    const pathname = usePathname();
    const [commercialProperties, setCommercialProperties] = useState([]);
    const [residentialProperties, setResidentialProperties] = useState([]);
    const [mergedData, setMergedData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [search, setSearch] = useState(searchText);
    const [selectedOption, setSelectedOption] = useState(type);
    const [selectedBedroom, setSelectedBedroom] = useState(bedroom);
    const [typeLabels, setTypeLabels] = useState({});
    const [properties, setProperties] = useState(null);
    const [isLoading, setisLoading] = useState(false);

    const getNavList = async (lang = "en") => {
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
        setProperties(response?.data[0]?.attributes);
        return response?.data ?? null;
    };

    const getFilterLabels = async (lang = "en") => {
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
            setTypeLabels(response?.data?.[0]?.attributes);
            return response?.data?.[0]?.attributes;
        } else {
            return null;
        }
    };

    const getDataResidential = async (lang) => {
        setisLoading(true)
        // setResidentialProperties([]);
        const path = `/residential-projects`;
        const badroomNumber = selectedBedroom ? selectedBedroom[0] : bedroom;

        const urlParamsObject = {
            populate: '*',
            locale: lang,
            pagination: {
                page: currentPage,
                pageSize: 12,
            },
            filters: {
                proName: { $contains: search },
                proPlans: { title: { $contains: badroomNumber } },
                proType: { $contains: selectedOption },
            },
        };

        try {
            const response = await fetchAPI(path, urlParamsObject);
            if (response?.data?.length) {
                setResidentialProperties(response?.data);
                setTotalResults(response?.meta?.pagination?.total);
                setTotalPages(response?.meta?.pagination?.pageCount);
                setisLoading(false)
            } else {
                setResidentialProperties([]);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setisLoading(false)
        }
    };

    const getData = async (lang) => {
        setisLoading(true)
        setCommercialProperties([]);
        const path = `/commercial-projects`;

        const urlParamsObject = {
            populate: '*',
            locale: lang,
            pagination: {
                page: currentPage,
                pageSize: 12,
            },
            filters: {
                proName: { $contains: search },
                proType: { $contains: selectedOption },
            },
        };

        try {
            const response = await fetchAPI(path, urlParamsObject);
            if (response?.data?.length) {
                for (let i = 0; i < response.data.length; i++) {
                    response.data[i].isCommercial = true;
                }

                setCommercialProperties(response.data);
                setTotalResults(response?.meta?.pagination?.total);
                setTotalPages(response?.meta?.pagination?.pageCount);
                setisLoading(false)
            } else {
                setCommercialProperties([]);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setisLoading(false)
        }
    };

    const getFuction = async () => {
        await getData(params?.lang);
        await getDataResidential(params?.lang);
    };

    useEffect(() => {
        getFuction();
    }, [search, currentPage, searchParams]);

    useEffect(() => {
        if (commercialProperties.length || residentialProperties.length) {
            const merged = [...commercialProperties, ...residentialProperties];
            setMergedData(merged);
        }
    }, [residentialProperties]);

    return (
        <div className='section-padding'>
            <h3>{params?.lang === 'en' ? 'Renting Properties in UAE ' : 'تأجير العقارات في الإمارات العربية المتحدة'}</h3>
            <div className='mb-4' style={{ fontSize: '13px', marginLeft: '2px' }}>
                {mergedData?.length > 0
                    ? `1 - ${mergedData.length} ${params?.lang === 'ar' ? 'ل' : 'of'} ${mergedData.length} `
                    : params?.lang === 'en' ? 'No Records Found' : 'لا توجد سجلات'}
            </div>
            <div className='row'>
                {mergedData?.length ? mergedData.map((property) => (
                    <div key={property.id} className='col-12 rounded-4 col-md-6 col-lg-4 col-xl-3 col-2xl-2 mb-3 text-decoration-none h-100 text-black'>
                        <Link href={`/${params?.lang}/project-detail/${property?.isCommercial === true ? 'commercial' : 'residential'}/${property?.attributes?.slug}`} className='position-relative w-100 d-flex h-100 text-decoration-none text-black'>
                            <Image
                                width={250}
                                height={100}
                                className='object-fit-cover rounded-4 w-100  h-100'
                                src={property?.attributes?.SliderImg?.data?.attributes?.url}
                                alt={property?.attributes?.proName}
                            />
                            <div
                                style={{ backgroundColor: "rgba(4, 115, 169, 0.5)", height: "53px", fontWeight: "500" }}
                                className='position-absolute rounded-bottom-4 bottom-0 z-3 d-flex align-items-center w-100 justify-content-center text-white'>
                                {property?.attributes?.proName}
                            </div>
                        </Link>
                    </div>
                )) : isLoading === true ? params?.lang === 'en' ? 'loading...' : 'تحميل...'
                    : (
                        <div>
                            <Image src={NO_RECORD_FOUND} className='w-100 object-fit-cover' style={{ height: '100vh' }} alt='no record found' />
                        </div>
                    )
                }
            </div>
            {mergedData?.length > 0 && (
                <div dir='ltr' className="d-flex justify-content-center mt-4">
                    <Stack spacing={2}>
                        <Pagination
                            count={totalPages}
                            variant="outlined"
                            shape="rounded"
                            page={currentPage}
                            onChange={(event, value) => setCurrentPage(value)}
                        />
                    </Stack>
                </div>
            )}
        </div>
    );
};

export default Page;
