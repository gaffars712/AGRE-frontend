import WhistleBlowing from "./component/whistleBlowing"
import Image from "next/image"
import Copy from "@/assets/location/copy.svg";
import Markdown from "react-markdown";
import { fetchAPI } from "../utils/api-handler";


const getAllWhistleBlowingsSection = async (lang ) => {
  const path = `/whistleblowings`;
  const urlParamsObject = {
    populate: 'deep',
    locale: lang,
    pagination: {
      start: 0,
      limit: 10,
    },
  };
  const options = {};

  const response = await fetchAPI(path, urlParamsObject, options);
  console.log("response", response);
  if (response?.data) {
    console.log('respo', response?.data)
    return response.data[0]?.attributes;
  } else {
    return null;
  }
}
async function Page({params}) {

  let data = {};
  data = await getAllWhistleBlowingsSection(params?.lang);
  console.log('Fetched data:', data);
  let whistleBlowingData = await data
  console.log(whistleBlowingData?.content)

  return (
    // <div>
    //   <div className='contact-banner position-relative  '>
    //   <Image src={whistleblowing} alt="wasl-banner" width={100} height={200}  className='w-100 z-1 policyImgHieght  object-fit-cover' />
    //     <div className=' text-white blue-linear-gradient position-absolute z-2 d-flex align-items-center fs-3 fs-md-1 ' style={{ width: '60%', height: '100%', paddingLeft:'8%',top:"0px",fontWeight:"500" }}>
    //     Whistleblowing
    //       {/* <nav className="d-flex flex-wrap" style={{ '--bs-breadcrumb-divider': "'>'" }} aria-label="breadcrumb">
    //         <ol className="breadcrumb">
    //           <li style={{color:'#000000',fontWeight:'400px',fontSize:'20px'}} className="breadcrumb-item">Home</li>
    //           <li style={{color:'#000000',fontWeight:'400px',fontSize:'20px'}} className="breadcrumb-item active" aria-current="page">Rental terms & conditions</li>
    //         </ol>
    //       </nav> */}
    //     </div>
    //     <div className="navbar-padding" style={{marginTop:'40px'}}>
    //     </div>
    //   </div>
    //   <WhistleBlowing />
    // </div>
    <div>
      <div className='contact-banner position-relative  '>
        <Image src={Copy} alt="anner" width={100} height={200} className='w-100 z-1 policyImgHieght  object-fit-cover' />
        <div className={` text-white ${params?.lang === 'en' ? 'blue-linear-gradient' : 'blue-linear-gradient-ar'} blue-linear-gradient position-absolute z-2 d-flex align-items-center fs-3 fs-md-1 `} style={{ width: '60%', height: '100%', paddingLeft:params?.lang ==='en' ? '8%' : '',  paddingRight: params?.lang ==='ar' ? '8%' : '' , top: "0px", fontWeight: "500" }}>
          {whistleBlowingData?.title}
          {/* <nav className="d-flex flex-wrap" style={{ '--bs-breadcrumb-divider': "'>'" }} aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li style={{color:'#000000',fontWeight:'400px',fontSize:'20px'}} className="breadcrumb-item">Home</li>
            <li style={{color:'#000000',fontWeight:'400px',fontSize:'20px'}} className="breadcrumb-item active" aria-current="page">Rental terms & conditions</li>
          </ol>
        </nav> */}
        </div>
      </div>
      <div className="section-padding" style={{ textAlign: "justify", fontSize: '16px' }}>
        <Markdown >{whistleBlowingData?.content}</Markdown>
      </div>
      {/* <WhistleBlowing /> */}
    </div>
  )
}

export default Page