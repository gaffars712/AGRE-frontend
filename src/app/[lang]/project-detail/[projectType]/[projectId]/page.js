import React from 'react'
import ProjectImage from '@/assets/images/project-image1.png'
import Image from 'next/image';
import DetailsAboutProject from '../../component/detailsAboutProject';
import { fetchAPI } from '../../../utils/api-handler';


const getAllResidential = async ({ projectType,  }, lang)  => {
  console.log(lang)
  const path = `/${projectType}-projects`;
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
    return response.data;
  } else {
    return null;
  }
};

async function ProjectDetails({ params }) {
  console.log(params);
  let residentialData = {};
  residentialData = await getAllResidential({ projectType: params?.projectType} , params?.lang);
  console.log(residentialData);
  let projectDetails = residentialData.find(item => item.attributes.slug === params.projectId);
  return (
    <div className=''>
      <div className='position-relative d-flex align-items-center'>
        <Image src={projectDetails?.attributes?.bannerImg?.data?.attributes?.url ? projectDetails?.attributes?.bannerImg?.data?.attributes?.url : '/'} width={1366} height={254} alt='image 1 ' className='w-100 z-1 banner-image-project-desc object-fit-cover' />
        <div className={`${params?.lang === 'en' ? 'blue-linear-gradient' : 'blue-linear-gradient-ar'} text-white  position-absolute z-2 d-flex align-items-center fs-3 fs-md-1 `} style={{ width: '60%', height: '100%', paddingLeft: '8%', paddingRight: params?.lang === 'ar' ? '8%' : '' }} >
          {projectDetails && projectDetails?.attributes?.proName}
        </div>
      </div>
      <div className='section-padding'>
        <DetailsAboutProject params={params} projectDetails={projectDetails} projectId={params?.projectId} />

      </div>
    </div>
  )
}

export default ProjectDetails;
