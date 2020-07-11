import Date from "./date";
import CoverImage from "./cover-image";
import PostTitle from "./post-title";

export default function PostHeader({ title, coverImage, date }) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 text-gray-600 text-s italic">
          <Date dateString={date} />
        </div>
      </div>
      <div className="mb-4 md:mb-8 mx-0">
        <CoverImage title={title} url={coverImage.url} />
      </div>
    </>
  );
}
