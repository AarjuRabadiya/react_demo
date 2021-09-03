import * as variable from "Base/Variables";
import React from "react";
import styled, { css } from "styled-components";
import { media } from "Base/Media";

const base = css`    
    font-size: ${variable.textSmall};
    margin:0;
    width: ${(props) => (props.width ? props.width : null)}
    display: inline-block;
    font-family:${variable.bodyFontFamily};
    text-align:${(props) => (props.align ? props.align : "left")};
    margin-bottom: ${variable.spacingSmall};
    color:${(props) => (props.color ? props.color : variable.white)};
    color:${(props) =>
      props.theme === "dark"
        ? variable.textColorDark
        : !props.color
        ? variable.textColorLight
        : null};
    max-width:${(props) => (props.width ? props.width + "px" : null)};
    line-height:1.4;
    font-weight:${(props) => (props.weight ? props.weight : null)};
    text-transform: ${(props) =>
      props.textTransform ? props.textTransform : null};
    letter-spacing: ${(props) =>
      props.letterSpacing
        ? variable[
            "letterSpacing" +
              props.letterSpacing.charAt(0).toUpperCase() +
              props.letterSpacing.substr(1).toLowerCase()
          ]
        : null};
    
    ${media.tablet`
        font-size:${(props) =>
          props.size
            ? variable[
                "text" +
                  props.size.charAt(0).toUpperCase() +
                  props.size.substr(1).toLowerCase()
              ]
            : variable.textLarge};
    `}
    
    ${media.desktop`
        margin-bottom:${(props) =>
          props.spacing
            ? variable[
                "spacing" +
                  props.spacing.charAt(0).toUpperCase() +
                  props.spacing.substr(1).toLowerCase()
              ]
            : null};
    `}
`;

const p = styled.p`
  ${base}
`;
const span = styled.span`
  ${base}
`;
const div = styled.div`
  ${base}
`;

const Components = {
  p,
  span,
  div,
};

/** @class Text
 *   relates to all base actions related to the Paragraphs
 *	Child components will exist within this component
 */
export default class Text extends React.Component {
  /** Render the component
   *	@param {props} returns the passed props of the class
   *	@param {state} returns the state of the class
   */

  render = (props) => {
    let tag = Components[this.props.tag ? this.props.tag : "p"].withComponent(
      this.props.tag ? this.props.tag : "p"
    );
    return React.createElement(tag, { ...this.props });
  };
}
