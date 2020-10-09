import React from "react";
import { BlocksControls, InlineTextarea } from "react-tinacms-inline";

function Logo({ index }) {
  return (
    <BlocksControls
      index={index}
      focusRing={{ offset: 0 }}
      insetControls={true}
    >
      <div className="logo">
        <p
          style={{
            color: "#b51347",
          }}
        >
          Logoooooo
        </p>
      </div>
    </BlocksControls>
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
