import React from "react";
import styled from "styled-components";
import * as variable from "Base/Variables";

const HamburgerContainer = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const HamburgerLine = styled.div`
  width: 30px;
  height: 2px;
  background-color: ${variable.green};
  display: block;
  margin: 8px 0 0;
  transition: all 0.3s ease-in-out;

  ${(props) =>
    props.active
      ? `
        &:nth-child(2) {
            opacity: 0;
        }    
        
        &:nth-child(1) {
            transform: translateY(13px) rotate(45deg);
        }
        &:nth-child(3) {
            transform: translateY(-7px) rotate(-45deg);
        }

    `
      : null};
`;

class Hamburger extends React.Component {
  constructor(props) {
    super(props);
  }
  render = () => {
    return (
      <HamburgerContainer {...this.props}>
        <HamburgerLine active={this.props.active}></HamburgerLine>
        <HamburgerLine active={this.props.active}></HamburgerLine>
        <HamburgerLine active={this.props.active}></HamburgerLine>
      </HamburgerContainer>
    );
  };
}

export default Hamburger;
