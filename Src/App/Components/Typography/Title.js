import * as variable from "Base/Variables";
import styled, { css } from "styled-components";
import React from "react";
import { DynamicHeading } from "./DynamicHeading";
import { media } from "Base/Media";
import { capitalize } from "Base/Utilities";

const base = css`
  font-family: ${variable.headingFontFamily};
  text-transform: uppercase;
  line-height: 1.1;

  // Define the spacing
  ${(props) =>
    props.spacing
      ? `
         margin-bottom: calc(${
           variable["spacing" + capitalize(props.spacing)]
         } / 1.8);
    `
      : null};

  // Define how we align the text
  ${(props) =>
    props.theme
      ? `
       color: ${
         props.theme === "dark"
           ? variable.titleColorDark
           : variable.titleColorLight
       };
    `
      : null};

  ${(props) =>
    props.color
      ? `
       color: ${props.color};
    `
      : null};

  // Define how we align the text
  ${(props) =>
    props.align
      ? `
       text-align: ${props.align};
    `
      : null};

  // Define whether we use a text shadow
  ${(props) =>
    props.shadow
      ? `
       text-shadow: 0 2px 4px rgba(0,0,0,0.50);
    `
      : null};

  // Define the font-size
  ${(props) =>
    props.size === "large"
      ? `
         font-size: calc(${variable["title" + capitalize(props.size)]} / 1.4);
    `
      : props.size === "larger" || props.size === "largest"
      ? `
        font-size: calc(${variable["title" + capitalize(props.size)]} / 1.8);
        `
      : props.size === "smaller"
      ? `
         font-size: calc(${variable["title" + capitalize(props.size)]} / 1.2);
    `
      : props.size === "medium"
      ? `
         font-size: calc(${variable["title" + capitalize(props.size)]} / 1.2);
    `
      : null};

  ${media.larger_desktop`
        ${(props) =>
          props.size
            ? `
            font-size: ${variable["title" + capitalize(props.size)]};
        `
            : null};    
        
         ${(props) =>
           props.spacing
             ? `
             margin-bottom: ${variable["spacing" + capitalize(props.spacing)]};
        `
             : null};     
    `}
`;

const h1 = styled.h1`
  ${base}
`;

const h2 = styled.h2`
  ${base}
`;

const h3 = styled.h3`
  ${base}
`;

const h4 = styled.h4`
  ${base}
`;

const h6 = styled.h6`
  ${base}
`;

const h5 = styled.h5`
  ${base}
`;

const Headers = {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
};

/** @class Title
 *   relates to all base actions related to the @class Title
 *	Child components will exist within this component
 */
export default class Title extends React.Component {
  /** Render the component
   *	@param {props} returns the passed props of the class
   *	@param {state} returns the state of the class
   */
  render = (props) => {
    return DynamicHeading(this.props, Headers[this.props.tag]);
  };
}
