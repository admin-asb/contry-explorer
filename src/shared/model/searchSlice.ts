import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  inputCountry: string;
  suggestions: string[];
  selectedCountry: string;
}

const initialState: SearchState = {
  inputCountry: "",
  suggestions: [],
  selectedCountry: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setInputCountry: (state, action: PayloadAction<string>) => {
      state.inputCountry = action.payload;
    },
    setSuggestions: (state, action: PayloadAction<string[]>) => {
      state.suggestions = action.payload;
    },
    setSelectedCountry: (state, action: PayloadAction<string>) => {
      state.selectedCountry = action.payload;
    },
  },
});

export const { setInputCountry, setSuggestions, setSelectedCountry } =
  searchSlice.actions;
export default searchSlice.reducer;
