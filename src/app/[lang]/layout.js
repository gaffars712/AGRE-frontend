import { Inter } from "next/font/google";
import { cookies } from 'next/headers'
import COMMON from "@/components/common";
import { fetchAPI } from "./utils/api-handler";
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Bootstrap JS

// import '../styles/globals.css';
import '@/styles/global.scss'
import Navbar from "@/components/commonSection/navbar";
import Footer from "@/components/commonSection/footer";
import WhatsappButton from "../../components/commonSection/WhatsApp";

const inter = Inter({ subsets: ["latin"] });

async function getGlobal(lang) {
  const path = `/global`;
  const options = {};

  const urlParamsObject = {
    populate: [
      "favicon",
      "seo"
    ],
    locale: lang,
  };
  return await fetchAPI(path, urlParamsObject, options);
}

export async function generateMetadata(lang) {
  const meta = await getGlobal(lang);
  if (!meta.data) return COMMON.FALLBACK_SEO;

  const { seo, favicon } = meta?.data?.attributes;
  // const { url } = favicon?.data?.attributes;
  console.log(seo);

  return {
    title: seo?.metaTitle,
    description: seo?.metaDesc,
    // icons: {
    //   icon: url,
    // },
  };
}
export async function getNavList(lang = "en") {
  const path = `/navbardata`;
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

  console.log("respo", response);
  if (response?.data) {
    return response?.data;
  } else {
    return null;
  }

}
export default async function RootLayout({ children }) {
  const cookieStore = cookies()
  const localeLang = cookieStore.get('locale')?.value || "en";
  let navData = {};
  navData = await getNavList(localeLang)
  const data = await generateMetadata(localeLang)
  console.log(data);
  return (
    <html lang={localeLang} dir={localeLang === `ar` ? 'rtl' : 'ltr'}>
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{data?.title ? data?.title : 'Al Ghandi Properties'}</title>
        {/* <script src="//code.tidio.co/pixcucapejnpwuw7cx6nkujdjctzrmyz.js" async></script> */}
        <script type="text/javascript" id="hs-script-loader" async defer src="//js-eu1.hs-scripts.com/144927450.js"></script>
      </head>
      <body className={inter.className}>
        <div className="whatsapp-button-container">
          <WhatsappButton />
        </div>
        <Navbar localeLang={localeLang} navData={navData} />

        {children}
        <Footer localeLang={localeLang} />

      </body>
    </html>
  );
}
