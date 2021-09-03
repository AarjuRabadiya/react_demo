import React from "react";
import styled from "styled-components";
import { withTranslation } from "react-i18next";

class AssetsDetails extends React.PureComponent {
  constructor(props) {
    super();
  }

  render = () => {
    const { selectTable, assets } = this.props;

    return (
      <>
        {assets.map((obj, key) => {
          return (
            <MainSection
              key={key}
              onClick={(e) => this.props.openAsset(obj, selectTable)}
            >
              <SubSection>
                <ImageDiv>
                  <img
                    src={this.props.checkImageExists(obj.table_name)}
                    alt=""
                  />
                </ImageDiv>
                <Description>
                  {obj.table_name ? obj.table_name : "-"}
                </Description>
              </SubSection>
            </MainSection>
          );
        })}
      </>
    );
  };
}
const ImageDiv = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
`;
const Description = styled.div`
  margin-top: 10px;
  white-space: nowrap;
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const SubSection = styled.div`
  clip-path: polygon(0 0%, 95% 0, 100% 30px, 100% 100%, 2% 100%, 0 100%, 0 0%);
  background-color: rgba(0, 0, 0, 0.8);
  padding: 1.6rem 1.6rem;
  cursor: pointer;
  text-align: center;
`;
const MainSection = styled.div`
  clip-path: polygon(0 0%, 95% 0, 100% 30px, 100% 100%, 2% 100%, 0 100%, 0 0%);
  background-image: linear-gradient(136deg, #8c14cf 0%, #01c3c5 100%);
  padding: 0.2rem;
  display: inline-block;
  margin: 10px;
  ${(props) =>
    props.active
      ? `
      background-image: linear-gradient(to right,#00ffe6 0%,#00fffd 100%)
    `
      : null}
`;
export default withTranslation()(AssetsDetails);
