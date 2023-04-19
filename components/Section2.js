import React from "react";
import Image from "next/image";
import Link from "next/link";
import AuthorSmall from "./_child/AuthorSmall";
import fetcher from "../lib/fetcher";
import Spinner from "./Spinner";
import Error from "./Error";

const Section2 = () => {
  const { data, isLoading, isError, error } = fetcher("/blogs");
  const latestBlogs =
    data && data.filter((item) => item.category === "business");

  return (
    <section id="posts" className="container mx-auto md:px-5 py-10">
      <h1 className="font-bold mx-auto w-[60%] text-2xl sm:text-4xl text-gray-900 text-center my-12 pb-2  border-b-gray-300 border-b-2">
        Latest Posts
      </h1>
      {isLoading && <Spinner />}
      {isError && <Error />}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 ">
        {data && data.map((value, i) => <Post data={value} key={i} />)}
      </div>
    </section>
  );
};
export default Section2;

function Post({ data }) {
  const {
    _id,
    title,
    subtitle,
    description,
    author,
    img,
    publishedAt,
    type,
    category,
  } = data;
  return (
    <div className="flex flex-col justify-center items-center rounded-b-md shadow-sm mx-2">
      <Link href={`/blogs/${_id}`} className="w-full">
        <div className="relative w-full h-64">
          <Image
            src={img || "/"}
            alt="profile"
            objectFit="cover"
            layout="fill"
            className="rounded-md"
            style={{ objectFit: "cover" }}
          />
        </div>
      </Link>
      <div className="info flex flex-col justify-center px-2 bg-gray-50">
        <div className="cat mt-3">
          <span className="text-sm text-orange-500 hover:text-orange-900">
            {category || "Unknown"}{" "}
          </span>
          <span className="text-xs  text-gray-800 hover:text-gray-600">
            -{" "}
            {new Intl.DateTimeFormat("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }).format(new Date(publishedAt.toString())) || "Unknown"}
          </span>
        </div>
        <div className="head">
          <Link href={`/blogs/${_id}`} legacyBehavior>
            <a className="text font-bold text-gray-800 hover:text-gray-600">
              {title || "Unknown"}
            </a>
          </Link>
        </div>
        <p className="text-xs text-gray-500 py-2">{subtitle || "Unknown"}</p>
        {author ? <AuthorSmall {...author} /> : <></>}
      </div>
    </div>
  );
}
