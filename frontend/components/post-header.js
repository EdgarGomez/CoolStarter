import Avatar from "../components/avatar";
import DateFormater from "../components/date-formater";
import CoverImage from "../components/cover-image";
import PostTitle from "../components/post-title";
import { useCMS } from "tinacms";
import { InlineText, InlineImage } from "react-tinacms-inline";
import { SMediaStore } from "../lib/media-store";
export default function PostHeader({ title, coverImage, date, author }) {
  const cms = useCMS();
  //cms.media.store = new SMediaStore(process.env.STRAPI_URL);
  //console.log("what is this", cms.media.store.getFilePath(coverImage));
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
        <InlineImage
          name="coverImage.url"
          previewSrc={(formValues) => {
            console.log("formvalues", formValues);
            const result = `${process.env.STRAPI_URL}${formValues.coverImage.url}`;
            return result;
          }}
          uploadDir={() => {
            return "/uploads";
          }}
          parse={(filename) => {
            //console.log("filename", filename);
            return `/uploads/${filename}`;
          }}
        >
          {() => {
            //console.log("al final", coverImage);
            return (
              <img
                src={`http://localhost:1337${coverImage.url}`}
                alt={`Cover Image for ${title}`}
              />
            );
          }}
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
