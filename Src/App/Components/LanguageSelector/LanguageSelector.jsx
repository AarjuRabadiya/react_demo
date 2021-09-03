import React from "react";
import i18n from "i18next";
import "../../app.scss";
import "./languageSelector.scss";
import { withTranslation } from "react-i18next";

class LanguageSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  /**
   * Change the language toggle cross site
   *  [ en, jp, cn, vm ]
   * */
  changeLanguageToggle = (lang = "en") => {
    const { open } = this.state;
    this.setState({ open: !open });
    /** Force the language update on callback **/
    // i18n.changeLanguage(lang);
    this.props.changeLanguage(lang);
  };

  getActiveLanguageMap = (language) => {
    const { languages } = this.props;
    let activeLang;

    languages.forEach((lang, key) => {
      if (lang === language) {
        activeLang = i18n.t("language." + lang);
      }
    });

    return activeLang;
  };

  toggleSubMenu = () => {
    const { open } = this.state;
    this.setState({ open: !open });
    this.forceUpdate();
  };

  render = (props) => {
    const { languages, alignRight, assets } = this.props;
    const { open } = this.state;

    return (
      <div className="language-container">
        <div className={assets ? "assets language" : "language"}>
          <div className="language-active" onClick={() => this.toggleSubMenu()}>
            {i18n.language}
          </div>
          <div
            className={open ? "open language-sub-menu" : "language-sub-menu"}
          >
            {i18n.options.languageOptions.map((lang, key) => {
              return (
                <div
                  key={key}
                  className={
                    i18n.language === lang
                      ? "language-option active"
                      : "language-option"
                  }
                  onClick={() => this.changeLanguageToggle(lang)}
                  // lang={lang}
                >
                  {i18n.t(lang)}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };
}
export default withTranslation()(LanguageSelector);
