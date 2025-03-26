import { useDispatch } from "react-redux";
import Countries from "../../entities/country/ui/Countries";
import RegionFilter from "../../widgets/RegionFilter/RegionFilter";
import classes from "./HomePage.module.scss";
import { toggleSort } from "../../entities/country/model/countrySlice";
import { useTranslation } from "react-i18next";

export default function HomePage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <>
      <h1 className={classes.headline}>Country Explorer</h1>
      <div className={classes.widgets}>
        <RegionFilter />
        <button
          onClick={() => dispatch(toggleSort())}
          className={classes["sort-btn"]}
        >
          {t("sort_population")}
        </button>
      </div>
      <Countries />
    </>
  );
}
