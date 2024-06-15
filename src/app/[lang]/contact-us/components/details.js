import React from 'react'
import mapcontact from "@/assets/images/map.svg"
import Image from "next/image"
import location from "@/assets/images/location.svg"
import clock from "@/assets/images/clock.png"
import call from "@/assets/images/call.png"
import email from "@/assets/images/email.png"
import Map from '../../../../components/commonSection/map'

function Details({addLabels, addInfo}) {

    return (
        <>
            <div className='section-padding'>
                <div >
                    <div className=' border rounded-3 py-3'>
                        <div className='row px-3 pt-2'>
                            <div className='d-flex gap-3 col-md-6  col-lg-3 '>
                                <div>
                                    <Image src={location} alt="img" width={30} height={30} className='mt-3' />
                                </div>
                                <div className=''>
                                    <span style={{ fontSize: '14px' }}>{addLabels[0]?.officeLabel}</span>
                                    <p style={{ fontSize: '12px' }}>{addInfo[0]?.officeAddress}</p>
                                </div>
                            </div>
                            <div className='d-flex gap-3 col-md-6 col-lg-3'>
                                <div>
                                    <Image src={clock} alt="img"  width={30} height={30} className='mt-3' />
                                </div>
                                <div className=''>
                                    <span style={{ fontSize: '14px' }}>{addLabels[0]?.HoursLabel}</span>
                                    <p style={{ fontSize: '12px' }}>{addInfo[0]?.hoursOpen}</p>
                                </div>
                            </div>
                            <div className='d-flex gap-3 col-md-6 col-lg-3'>
                                <div>
                                    <Image src={call} alt="img"  width={30} height={30} className='mt-3' />
                                </div>
                                <div className=''>
                                    <span style={{ fontSize: '14px' }}>{addLabels[0]?.contectLabel}</span>
                                    <p style={{ fontSize: '12px' }}>+{addInfo[0]?.contectNumber}</p>
                                </div>
                            </div>
                            <div className='d-flex gap-3 col-md-6 col-lg-3'>
                                <div>
                                    <Image src={email} alt="img" width={30} height={30} className='mt-3'/>
                                </div>
                                <div className='ml-1'>
                                    <span style={{ fontSize: '14px' }}>{addLabels[0]?.emailLabel}</span>
                                    <p style={{ fontSize: '12px' }}>{addInfo[0]?.email}</p>
                                </div>
                            </div>
                        </div>

                        <div className='  text-center '>
                            <button style={{ backgroundColor: "#003366", width: '125px', height: '42px', borderRadius: '8px', fontSize: '13px' }} className=' text-white'>{addLabels[0]?.addBTN}</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className=' section-padding col-lg-12'>
            <Map mapUrl={addInfo[0]?.addURL}/>
            </div>
        </>
    )
}

export default Details

