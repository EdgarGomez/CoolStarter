import "../styles/index.css";
import { withTina, useScreenPlugin } from "tinacms";
import { MarkdownFieldPlugin, HtmlFieldPlugin } from "react-tinacms-editor";
import { DateFieldPlugin } from "react-tinacms-date";
import authorsApi from "../lib/authors-api";
import postsApi from "../lib/posts-api";
import pagesApi from "../lib/pages-api";
import uploadsApi from "../lib/uploads-api";
import { useRouter, withRouter } from "next/router";
import {
  StrapiMediaStore,
  StrapiProvider,
  StrapiClient,
} from "react-tinacms-strapi";
import { SMediaStore } from "../lib/media-store";
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
    },
    {
      label: "Slug",
      name: "slug",
      component: "text",
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
          value: "1",
          label: "John Doe",
        },
        {
          value: "2",
          label: "Edgar",
        },
      ],
    },
    {
      name: "published",
      component: "toggle",
      label: "Published",
      description: "Check to mark this to publish the post.",
    },
    {
      label: "Excerpt",
      name: "excerpt",
      component: "markdown",
    },
    {
      name: "coverImage.url",
      label: "Cover Image",
      component: "image",

      parse: (filename) => `/uploads/${filename}`,
      uploadDir: () => "/uploads",
      /*previewSrc: (formValues) => {
        console.log("valores de la subida", formValues);
        const result = `${process.env.STRAPI_URL}${formValues.coverImage.url}`;
        return result;
      },*/
    },
  ],
  onSubmit: async (values, cms) => {
    const uploadImage = await uploadsApi.findByUrl(values.coverImage.url);
    values.coverImage.id = uploadImage.data[0].id;

    if (!values.date) {
      values.date = new Date();
    }
    console.log("new post values", values);
    await postsApi
      .create(values)
      .then((response) => {
        cms.alerts.success("Changes Saved");
        window.location.href = `/blog/${values.slug}`;
      })
      .catch((e) => {
        console.log(e);
        cms.alerts.error("Error saving changes");
      });
  },
};

const newPage = {
  __type: "content-creator",
  name: "New Page",
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
      name: "_",
      component: () => (
        <div>
          <p>Please visit the new page to edit the content.</p>
        </div>
      ),
    },
  ],
  onSubmit: async (values, cms) => {
    //console.log("values", { title: values.title, content: values.content });
    //alert(`Submitting ${values.title}`);
    await pagesApi
      .create(values)
      .then((response) => {
        cms.alerts.success("Changes Saved");
        window.location.href = `/${values.slug}`;
      })
      .catch((e) => {
        console.log(e);
        cms.alerts.error("Error saving changes");
      });
  },
};

/*const DesignPlugin = {
  name: "Design options",
  Component() {
    return <h1>Design options</h1>;
  },
  Icon: () => <span>🦙</span>,
};*/

function MyApp({ Component, pageProps }) {
  //useScreenPlugin(DesignPlugin);
  return (
    <ChakraProvider resetCSS theme={customTheme}>
      <StrapiProvider>
        <Component {...pageProps} />
      </StrapiProvider>
    </ChakraProvider>
  );
}

export default withTina(MyApp, {
  enabled: true,
  //toolbar: { hidden: false },
  sidebar: true,
  plugins: [
    MarkdownFieldPlugin,
    HtmlFieldPlugin,
    newPost,
    newPage,
    DateFieldPlugin,
  ],
  media: {
    store: new SMediaStore(process.env.STRAPI_URL),
  },
});
