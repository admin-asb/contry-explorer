import { useMemo } from "react";
import { useGetCountryByNameQuery } from "../../api/apiSlice";
import classes from "./SearchBar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import {
  setInputCountry,
  setSelectedCountry,
  setSuggestions,
} from "../../model/searchSlice";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { inputCountry, suggestions } = useSelector(
    (state: RootState) => state.search
  );
  const { data: countries } = useGetCountryByNameQuery(inputCountry, {
    skip: inputCountry.length < 2,
  });

  const computedSuggestions = useMemo(() => {
    if (countries) {
      return countries.map((country) => country.name.official);
    }
    return [];
  }, [countries]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setInputCountry(e.target.value));
    dispatch(setSuggestions(computedSuggestions));
  }

  function handleSelectSuggestion(name: string) {
    dispatch(setInputCountry(name));
    dispatch(setSelectedCountry(name));
    dispatch(setSuggestions([]));
  }

  function handleSearch() {
    if (!inputCountry) return;
    dispatch(setSelectedCountry(inputCountry));
    dispatch(setInputCountry(""));
    dispatch(setSuggestions([]));
    navigate("/");
  }

  return (
    <div className={classes["search-container"]}>
      <div className={classes["input-wrapper"]}>
        <input
          type="text"
          className={classes.search}
          placeholder="Search..."
          value={inputCountry}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          onBlur={() => dispatch(setSuggestions([]))}
          onFocus={() => dispatch(setSuggestions(computedSuggestions))}
        />
        {suggestions.length > 0 && (
          <ul className={classes.suggestions}>
            {suggestions.map((name) => (
              <li key={name} onClick={() => handleSelectSuggestion(name)}>
                {name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
