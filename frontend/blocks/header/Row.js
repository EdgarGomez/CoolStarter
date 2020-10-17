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
  flex_direction_mobile,
  flex_direction_desktop,
  flex_justify_mobile,
  flex_align_mobile,
  flex_justify_desktop,
  flex_align_desktop,
  margin_mobile,
  margin_top_desktop,
  margin_bottom_desktop,
  margin_horizontal_desktop,
}) {
  let inlineBlockClasses = "DELETECLASS flex w-full h-full";

  /* PADDING - Pending to Make it custom TODO  */
  inlineBlockClasses += "p-1 ";
  /* HEIGHT - Pending to Make it custom TODO  */
  inlineBlockClasses += "ntw-min-height ";

  /* CONTAINER */
  if (container) {
    inlineBlockClasses += "my-0 mx-auto container ";
  } else {
    inlineBlockClasses += margin_horizontal_desktop + " ";
  }

  /* MARGIN */
  inlineBlockClasses +=
    margin_mobile +
    " " +
    margin_top_desktop +
    " " +
    margin_bottom_desktop +
    " ";

  /* ROW STRUCTURE */
  inlineBlockClasses +=
    flex_direction_mobile + " " + flex_direction_desktop + " ";
  inlineBlockClasses += flex_justify_mobile + " " + flex_justify_desktop + " ";
  inlineBlockClasses += flex_align_mobile + " " + flex_align_desktop + " ";

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
      background_color: "#EDF2F7",
      container: false,
      margin_mobile: "m-0",
      margin_top_desktop: "mt-0",
      margin_bottom_desktop: "mb-0",
      margin_horizontal_desktop: "ml-0 mr-0",
      flex_direction_mobile: "flex-column",
      flex_direction_desktop: "md:flex-row",
      flex_justify_mobile: "justify-start",
      flex_align_mobile: "items-center",
      flex_justify_desktop: "md:justify-start",
      flex_align_desktop: "md:items-center",
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
        name: "margin_mobile",
        label: "Margin Mobile",
        component: "select",
        options: [
          {
            value: "mt-0",
            label: "None",
          },
          {
            value: "margin-mobile-small",
            label: "Small",
          },
          {
            value: "margin-mobile-medium",
            label: "Medium",
          },
          {
            value: "margin-mobile-big",
            label: "Big",
          },
        ],
      },
      {
        name: "margin_top_desktop",
        label: "Margin Top",
        component: "select",
        options: [
          {
            value: "mt-0",
            label: "None",
          },
          {
            value: "margin-top-small",
            label: "Small",
          },
          {
            value: "margin-top-medium",
            label: "Medium",
          },
          {
            value: "margin-top-big",
            label: "Big",
          },
        ],
      },
      {
        name: "margin_bottom_desktop",
        label: "Margin Bottom",
        component: "select",
        options: [
          {
            value: "mb-0",
            label: "None",
          },
          {
            value: "margin-bottom-small",
            label: "Small",
          },
          {
            value: "margin-bottom-medium",
            label: "Medium",
          },
          {
            value: "margin-bottom-big",
            label: "Big",
          },
        ],
      },
      {
        name: "margin_horizontal_desktop",
        label:
          "Margin Horizontal (only if no container options its selected TODO)",
        component: "select",
        options: [
          {
            value: "ml-0 mr-0",
            label: "None",
          },
          {
            value: "margin-left-small margin-right-small",
            label: "Small",
          },
          {
            value: "margin-left-medium margin-right-medium",
            label: "Medium",
          },
          {
            value: "margin-left-big margin-right-big",
            label: "Big",
          },
        ],
      },
      {
        name: "flex_direction_mobile",
        label: "Content direction Mobile",
        component: "select",
        options: [
          {
            value: "flex-row",
            label: "Row",
          },
          {
            value: "flex-col",
            label: "Column",
          },
        ],
      },
      {
        name: "flex_direction_desktop",
        label: "Content direction Desktop",
        component: "select",
        options: [
          {
            value: "md:flex-row",
            label: "Row",
          },
          {
            value: "md:flex-col",
            label: "Column",
          },
        ],
      },
      {
        name: "flex_justify_mobile",
        label: "Content horizontal alignment Mobile",
        component: "select",
        options: [
          {
            value: "justify-center",
            label: "Centered",
          },
          {
            value: "justify-start",
            label: "Align left",
          },
          {
            value: "justify-end",
            label: "Align right",
          },
          {
            value: "justify-between",
            label: "Full line",
          },
        ],
      },
      {
        name: "flex_justify_desktop",
        label: "Content horizontal alignment Desktop",
        component: "select",
        options: [
          {
            value: "md:justify-center",
            label: "Centered",
          },
          {
            value: "md:justify-start",
            label: "Align left",
          },
          {
            value: "md:justify-end",
            label: "Align right",
          },
          {
            value: "md:justify-between",
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
            value: "items-center",
            label: "Centered",
          },
          {
            value: "items-start",
            label: "Align top",
          },
          {
            value: "items-end",
            label: "Align bottom",
          },
        ],
      },
      {
        name: "flex_align_desktop",
        label: "Content vertical alignment Desktop",
        component: "select",
        options: [
          {
            value: "md:items-center",
            label: "Centered",
          },
          {
            value: "md:items-start",
            label: "Align top",
          },
          {
            value: "md:items-end",
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
