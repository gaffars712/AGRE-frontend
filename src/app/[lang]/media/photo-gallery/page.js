"use client"

import React, { useState, useEffect } from 'react';
import Residential from "./component/residential";
import Commercial from "./component/commercial";
import { fetchAPI } from '../../utils/api-handler';
import Loader from '@/components/commonSection/loader';

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
    console.log('respo', response?.data[0]?.attributes);
    return response.data[0].attributes;
  } else {
    return null;
  }
};

const PhotoGallery = ({ params }) => {
  const [loading, setLoading] = useState(true);
  const [photoData, setPhotoData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let data = await getPhotoGallery(params?.lang);
      setPhotoData(data);
      setLoading(false);
    };

    const timer = setTimeout(fetchData, 1800);

    return () => clearTimeout(timer);
  }, [params?.lang]);

  if (loading) {
    return (
      <div className="loader" style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Loader params={params?.lang} />
      </div>
    );
  }

  return (
    <div>
      <div className='section-padding'>
        <div className=''>
          {/* Uncomment and use these lines if needed */}
          {/* <div className='mb-3 fs-2 fw-medium' style={{ fontSize: '29px' }}>{photoData.hero[0].title}</div>
          <div className='mt-4 fs-4'>{photoData.hero[0].Desc}</div> */}
        </div>
      </div>
      <Residential params={params} residetialData={photoData?.residetialP} />
      <Commercial params={params} commercialData={photoData?.commercialP} />
    </div>
  );
};

export default PhotoGallery;
