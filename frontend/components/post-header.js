InlineImageimport Avatar from "../components/avatar";
import DateFormater from "../components/date-formater";
import CoverImage from "../components/cover-image";
import PostTitle from "../components/post-title";
import { useCMS } from "tinacms";
import { InlineText, InlineImage } from "react-tinacms-inline";
import {
  StrapiMediaStore,
  StrapiProvider,
  StrapiClient,
} from "react-tinacms-strapi";

export default function PostHeader({ title, coverImage, date, author }) {
  const cms = useCMS();
  return (
    <>
      <PostTitle>
        <InlineText name="title" />
      </PostTitle>
      <div className="hidden md:block md:mb-12">
        {author && author.picture && (
          <Avatar
            name={author.name}
            picture={`http://localhost:1337${author.picture.url}`}
          />
        )}
      </div>
      <div className="mb-8 md:mb-16 -mx-5 sm:mx-0">
        {coverImage && (
          <CoverImage
            title={title}
            src={`http://localhost:1337${coverImage}`}
          />
        )}
        <InlineImage
          name="coverImage.url"
          previewSrc={(formValues) => {
            process.env.STRAPI_URL +
              cms.media.store.getFilePath(formValues.coverImage.url);
          }}
          uploadDir={() => "/uploads"}
          parse={(filename) => {
            return `/uploads/${filename}`;
          }}
        >
          yepa
          </InlineImage>
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          {author && author.picture && (
            <Avatar
              name={author.name}
              picture={`http://localhost:1337${author.picture.url}`}
            />
          )}
        </div>
        <div className="mb-6 text-lg">
          {date && <DateFormater dateString={date} />}
        </div>
      </div>
    </>
  );
}
