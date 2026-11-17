export interface ResearchSource {
  datasetId: string;
  publisher: string;
  description: string;
  referenceYear: string;
  geography: string;
  canonicalUrl: string;
  processingStatus: string;
  limitations: string;
  rightsStatus: string;
}

const RIGHTS_REVIEW = "Commercial redistribution and source terms review required";

export const RESEARCH_SNAPSHOT = "2026-11-14";

export const RESEARCH_SOURCES: readonly ResearchSource[] = [
  {
    datasetId: "BBS-PHC-2022-NATIONAL",
    publisher: "Bangladesh Bureau of Statistics",
    description: "Census final city corporation totals",
    referenceYear: "2022",
    geography: "Four city corporations",
    canonicalUrl: "https://file-dhaka.portal.gov.bd/uploads/0788fa9b-f994-49b1-adf4-78d7422eb534/658/13c/d2b/65813cd2bec71189929283.pdf",
    processingStatus: "extracted",
    limitations: "Population context only; no observed product purchasing",
    rightsStatus: RIGHTS_REVIEW
  },
  {
    datasetId: "BBS-PHC-CTG-WARDS",
    publisher: "Bangladesh Bureau of Statistics",
    description: "Chattogram District Report P18 page 327",
    referenceYear: "2022",
    geography: "41 historical Chattogram wards",
    canonicalUrl: "https://file-chittagong.portal.gov.bd/uploads/94520964-dc23-4be3-8f36-31fc39ea0f13/66e/1a5/021/66e1a5021c179787705326.pdf",
    processingStatus: "extracted",
    limitations: "Ward household sum differs from printed subtotal by 360; preserve source values",
    rightsStatus: RIGHTS_REVIEW
  },
  {
    datasetId: "BBS-PHC-SYL-WARDS",
    publisher: "Bangladesh Bureau of Statistics",
    description: "Sylhet District Report P18 page 350",
    referenceYear: "2022",
    geography: "27 historical Sylhet wards",
    canonicalUrl: "https://file.portal.gov.bd/media/a843c98f-964e-4de5-a7a4-f0732be76fa2/uploaded-files/District%20Report%20Sylhet-compressed.pdf",
    processingStatus: "extracted",
    limitations: "2025 gazette lists 42 wards; 2022-to-2025 boundary crosswalk is absent",
    rightsStatus: RIGHTS_REVIEW
  },
  {
    datasetId: "BBS-HIES-2022",
    publisher: "Bangladesh Bureau of Statistics",
    description: "Household income and expenditure report Table 4.5",
    referenceYear: "2022",
    geography: "National and divisions",
    canonicalUrl: "https://file-dhaka.portal.gov.bd/uploads/8c2311c1-72a1-42d3-8d00-820a42b17b34/67b/303/4d4/67b3034d485e3939771210.pdf",
    processingStatus: "extracted",
    limitations: "Division averages are not city- or ward-level income estimates and are not purchase evidence",
    rightsStatus: RIGHTS_REVIEW
  },
  {
    datasetId: "BBS-PHC-DISTRICT",
    publisher: "Bangladesh Bureau of Statistics",
    description: "Census 2022 District Community Union Series",
    referenceYear: "2022",
    geography: "District and union",
    canonicalUrl: "https://bbs.portal.gov.bd/site/page/b432a7e5-8b4d-4dac-a76c-a9be4e85828c",
    processingStatus: "located_not_ingested",
    limitations: "Dhaka ward data has not been extracted",
    rightsStatus: RIGHTS_REVIEW
  },
  {
    datasetId: "BBS-MICS-2025",
    publisher: "Bangladesh Bureau of Statistics / UNICEF",
    description: "Multiple Indicator Cluster Survey final report",
    referenceYear: "2025",
    geography: "National, districts and three city domains",
    canonicalUrl: "https://www.unicef.org/bangladesh/en/reports/bangladesh-multiple-indicator-cluster-survey-2025-0",
    processingStatus: "located_not_ingested",
    limitations: "Not observed product purchasing; microdata rights require review",
    rightsStatus: RIGHTS_REVIEW
  },
  {
    datasetId: "BBS-LFS-2024",
    publisher: "Bangladesh Bureau of Statistics",
    description: "Labour Force Survey",
    referenceYear: "2024",
    geography: "National and subnational",
    canonicalUrl: "https://bbs.gov.bd/pages/static-pages/6922ddd1935eb65569e166e7",
    processingStatus: "candidate_not_ingested",
    limitations: "Employment context only",
    rightsStatus: RIGHTS_REVIEW
  },
  {
    datasetId: "WORLDPOP-BD-2025",
    publisher: "WorldPop",
    description: "Constrained gridded population counts",
    referenceYear: "2025",
    geography: "100 metre grid",
    canonicalUrl: "https://hub.worldpop.org/geodata/summary?id=72495",
    processingStatus: "located_not_ingested",
    limitations: "Modelled spatial population; not an official ward count",
    rightsStatus: RIGHTS_REVIEW
  },
  {
    datasetId: "WORLDPOP-API",
    publisher: "WorldPop",
    description: "Population API v3",
    referenceYear: "Various",
    geography: "Grids and age-sex aggregates",
    canonicalUrl: "https://api.worldpop.org/v3/documentation",
    processingStatus: "not_ingested",
    limitations: "Administrative alignment must be validated",
    rightsStatus: RIGHTS_REVIEW
  },
  {
    datasetId: "GEOBOUNDARIES-BD",
    publisher: "geoBoundaries",
    description: "Bangladesh administrative boundaries",
    referenceYear: "Various",
    geography: "Administrative polygons",
    canonicalUrl: "https://www.geoboundaries.org/",
    processingStatus: "candidate_not_ingested",
    limitations: "Boundary vintage requires a documented crosswalk",
    rightsStatus: RIGHTS_REVIEW
  },
  {
    datasetId: "OSM-BD",
    publisher: "OpenStreetMap",
    description: "Roads, points of interest and retail context",
    referenceYear: "Ongoing",
    geography: "Geospatial",
    canonicalUrl: "https://www.openstreetmap.org/",
    processingStatus: "not_ingested",
    limitations: "ODbL and source attribution requirements apply",
    rightsStatus: RIGHTS_REVIEW
  },
  {
    datasetId: "BBS-CPI-2026",
    publisher: "Bangladesh Bureau of Statistics",
    description: "Consumer Price Index",
    referenceYear: "2026",
    geography: "National",
    canonicalUrl: "https://bbs.gov.bd/pages/static-pages/6922de7a933eb65569e1ae8f",
    processingStatus: "candidate_not_ingested",
    limitations: "Inflation context, not realised product purchases",
    rightsStatus: RIGHTS_REVIEW
  },
  {
    datasetId: "TCB-PRICE",
    publisher: "Trading Corporation of Bangladesh",
    description: "Retail market commodity prices",
    referenceYear: "2026",
    geography: "Selected markets",
    canonicalUrl: "https://tcb.gov.bd/",
    processingStatus: "candidate_not_ingested",
    limitations: "Commodity prices are not brand demand",
    rightsStatus: RIGHTS_REVIEW
  },
  {
    datasetId: "DHS-BD-2022",
    publisher: "Demographic and Health Surveys",
    description: "Bangladesh Demographic and Health Survey",
    referenceYear: "2022",
    geography: "Household survey",
    canonicalUrl: "https://dhsprogram.com/",
    processingStatus: "candidate_not_ingested",
    limitations: "Microdata access is restricted; sensitive topics require special care",
    rightsStatus: RIGHTS_REVIEW
  },
  {
    datasetId: "SIMILE-METHOD",
    publisher: "Simile",
    description: "Company-published confidence method reference",
    referenceYear: "2026",
    geography: "External research reference",
    canonicalUrl: "https://www.simile.com/blog/confidence",
    processingStatus: "benchmark_reference_only",
    limitations: "External reference only; not MirrorAsia validation",
    rightsStatus: RIGHTS_REVIEW
  },
  {
    datasetId: "BD-GAZETTE-2025-SYL-WARDS",
    publisher: "Government of Bangladesh Gazette",
    description: "December 2025 Sylhet wards 01-42",
    referenceYear: "2025",
    geography: "Sylhet",
    canonicalUrl: "https://file-dhaka.portal.gov.bd/media/b4754f5f-3e57-4cf9-b9b9-6ececb1ff364/uploaded-files/Ref_401_compressed.pdf",
    processingStatus: "source_located_not_gis_ingested",
    limitations: "No 2022-to-2025 ward boundary crosswalk",
    rightsStatus: RIGHTS_REVIEW
  }
] as const;

