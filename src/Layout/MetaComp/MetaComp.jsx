import { Helmet } from "react-helmet";
const MetaComp = ({title}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />
      {/* Facebook – WhatsApp – LinkedIn */}
      <meta property="og:title" content="Facebook – WhatsApp – LinkedIn" />
      <meta property="og:description" content="Charts, earnings, and key financial data" />
      <meta property="og:image" content="https://image.email.argaam.com/lib/fe3811737364047f751675/m/1/947e8bde-f4cb-4aaa-bc60-1e991b10ac25.png" />
      <meta property="og:url" content="http://localhost:5173/tamkeen?lang=ar" />
      <meta property="og:type" content="website" />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Twitter" />
      <meta name="twitter:description" content="Latest market data and charts" />
      <meta name="twitter:image" content="https://image.email.argaam.com/lib/fe3811737364047f751675/m/1/b9dfc221-a49f-46d6-81ea-3fb52b4aebd4.png" />
    </Helmet>
  );
};

export default MetaComp;
