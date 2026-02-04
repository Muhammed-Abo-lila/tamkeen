import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import useLang from "../../Utils/useLang";
import { companies } from "../../services/COMPANIES.JS";
const MetaComp = () => {
  const{company}=useParams(); 
  const metaTags=companies[company]?.metaTags
  return (
    <Helmet>
      <title>{useLang(metaTags?.titleEn,metaTags?.titleAr)}</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
       <link rel="icon" href={metaTags?.favIco} />
      <meta name="robots" content="index, follow" />
      {/* Facebook – WhatsApp – LinkedIn */}
      <meta property="og:title" content="Facebook – WhatsApp – LinkedIn" />
      <meta property="og:description" content="Charts, earnings, and key financial data" />
      <meta property="og:image" content={metaTags?.favIco}/>
      <meta property="og:url" content={`https://test-ir.argaam-ir.com/${companies[company]?.name}?lang=${useLang("en","ar")}`} />
      <meta property="og:type" content="website" />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Twitter" />
      <meta name="twitter:description" content="Latest market data and charts" />
      <meta name="twitter:image" content={metaTags?.favIco} />
    </Helmet>
  );
};

export default MetaComp;
