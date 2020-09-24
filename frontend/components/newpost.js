import authorsApi from "../lib/authors-api";

const getAllAuthors = async () => {
  const authors = await authorsApi.getAll();
  return authors.data;
};

export const newPost = {
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
      options: <getAllAuthors />,
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
  ],
  onSubmit(values, cms) {
    // Call functions that create the new blog post. For example:
    cms.apis.someBackend.createPost(values);
  },
};
