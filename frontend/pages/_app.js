import "../styles/index.css";
import { withTina, useScreenPlugin } from "tinacms";
import { MarkdownFieldPlugin, HtmlFieldPlugin } from "react-tinacms-editor";
import { DateFieldPlugin } from "react-tinacms-date";
import authorsApi from "../lib/authors-api";
import postsApi from "../lib/posts-api";
import { useRouter } from "next/router";
import {
  StrapiMediaStore,
  StrapiProvider,
  StrapiClient,
} from "react-tinacms-strapi";
import { ChakraProvider, theme } from "@chakra-ui/core";

import { merge } from "@chakra-ui/utils";

//blocks
import "../styles/hero.css";
import "../styles/paragraph.css";
import "../styles/images.css";
import "../styles/features.css";

const customTheme = merge(theme, {
  colors: {
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
    },
  },
});

const getAllAuthors = () => {
  const authors = authorsApi.getAll();
  console.log("authors", authors.data);
  return authors.data;
};

const newPost = {
  __type: "content-creator",
  name: "New blog post",
  fields: [
    {
      label: "Title",
      name: "title",
      component: "text",
      validation(title) {
        if (!title) return "Required.";
      },
    },
    {
      label: "Slug",
      name: "slug",
      component: "text",
      validation(slug) {
        if (!slug) return "Required.";
      },
    },
    {
      name: "date",
      label: "Date",
      component: "date",
      dateFormat: "MMMM DD YYYY",
      timeFormat: false,
    },
    {
      component: "select",
      name: "author",
      label: "Author",
      description: "Select the author of this post",
      options: [
        {
          id: 1,
          label: "John Doe",
        },
        {
          id: 2,
          label: "Edgar",
        },
      ],
    },
    {
      label: "Excerpt",
      name: "excerpt",
      component: "text",
    },
    {
      name: "content",
      label: "Content",
      component: "markdown",
    },
    {
      name: "coverImage",
      label: "Thumbnail",
      component: "image",

      uploadDir: () => {
        return "/uploads";
      },
      parse: (filename) => `/uploads/${filename}`,
    },
  ],
  onSubmit: async (values, cms) => {
    //console.log("values", { title: values.title, content: values.content });
    //alert(`Submitting ${values.title}`);
    await postsApi
      .create(values)
      .then((response) => {
        cms.alerts.success("Changes Saved");
      })
      .catch((e) => {
        console.log(e);
        cms.alerts.error("Error saving changes");
      });
  },
};

const DesignPlugin = {
  name: "Design options",
  Component() {
    return <h1>Design options</h1>;
  },
  Icon: () => <span>🦙</span>,
};

function MyApp({ Component, pageProps }) {
  useScreenPlugin(DesignPlugin);
  return (
    <ChakraProvider resetCSS theme={customTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default withTina(MyApp, {
  enabled: true,
  toolbar: { hidden: false },
  sidebar: true,
  media: {
    store: new StrapiMediaStore("http://localhost:1337"),
  },
  plugins: [MarkdownFieldPlugin, HtmlFieldPlugin, newPost, DateFieldPlugin],
});
