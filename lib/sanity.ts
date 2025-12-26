import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "g9fpbcny", // ⚠️ À REMPLACER (voir ci-dessous)
  dataset: "production",
  apiVersion: "2023-05-03",
  useCdn: false,
});