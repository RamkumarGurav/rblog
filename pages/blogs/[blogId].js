import Layout from "../../layout/Layout";
import React from "react";
import Author from "../../components/_child/Author";
import AuthorSmall from "../../components/_child/AuthorSmall";
import Image from "next/image";
import Link from "next/link";
import Related from "../../components/_child/Related";
import fetcher from "../../lib/fetcher";
import Error from "../../components/Error";
import Spinner from "../../components/Spinner";
import { useRouter } from "next/router";
import { SWRConfig } from "swr";
import { getBlogs } from "../../lib/helper";

const Post = ({ fallback }) => {
  const router = useRouter();
  const { blogId } = router.query;
  const { data, isLoading, isError, error } = fetcher(`/blogs/${blogId}`);

  if (isLoading) return <Spinner />;
  if (isError) return <Error />;

  return (
    <SWRConfig value={fallback}>
      <Article {...data} />
    </SWRConfig>
  );
};

export default Post;

function Article({ title, subtitle, description, img, author }) {
  return (
    <Layout>
      <div className="container mx-auto sm:px-20 lg:px-[200px] py-16 flex flex-col items-center gap-5 ">
        {author ? <Author {...author} /> : <></>}
        <h1 className="text-2xl sm:text-3xl text-black font-bold text-center">
          {" "}
          {title}
        </h1>
        <p className="text text-gray-500 text-center ">{subtitle}</p>
        <div>
          <Image src={img || "/"} height={550} width={700} alt="post" />
        </div>
        <p className="text text-gray-700 text-left">{description}</p>
        {/* <Related /> */}
      </div>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const blogs = await getBlogs(params.blogId);

  return {
    props: {
      fallback: {
        "/api/blogs": blogs,
      },
    },
  };
}
export async function getStaticPaths() {
  const blogs = await getBlogs();
  const paths = blogs.map((value) => {
    return {
      params: {
        blogId: value._id,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
