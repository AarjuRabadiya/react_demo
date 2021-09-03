import React from "react";
import styled from "styled-components";
import * as variable from "Base/Variables";
import Hamburger from "./Hamburger";
import NavLink from "./NavLink";
import { media } from "Base/Media";
import { withTranslation } from "react-i18next";
import { withRouter } from "react-router";
import Icon from "Components/Icons/Icons";
import gsap from "gsap";
import { inject, observer } from "mobx-react";
import LanguageSelector from "Components/LanguageSelector/LanguageSelector";
import i18n from "i18next";
import "./menu.scss";

const HamburgerWrapper = styled(Hamburger)`
  ${media.desktop`
        display: none;
    `};
`;

@inject("AuthStore", "GeneralStore")
@observer
class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isHamburgerActive: false,
    };

    /**
     * Initial setup for some elements
     * @type {null}
     */
    this.menuElement = null;
    this.menuElementAnimation = null;
    this.menu = null;
  }

  /**
   * Toggle Hamburger Active State
   * @param e
   */
  toggleHamburgerActiveState = (e) => {
    const toggleHamburgerState = !this.state.isHamburgerActive;
    this.setState({ isHamburgerActive: toggleHamburgerState });

    if (toggleHamburgerState) {
      this.menuElementAnimation.play();
    } else {
      this.menuElementAnimation.reverse();
    }
  };

  /**
   * Create some initial animations on the component did mount layer
   */
  componentDidMount() {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 767) {
        this.closeMenu();
        this.setState({ isHamburgerActive: false });
      }
    });

    const { GeneralStore } = this.props;
    if (!GeneralStore.hasMenuLoaded || window.innerWidth < 767) {
      this.menuElementAnimation = gsap.to(this.menuElement, {
        duration: 0.6,
        x: 0,
        ease: "expo.inOut",
        paused: true,
      });
      this.menuAnimation = gsap.fromTo(
        this.menu,
        { x: "-100%", opacity: 0 },
        { duration: 0.5, opacity: 1, x: 0, ease: "expo.inOut" }
      );
      GeneralStore.setState("hasMenuLoaded", true);
    }
  }

  /**
   * Close Menu
   */
  closeMenu = () => {
    this.setState({ isHamburgerActive: false });
  };

  render = () => {
    const { history, AuthStore } = this.props;
    const { isHamburgerActive } = this.state;

    if (window.innerWidth > 767 && isHamburgerActive) {
      this.setState({ isHamburgerActive: false });
    }

    return (
      <div className="menu-container">
        <LanguageSelector
          changeLanguage={(e) => this.props.changeLanguage(e)}
          assets={false}
        />

        <div className="container" ref={(div) => (this.menu = div)}>
          <div
            className="brand"
            onClick={() => (window.location.href = "https://chainguardians.io")}
          >
            Chain Guardians
          </div>
          <HamburgerWrapper
            active={isHamburgerActive}
            onClick={(e) => this.toggleHamburgerActiveState(e)}
          />
        </div>
        <div className="ul-section">
          <ul
            className={isHamburgerActive ? "active" : "menu-list"}
            // active={isHamburgerActive}
            ref={(div) => (this.menuElement = div)}
          >
            <li className="menu-list-item">
              <NavLink
                to="/dashboard/team_mining"
                history={history.location.pathname}
                onClick={(e) => this.closeMenu(e)}
              >
                <Icon
                  className="svg"
                  fill={variable.green}
                  width={32}
                  height={25}
                  path="M14.5 27.8l13.48-15.88a.59.59 0 00.06-.69l-4.9-7.95a.59.59 0 00-.5-.28H5.48c-.2 0-.4.1-.5.28l-4.9 7.95c-.13.22-.1.5.06.69l13.48 15.87c.23.28.65.28.89 0zM25.6 10.8h-4.05l-2.77-6.05h3.2l3.63 6.05zm-5.98 0H8.5l2.78-6.05h5.57l2.77 6.05zm-13.05 0H2.52l3.63-6.05h3.2L6.57 10.8zm3.98 10.94l-7.56-9.38h3.56l4 9.38zm3.51 3.5l-5.6-12.88h11.2l-5.6 12.89zm3.52-3.5l4-9.38h3.56l-7.56 9.38z"
                />
                {i18n.t("menu:mining")}
              </NavLink>
            </li>

            <li className="menu-list-item">
              <NavLink
                to="/dashboard/profile"
                history={history.location.pathname}
                onClick={(e) => this.closeMenu(e)}
              >
                <Icon
                  className="svg"
                  width={32}
                  height={25}
                  fill={variable.green}
                  path="M10.94 15.5a6.25 6.25 0 100-12.5 6.25 6.25 0 000 12.5zm0-1.56a4.7 4.7 0 11.01-9.4 4.7 4.7 0 01-.01 9.4zM19.54 28c1.29 0 2.33-1.05 2.33-2.34v-2.04a6.56 6.56 0 00-6.56-6.56c-1.4 0-2.07.78-4.37.78-2.3 0-2.97-.78-4.38-.78A6.56 6.56 0 000 23.62v2.04C0 26.95 1.05 28 2.34 28h17.2zm0-1.56H2.33a.78.78 0 01-.78-.78v-2.04a5 5 0 015-5c.96 0 1.91.79 4.38.79 2.46 0 3.42-.79 4.37-.79a5 5 0 015 5v2.04c0 .43-.35.78-.78.78z"
                />
                {i18n.t("menu:profile")}
              </NavLink>
            </li>
            <li className="menu-list-item">
              <NavLink
                to="/dashboard/logout"
                history={history}
                onClick={(e) => this.closeMenu(e)}
              >
                <Icon
                  className="svg"
                  width={32}
                  height={25}
                  fill={variable.green}
                  path="M10.94 15.5a6.25 6.25 0 100-12.5 6.25 6.25 0 000 12.5zm0-1.56a4.7 4.7 0 11.01-9.4 4.7 4.7 0 01-.01 9.4zM19.54 28c1.29 0 2.33-1.05 2.33-2.34v-2.04a6.56 6.56 0 00-6.56-6.56c-1.4 0-2.07.78-4.37.78-2.3 0-2.97-.78-4.38-.78A6.56 6.56 0 000 23.62v2.04C0 26.95 1.05 28 2.34 28h17.2zm0-1.56H2.33a.78.78 0 01-.78-.78v-2.04a5 5 0 015-5c.96 0 1.91.79 4.38.79 2.46 0 3.42-.79 4.37-.79a5 5 0 015 5v2.04c0 .43-.35.78-.78.78z"
                />
                {i18n.t("menu:logout")}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    );
  };
}

const router = withRouter(Menu);
const Memoize = React.memo(router);

export default withTranslation()(Memoize);
