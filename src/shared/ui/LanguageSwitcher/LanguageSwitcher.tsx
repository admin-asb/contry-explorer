import { useTranslation } from "react-i18next";
import classes from "./LanguageSwitcher.module.scss";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  function changeLanguage(lang: string) {
    i18n.changeLanguage(lang);
    try {
      localStorage.setItem("i18nextLng", lang);
    } catch (e) {
      console.error("Could not save language preference", e);
    }
  }

  return (
    <div className={classes["lg-switcher"]}>
      <select
        className={classes.select}
        value={i18n.language}
        onChange={(e) => changeLanguage(e.target.value)}
      >
        <option value="en">EN</option>
        <option value="ru">RU</option>
      </select>
    </div>
  );
}
