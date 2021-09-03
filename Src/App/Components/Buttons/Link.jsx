import React from "react";
import styled from "styled-components";
import * as variable from "Base/Variables";

import { media, sizes } from "Base/Media";

const Container = styled.a`
  color: ${variable.green};
  font-family: ${variable.bodyFontFamily};
  text-decoration: underline;
  font-size: ${variable.textSmall};
`;

export default class Link extends React.Component {
  constructor(props) {
    super();
  }

  render = () => {
    const { type } = this.props;

    return <Container {...this.props} />;
  };
}
