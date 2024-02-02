import Head from "next/head";
import Link from "next/link";

const Blog = () => (
  <>
    <Head>
      <title>Blog</title>
      <meta name="description" content="Read our latest blog posts." />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Inter:wght@400;700&display=swap"
        rel="stylesheet"
      />
    </Head>
    <div>
      <h1>Blog</h1>
      <p>Read our latest blog posts here.</p>
    </div>
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/about">About</Link>
      </li>
      <li>
        <Link href="/contacts">Contacts</Link>
      </li>
      <li>
        <Link href="/blog">Blog</Link>
      </li>
      <li>
        <Link href="/account">Account</Link>
      </li>
    </ul>
    <style jsx global>{`
      body {
        font-family: "Roboto", sans-serif;
      }
      h1,
      h2,
      h3 {
        font-family: "Inter", sans-serif;
      }
    `}</style>
  </>
);

export default Blog;