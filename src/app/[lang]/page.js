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
    console.log('respo', response?.data[0]?.attributes)
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
  console.log("response", response.data);
  if (response?.data?.[0]?.attributes) {
    console.log('respo', response?.data)
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
const getfilterLabels = async (lang = "en") => {
  const path = `/filters`;
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
    return response?.data?.[0]?.attributes;
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

export default async function Home({ params }) {
  console.log(params?.lang)
  let homeData = {};
  homeData = await getAllHomeSection(params?.lang);
  let homecontentSection = await homeData?.contentSection

  let data = {};
  data = await getAllupcomingeSection(params?.lang);
  // console.log('Fetched data:', data.projects);

  let residentialData = {};
  residentialData = await getAllResidential(params?.lang);

  let commercialData = {};
  commercialData = await getAllCommercial(params?.lang);
  let filters = {};
  filters = await getfilterLabels(params?.lang)

  return (
    <main className="">
      <MainScreen params={params} filters={filters} heroDetails={homecontentSection?.filter(item => item?.__component === 'home-sections.hero-section')} />
      <UpcommingProject params={params} sliderImgData={data?.projects ? data.projects : ''} upCommingDetails={homecontentSection?.filter(item => item?.__component === 'home-sections.upcoming-section')} />
      <OurResidential params={params} residentialData={residentialData} residentialDetails={homecontentSection?.filter(item => item?.__component === 'home-sections.residential-section')} />
      <OurCommercial params={params} commercialData={commercialData} commercialDetails={homecontentSection?.filter(item => item?.__component === 'home-sections.commercial-section')} />
    </main>
  );
}
