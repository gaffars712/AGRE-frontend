
import { fetchAPI } from "@/app/[lang]/utils/api-handler";
import Aboutwasl from "../component/aboutWasl";
import Footer from "../../../../components/commonSection/footer"
import Navbar from "../../../../components/commonSection/navbar";

const getAllHomeSection = async (lang) => {
  console.log(lang);
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
  console.log(response)
  if (response?.data) {
    console.log('respo',response?.data[0])
    return response.data;
  } else {
    return null;
  }
};

export default async function AboutUs({ params }) {

 
  let data = {};
  data = await getAllHomeSection(params?.lang);
  let homecontentSection = await data
  console.log(homecontentSection)


  return (
    <main>
      <section className="aboutwasl-section">
         <Aboutwasl params={params} aboutDetails = {homecontentSection}/>
      </section>
    </main>
  );  
}
