import { fetchAPI } from "./utils/api-handler";
import UpcommingProject from '../../components/home/upcommingproject'
import MainScreen from "@/components/home/mainScreen";
import OurResidential from "@/components/home/ourResidential";
import OurCommercial from "@/components/home/ourCommercial";


const getAllHomeSection = async (lang = "en") => {
  const path = `/homepage`;
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
    console.log('respo',response?.data[0]?.attributes)
    return response.data[0].attributes;
  } else {
    return null;
  }
};

const getAllupcomingeSection = async (lang = "en") => {
  const path = `/upcomings`;
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
console.log("response",response.data);
  if (response?.data?.[0]?.attributes) {
    console.log('respo',response?.data)
    return response.data[0].attributes;
  } else {
    return null;
  }
};

const getAllResidential = async (lang = "en") => {
  const path = `/residential-projects`;
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
const getAllCommercial = async (lang = "en") => {
  const path = `/commercial-projects`;
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

export default async function Home() {
  let homeData = {};
  homeData = await getAllHomeSection();
  let homecontentSection = await homeData?.contentSection

  let data = {};
  data = await getAllupcomingeSection();
  console.log('Fetched data:', data.projects);

  let residentialData = {};
  residentialData = await getAllResidential();

  let commercialData = {};
  commercialData = await getAllCommercial();

  return (
    <main className="">
      <MainScreen heroDetails={homecontentSection?.filter(item => item?.__component === 'home-sections.hero-section')}/>
      <UpcommingProject sliderImgData={data.projects} upCommingDetails={homecontentSection?.filter(item => item?.__component === 'home-sections.upcoming-section')}/>
      <OurResidential residentialData={residentialData} residentialDetails={homecontentSection?.filter(item => item?.__component === 'home-sections.residential-section')}/>
      <OurCommercial commercialData={commercialData} commercialDetails={homecontentSection?.filter(item => item?.__component === 'home-sections.commercial-section')}/>    
    </main>
  );
}