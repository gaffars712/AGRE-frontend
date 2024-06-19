import React from "react";
import FAQ from "./component/faq";
import { fetchAPI } from "../utils/api-handler";

  const getAllfaqSection = async (lang) => {
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
    return response.data[0]?.attributes;
  } else {
    return null;
  }
  }
   

   async function page({params}) {
    console.log(params);

    let faqdata = {};
    faqdata = await getAllfaqSection(params?.lang);
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