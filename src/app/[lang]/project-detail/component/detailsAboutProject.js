'use client'
import React, { useState } from 'react'
import ProjectRoom1 from "@/assets/images/project-room1.jpeg"
import ProjectRoom2 from "@/assets/images/project-room2.jpeg"
import ProjectRoom3 from "@/assets/images/project-room3.jpeg"
import ProjectRoom4 from "@/assets/images/project-room4.jpeg"
import Image from 'next/image'
import COMMON from '@/components/common'
import ProjectFloor from '@/app/[lang]/project-detail/component/Floor'
import Register from './Register'
import Map from  '@/app/[lang]/project-detail/component/Map'
import Markdown from 'react-markdown'

const DetailsAboutProject = ({ projectId, projectDetails }) => {

    console.log(projectDetails?.attributes?.proDesc);
    const [selectedImage, setSelectedImage] = useState(projectDetails?.attributes?.proImgs?.data[0].attributes.url)
   
    return (
        <div className='container'>
            <div className="row">
                <div className='col-sm-5 p-0'>
                    <div style={{ maxWidth: '470px' }}>
                        <div className='lh-sm' style={{ fontSize: '26px' }}>{projectDetails?.attributes?.proTitle}</div>
                        {/* <p className='lh-base  mt-3'>{projectDetails?.attributes?.proDesc}</p> */}
                        <Markdown className='textAlignJustify lh-base  mt-3 'children={projectDetails?.attributes?.proDesc} />
                    </div>
                </div>
                <div className='col-sm-7 d-flex justify-content-end flex-column flex-md-row p-0'>
                    <div className='position-relative'>
                        <Image src={selectedImage} alt='room1' width={414} height={307} className='object-fit-cover z-1  position-absolute project-description-main-image' />

                        <div className='project-description-main-image-bg'></div>
                    </div>
                    <div className=' d-flex flex-row flex-md-column gap-3 sub-images-project-desc' style={{ width: '104.17px' }}>
                        {projectDetails?.attributes?.proImgs?.data?.length &&
                            projectDetails?.attributes?.proImgs?.data?.slice(0,4)?.map((item, index) => {
                                const imageUrl = item?.attributes?.url;
                                return (
                                    <Image src={item?.attributes?.url} onClick={() => setSelectedImage(imageUrl)} key={index} alt={`image ${index}`} width={104.17} height={104.17} className='object-fit-cover rounded-3 sub-image-project-description' style={{ boxShadow: `${imageUrl  == selectedImage ? 'rgba(0, 0, 0, 0.35) 0px 5px 15px' : ''}`, cursor: 'pointer' }} />
                                )
                            })  
                        }
                    </div>
                </div>
                <div className='container ' style={{ marginBottom:'30px'}}>
                    <div className="row">
                        <div className='col-sm-10 d-flex gap-3 justify-content-center justify-content-md-start flex-wrap p-0 mt-3 mt-md-0'>
                            {
                                projectDetails?.attributes?.proFeature?.map((item, index) => {
                                    return (
                                        <div key={index} className=' d-flex align-items-center flex-column facilites-container'>
                                            <div className='d-flex justify-content-center align-items-center facility'>
                                                {COMMON?.FACILITIES[item]}
                                            </div>
                                            <div className=' d-flex text-center facility-text' >{item}</div>


                                        </div>

                                    )
                                })

                            }
                        </div>
                    </div>
                </div>
                {projectDetails?.attributes?.proPlans ? <ProjectFloor floorDetails={projectDetails?.attributes?.proPlans}/> : null}
                <Map mapUrl={projectDetails?.attributes?.locationURL} mapDetails={projectDetails?.attributes}/>
                <Register />

            </div>
        </div>
    )
}

export default DetailsAboutProject;