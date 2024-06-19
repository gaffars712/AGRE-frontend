'use client';

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

const Residential = ({ params, searchParams }) => {
    const pathname = usePathname()

    const { searchText, type, bedroom } = searchParams;

    const [residentialProperties, setResidentialProperties] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [search, setSearch] = useState(searchText);
    const [selectedOption, setSelectedOption] = useState(type);
    const [selectedBedroom, setSelectedBedroom] = useState(bedroom);
    const [typeLabels, setTypeLabels] = useState({})
    const [properties, setproperties] = useState(null)

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
        setproperties(response?.data[0]?.attributes)
        if (response?.data) {
            return response?.data;
        } else {
            return null;
        }

    }
    const getfilterLabels = async (lang = "en") => {
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
    };
    const getData = async (lang) => {
        const path = `/residential-projects`;
        let badroomNumber = selectedBedroom ? selectedBedroom[0] : bedroom;
        console.log(badroomNumber);

        const urlParamsObject = {
            populate: '*',
            locale: lang,
            pagination: {
                page: currentPage,
                pageSize: 9,
            },
            filters: {
                proName: { $contains: search },
                proPlans: { title: { $contains: badroomNumber } },
                proType: { $contains: selectedOption }
            }
        }

        try {
            const response = await fetchAPI(path, urlParamsObject);

            if (response?.data?.length) {
                setResidentialProperties(response?.data)
                setTotalResults(response?.meta?.pagination?.total)
                setTotalPages(response?.meta?.pagination?.pageCount);
            } else {
                setResidentialProperties([]);
            }

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getNavList(params?.lang)
        getfilterLabels(params?.lang)
        getData(params?.lang);
    }, [search, currentPage, searchParams]);

    const handleSearch = () => {
        setCurrentPage(1);
        getData(params?.lang);
    }


    return (
        <div className='section-padding'>
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
            <h3>{properties?.titleTwoTitle && pathname.includes('/residential') ? properties?.titleTwoTitle : properties?.titleOneTitle}</h3>
            <div className='mb-4 ' style={{ fontSize: '13px', marginLeft: '2px' }}>{residentialProperties?.length > 0 ? `${"1 - " + residentialProperties?.length + ` ${params?.lang === 'ar' ? 'ل' : 'of'} ` + " " + totalResults + " " + properties?.shortDes}` : params?.lang === 'en' ? 'No Records Found' : 'لا توجد سجلات'}</div>

            {/*TODO - Don't Remove*/}

            {/* <div className=' border rounded-3 py-3 px-4 mb-3'>
                <div style={{ fontSize: '16px', fontWeight: '400' }} className=''>Select type</div>
                <div style={{ fontSize: '12px' }} className='selectype d-flex  gap-5  align-items-center'>
                    <div>Apartment(190)</div>
                    <div>labor accomodation(55)</div>
                    <div>Villa(13)</div>
                    <div>Staff accomodation(7)</div>
                </div>
            </div> */}
            <div className='row'>
                {
                    residentialProperties?.length ?

                        residentialProperties.map((property) => (
                            <Link href={`/project-detail/residential/${property?.attributes?.slug}`} key={property.id} className='col-12 col-md-6 col-lg-4 mb-3 text-decoration-none text-black'>
                                <div className='rounded-3 border p-3' style={{ maxWidth: '356px' }}>
                                    <div className='img-box  mb-2'>
                                        <Image width={326} height={170} src={property?.attributes?.bannerImg?.data?.attributes?.formats?.large?.url} className='object-fit-cover w-100 rounded' alt={property?.attributes?.proName} />
                                    </div>
                                    <div className=''> {property?.attributes?.proName}</div>
                                    <div style={{ fontSize: '14px' }} className=''>
                                        <ul style={{ listStyle: 'none', lineHeight: '30px' }} className='nav-link'>
                                            <li className=''><Image src={flag} alt="Flag" /> <span className='mx-2 ' style={{ fontSize: '12px', color: 'rgba(43, 42, 40, 0.7)' }}>{property?.attributes?.ProAddress}</span></li>
                                            <li><Image src={building} alt="Building" /> <span className='mx-2'>{params?.lang === 'en' ? 'Unit No' : 'رقم الوحدة'} :  {property?.attributes?.proUnit}</span></li>
                                            <li><Image src={money} alt="Money" /> <span className='mx-2'>{params?.lang === 'en' ? 'Price' : 'سعر'} : {property?.attributes?.proPrice} ({params?.lang === 'en' ? 'AED' : 'درهم'})</span></li>
                                            <li><Image src={size} alt="Size" /> <span className='mx-2'>{params?.lang === 'en' ? 'Size' : 'مقاس'} : {property?.attributes?.proSize} ({params?.lang === 'en' ? 'Sq.ft.' : "قدم مربع."})</span></li>
                                            <li><Image src={bedroomImage} alt="Bedroom" /><span className='mx-2'> {params?.lang === 'en' ? 'Type :' : 'يكتب :'} {property?.attributes?.proType}</span></li>
                                        </ul>
                                    </div>
                                    <p></p>
                                </div>
                            </Link>
                        ))
                        :
                        <div>
                            <Image src={NO_RECORD_FOUND} className=' w-100 object-fit-cover' style={{ height: '100vh' }} alt={'no record found'} />
                        </div>
                }
            </div>
            <div className="d-flex justify-content-center mt-4">
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
            </div>
        </div>
    );
};

export default Residential;
