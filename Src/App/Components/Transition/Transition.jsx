import React from "react";
import styled from "styled-components";
import gsap from "gsap";
import "./translation.scss";

export default class Transition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultDelay: 10,
    };

    this.element = null;
  }

  componentDidMount() {
    const { duration, delay } = this.props;
    const { defaultDelay } = this.state;

    let delayed = (duration * delay) / defaultDelay;

    gsap.fromTo(
      this.element,
      { opacity: 0 },
      { delay: delayed, duration: duration, opacity: 1, ease: "expo.inOut" }
    );
  }

  render = (props) => {
    return (
      <div className="transition-wrapper" ref={(div) => (this.element = div)}>
        {this.props.children}
      </div>
    );
  };
}
