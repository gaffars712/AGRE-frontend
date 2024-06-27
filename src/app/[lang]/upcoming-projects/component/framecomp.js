import React from 'react'
import Image from "next/image";
import image1 from "@/assets/images/image18.png";
import Arrow from "@/assets/images/Arrow.svg";
import upcoming from "@/assets/images/upcoming.png";

import upcoming1 from "@/assets/images/upcoming1.png";


function Framecomp({properties}) {

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
        <div className='section-padding'>
            <p style={{ fontSize: '27px' }}>{properties?.hero[0]?.title}</p>
            <div className='row mt-4'>
                {properties?.projects.map((item, index) => (
                    <div key={index} className='col-12 col-md-6 col-lg-4'>
                        <div className='rounded-3 border p-2'>
                            <div className='img-box'>
                                <Image width={1000} height={1000} src={item?.img?.data?.attributes?.url} className='w-100 h-100 rounded' alt={item.location} />
                            </div>
                            <div style={{ fontSize: '14px' }} className='mt-2'>
                                <ul style={{ listStyle: 'none', }} className='nav-link'>
                                    <li> <span>{item?.title}</span></li>
                                    <li className='mt-2'> <span>{item?.Desc}</span></li>
                                </ul>
                            </div>
                            {/* <div style={{ borderTop: '1px solid rgba(228, 228, 220, 1)' }} className='text-center p-2 '>{item?.viewBTN} <Image src={Arrow} className='mx-2' /></div> */}
                        </div>

                    </div>
                ))}
            </div>
            
        </div>
    )
}

export default Framecomp;