import React from "react";
import { InlineWysiwyg } from "react-tinacms-editor";
import { BlocksControls, InlineTextarea } from "react-tinacms-inline";

/**
 * 1. Define the Block Component
 */
function FreeText({ index }) {
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <div className="wrapper wrapper--narrow">
        <InlineWysiwyg
          name="text"
          //focusRing={false}
          format="html"
          imageProps={{
            parse: (filename) =>
              `${process.env.STRAPI_URL}/uploads/${filename}`,
            uploadDir: `${process.env.STRAPI_URL}/uploads`,
          }}
        />
      </div>
    </BlocksControls>
  );
}

/**
 * 2. Define the Block
 */
export const freeTextBlock = {
  Component: FreeText,
  template: {
    label: "FreeText",
    defaultItem: {
      text: "Start writing. Change the world.",
    },
    fields: [],
  },
};
