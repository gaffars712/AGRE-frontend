import React from 'react'
import Image from "next/image"
import ContactForm from "./components/contactForm"
import banner from "@/assets/images/contact-banner.png"
import Footer from "@/components/commonSection/footer"
import Details from './components/details'
import { fetchAPI } from "@/app/[lang]/utils/api-handler";

const getContactusDetails = async (lang = "en") => {
  const path = `/contect-uses`;
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
    return response.data[0].attributes;
  } else {
    return null;
  }
};


async function page() {

    let data = {};
  data = await getContactusDetails();

    return (
        <div>
            <section className='map mb-5'>
                <div className='contact-banner  position-relative  '>
                    <Image src={data?.banner?.length ? data?.banner[0]?.img?.data?.attributes?.url : banner} width={1000} height={200}  className='w-100 z-1 policyImgHieght  object-fit-cover' />
                    <div className='text-white blue-linear-gradient position-absolute z-2 d-flex align-items-center fs-3 fs-md-1 ' style={{ width: '60%', height: '100%', paddingLeft:'8%',top:"0px",fontWeight:"500" }}>
                        {data?.banner[0]?.title}
                                           </div>
                </div>
                <div>
                    <Details addInfo={data?.addInfo} />
                </div>

            </section>

            <section className='section-padding  navbar-padding mb-5'>
                <ContactForm />
            </section>
            <section className='footer-secion'>
                {/* <Footer /> */}
            </section>
        </div>
    )
}

export default page
