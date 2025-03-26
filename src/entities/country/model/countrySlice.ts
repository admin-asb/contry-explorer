import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Country } from "../types/country";

const initialState = {
  region: "all",
  isSorted: false,
  filteredCountries: [] as Country[],
  sortedCountries: [] as Country[],
  visibleCount: 20,
};

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    setRegion: (state, action: PayloadAction<string>) => {
      state.region = action.payload;
    },
    toggleSort: (state) => {
      state.isSorted = !state.isSorted;
      state.sortedCountries.reverse();
    },
    setFilteredCountries: (state, action: PayloadAction<Country[]>) => {
      state.filteredCountries = action.payload.filter(
        (country) => state.region === "all" || country.region === state.region
      );
      state.sortedCountries = state.isSorted
        ? [...state.filteredCountries].sort(
            (a, b) => a.population - b.population
          )
        : [...state.filteredCountries].sort(
            (a, b) => b.population - a.population
          );
      state.visibleCount = 20;
    },
    loadMore: (state) => {
      state.visibleCount += 20;
    },
  },
});

export const { setRegion, toggleSort, setFilteredCountries, loadMore } =
  countriesSlice.actions;
export default countriesSlice.reducer;
