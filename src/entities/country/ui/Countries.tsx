import { useGetAllCountriesQuery } from "../../../shared/api/apiSlice";
import { Country } from "../types/country";
import classes from "./Countries.module.scss";
import CountryName from "../lib/CountryName";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useEffect } from "react";
import { loadMore, setFilteredCountries } from "../model/countrySlice";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getCountryName } from "../../../shared/helpers/countryName";

export default function Countries() {
  const { data: countries, error, isLoading } = useGetAllCountriesQuery();
  const dispatch = useDispatch();
  const { sortedCountries, region, visibleCount } = useSelector(
    (state: RootState) => state.countries
  );
  const { selectedCountry } = useSelector((state: RootState) => state.search);
  const { i18n } = useTranslation();

  useEffect(() => {
    if (countries) {
      dispatch(setFilteredCountries(countries));
    }
  }, [countries, region, dispatch]);

  const filteredCountries = selectedCountry
    ? countries?.filter((country: Country) =>
        getCountryName(country, i18n.language)
          .toLowerCase()
          .includes(selectedCountry.toLowerCase())
      ) ?? []
    : sortedCountries ?? [];

  return (
    <>
      <ul className={classes["countries-grid"]}>
        {!isLoading && !error && filteredCountries?.length > 0
          ? filteredCountries.slice(0, visibleCount).map((country: Country) => (
              <li key={country.cca3}>
                <Link to={`/country/${country.cca3}`}>
                  <img
                    src={country.flags.svg}
                    alt={`${getCountryName(
                      country,
                      i18n.language
                    )}'s flag image`}
                  />
                  <CountryName name={getCountryName(country, i18n.language)} />
                </Link>
              </li>
            ))
          : !isLoading && !error && <p>No countries found</p>}
      </ul>

      {!isLoading && !error && filteredCountries.length > visibleCount && (
        <button
          onClick={() => dispatch(loadMore())}
          className={classes["load-more"]}
        >
          Load More
        </button>
      )}

      {!isLoading && !error && sortedCountries.length === 0 && (
        <p>No countries found for this region</p>
      )}
      {isLoading && <p>Loading...</p>}
      {error && <p>Error fetching data</p>}
    </>
  );
}
