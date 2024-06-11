import React from "react";
import FAQ from "./component/faq";
import { fetchAPI } from "../utils/api-handler";

  const getAllfaqSection = async (lang = "en") => {
    const path = `/faqs`;
    const urlParamsObject = {
      populate: '*',
      locale: lang,
      pagination: {
        start: 0,
        limit: 10,
      },
    };
    const options = {};
  
    const response = await fetchAPI(path, urlParamsObject, options);
     console.log("response",response);
  if (response?.data) {
    console.log('respo', response?.data)
    return response.data[0]?.attributes?.faqs;
  } else {
    return null;
  }
  }
   

   async function page() {

    let faqdata = {};
    faqdata = await getAllfaqSection();
    console.log('Fetched data:', faqdata);
    let faqcontentSection = await faqdata
    console.log(faqcontentSection)
   
    
    return (
      <div>
        <FAQ faqcontentSection={faqcontentSection}/>
      </div>
    );
  };
  
  export default page;