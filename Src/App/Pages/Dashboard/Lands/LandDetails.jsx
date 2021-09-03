import React from "react";
import { withTranslation } from "react-i18next";
import Loader from "react-loader-spinner";
import ExpandLandDetails from "./ExpandLandDetails";
import "./lands.scss";

class LandDetails extends React.PureComponent {
  constructor(props) {
    super();
    this.state = {
      isOpen: false,
      openData: {},
    };
  }
  open = (obj) => {
    this.setState({
      isOpen: true,
      openData: obj,
    });
  };
  clearState = () => {
    this.setState({
      isOpen: false,
      openData: {},
    });
  };
  render = () => {
    const { data, landType, isPublic, editPayload } = this.props;
    let { isOpen, openData } = this.state;

    return (
      <>
        {data.length !== 0 &&
          data.map((obj, key) => {
            return (
              <div
                className="main-section"
                key={key}
                onClick={(e) => this.open(obj)}
              >
                <div className="sub-section">
                  <div className="image-div">
                    <img src={obj.image_url} alt="" />
                  </div>
                  <div className="description">{obj.name ? obj.name : "-"}</div>
                  {landType === "my_land" && (
                    <div className="formRow">
                      <button
                        className="green"
                        onClick={() => this.props.editLandDetail(obj)}
                      >
                        {editPayload.id === obj._id && isPublic ? (
                          <Loader
                            type="Oval"
                            color="#000"
                            width="20"
                            height="20"
                          />
                        ) : obj.is_public ? (
                          "private"
                        ) : (
                          "public"
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        {landType !== "my_land" && isOpen && (
          <ExpandLandDetails
            clearState={() => this.clearState()}
            data={openData}
          />
        )}
      </>
    );
  };
}

export default withTranslation()(LandDetails);
