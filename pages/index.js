import Head from "next/head";
import MoreStories from "../components/more-stories";
import Layout from "../components/layout";
import { getAllPostsForHome, getAuthor } from "../lib/api";

export const siteTitle = "Peter's Tech Blog";
const helloWorld = "<HelloWorld />";

export default function Index({ preview, allPosts, author }) {
  return (
    <Layout preview={preview}>
      <Head>
        <title>{siteTitle}</title>
        <meta
          property="og:image"
          content="https://og-image.now.sh/**Peter's**%20Tech%20Blog.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fvercel-triangle-black.svg"
        />
      </Head>
      <div className="flex items-end justify-center mt-8">
        <img src={author.picture.url} className="avatar" alt="profile" />
      </div>
      <section className="bg-white mt-8">
        <div className="max-w-2xl px-6 text-center mx-auto">
          <h2 className="text-3xl font-semibold text-gray-800">
            {helloWorld},{" "}
            <span className="bg-indigo-600 text-white rounded px-1">
              I’m Peter
            </span>{" "}
            . Welcome to my tech blog.
          </h2>
          <p className="text-gray-600 mt-4">
            Tech enthusiast • Web developer • Curious geek • Sport lover •
            Melophile
          </p>
        </div>
      </section>
      <div className="mt-8">
        {allPosts.length > 0 && <MoreStories posts={allPosts} />}
      </div>
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const allPosts = await getAllPostsForHome(preview);
  const author = await getAuthor(preview);
  return {
    props: { preview, allPosts, author },
  };
}
