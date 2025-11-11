import Head from "next/head";
import Link from "next/link";

const Home = () => {
  return (
    <div>
      <Head>
        <title>TanStack Query - Queries</title>
      </Head>
      <main>
        <h1>Choose the page</h1>
        <ol>
          <li>
            <Link href="/contents/query-basics">Query Basics</Link>
          </li>
          <li>
            <Link href="/contents/query-keys">Query Keys</Link>
          </li>
        </ol>
      </main>
    </div>
  );
};

export default Home;

