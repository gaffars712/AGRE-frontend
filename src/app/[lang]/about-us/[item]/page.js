
import { fetchAPI } from "@/app/[lang]/utils/api-handler";
import Aboutwasl from "../component/aboutWasl";
import Footer from "../../../../components/commonSection/footer"
import Navbar from "../../../../components/commonSection/navbar";

const getAllHomeSection = async (lang = "en") => {
  const path = `/about-uses`;
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

export default async function AboutUs({lang= 'en', params: {  } }) {

 
  let data = {};
  data = await getAllHomeSection();
  console.log('Fetched data:', data);
  let homecontentSection = await data?.contentSection
  console.log(homecontentSection)


  return (
    <main>
      <section className="aboutwasl-section">
         <Aboutwasl aboutDetails = {homecontentSection}/>
      </section>
    </main>
  );  
}
