import React from "react";
import styled from "styled-components";
import i18n from "i18next";
import * as variable from "Base/Variables";
import { media } from "Base/Media";
import Transition from "Components/Transition/Transition";
import Text from "Components/Typography/Text";
import TitleTypography from "Components/Typography/Title";
import Menu from "Components/Menu/Menu";
import Button from "Components/Buttons/Button";
import "./layout.scss";

const LayoutWrapper = styled.section`
  // width: 100vw;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  margin: auto;

  ${media.desktop`
    display: flex;
  `}
`;

const Content = styled.div`
  width: 100vw;
  padding: calc(${variable.spacingSmall} * 2);

  ${media.desktop`
    margin-left: 30vw;
    width: 80vw;
    padding: ${variable.spacingLarger} ${variable.spacingLarge};
  `}

  ${media.large_desktop`
    margin-left: 20vw;
    padding: ${variable.spacingLarge};
  `}

  ${media.largest_desktop`
    padding: ${variable.spacingLarger} ${variable.spacingLargest};
  `}
`;
const ButtonMM = styled(Button)`
  font-size: ${variable.textSmall};
  margin-left: auto;
  margin-top: auto;
  margin-bottom: auto;
  width: 20%;
`;
export default class Layout extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render = (props) => {
    const { title, description, meta, mm_title, mm_address } = this.props;
    console.log("i18n.............", i18n.language);
    return (
      <div className="layout-wrapper" {...this.props}>
        <Menu
          i18n={i18n}
          changeLanguage={(e) => this.props.changeLanguage(e)}
        />

        <div className="content">
          <React.Fragment>
            {mm_address === null && (
              <Transition duration={3}>
                <ButtonMM
                  onClick={(e) => this.props.connectMetaMask(e)}
                  theme="metamask"
                  href="#"
                >
                  {mm_title}
                </ButtonMM>
              </Transition>
            )}
            {meta ? (
              <Transition duration={2}>
                <Text
                  textTransform="uppercase"
                  tag="span"
                  color={variable.purple}
                  spacing="large"
                  weight="500"
                  size="small"
                  spacing="smaller"
                >
                  {meta}
                </Text>
              </Transition>
            ) : null}
          </React.Fragment>

          {title ? (
            <Transition duration={2}>
              <TitleTypography
                theme="light"
                shadow={true}
                tag="h1"
                align="left"
                spacing="small"
                size="larger"
                color={variable.greenLight}
              >
                {title}
              </TitleTypography>
            </Transition>
          ) : null}

          {description ? (
            <Transition duration={2}>
              <Text
                tag="p"
                color={variable.white}
                spacing="large"
                weight="500"
                size="large"
                spacing="large"
              >
                {description}
              </Text>
            </Transition>
          ) : null}

          {this.props.children}
        </div>
      </div>
    );
  };
}
