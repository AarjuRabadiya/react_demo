import React from "react";
import styled from "styled-components";
import * as variable from "Base/Variables";
import { css } from "styled-components";
import { media } from "Base/Media";

const purple = css`
  background: #6727cf; /* Old browsers */
  background: linear-gradient(to right, #f064c1 -106%, #6727cf 100%);
`;

const green = css`
  background: linear-gradient(to right, #64f0a1 0%, #27a8cf 100%);
  color: #000;
`;

const orange = css`
  // background: #e8821f;
  background-image: linear-gradient(
    to right,
    #f79c00,
    #ef8f00,
    #e78300,
    #df7601,
    #d66a02
  );
  color: #000;
`;

const ButtonContainer = styled.a`
  font-family: ${variable.headingFontFamily};
  text-transform: uppercase;
  text-decoration: none;
  width: 100%;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  // display: table;
  // text-align: center;
  color: ${variable.light};
  font-size: ${variable.textMedium};
  padding: 10px ${variable.spacingSmaller};
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  clip-path: polygon(0 0%, 98% 0, 100% 12%, 100% 100%, 2% 100%, 0 87%, 0 0%);
  cursor: pointer;
  ${(props) =>
    props.boxShadow
      ? `
      box-shadow: inset -4px -4px 8px rgb(255 255 255 / 50%), inset 8px 8px 16px rgb(0 0 0 / 10%) !important;
    `
      : null}
  ${(props) =>
    props.borderRadius
      ? `
      border-radius: 20px 0;
      clip-path:none !important;
      transform: skewX(-25deg);
    `
      : null}
  ${(props) =>
    props.width
      ? `
        width: ${props.width};
    `
      : null}
  ${media.tablet`
        padding: 10px ${variable.spacingSmall};
        font-size: ${variable.textLarge};

         ${(props) =>
           props.size === "wide"
             ? `
            padding: 10px ${variable.spacingMedium};
        `
             : null}
    `} ${(props) =>
    props.size === "wide"
      ? `
        // padding: 10px ${variable.spacingSmall};
    `
      : null}
    ${(props) =>
    props.theme === "purple"
      ? `
        ${purple}
    `
      : (props) =>
          props.theme === "green"
            ? `
        ${green}
    `
            : (props) =>
                props.theme === "metamask"
                  ? `
        ${orange}
    `
                  : (props) =>
                      props.theme === "signIn"
                        ? `
      background-image: linear-gradient(to right,#6727cf,#8b03cb,#bf00cf,#d942c2,#df69b7)
`
                        : null};
`;
//background-image: linear-gradient(to right, #6727cf, #982dca, #bb3bc6, #d84ec3, #f064c1)
export default class Button extends React.Component {
  constructor(props) {
    super();
  }

  render = () => {
    return <ButtonContainer {...this.props} />;
  };
}
