import React from "react";
import "./input.scss";

export default class Input extends React.Component {
  constructor(props) {
    super();
  }

  render = () => {
    return <input {...this.props} />;
  };
}
