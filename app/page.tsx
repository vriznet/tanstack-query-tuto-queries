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
          <li>
            <Link href="/contents/query-functions">Query Functions</Link>
          </li>
          <li>
            <Link href="/contents/query-options">Query Options</Link>
          </li>
          <li>
            <Link href="/contents/parallel-queries">Parallel Queries</Link>
          </li>
          <li>
            <Link href="/contents/dependent-queries-use-query">
              Dependent Queries - useQuery
            </Link>
          </li>
          <li>
            <Link href="/contents/dependent-queries-use-queries">
              Dependent Queries - useQueries
            </Link>
          </li>
          <li>
            <Link href="/contents/background-fetching-indicator-is-fetching">
              Background Fetching Indicator - isFetching
            </Link>
          </li>
          <li>
            <Link href="/contents/background-fetching-indicator-use-is-fetching-for-global">
              Background Fetching Indicator - useIsFetching for Global Loading
              State
            </Link>
          </li>
          <li>
            <Link href="/contents/window-focus-refetching">
              Window Focus Refetching
            </Link>
          </li>
          <li>
            <Link href="/contents/disabling-pausing-queries-basics">
              Disabling/Pausing Queries - Basics
            </Link>
          </li>
          <li>
            <Link href="/contents/disabling-pausing-queries-lazy-queries">
              Disabling/Pausing Queries - Lazy Queries
            </Link>
          </li>
          <li>
            <Link href="/contents/disabling-pausing-queries-typesafe-disabling">
              Disabling/Pausing Queries - Typesafe Disabling
            </Link>
          </li>
          <li>
            <Link href="/contents/query-retries-basics">
              Query Retries - Basics
            </Link>
          </li>
          <li>
            <Link href="/contents/query-retries-background-retry">
              Query Retries - Background Retry
            </Link>
          </li>
          <li>
            <Link href="/contents/paginated-queries">Paginated Queries</Link>
          </li>
          <li>
            <Link href="/contents/infinite-queries">Infinite Queries</Link>
          </li>
        </ol>
      </main>
    </div>
  );
};

export default Home;

