import React from "react";
import styled from "styled-components";
import * as variable from "Base/Variables";

import { withTranslation } from "react-i18next";

import Title from "Components/Typography/Title";
import Button from "Components/Buttons/Button";

class Model extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      closed: true,
    };
  }

  closeEvent = (e) => {
    e.preventDefault();
    this.setState({ closed: true });
  };

  componentDidMount() {
    const { closed } = this.props;
    this.setState({ closed: closed });
  }

  render = () => {
    const { title, buttonTitle } = this.props;
    const { closed } = this.state;

    return (
      <Container {...this.props} closed={closed}>
        <ContainerInner>
          {title && (
            <Title
              theme="light"
              shadow={false}
              tag="h2"
              align="left"
              spacing="small"
              size="smaller"
              color={variable.black}
            >
              {title}
            </Title>
          )}
          {this.props.children}
          {buttonTitle && (
            <Button
              onClick={(e) => this.closeEvent(e)}
              theme="purple"
              href="#"
              width="auto"
              size="wide"
            >
              {buttonTitle}
            </Button>
          )}
        </ContainerInner>
      </Container>
    );
  };
}

const Container = styled.div`
  width: 80%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 40;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.closed
      ? `
        display: none;
    `
      : null}
`;

const ContainerInner = styled.div`
  max-width: 65rem;
  background-color: ${variable.green};
  padding: ${variable.spacingLarge};
`;

export default withTranslation()(Model);
