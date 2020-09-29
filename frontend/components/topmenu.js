import { useForm, usePlugin, useCMS } from "tinacms";
import { InlineForm, InlineBlocks } from "react-tinacms-inline";
import headersApi from "../lib/headers-api";
// blocks
import { rowBlock } from "../blocks/header/Row";

export default function topmenu({ header: initialHeader }) {
  const cms = useCMS();

  const HOME_BLOCKS = {
    ROW: rowBlock,
  };

  const formConfig = {
    id: 7,
    label: `Header`,
    initialValues: initialHeader,
    onSubmit: async (values) => {
      console.log("values", {
        id: values.id,
        title: values.title,
        blocks: values.blocks,
      });
      await headersApi
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
        label: "Header Sections",
        name: "blocks",
        component: "blocks",
        templates: {
          row: rowBlock.template,
        },
      },
    ],
  };

  const [header, form] = useForm(formConfig);
  usePlugin(form);
  return (
    <>
      <InlineForm form={form}>
        <InlineBlocks
          name="blocks"
          source={header.blocks}
          blocks={HOME_BLOCKS}
        />
      </InlineForm>
    </>
  );
}
