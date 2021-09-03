import React from "react";

export default class Icon extends React.Component {
  constructor(props) {
    super(props);
  }

  render = (props) => {
    const { width, height, path, fill, className } = this.props;

    return (
      <svg
        className={className}
        viewBox={"0 0 " + width + " " + height}
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
      >
        <path fill={fill} fillRule="evenodd" d={path} />
      </svg>
    );
  };
}
