import { Country } from "../../entities/country/types/country";

export function getCountryName(country: Country, language: string) {
  return language === "ru" && country.translations?.rus.official
    ? country.translations.rus.official
    : country.name.official;
}
