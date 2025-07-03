import { FetchWrapper } from "@/api/common/fetch-wrapper.ts";

let api: FetchWrapper | null = null;

const createSportsDbApi = (apiVersion: number, apiKey: string): FetchWrapper => {
  const baseUrl = `https://www.thesportsdb.com/api/v${apiVersion}/json/${apiKey}`;
  return new FetchWrapper(baseUrl);
};
export const getSportsDbApi = (): FetchWrapper => {
  const API_VERSION = 1;
  const API_KEY = "3";
  if (!api) {
    api = createSportsDbApi(API_VERSION, API_KEY);
  }
  return api;
};
