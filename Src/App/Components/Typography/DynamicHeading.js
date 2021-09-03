import React from "react";

export const DynamicHeading = (props, Component) => {
  let tag = Component.withComponent(props.tag);
  return React.createElement(tag, props);
};
