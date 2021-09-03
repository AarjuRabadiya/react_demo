import React from "react";
import styled from "styled-components";
import { withTranslation } from "react-i18next";
import * as variable from "Base/Variables";
import Loader from "Components/Loader/Loader";
import "../../../main.scss";

class UserTable extends React.PureComponent {
  constructor(props) {
    super();
  }

  render = () => {
    const { data, dataLoading, button } = this.props;

    return (
      <div className="user-table">
        {dataLoading ? (
          <Loader />
        ) : data ? (
          <div className="table">
            <div className="row">
              <div className="heading">Email :-</div>
              <div className="col">{data.email ? data.email : "-"}</div>
            </div>
            <div className="row">
              <div className="heading">User name :-</div>
              <div className="col">{data.username ? data.username : "-"}</div>
            </div>
            <div className="row">
              <div className="heading">Facebook id :-</div>
              <div className="col">
                {data.facebook_id ? data.facebook_id : "-"}
              </div>
            </div>
            <div className="row">
              <div className="heading">Google id :-</div>
              <div className="col">{data.google_id ? data.google_id : "-"}</div>
            </div>
            <div className="row">
              <div className="heading">Meta mask address :-</div>
              <div className="col">
                {data.mm_address ? data.mm_address : "-"}
              </div>
            </div>
            <div className="row">
              <div className="heading">Your boost :-</div>
              <div className="col">{data.boost ? data.boost : "-"}</div>
            </div>
          </div>
        ) : null}
      </div>
    );
  };
}

const Table = styled.div``;

const TableHeading = styled.div`
  font-family: ${variable.bodyFontFamily};
  color: ${variable.white};
  opacity: 1;
  padding: ${variable.spacingSmall};

  text-align: left;
  font-weight: 600;
`;
const TableRow = styled.div`
  display: flex;
  border-bottom: 1px solid ${variable.green};
`;

const TableCol = styled.div`
  font-family: ${variable.bodyFontFamily};
  color: ${variable.white};
  opacity: 1;
  padding: ${variable.spacingSmall};

  text-align: left;
  font-weight: 600;
`;

const Container = styled.div``;

export default withTranslation()(UserTable);
