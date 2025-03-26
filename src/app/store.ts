import { configureStore } from "@reduxjs/toolkit";
import { countriesApi } from "../shared/api/apiSlice";
import countriesSlice from "../entities/country/model/countrySlice";
import searchSlice from "../shared/model/searchSlice";

export const store = configureStore({
  reducer: {
    [countriesApi.reducerPath]: countriesApi.reducer,
    countries: countriesSlice,
    search: searchSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(countriesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
