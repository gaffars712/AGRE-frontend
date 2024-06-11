// import React, { useState, useEffect } from 'react';
import Image from "next/image";
import blog1 from "@/assets/images/blog1.png";
// import blog2 from "@/assets/images/blog2.png"
import blog3 from "@/assets/images/blog3.png";
import blog4 from "@/assets/images/blog4.png";
import blog5 from "@/assets/images/blog2.png";
import blog6 from "@/assets/images/blog3.png";
import blog7 from "@/assets/images/blog4.png";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { fetchAPI } from "../../../utils/api-handler";
import PaginationComp from "@/components/commonSection/Pagination";

const getAllblogSection = async (lang = "en", start = 0, limit = 10) => {
  const path = `/blogs`;
  const urlParamsObject = {
    sort: { createdAt: "desc" },
    populate: "deep",
    locale: lang,
    pagination: {
      start: start,
      limit: limit,
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

const getpostArray = async (lang = "en", start = 0, limit = 2) => {
  const path = `/blog-sections`;
  const urlParamsObject = {
    sort: { createdAt: "desc" },
    populate: "deep",
    locale: lang,
    pagination: {
      start: start,
      limit: limit,
    },
  };
  const options = {};

  const response = await fetchAPI(path, urlParamsObject, options);

  if (response?.data) {
    console.log('respo', response?.data);
    return response;
  } else {
    return null;
  }
};

const getnewPost = async (lang = "en", start = 0, limit = 6) => {
  const path = `/blog-sections`;
  const urlParamsObject = {
    sort: { createdAt: "desc" },
    populate: "deep",
    locale: lang,
    pagination: {
      start: start,
      limit: limit,
    },
  };
  const options = {};

  const response = await fetchAPI(path, urlParamsObject, options);

  if (response?.data) {
    console.log('respo', response?.data);
    return response.data;
  } else {
    return null;
  }
};

const truncateText = (text, length) => {
  if (text?.length > length) {
    return text.substring(0, length) + '...';
  }
  return text;
};

const WaslBlog = async ({ params, searchParams }) => {
  // const [homeData, setHomeData] = useState({});
  // const [posts, setPosts] = useState([]);
  // const [newPosts, setNewPosts] = useState([]);
  // const [page, setPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  // const postsPerPage = 6;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const homeData = await getAllblogSection();
  //     setHomeData(homeData);

  //     const postsResponse = await getpostArray("en", (page - 1) * postsPerPage, postsPerPage);
  //     setPosts(postsResponse.data);

  //     const totalPosts = postsResponse.meta.pagination.total;
  //     setTotalPages(Math.ceil(totalPosts / postsPerPage));

  //     const newPosts = await getnewPost();
  //     setNewPosts(newPosts);
  //   };

  //   fetchData();
  // }, [page]);

  let postsResponse;
  let totalPages;
  let postsPerPage = 6;
  let pages =  Number(searchParams?.page) 


  
  const newPosts = await getnewPost();
  const homeData = await getAllblogSection();
  if (searchParams?.page) {
    postsResponse = await getpostArray("en", (pages - 1) * postsPerPage, postsPerPage);
    if (postsResponse.meta.pagination.total) {
      const totalPosts = postsResponse.meta.pagination.total;
      totalPages = Math.ceil(totalPosts / postsPerPage)
    }
  }


  return (
    <div className="section-padding">
      <div>
        <div>
          <h1>{homeData.title}</h1>
          <p style={{ fontSize: '16px' }}>{homeData?.Desc}</p>
        </div>
      </div>
      <div className="">
        <div className="row">
          <div className="col-lg-8 col-md-12">
            <div className="row">
              {postsResponse?.data.map(post => (
                <div className="col-md-6 col-sm-12 mb-5" key={post?.attributes?.id}>
                  <div className="rounded">
                    <div className="img-box">
                      <Image src={post?.attributes?.img?.data?.attributes?.formats?.thumbnail?.url} width={1000} height={1000} className="img-fluid rounded" alt={post?.attributes?.title} />
                    </div>
                    <p style={{ minHeight: '52px' }}>{post?.attributes.title}</p>
                    <p style={{ fontSize: '14px' }}>{truncateText(post?.attributes?.Desc, 80)}</p>
                    <button className="btn btn-outline-primary w-100 p-2 rounded">Read More</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-4 col-md-12 mt-4 mt-lg-0">
            <div style={{ backgroundColor: "rgba(0, 51, 102, 0.15)" }} className="p-2 cardcolor border rounded">
              <div className="d-flex justify-content-around">
                <h6>Recent Post</h6>
                <h6>career</h6>
              </div>
              {newPosts.map(post => (
                <div className="d-flex mt-4 p-2 gap-2 rounded border bg-white mb-3" key={post?.attributes?.id}>
                  <div className="img-left mt-2 ml-3 p-1">
                    <Image src={post?.attributes?.img?.data?.attributes?.formats?.thumbnail?.url} width={1000} height={1000} className="" style={{ width: '106.96px', height: '81px' }} alt={post?.attributes?.title} />
                  </div>
                  <div className="ml-4">
                    <span className="d-block" style={{ fontSize: '16px' }}>{post?.attributes?.title}</span>
                    <p style={{ fontSize: '14px' }}>{post?.attributes?.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <PaginationComp totalPages={totalPages} page={pages} searchParams={searchParams} />
        {/* <Pagination count={totalPages} page={page} onChange={handlePageChange} variant="outlined" shape="rounded" /> */}
      </div>
    </div>
  );
}

export default WaslBlog;
