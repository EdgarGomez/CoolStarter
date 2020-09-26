import React from "react";
import { BlocksControls, InlineImage } from "react-tinacms-inline";

/**
 * 1. Define the Block Component
 */
function Images({ index }) {
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <div className="wrapper">
        <div className="image-diptych">
          <InlineImage
            name="left.src"
            previewSrc={(formValues) => {
              const result = `${process.env.STRAPI_URL}${formValues.blocks[index].left.src}`;
              return result;
            }}
            uploadDir={() => {
              return "/uploads";
            }}
            parse={(filename) => {
              return `/uploads/${filename}`;
            }}
            focusRing={false}
          />
          <InlineImage
            name="right.src"
            previewSrc={(formValues) => {
              const result = `${process.env.STRAPI_URL}${formValues.blocks[index].right.src}`;
              return result;
            }}
            uploadDir={() => {
              return "/uploads";
            }}
            parse={(filename) => {
              return `/uploads/${filename}`;
            }}
            focusRing={false}
          />
        </div>
      </div>
    </BlocksControls>
  );
}

/**
 * 2. Define the Block with
 *  the Template and Component
 */
export const imagesBlock = {
  Component: Images,
  template: {
    label: "Image Diptych",
    defaultItem: {
      _template: "images",
      left: {
        src: "/uploads/ivan_bandura_unsplash_square_0369de3ace.jpg",
        alt: "ocean",
      },
      right: {
        src: "/uploads/martin_sanchez_unsplash_square_cdac9ddee7.jpg",
        alt: "dunes",
      },
    },
    fields: [
      {
        name: "left.src",
        label: "Left-Hand Image",
        component: "image",
        parse: (filename) => `/uploads/${filename}`,
        uploadDir: () => "/uploads",
        previewSrc: (formValues, input) => {
          const index = input.field.name.split(".")[1];
          const result = `${process.env.STRAPI_URL}${formValues.blocks[index].left.src}`;
          return result;
        },

        focusRing: false,
      },
      {
        name: "left.alt",
        label: "Left-Hand Image Alt Text",
        component: "text",
      },
      {
        name: "right.src",
        label: "Right-Hand Image",
        component: "image",
        parse: (filename) => `/uploads/${filename}`,
        uploadDir: () => "/uploads",
        previewSrc: (formValues, input) => {
          const index = input.field.name.split(".")[1];
          const result = `${process.env.STRAPI_URL}${formValues.blocks[index].right.src}`;
          return result;
        },

        focusRing: false,
      },
      {
        name: "right.alt",
        label: "Right-Hand Image Alt Text",
        component: "text",
      },
    ],
  },
};
