import React from 'react';
import Image from "next/image";
import NO_RECORD_FOUND from "@/assets/images/no-record-found.png"
import Link from 'next/link';
import { fetchAPI } from '../utils/api-handler';

const Page = async ({ params, searchParams }) => {
    const { lang } = params;
    const { searchText, type, bedroom } = searchParams;

    const getDataResidential = async (lang) => {
        const path = `/residential-projects`;
        const badroomNumber = bedroom ? bedroom[0] : bedroom;

        const urlParamsObject = {
            populate: '*',
            locale: lang,
            pagination: {
                page: 1,
                pageSize: 9,
            },
            filters: {
                proName: { $contains: searchText },
                proPlans: { title: { $contains: badroomNumber } },
                proType: { $contains: type },
                communitie: { $contains: true },
            },
        };

        try {
            const response = await fetchAPI(path, urlParamsObject);
            return response?.data || [];
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    const getDataCommercial = async (lang) => {
        const path = `/commercial-projects`;

        const urlParamsObject = {
            populate: '*',
            locale: lang,
            pagination: {
                page: 1,
                pageSize: 9,
            },
            filters: {
                proName: { $contains: searchText },
                proType: { $contains: type },
                communitie: { $contains: true },
            },
        };

        try {
            const response = await fetchAPI(path, urlParamsObject);
            if (response?.data?.length) {
                response.data = response.data.map(item => ({
                    ...item,
                    isComercial: true
                }));
            }
            return response?.data || [];
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    const commercialProperties = await getDataCommercial(lang);
    const residentialProperties = await getDataResidential(lang);
    const mergedData = [...commercialProperties, ...residentialProperties];


    // Filter the properties by specific names
    // const mergedData = mergedData.filter(property => {
    //     const proName = property?.attributes?.proName;
    //     return ["Jumeira Villas", "فلل جميرا", "الدرة", "Al Durah"].includes(proName);
    // });

    const totalResults = mergedData.length;
    const totalPages = Math.ceil(totalResults / 9);

    return (
        <div className='container'>
            <div className='mt-5 mb-5'>
                <h3 style={{ fontSize: "30px ", fontWeight: "600" }}>{lang === 'en' ? 'Our Communities ' : 'مجمعاتنا'}</h3>
                <div className='mb-4' style={{ fontSize: '14px', marginLeft: '2px' }}>
                    {mergedData?.length > 0
                        ? `1 - ${mergedData.length} ${lang === 'ar' ? 'ل' : 'of'} ${mergedData.length} `
                        : lang === 'en' ? 'No Records Found' : 'لا توجد سجلات'}
                </div>
                <div className='row'>
                    {mergedData?.length ? mergedData.map((property) => (
                        <div key={property.id} className='col-6 rounded-4 col-md-6 col-lg-4 col-xl-3 col-2xl-2 mb-3 text-decoration-none h-100 text-black'>
                            <Link href={`/${lang}/project-detail/${property?.isComercial ? 'commercial' : 'residential'}/${property?.attributes?.proShortName}`} className='position-relative d-flex h-100 w-100 text-decoration-none text-black'>
                                <Image height={100}
                                    width={250}
                                    className='object-fit-cover w-100 rounded-4 h-100'
                                    src={property?.attributes?.SliderImg?.data?.attributes?.url}
                                    alt={property?.attributes?.proName}
                                />
                                <div
                                    style={{ backgroundColor: "rgba(4, 115, 169, 0.5)", fontWeight: "600" }}
                                    className='position-absolute projectNameFont rounded-bottom-4 bottom-0 z-3 d-flex align-items-center w-100 justify-content-center text-white'>
                                    {property?.attributes?.proName}
                                </div>
                            </Link>
                        </div>
                    )) : (
                        <div className='w-full ' style={{ display: 'flex', justifyContent: "center" }}>
                            <div >
                                <Image src={NO_RECORD_FOUND} width={700} height={450} className='  object-fit-cover' alt={'no record found'} />
                                <div style={{ fontSize: "30px", fontWeight: "600", textAlign: "center", marginTop: "25px" }}>
                                    {params?.lang === 'en' ? 'No Record Found' : 'لا توجد سجلات'}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Page;
