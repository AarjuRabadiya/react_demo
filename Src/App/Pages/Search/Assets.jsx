import React from "react";
import styled from "styled-components";
import { withTranslation } from "react-i18next";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import * as variable from "Base/Variables";
import Loader from "Components/Loader/Loader";
import rarible from "./assets/rarible.svg";
import opensealogo from "./assets/opensea-logo.png";

class Assets extends React.Component {
  render = () => {
    let { assets, isLoading, on_sale } = this.props;

    return (
      <React.Fragment>
        <Asset>
          {isLoading ? (
            <SkeletonTheme
              color={variable.Active}
              highlightColor={variable.CheckboxBorder}
            >
              <Skeleton
                count={20}
                height={350}
                width={250}
                style={{ margin: "20px" }}
              />
            </SkeletonTheme>
          ) : (
            assets.map((value, key) => {
              return (
                <AssetsCard key={key}>
                  {value.image_url || value.image ? (
                    <ImageDiv>
                      <Image
                        src={value.image_url ? value.image_url : value.image}
                        alt="assets image"
                      ></Image>
                    </ImageDiv>
                  ) : (
                    <BlankImageDiv>
                      <Loader />
                    </BlankImageDiv>
                  )}
                  {/* <ImageDiv>
                    <Image
                      src={value.image_url ? value.image_url : value.image}
                      alt="assets image"
                    ></Image>
                  </ImageDiv> */}
                  {value.type && (
                    <AssetInfo>
                      <Headding>Type: </Headding>
                      <ElipsDescription>
                        {value.type ? value.type : "-"}
                      </ElipsDescription>
                    </AssetInfo>
                  )}
                  <AssetInfo>
                    <Headding>Name: </Headding>
                    <ElipsDescription>
                      {value.name ? value.name : "-"}
                    </ElipsDescription>
                  </AssetInfo>
                  <AssetInfo>
                    <Headding>Hash Rate: </Headding>
                    <Description>
                      {value.hashrate ? value.hashrate : "-"}
                    </Description>
                  </AssetInfo>
                  <AssetInfo>
                    <Headding>
                      {value.token_id ? "Token Id: " : "Asset Id: "}
                    </Headding>
                    <ElipsDescription>
                      {value.token_id ? value.token_id : value.assetId}
                    </ElipsDescription>
                  </AssetInfo>
                  {/* {value.redirect_url !== null ||
                  value.rarible_redirect_url !== null ? ( */}

                  {value.redirect_url !== null && on_sale !== 0 && (
                    <AssetInfo>
                      <IconButton>
                        <ALink href={value.redirect_url} target="_blank">
                          {/* <Headding> Buy now: </Headding> */}
                          <OpenseaIcon>
                            {/* <ALink href={value.redirect_url} target="_blank"> */}
                            <img src={opensealogo} alt="" />
                            {/* </ALink> */}
                          </OpenseaIcon>
                          <Headding> Buy now </Headding>
                        </ALink>
                      </IconButton>
                    </AssetInfo>
                  )}

                  {value.rarible_redirect_url !== null && on_sale !== 0 && (
                    <AssetInfo>
                      <IconButton>
                        <ALink
                          href={value.rarible_redirect_url}
                          target="_blank"
                        >
                          <RaribleIcon>
                            <img src={rarible} alt="" />
                          </RaribleIcon>
                          <Headding> Buy now </Headding>
                        </ALink>
                      </IconButton>
                    </AssetInfo>
                  )}

                  {/* ) : (
                    <></>
                  )} */}
                </AssetsCard>
              );
            })
          )}
        </Asset>
      </React.Fragment>
    );
  };
}

const Asset = styled.div`
  display: block;
  padding: 20px;
  text-align: center;
`;
const AssetsCard = styled.div`
  //   width: calc(calc(100% - 80px) / 4);
  width: 250px;
  // background: #fff;
  background-color: ${variable.textColorDark};
  padding: 20px 10px;
  // border: 2px solid #072030;
  border: 2px solid ${variable.CheckboxBorder};
  border-radius: 10px;
  display: inline-block;
  margin: 10px;
  font-size: ${variable.textMedium};
  // cursor: pointer;
  :hover {
    // border: 1px solid ${variable.cancleButton};
    // box-shadow: rgb(0 0 0 / 25%) 0px 0px 10px 5px;
    // box-shadow: #a3c1d842 0px 0px 10px 5px;
    border: 1px solid ${variable.green};
    box-shadow: rgb(64 198 188 / 23%) 0px 0px 10px 5px;
  }
`;
const OpenseaIcon = styled.div`
  width: 30px;
  padding-right: 10px;
`;
const RaribleIcon = styled.div`
  // width: 19px;
  // margin: auto 10px;
  width: 30px;
  padding-right: 10px;
`;
const IconButton = styled.div`
  display: flex;
  border: 2px solid ${variable.CheckboxBorder};
  border-radius: 0 10px;
  padding: 5px 10px 2px 10px;
  cursor: pointer;
`;
const ImageDiv = styled.div`
  width: 145px;
  height: 230px;
  display: flex;
  margin: 5px auto;
`;
const BlankImageDiv = styled.div`
  width: 145px;
  height: 230px;
  margin: 5px auto;
  display: flex;
  justify-content: center;
`;
const Image = styled.img`
  object-fit: contain;
  object-position: center;
  align-self: center;
`;
const AssetInfo = styled.div`
  padding: 5px 0px;
  display: flex;
`;
const Headding = styled.div`
  font-weight: ${variable.bold};
  color: ${variable.whiteColor};
`;
// const RedirectURL = styled.div`
//   // width: 250px;
//   text-overflow: ellipsis;
//   overflow: hidden;
//   white-space: nowrap;
//   cursor: pointer;
//   color: ${variable.cancleButton};
// `;
const ALink = styled.a`
  text-decoration: none !important;
  color: ${variable.cancleButton};
  display: flex;
  :hover {
    text-decoration: none;
    cursor: pointer;
  }
`;
const Description = styled.div`
  // color: ${variable.silverText};
  color: ${variable.cancleButton};
  padding-left: 5px;
  text-align: left;
`;
const ElipsDescription = styled.div`
  color: ${variable.cancleButton};
  padding-left: 5px;
  text-align: left;
  white-space: nowrap;
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export default withTranslation()(Assets);
