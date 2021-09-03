import React, { Component } from "react";
import Select from "react-select";
import * as variable from "Base/Variables";

export default class SelectBox extends Component {
  render() {
    const { value, options, handleChange, border, color } = this.props;

    return (
      <>
        <Select
          isSearchable={false}
          value={value}
          onChange={handleChange}
          options={options}
          placeholder={"Select hash rate"}
          styles={{
            container: (base) => ({
              ...base,
              display: "block",
              width: "100%",
              // border: "none",
              border: border,
              borderRadius: "5px",
              color: color,
            }),
            control: (base) => ({
              ...base,
              border: "none",
              height: 30,
              boxShadow: "none",
              color: color,
              background: "transparent",
            }),
            placeholder: (base) => ({
              ...base,
              fontWeight: variable.bold,
              fontSize: variable.textMedium,
              color: "#7d7c7c",
            }),
            singleValue: (base) => ({
              ...base,
              fontWeight: variable.bold,
              fontSize: variable.textMedium,
              color: color,
              background: "#04121E",
            }),
            menu: (base) => ({
              ...base,
              border: border,
              borderTop: "none",
              boxShadow: "none",
              marginTop: 0,
              color: color,
              background: "#04121E",
            }),
            menuList: (base) => ({
              ...base,
              border: "none",
              boxShadow: "none",
              background: "#04121E",
              color: color,
              padding: 0,
            }),
            option: (base) => ({
              ...base,
              fontWeight: variable.bold,
              fontSize: variable.textMedium,

              border: "none",
              boxShadow: "none",
              color: color,
              background: "#04121E",
            }),
            indicatorSeparator: (base) => ({
              ...base,
              display: "none",
            }),

            // dropdownIndicator: (base) => ({
            //   ...base,
            //   backgroundImage:
            //     "url(../../../../static/assets/images/caret_up.png)",
            //   backgroundRepeat: "no-repeat",
            //   zoom: "0.5",
            //   width: "60px",
            //   height: "30px",
            // }),
          }}
          // theme={(theme) => ({
          //   ...theme,
          //   border: "none",
          //   colors: {
          //     ...theme.colors,
          //     primary25: "white",
          //     primary: "#f7f7f8",
          //   },
          // })}
        />
      </>
    );
  }
}
