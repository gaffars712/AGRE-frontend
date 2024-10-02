import React from 'react'
import Image from "next/image";
import image1 from "@/assets/images/image18.png";
import Arrow from "@/assets/images/Arrow.svg";
import upcoming from "@/assets/images/upcoming.png";

import upcoming1 from "@/assets/images/upcoming1.png";


function Framecomp({ properties }) {

    // const properties = [
    //     {
    //         id: 'P856',
    //         title: 'Hillside Residences',
    //         desc: `Hillside Residences by Wasl Properties is abrand-
    //                new home address in Wasl Gate, Dubai with 1, 2...`,
    //         image: upcoming,
    //     },
    //     {
    //         id: 'P852',
    //         title: 'Hillside Residences',
    //         desc: `Hillside Residences by Wasl Properties is abrand-
    //                new home address in Wasl Gate, Dubai with 1, 2...`,
    //         image: upcoming1,
    //     },
    // ];
    console.log(properties);
    return (
        <div className='  container'>
            <div className='mt-5 mb-5 hideonLaptop '>
                <p style={{ fontSize: '30px', fontWeight: "600", marginBottom: "30px" }}>{properties?.hero[0]?.title}</p>
                <div className='row '>
                    {properties?.projects.map((item, index) => {
                        if (index === 0) {
                            return (

                                <div key={index} className=' mt-3 col-12 col-md-6 col-lg-4'>
                                    <div className='rounded-3 border p-1'>
                                        <div style={{ height: "230px" }} className='img-box'>
                                            <img width={1000} height={1000} src={item?.img?.data?.attributes?.url} className='w-100 h-100 rounded' alt={item.location} />
                                        </div>
                                        <div style={{ fontSize: '14px' }} className='mt-2'>
                                            <ul style={{ listStyle: 'none', }} className='nav-link'>
                                                <li className='' style={{ padding: "8px 5px" }}> <span style={{ fontSize: "22px", fontWeight: "600", padding: "0px 5px" }} className=''>{item?.title}</span></li>
                                                <li style={{ padding: "0px 12px", fontSize: "16px", textAlign: "justify" }}> {item?.Desc}</li>
                                            </ul>
                                        </div>
                                        {/* <div style={{ borderTop: '1px solid rgba(228, 228, 220, 1)' }} className='text-center p-2 '>{item?.viewBTN} <Image src={Arrow} className='mx-2' /></div> */}
                                    </div>

                                </div>
                            )
                        }
                    })}
                </div>
            </div>
            <div className='my-5 hideOnTablet '>
                <p style={{ fontSize: '30px', fontWeight: "600", marginBottom: "30px" }}>{properties?.hero[0]?.title}</p>
                {
                    properties?.projects.map((item, index) => {
                        if (index === 0) {
                            return (
                                <div key={index} className='py-2'>
                                    <div className='row'>
                                        <div className='col-12 p-3  border rounded' >
                                            <div className=' d-flex gap-3 ' style={{ justifyContent: "space-between", alignItems: "center" }}>
                                                {index % 2 === 0 && (
                                                    <div style={{ height: "240px" }} className='img-box'>
                                                        <img
                                                            style={{ maxWidth: "400px", minWidth: "380px" }}
                                                            width={1000}
                                                            height={1000}
                                                            src={item?.img?.data?.attributes?.url}
                                                            className='w-100 h-100 rounded'
                                                            alt='item.location'
                                                        />
                                                    </div>
                                                )}
                                                <div style={{ fontSize: '14px' }} className='mt-2'>
                                                    <ul style={{ listStyle: 'none', }} className='nav-link'>
                                                        <li style={{ padding: "0px 8px" }} > <span style={{ fontSize: "22px", fontWeight: "600", padding: "0px 5px", }}>{item?.title}</span></li>
                                                        <li style={{ padding: "0px 12px", fontSize: "16px", textAlign: "justify", color: "#514c4c", }} className='mt-3'> {item?.Desc}</li>
                                                    </ul>
                                                </div>
                                                {index % 2 !== 0 && (
                                                    <div style={{ height: "240px" }} className='img-box'>
                                                        <img
                                                            style={{ maxWidth: "400px", minWidth: "380px" }}
                                                            width={1000}
                                                            height={1000}
                                                            src={item?.img?.data?.attributes?.url}
                                                            className='w-100 h-100 rounded'
                                                            alt='item.location'
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })
                }

            </div>

        </div>
    )
}

export default Framecomp;