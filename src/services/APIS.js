const APIS = {
  OVERVIEW: {
    KEY: "OVERVIEW",
    URL: `api/v1/json/ir-widget/overview`,
  },
  CHART_TICKER: {
    KEY: "CHART_TICKER",
    URL: `api/v1/json/ir-api/charts-data/0/1Y`,
  },
  LATEST_NEWS: {
    KEY: "LATEST_NEWS",
    URL: "api/v1/json/ir-widget/latest-news-articles-with-body",
  },
  EARNINGS: {
    KEY: "EARNINGS",
    URL: "api/v1/json/ir-widget/get-earnings",
  },
  DISCLUSERS: {
    KEY: "DISCLUSERS",
    URL: "api/v1/json/ir-widget/disclosures-articles-with-body",
  },
  EVENTS: {
    KEY: "EVENTS",
    URL: "api/v1/json/ir-widget/events",
  },
  PROFILE: {
    KEY: "PROFILE",
    URL: "api/v1.0/json/ir-api/profile",
  },
  BOARD: {
    KEY: "BOARD",
    URL: `api/v1/json/ir-api/organizational-structure`,
  },
  SHARE_PERFORMANCE_CHART: {
    KEY: "SHARE_PERFORMANCE_CHART",
    URL: `api/v1/json/ir-api/charts-data/0/5Y`,
  },
  SHARE_PERFORMANCE_TRADING: {
    KEY: "SHARE_PERFORMANCE_TRADING",
    URL: `api/v1/json/ir-api/chart-data-table`,
  },
  PEERS: {
    KEY: "PEERS",
    URL: "api/v1/json/ir-api/CompanyCompetitor",
  },
  NAGOTIATED_DEALS: {
    KEY: "NAGOTIATED_DEALS",
    URL: `api/v1/json/ir-widget/negotiated-deals`,
  },
  INVESMENT_CALCULATOR: {
    KEY: "INVESMENT_CALCULATOR",
    URL: `api/v1/json/ir-api/investment-calculator`,
  },
  INVESMENT_CALCULATOR_CHART: {
    KEY: "INVESMENT_CALCULATOR_CHART",
    URL: "api/v1/json/ir-api",
  },
  FINANCIAL_STATEMENT: {
    KEY: "FINANCIAL_STATEMENT",
    URL: `api/v1.0/json/ir-api/financial-statements/:lang?fiscalPeriodType=`,
  },
  FINANCIAL_RATIOS: {
    KEY: "FINANCIAL_RATIOS",
    URL: `api/v1.0/json/ir-api/financial-ratios?fiscalPeriodType=`,
  },
  FINANCIAL_REPORTS: {
    KEY: "FINANCIAL_REPORTS",
    URL: `api/v1.0/json/ir-api/financial-results/en`,
  },
  INVESTOR_PRESENTATION: {
    KEY: "INVESTOR_PRESENTATION",
    URL: `api/v1.0/json/ir-widget/investors-presentations`,
  },
  CORPORATE_ACTIONS: {
    KEY: "CORPORATE_ACTIONS",
    URL: `api/v1.0/json/ir-api/corporate-actions`,
  },
  BUSINESS_SEGMENTS: {
    KEY: "BUSINESS_SEGMENTS",
    URL: `api/v1/json/ir-api/business-segments?fiscalPeriodType=`,
  },
  MAJOR_SHAREHOLDERS: {
    KEY: "MAJOR_SHAREHOLDERS",
    URL: `api/v1/json/ir-api/major-shareholders`,
  },
  MERGERS: {
    KEY: "MERGERS",
    URL: `api/v1.0/json/ir-api/MergersAndAcquisitions`,
  },
};
export default APIS;