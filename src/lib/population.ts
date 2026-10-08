import type { Segment } from "./schema.ts";

export interface PopulationPack {
  id: string;
  country: "Bangladesh";
  city: "Dhaka";
  version: string;
  evidenceType: "illustrative" | "observational";
  sampleSize: number | null;
  source: string;
  lastVerifiedAt: string | null;
  segments: ReadonlyArray<{ id: Segment; calibrationStatus: "unvalidated"; incomeData: "not-collected"; language: string[] }>;
}

export const ILLUSTRATIVE_POPULATION: PopulationPack = {
  id: "BD-DHAKA-ILLUSTRATIVE-v0.1",
  country: "Bangladesh",
  city: "Dhaka",
  version: "0.1.0",
  evidenceType: "illustrative",
  sampleSize: null,
  source: "Hand-authored MVP assumptions; no respondent evidence",
  lastVerifiedAt: null,
  segments: [
    { id: "students", calibrationStatus: "unvalidated", incomeData: "not-collected", language: ["bn", "bn-Latn", "en"] },
    { id: "young-professionals", calibrationStatus: "unvalidated", incomeData: "not-collected", language: ["bn", "bn-Latn", "en"] },
    { id: "family-shoppers", calibrationStatus: "unvalidated", incomeData: "not-collected", language: ["bn", "bn-Latn", "en"] }
  ]
};
