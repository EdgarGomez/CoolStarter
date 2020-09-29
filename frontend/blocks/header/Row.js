import React from "react";
import { BlocksControls, InlineBlocks } from "react-tinacms-inline";
import { featureBlock } from "../Feature";

/**
 * 1. Define the Block Component
 */
function Row({ index }) {
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <div className="wrapper">
        <InlineBlocks
          name="row"
          blocks={ROW_BLOCKS}
          direction="horizontal"
          className="feature-list"
          max={6}
          min={3}
        />
      </div>
    </BlocksControls>
  );
}

/**
 * 2. Define the FeatureList Block
 */
export const rowBlock = {
  Component: Row,
  template: {
    label: "Row",
    fields: [],
  },
};

/**
 * 3. Define the block options
 * for FeatureList to render, we will add
 * a block to this next
 */
const ROW_BLOCKS = {
  feature: featureBlock,
};
