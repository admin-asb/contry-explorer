import { Link } from "react-router-dom";
import LanguageSwitcher from "../../shared/ui/LanguageSwitcher/LanguageSwitcher";
import SearchBar from "../../shared/ui/SearchBar/SearchBar";
import classes from "./Header.module.scss";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {
  setInputCountry,
  setSelectedCountry,
  setSuggestions,
} from "../../shared/model/searchSlice";

export default function Header() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  function clickHandler() {
    dispatch(setSelectedCountry(""));
    dispatch(setSuggestions([]));
    dispatch(setInputCountry(""));
  }

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link to="/" onClick={clickHandler}>
          {t("home")}
        </Link>
      </div>
      <SearchBar />
      <LanguageSwitcher />
    </header>
  );
}
