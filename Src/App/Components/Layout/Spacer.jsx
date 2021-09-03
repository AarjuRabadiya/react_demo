import React from "react";
import styled from "styled-components";
import * as variable from "Base/Variables";
import { capitalize } from "Base/Utilities";

const Container = styled.div`
  // Define the spacing
  ${(props) =>
    props.spacing
      ? `
         margin: ${variable["spacing" + capitalize(props.spacing)]} 0;
    `
      : null};
`;

export default class Spacer extends React.Component {
  constructor(props) {
    super();
  }

  render = () => {
    const { type } = this.props;

    return <Container {...this.props} />;
  };
}
