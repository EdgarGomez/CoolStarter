import Avatar from "../components/avatar";
import DateFormater from "../components/date-formater";
import CoverImage from "../components/cover-image";
import Link from "next/link";

export default function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}) {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        {coverImage && (
          <CoverImage
            title={title}
            src={`http://localhost:1337${coverImage.url}`}
            slug={slug}
          />
        )}
      </div>
      <div className="md:grid md:grid-cols-2 md:col-gap-16 lg:col-gap-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            <Link as={`/blog/${slug}`} href="/blog/[slug]">
              <a className="hover:underline">{title}</a>
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            {date && <DateFormater dateString={date} />}
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
          {author && author.picture && (
            <Avatar
              name={author.name}
              picture={`http://localhost:1337${author.picture.url}`}
            />
          )}
        </div>
      </div>
    </section>
  );
}
