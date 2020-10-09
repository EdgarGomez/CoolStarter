import React from "react";
import { BlocksControls, InlineBlocks } from "react-tinacms-inline";
import { logoBlock } from "./Logo";
import Container from "../../components/container";
import { Flex } from "@chakra-ui/core";

/**
 * 1. Define the Block Component
 */
function Row({
  background_color,
  container,
  flex_direction,
  flex_direction_desktop,
  flex_justify_mobile,
  flex_align_mobile,
}) {
  let inlineBlockClasses;

  if (container) {
    inlineBlockClasses = "flex container ";
  } else {
    inlineBlockClasses = "flex width-full ";
  }

  if (flex_direction == "column") {
    inlineBlockClasses += "flex-direction-mobile-column ";
  } else {
    inlineBlockClasses += "flex-direction-mobile-row ";
  }

  if (flex_direction_desktop == "column") {
    inlineBlockClasses += "flex-direction-desktop-column ";
  } else {
    inlineBlockClasses += "flex-direction-desktop-row ";
  }

  inlineBlockClasses += flex_justify_mobile + " " + flex_align_mobile + " ";

  return (
    <Flex width="100%" bg={background_color}>
      <InlineBlocks
        name="row"
        blocks={ROW_BLOCKS}
        direction="vertical"
        className="flex"
        className={inlineBlockClasses}
        max={6}
        min={3}
      />
    </Flex>
  );
}

/**
 * 2. Define the FeatureList Block
 */
export const rowBlock = {
  Component: ({ index, data }) => (
    <BlocksControls
      index={index}
      focusRing={{ offset: 20 }}
      insetControls={true}
    >
      <Row {...data} />
    </BlocksControls>
  ),
  template: {
    label: "Row",
    defaultItem: {
      background_color: "#000",
      container: false,
      flex_direction: "row",
      flex_direction_desktop: "row",
      flex_justify_mobile: "flex-justify-center",
      flex_align_mobile: "flex-align-center",
    },
    fields: [
      {
        name: "background_color",
        label: "BG Color",
        component: "color",
      },
      {
        name: "container",
        label: "Container",
        component: "toggle",
      },
      {
        name: "flex_direction",
        label: "Content direction Mobile",
        component: "select",
        options: [
          {
            value: "row",
            label: "horizontal",
          },
          {
            value: "column",
            label: "vertical",
          },
        ],
      },
      {
        name: "flex_direction_desktop",
        label: "Content direction Desktop",
        component: "select",
        options: [
          {
            value: "row",
            label: "Horizontal",
          },
          {
            value: "column",
            label: "Vertical",
          },
        ],
      },
      {
        name: "flex_justify_mobile",
        label: "Content horizontal alignment Mobile",
        component: "select",
        options: [
          {
            value: "flex-justify-center",
            label: "Centered",
          },
          {
            value: "flex-justify-left",
            label: "Align left",
          },
          {
            value: "flex-justify-right",
            label: "Align right",
          },
          {
            value: "flex-justify-space",
            label: "Full line",
          },
        ],
      },
      {
        name: "flex_align_mobile",
        label: "Content vertical alignment Mobile",
        component: "select",
        options: [
          {
            value: "flex-align-center",
            label: "Centered",
          },
          {
            value: "flex-align-top",
            label: "Align top",
          },
          {
            value: "flex-align-bottom",
            label: "Align bottom",
          },
        ],
      },
    ],
  },
};

/**
 * 3. Define the block options
 * for FeatureList to render, we will add
 * a block to this next
 */
const ROW_BLOCKS = {
  logo: logoBlock,
};
