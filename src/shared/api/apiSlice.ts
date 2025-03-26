import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Country } from "../../entities/country/types/country";

export const countriesApi = createApi({
  reducerPath: "countriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://restcountries.com/v3.1/" }),
  endpoints: (builder) => ({
    getAllCountries: builder.query<Country[], void>({
      query: () => "all",
    }),
    getCountryByName: builder.query<Country[], string>({
      query: (name) => `name/${name}`,
    }),
    getCountryByCode: builder.query({
      query: (code) => `/alpha/${code}`,
    }),
  }),
});

export const {
  useGetAllCountriesQuery,
  useGetCountryByNameQuery,
  useGetCountryByCodeQuery,
} = countriesApi;
