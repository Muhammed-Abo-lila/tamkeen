import { Suspense, lazy, useEffect } from "react";
import {
  createBrowserRouter,
  Navigate,
  redirect,
  RouterProvider,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Loader from "./Layout/Loader/Loader";
import Layout from "./Layout";
import BusinessSegments from "./Pages/BusinessSegments/BusinessSegments";
import BoardTab from "./Pages/BoardManagement/BoardSubSections/BoardTab";
import ExecutivesTab from "./Pages/BoardManagement/BoardSubSections/ExecutivesTab";
import SalariesTab from "./Pages/BoardManagement/BoardSubSections/SalariesTab";
import MemeberDetails from "./Pages/BoardManagement/BoardSubSections/MemberDetails";
import { companies } from "./services/COMPANIES.JS";
// Lazy load page components
const Overview = lazy(() => import("./Pages/Overview/Overview"));
const Profile = lazy(() => import("./Pages/Profile/Profile"));
const Board = lazy(() => import("./Pages/BoardManagement/Board"));
const SharePerformance = lazy(
  () => import("./Pages/SharePerformance/SharePerformance"),
);
const InvestorsPresentation = lazy(
  () => import("./Pages/InvestorsPresentation/InvestorsPresentation"),
);
const FinancialInformation = lazy(
  () => import("./Pages/FinancialInformation/FinancialInformation"),
);
const Disclosurespage = lazy(
  () => import("./Pages/Disclosures/DisclosuresPage"),
);
const CorporateActions = lazy(
  () => import("./Pages/CorporateActions/CorporateActions"),
);
const MajorShareholders = lazy(
  () => import("./Pages/MajorShareholders/MajorShareholders"),
);
const MergersAcquisitions = lazy(
  () => import("./Pages/MergersAcquisitions/MergersAcquisitions"),
);
const ContactIR = lazy(() => import("./Pages/ContactIR/ContactIR"));
const NotFound = lazy(() => import("./Pages/NotFound/NotFound"));
// Share Performance subsections
const SharePerformanceCharts = lazy(
  () =>
    import("./Pages/SharePerformance/sharePerformanceSubsections/SharePerformanceCharts"),
);
const NegotiatedDeals = lazy(
  () =>
    import("./Pages/SharePerformance/sharePerformanceSubsections/NegotiatedDeals"),
);
const PeersPage = lazy(
  () =>
    import("./Pages/SharePerformance/sharePerformanceSubsections/PeersPage"),
);
const InvestmentCalculator = lazy(
  () =>
    import("./Pages/SharePerformance/sharePerformanceSubsections/InvestmentCalculator"),
);
// Peers nested sections
const General = lazy(
  () =>
    import("./Pages/SharePerformance/sharePerformanceSubsections/PeersNestedSections/General"),
);
const Ranking = lazy(
  () =>
    import("./Pages/SharePerformance/sharePerformanceSubsections/PeersNestedSections/Ranking"),
);
const Growth = lazy(
  () =>
    import("./Pages/SharePerformance/sharePerformanceSubsections/PeersNestedSections/Growth"),
);
const MarketPerformance = lazy(
  () =>
    import("./Pages/SharePerformance/sharePerformanceSubsections/PeersNestedSections/MarketPerformance"),
);
const PerShareData = lazy(
  () =>
    import("./Pages/SharePerformance/sharePerformanceSubsections/PeersNestedSections/PerShareData"),
);
const SalariesBounses = lazy(
  () =>
    import("./Pages/SharePerformance/sharePerformanceSubsections/PeersNestedSections/SalariesBounses"),
);
// Financial Information subsections
const FinancialStatement = lazy(
  () =>
    import("./Pages/FinancialInformation/financialInfoSubsections/FinancialStatement"),
);
const FinancialRatios = lazy(
  () =>
    import("./Pages/FinancialInformation/financialInfoSubsections/FinancialRatios"),
);
const FinancialReports = lazy(
  () =>
    import("./Pages/FinancialInformation/financialInfoSubsections/FinancialReports"),
);
// Disclosures subsections
const LatestNews = lazy(
  () => import("./Pages/Disclosures/disclosuresSubsections/LatestNews"),
);
const Disclosures = lazy(
  () => import("./Pages/Disclosures/disclosuresSubsections/Disclosures"),
);
const Earnings = lazy(
  () => import("./Pages/Disclosures/disclosuresSubsections/Earnings"),
);
const Events = lazy(
  () => import("./Pages/Disclosures/disclosuresSubsections/Events"),
);
const DisclouserArticle = lazy(
  () => import("./Pages/Disclosures/DisclouserArticle/DisclouserArticle"),
);
// Component to handle language redirect
const LangRedirect = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const lang = searchParams.get("lang");
  if (!lang || (lang !== "en" && lang !== "ar")) {
    return <Navigate to={`${location.pathname}?lang=en`} replace />;
  }
  return null;
};
// Wrapper component for Layout with language check
const LayoutWrapper = () => {
  const { company } = useParams();
  const companyData = companies[`${company}`];
   useEffect(() => {
    if (companyData?.styles) {
      const root = document.documentElement;
      Object.entries(companyData.styles).forEach(([property, value]) => {
        root.style.setProperty(property, value);
      });
    }
    return () => {
      if (companyData?.styles) {
        Object.keys(companyData.styles).forEach((property) => {
          document.documentElement.style.removeProperty(property);
        });
      }
    };
  }, [companyData]);
  if (!companyData) return <NotFound />;
  return (
    <>
      <LangRedirect />
      <Layout />
    </>
  );
};
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/:company",
      element: <LayoutWrapper />,
      children: [
        { index: true, element: <Overview /> },
        { path: "profile", element: <Profile /> },
        {
          path: "board",
          element: <Board />,
          children: [
            { index: true, element: <Navigate to="board" replace /> },
            {
              path: "board",
              element: <BoardTab />,
              children: [{ path: ":id", element: <MemeberDetails /> }],
            },
            {
              path: "executive",
              element: <ExecutivesTab />,
              children: [{ path: ":id", element: <MemeberDetails /> }],
            },
            { path: "salaries", element: <SalariesTab /> },
          ],
        },
        {
          path: "share-performance",
          element: <SharePerformance />,
          children: [
            { index: true, element: <Navigate to="chart" replace /> },
            { path: "chart", element: <SharePerformanceCharts /> },
            {
              path: "peers",
              element: <PeersPage />,
              children: [
                { index: true, element: <Navigate to="general" replace /> },
                { path: "general", element: <General /> },
                { path: "ranking", element: <Ranking /> },
                { path: "growth", element: <Growth /> },
                { path: "market-performance", element: <MarketPerformance /> },
                { path: "per-share-data", element: <PerShareData /> },
                { path: "salaries-benefits", element: <SalariesBounses /> },
              ],
            },
            { path: "negotiated-deals", element: <NegotiatedDeals /> },
            {
              path: "investment-calculator",
              element: <InvestmentCalculator />,
            },
          ],
        },
        {
          path: "financial-information",
          element: <FinancialInformation />,
          children: [
            {
              index: true,
              element: <Navigate to="financial-statements" replace />,
            },
            { path: "financial-statements", element: <FinancialStatement /> },
            { path: "financial-ratios", element: <FinancialRatios /> },
            { path: "financial-reports", element: <FinancialReports /> },
          ],
        },
        { path: "investors-presentation", element: <InvestorsPresentation /> },
        {
          path: "disclosures",
          element: <Disclosurespage />,
          children: [
            { index: true, element: <Navigate to="latest-news" replace /> },
            {
              path: "latest-news",
              element: <LatestNews />,
              children: [
                { path: "article/:id", element: <DisclouserArticle /> },
              ],
            },
            {
              path: "disc",
              element: <Disclosures />,
              children: [
                { path: "article/:id", element: <DisclouserArticle /> },
              ],
            },
            { path: "earnings", element: <Earnings /> },
            { path: "events", element: <Events /> },
          ],
        },
        { path: "corporate-actions", element: <CorporateActions /> },
        { path: "major-shareholders", element: <MajorShareholders /> },
        { path: "business-segments", element: <BusinessSegments /> },
        { path: "mergers-acquisitions", element: <MergersAcquisitions /> },
        { path: "contact", element: <ContactIR /> },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
