import Container from "../components/container";
import Layout from "../components/layout";
import Head from "next/head";
import headersApi from "../lib/headers-api";
import pagesApi from "../lib/pages-api";
import { InlineWysiwyg, HtmlFieldPlugin } from "react-tinacms-editor";
import ReactMarkdown from "react-markdown";
import { useForm, usePlugin, useCMS } from "tinacms";
import { InlineForm, InlineBlocks } from "react-tinacms-inline";
// blocks
import { heroBlock } from "../blocks/Hero";
import { imagesBlock } from "../blocks/Images";
import { paragraphBlock } from "../blocks/Paragraph";
import { featureListBlock } from "../blocks/FeatureList";
import data from "../blocks/data.json";

export default function Index({ homePage: initialHomepage, header }) {
  const cms = useCMS();

  const HOME_BLOCKS = {
    hero: heroBlock,
    images: imagesBlock,
    paragraph: paragraphBlock,
    features: featureListBlock,
  };

  const formConfig = {
    id: 3,
    label: "Home page",
    initialValues: initialHomepage,
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

  const [homePage, form] = useForm(formConfig);
  usePlugin(form);

  return (
    <>
      <Layout header={header}>
        <Head>
          <title>{homePage && homePage.title}</title>
        </Head>
        <Container>
          <InlineForm form={form}>
            <InlineBlocks
              name="blocks"
              source={homePage.blocks}
              blocks={HOME_BLOCKS}
            />
          </InlineForm>
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const header = await headersApi.findByActive();
  const homepage = await pagesApi.findByHome();
  return {
    props: { homePage: { ...homepage.data[0] }, header: { ...header.data[0] } },
  };
}
