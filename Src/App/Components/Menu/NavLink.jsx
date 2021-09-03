import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import * as variable from "Base/Variables";
import { media } from "Base/Media";
import "./navlink.scss";
const hoverState = css`
  font-family: ${variable.headingFontFamily};
  width: 100%;
  color: ${variable.light};
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  clip-path: polygon(0 0%, 98% 0, 100% 12%, 100% 100%, 2% 100%, 0 100%, 0 0%);
  background: linear-gradient(to right, #64f0a1 0%, #27a8cf 100%);
  color: #000;
`;

const MenuLink = styled(Link)`
  color: ${variable.white};
  text-transform: uppercase;
  font-family: ${variable.headingFontFamily};
  font-size: ${variable.textLarger};
  text-decoration: none;
  width: 100%;
  display: table;
  padding: ${variable.spacingSmaller} ${variable.spacingSmaller};
  transition: all 0.3s ease-in-out;
  display: flex;
  justify-content: flex-start;
  text-align: left;

  svg {
    margin-right: ${variable.spacingSmall};
  }

  ${media.tablet`
        font-size: ${variable.textMedium};
        padding-left: ${variable.spacingMedium};
    `}

  ${media.large_desktop`
        padding: ${variable.spacingSmall} ${variable.spacingSmall};
        font-size: ${variable.textMedium};
    `} 
    
    
    ${media.largest_desktop`
        padding: ${variable.spacingSmall} ${variable.spacingSmall};
        font-size: ${variable.textLarge};
        padding-left: calc(${variable.spacingMedium} * 1.4);
        text-align: left;
    `} 
    
    &:hover {
    ${hoverState};

    svg,
    path {
      fill: #000 !important;
    }
  }

  ${(props) =>
    props.active === "active"
      ? `
       ${hoverState};
      svg, path {
        fill: #000 !important;
       }
    `
      : null}
`;

class NavLink extends React.Component {
  render() {
    const isActive = this.props.history === this.props.to;
    // const className = isActive ? "active" : "";
    const className = isActive ? "nav-active menu-link" : "menu-link";

    return (
      // <MenuLink
      <Link className={className} active={className} {...this.props}>
        {this.props.children}
      </Link>
      // </MenuLink>
    );
  }
}

NavLink.contextTypes = {
  router: PropTypes.object,
};

export default NavLink;
