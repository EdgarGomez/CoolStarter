import Avatar from "../components/avatar";
import DateFormater from "../components/date-formater";
import CoverImage from "./cover-image";
import Link from "next/link";

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}) {
  return (
    <div>
      <div className="mb-5">
        {coverImage && (
          <CoverImage
            slug={slug}
            title={title}
            src={`http://localhost:1337${coverImage.url}`}
          />
        )}
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link as={`/blog/${slug}`} href="/blog/[slug]">
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <div className="text-lg mb-4">
        {date && <DateFormater dateString={date} />}
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      {author && author.picture && (
        <Avatar
          name={author.name}
          picture={`http://localhost:1337${author.picture.url}`}
        />
      )}
    </div>
  );
}
