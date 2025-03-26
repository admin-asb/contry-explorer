import { useDispatch } from "react-redux";
import classes from "./RegionFilter.module.scss";
import { setRegion } from "../../entities/country/model/countrySlice";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export default function RegionFilter() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [selectedRegion, setSelectedRegion] = useState<string>("all");

  useEffect(() => {
    const savedRegion = localStorage.getItem("selectedRegion");
    if (savedRegion) {
      setSelectedRegion(savedRegion);
    }
  }, []);

  function handleChooseContinent(event: React.ChangeEvent<HTMLSelectElement>) {
    const region = event.target.value;
    setSelectedRegion(region);
    localStorage.setItem("selectedRegion", region);
    dispatch(setRegion(region));
  }

  return (
    <select
      onChange={handleChooseContinent}
      className={classes.select}
      value={selectedRegion}
    >
      <option value="all">{t("filter_region")}</option>
      <option value="Asia">{t("asia")}</option>
      <option value="Europe">{t("europe")}</option>
      <option value="Africa">{t("africa")}</option>
      <option value="Americas">{t("americas")}</option>
      <option value="Oceania">{t("oceania")}</option>
      <option value="Antarctic">{t("antarctica")}</option>
    </select>
  );
}
