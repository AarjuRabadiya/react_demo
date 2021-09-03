import React from "react";
import { withTranslation } from "react-i18next";
import * as variable from "Base/Variables";
import { media } from "Base/Media";
import Loader from "Components/Loader/Loader";
import "../../../main.scss";

class MiningTeamDetail extends React.PureComponent {
  constructor(props) {
    super();
  }

  render = () => {
    const { miningTeamDetails, dataLoading } = this.props;

    return (
      <div>
        {dataLoading ? (
          <Loader />
        ) : miningTeamDetails ? (
          miningTeamDetails.map((obj, key) => {
            return (
              <div className="panel-wrapper" key={key}>
                <div className="panel">
                  <div className="panel-inner">
                    <div className="panel-sub-inner">
                      <div className="table">
                        <div className="row">
                          <div className="image-div">
                            <img
                              src={obj.image ? obj.image : obj.image_url}
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="heading float-left">Category</div>
                          <div className="heading">:-</div>

                          <div className="col">
                            {obj.category ? obj.category : "-"}
                          </div>
                        </div>
                        <div className="row">
                          <div className="heading float-left">Name</div>
                          <div className="heading">:-</div>

                          <div className="col">{obj.name ? obj.name : "-"}</div>
                        </div>

                        {obj.type && (
                          <div className="row">
                            <div className="heading float-left">Type</div>
                            <div className="heading">:-</div>

                            <div className="col">
                              {obj.type ? obj.type : "-"}
                            </div>
                          </div>
                        )}
                        {obj.hashrate && (
                          <div className="row">
                            <div className="heading float-left">Hashrate</div>
                            <div className="heading">:-</div>

                            <div className="col">
                              {obj.hashrate ? obj.hashrate : "-"}
                            </div>
                          </div>
                        )}
                        {(obj.assetDescriptor || obj.description) && (
                          <div className="row">
                            <div className="heading float-left">
                              Asset Descriptor
                            </div>
                            <div className="heading">:-</div>

                            <div className="col">
                              {obj.assetDescriptor
                                ? obj.assetDescriptor
                                : obj.description
                                ? obj.description
                                : "-"}
                            </div>
                          </div>
                        )}
                        {obj.desc && (
                          <div className="row">
                            <div className="heading float-left">Desc</div>
                            <div className="heading">:-</div>
                            <div className="col">
                              {obj.desc ? obj.desc : "-"}
                            </div>
                          </div>
                        )}
                        {obj.capacity && (
                          <div className="row">
                            <div className="heading float-left">Capacity</div>
                            <div className="heading">:-</div>
                            <div className="col">
                              {obj.capacity ? obj.capacity : "-"}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : null}
      </div>
    );
  };
}

export default withTranslation()(MiningTeamDetail);
