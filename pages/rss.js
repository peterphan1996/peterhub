import Head from "next/head";
import { getAllPostsForHome } from "../lib/api";

export default function Rss() {
  return (
    <Head>
      <link
        rel="alternate"
        type="application/rss+xml"
        title="RSS for PeterHub blog posts"
        href="https://peterhub.dev/rss"
      />
    </Head>
  );
}

const blogPostsRssXml = (blogPosts) => {
  let latestPostDate = "";
  let rssItemsXml = "";
  blogPosts.forEach((post) => {
    const postDate = Date.parse(post.date);
    if (!latestPostDate || postDate > Date.parse(latestPostDate)) {
      latestPostDate = post.date;
    }
    const postHref = `https://peterhub.dev/posts/${post.slug}`;
    rssItemsXml += `
      <item>
        <title>${post.title}</title>
        <link>
          ${postHref}
        </link>

        <pubDate>${post.date}</pubDate>
        <description>
        <![CDATA[${post.excerpt}]] >
        </description>
    </item>`;
  });
  return {
    rssItemsXml,
    latestPostDate,
  };
};

const shortSiteDescription = "PeterHub Blog RSS feed";

const getRssXml = (blogPosts) => {
  const { rssItemsXml, latestPostDate } = blogPostsRssXml(blogPosts);
  return `<?xml version="1.0" ?>
  <rss version="2.0">
    <channel>
        <title>Blog by PeterHub</title>
        <link>https://peterhub.dev</link>
        <description>${shortSiteDescription}</description>
        <language>en</language>
        <lastBuildDate>${latestPostDate}</lastBuildDate>
        ${rssItemsXml}
    </channel>
  </rss>`;
};

export async function getServerSideProps({ res }) {
  if (!res) {
    return;
  }
  const allPosts = await getAllPostsForHome(false);

  res.setHeader("Content-Type", "text/xml");
  res.write(getRssXml(allPosts));
  res.end();
  return { props: {} };
}
