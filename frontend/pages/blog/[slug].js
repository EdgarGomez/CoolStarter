import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/container";
import PostBody from "../../components/post-body";
import Header from "../../components/header";
import PostHeader from "../../components/post-header";
import { InlineForm } from "react-tinacms-inline";
import Layout from "../../components/layout";
import { getPostBySlug, getAllPosts } from "../../lib/api";
import PostTitle from "../../components/post-title";
import Head from "next/head";
import { CMS_NAME } from "../../lib/constants";
import markdownToHtml from "../../lib/markdownToHtml";
import { useState, useEffect, useMemo } from "react";
import { useForm, usePlugin, useCMS } from "tinacms";
import postsApi from "../../lib/posts-api";
import configurationsApi from "../../lib/configurations-api";
import { DateFieldPlugin } from "react-tinacms-date";

export default function Post({
  config: initialConfig,
  post: initialPost,
  morePosts,
  preview,
}) {
  const router = useRouter();
  const cms = useCMS();
  cms.plugins.add(DateFieldPlugin);

  if (!router.isFallback && !initialPost?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  const formConfig2 = {
    id: 2,
    label: "Configuration",
    initialValues: initialConfig,
    onSubmit: async (values) => {
      //console.log("values", { title: values.title, content: values.content });
      //alert(`Submitting ${values.title}`);
      await configurationsApi
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
        name: "siteUrl",
        label: "Site url",
        component: "text",
      },

      {
        name: "mainColor",
        label: "Main Color",
        component: "color",
      },
    ],
  };

  const formConfig = {
    id: 1,
    label: "Blog Post",
    initialValues: initialPost,
    onSubmit: async (values) => {
      console.log("values", { title: values.title, content: values.content });
      //alert(`Submitting ${values.title}`);
      await postsApi
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
        label: "Post Title",
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
        name: "content",
        label: "Content",
        component: "markdown",
      },
    ],
  };

  const [post, form] = useForm(formConfig);
  const [config, form2] = useForm(formConfig2);
  usePlugin(form);
  usePlugin(form2);

  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>
                  {post.title} | Next.js Blog Example with {CMS_NAME}
                </title>
                {post.coverImage && (
                  <meta property="og:image" content={post.coverImage.url} />
                )}
              </Head>
              <InlineForm form={form}>
                <PostHeader
                  title={post.title}
                  coverImage={post.coverImage}
                  date={post.date}
                  author={post.author}
                />

                <PostBody content={post.content} />
              </InlineForm>
            </article>
          </>
        )}
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const post = await postsApi.findBySlug(params.slug);
  const finalPost = post.data[0];
  const configuration = await configurationsApi.findById(1);
  const config = configuration.data[0];

  return {
    props: {
      post: {
        ...finalPost,
      },
      config: {
        ...config,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = await postsApi.getAll();

  return {
    paths: posts.data.map((posts) => {
      return {
        params: {
          slug: posts.slug,
        },
      };
    }),
    fallback: false,
  };
}