export const RESEARCH_QUALITY_CHECKS = {
  research_snapshot: RESEARCH_SNAPSHOT,
  data_type: "Published official aggregates; manually transcribed; original PDFs not bulk parsed",
  chattogram_wards: 41,
  chattogram_male_plus_female: 3230262,
  chattogram_ward_households: 823242,
  chattogram_printed_households: 822882,
  chattogram_household_discrepancy: 360,
  sylhet_wards: 27,
  sylhet_male_plus_female: 532748,
  sylhet_ward_households: 116711,
  sylhet_printed_households: 116711,
  city_total_including_hijra: 14059132,
  real_consumer_benchmark_available: false,
  buying_accuracy_measured: false,
  dhaka_ward_level_extracted: false,
  worldpop_ingested: false,
  mics_ingested: false,
  commercial_rights_reviewed: false
} as const;

export function searchResearchSources(query: string, limit = 10): ResearchSource[] {
  const normalized = query.trim().toLowerCase();
  if (normalized.length < 2) {
    throw new Error("Search query must contain at least 2 characters.");
  }
  return RESEARCH_SOURCES.filter((source) => {
    const haystack = [
      source.datasetId,
      source.publisher,
      source.description,
      source.referenceYear,
      source.geography,
      source.processingStatus,
      source.limitations
    ].join(" ").toLowerCase();
    return haystack.includes(normalized);
  }).slice(0, Math.max(1, Math.min(20, Math.trunc(limit))));
}

export function getResearchSummary() {
  const extracted = RESEARCH_SOURCES.filter((source) => source.processingStatus === "extracted");
  return {
    snapshot: RESEARCH_SNAPSHOT,
    sourceCount: RESEARCH_SOURCES.length,
    extractedSourceCount: extracted.length,
    extractedSourceIds: extracted.map((source) => source.datasetId),
    integratedIntoLiveSimulation: false,
    realConsumerBenchmarkAvailable: false,
    buyingAccuracyMeasured: false,
    commercialRightsReviewed: false,
    statement: "The extracted datasets are aggregate population/economic context, not observed product preferences or buying outcomes."
  };
}
