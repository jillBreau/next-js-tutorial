import Link from 'next/link';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import Layout, { siteTitle } from '../components/layout';
import Date from '../components/date';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import useSWR, { Fetcher } from 'swr';

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData
    }
  };
};

const fetcher: Fetcher<{count: number}, RequestInfo> = (...args: Parameters<typeof fetch>) => fetch(...args).then(res => res.json());

export default function Home({ allPostsData }) {
  const { data, error } = useSWR('/api/get-count', fetcher);
  let count = error ? '...failed to load...' : (!data ? '...loading...' : data.count);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hi, I'm Jillian and I'm learning Next.js using their <a href="https://nextjs.org/learn">tutorial</a>.</p>
        <small className={utilStyles.lightText}>
          I've also added a step to get this number: <em>{count}</em> from a free API, and have converted the result of the basic tutorial into TypeScript.
        </small>
        <p>
          Here are some topics I've learned about (sample blog posts written by the Next.js team).
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Topics</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};
