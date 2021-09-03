import React from "react";
import styled from "styled-components";
import * as variable from "Base/Variables";

import { media } from "Base/Media";

const ContainerWrapper = styled.section`
  width: 100%;
  max-width: ${variable.maxWidth};
  margin: 0 auto;

  ${(props) =>
    props.type === "full"
      ? `
        max-width:100%;
        padding:0 ${variable.spacingSmall};
    `
      : null};

  ${(props) =>
    props.type === "large"
      ? `
        width:100%;
        max-width:1800px;
        padding:0 ${variable.spacingSmall};
    `
      : null};

  ${media.tablet`
        ${(props) =>
          props.type === "large"
            ? `
            width:90%;
        `
            : null};
    `};

  padding: ${variable.spacingSmall};

  ${media.tablet`
        padding: ${(props) =>
          props.spacing
            ? variable[
                "spacing" +
                  props.spacing.charAt(0).toUpperCase() +
                  props.spacing.substr(1).toLowerCase()
              ]
            : 0};
    `};
`;

export default class Container extends React.Component {
  constructor(props) {
    super(props);
  }

  render = (props) => {
    return (
      <ContainerWrapper {...this.props}>{this.props.children}</ContainerWrapper>
    );
  };
}
