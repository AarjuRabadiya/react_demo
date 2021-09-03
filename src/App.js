import React, { Component } from "react";
//import logo from "./logo.svg";
import "./App.css";
import { withTranslation } from "react-i18next";
import i18n from "i18next";

class App extends Component {
  changeLanguageToggle = (lang = "en") => {
    /** Force the language update on callback **/
    i18n.changeLanguage(lang);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>{i18n.t("login:title")}</p>
          <p>{i18n.t("login:name")}</p>
          <p>{i18n.t("login:password")}</p>
          <p>{i18n.t("login:emailAddress")}</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            {i18n.t("login:description.part1")}
          </a>
          {/* <div>{i18n.language}</div> */}
          {i18n.options.languageOptions.map((lang, key) => {
            return (
              <div key={key} onClick={() => this.changeLanguageToggle(lang)}>
                {lang}
              </div>
            );
          })}
        </header>
      </div>
    );
  }
}

export default withTranslation()(App);
