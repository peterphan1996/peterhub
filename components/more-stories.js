import cn from "classnames";
import Link from "next/link";
import Date from "./date";

export default function MoreStories({ posts }) {
  return (
    <section>
      <div>
        <section className="bg-gray-800 pattern py-20">
          <div className="max-w-5xl px-6 mx-auto text-center">
            <h2 className="text-2xl font-semibold text-white">Posts</h2>

            <div className="flex items-center justify-center mt-10">
              <div
                className={cn("grid grid-cols-1 gap-6", {
                  "sm:grid-cols-1 lg:grid-cols-1": posts.length === 1,
                  "sm:grid-cols-2 lg:grid-cols-2": posts.length === 2,
                  "sm:grid-cols-2 lg:grid-cols-3": posts.length > 2,
                })}
              >
                {posts.map((post) => (
                  <div className="max-w-xs w-full" key={post.slug}>
                    <>
                      <div className="flex items-center justify-center bg-white border-b-8 border-teal-400 rounded-md overflow-hidden">
                        <Link as={`/posts/${post.slug}`} href="/posts/[slug]">
                          <a aria-label={post.title}>
                            <img src={post.coverImage.url} alt="" />
                          </a>
                        </Link>
                      </div>

                      <Link as={`/posts/${post.slug}`} href="/posts/[slug]">
                        <a className="block bg-gray-700 mt-5 rounded-md overflow-hidden">
                          <div className="py-2 px-3 text-center text-sm">
                            <p className="text-gray-300">{post.title}</p>

                            <span className="block text-gray-500 mt-2">
                              <Date dateString={post.date} />
                            </span>
                          </div>
                        </a>
                      </Link>
                    </>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
