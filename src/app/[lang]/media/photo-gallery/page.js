import React from 'react'
import Residential from "./component/residential"
import Commercial from "./component/commercial"
import { fetchAPI } from '../../utils/api-handler';

const getPhotoGallery = async (lang = "en") => {
  const path = `/photo-galleries`;
  const urlParamsObject = {
    sort: { createdAt: "desc" },
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
    console.log('respo', response?.data[0]?.attributes)
    return response.data[0].attributes;
  } else {
    return null;
  }
};
async function PhotoGallery() {

  let PhotoData = await getPhotoGallery();
  console.log(PhotoData);
  console.log(PhotoData.residetialP);

  return (
    <div>
      <div className='section-padding'>
        <div className=' ' >
          <div className='mb-3 fs-2 fw-medium' style={{ fontSize: '29px' }}>{PhotoData.hero[0].title}</div>
          <div className='mt-4 fs-4'>{PhotoData.hero[0].Desc}</div>
        </div>
      </div>
      <Residential residetialData={PhotoData?.residetialP} />
      <Commercial commercialData={PhotoData?.commercialP} />
    </div>
  )
}

export default PhotoGallery;