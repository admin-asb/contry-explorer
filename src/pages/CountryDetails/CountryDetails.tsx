import { Link, useParams } from "react-router-dom";
import {
  useGetAllCountriesQuery,
  useGetCountryByCodeQuery,
} from "../../shared/api/apiSlice";
import classes from "./CountryDetails.module.scss";
import { useTranslation } from "react-i18next";
import { getCountryName } from "../../shared/helpers/countryName";

export default function CountryDetails() {
  const { countryCode } = useParams();
  const {
    data: countries,
    isLoading,
    error,
  } = useGetCountryByCodeQuery(countryCode);
  const { data: allCountries } = useGetAllCountriesQuery();
  const { t, i18n } = useTranslation();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;

  const country = countries[0];
  const populationNumber = country.population.toLocaleString();
  const area = country.area.toLocaleString();
  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "No languages available";
  const { borders } = country;

  const countryMap = allCountries?.reduce((acc, item) => {
    acc[item.cca3] = getCountryName(item, i18n.language);
    return acc;
  }, {} as Record<string, string>);

  return (
    <div className={classes["card-page"]}>
      <h1>{getCountryName(country, i18n.language)}</h1>
      <img
        src={country.flags.svg}
        alt={getCountryName(country, i18n.language)}
        width={100}
      />
      <ul>
        <li>
          <b>{t("population")}:</b> {populationNumber}
        </li>
        <li>
          <b>{t("capital")}:</b> {country.capital || "No capital city"}
        </li>
        <li>
          <b>{t("area")}:</b> {area} {t("km")}
          <sup>2</sup>
        </li>
        <li>
          <b>{t("languages")}:</b> {languages}
        </li>
        {borders && borders?.length > 0 && (
          <li>
            {" "}
            <b>{t("borders")}:</b>
            <ul style={{ marginTop: "1rem" }}>
              {borders.map((border: string) => (
                <li key={border}>
                  <Link to={`/country/${border}`}>
                    {countryMap?.[border] || border}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        )}
      </ul>
    </div>
  );
}
