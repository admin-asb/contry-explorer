import { useDispatch } from "react-redux";
import classes from "./RegionFilter.module.scss";
import { setRegion } from "../../entities/country/model/countrySlice";
import { useTranslation } from "react-i18next";

export default function RegionFilter() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <select
      onChange={(e) => dispatch(setRegion(e.target.value))}
      className={classes.select}
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
