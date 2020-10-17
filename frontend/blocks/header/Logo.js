import React from "react";
import { BlocksControls, InlineTextarea } from "react-tinacms-inline";

function Logo({ index }) {
  return (
    <div className="logo">
      <p
        style={{
          color: "#b51347",
        }}
      >
        Logoooooo.
      </p>
    </div>
  );
}

export const logoBlock = {
  Component: Logo,
  template: {
    label: "Logo",
    defaultItem: {
      _template: "logo",
    },
    fields: [],
  },
};
