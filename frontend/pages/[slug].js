import Container from "../components/container";
import Layout from "../components/layout";
import Head from "next/head";
import pagesApi from "../lib/pages-api";
import { InlineWysiwyg, HtmlFieldPlugin } from "react-tinacms-editor";
import ReactMarkdown from "react-markdown";
import { useForm, usePlugin, useCMS } from "tinacms";
import { InlineForm, InlineBlocks, InlineText } from "react-tinacms-inline";
// blocks
import { heroBlock } from "../blocks/Hero";
import { imagesBlock } from "../blocks/Images";
import { paragraphBlock } from "../blocks/Paragraph";
import { featureListBlock } from "../blocks/FeatureList";
import data from "../blocks/data.json";

export default function Index({ page: initialPage }) {
  const cms = useCMS();

  const VISUAL_BLOCKS = {
    hero: heroBlock,
    images: imagesBlock,
    paragraph: paragraphBlock,
    features: featureListBlock,
  };

  const formConfig = {
    id: 3,
    label: initialPage.title,
    initialValues: initialPage,
    onSubmit: async (values) => {
      await pagesApi
        .update(values.id, values)
        .then((response) => {
          cms.alerts.success("Changes Saved");
        })
        .catch((e) => {
          console.log(e);
          cms.alerts.error("Error saving changes");
        });
    },
    fields: [
      {
        name: "title",
        label: "Title",
        component: "text",
      },
      {
        label: "Page Sections",
        name: "blocks",
        component: "blocks",
        templates: {
          hero: heroBlock.template,
          images: imagesBlock.template,
          paragraph: paragraphBlock.template,
          features: featureListBlock.template,
        },
      },
    ],
  };

  const [page, form] = useForm(formConfig);
  usePlugin(form);

  return (
    <>
      <Layout>
        <Head>
          <title>{page && page.title}</title>
        </Head>
        <Container>
          <InlineForm form={form}>
            <h1>
              <InlineText name="title" />
            </h1>
            <InlineBlocks
              name="blocks"
              source={page.blocks}
              blocks={VISUAL_BLOCKS}
            />
          </InlineForm>
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps({ params }) {
  console.log("params", params);
  const page = await pagesApi.findBySlug(params.slug);
  return {
    props: { page: { ...page.data[0] } },
  };
}

export async function getStaticPaths() {
  const pages = await pagesApi.getAll();

  return {
    paths: pages.data.map((pages) => {
      return {
        params: {
          slug: pages.slug,
        },
      };
    }),
    fallback: false,
  };
}
