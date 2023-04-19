import React from "react";
import Link from "next/link";
import Image from "next/image";
import AuthorSmall from "./_child/AuthorSmall";
import fetcher from "../lib/fetcher";
import Spinner from "./Spinner";
import Error from "./Error";
const Section4 = () => {
  const { data, isLoading, isError, error } = fetcher("/blogs");
  const businessBlogs =
    data && data.filter((item) => item.category === "business");
  const travelBlogs = data && data.filter((item) => item.category === "travel");

  return (
    <section
      id="popular_posts"
      className="container mx-auto px-2 grid lg:grid-cols-2 gap-6 py-16"
    >
      <div className="left-or-top">
        <h2 className="font-semibold text-2xl text-gray-700">Busisness</h2>
        {isLoading && <Spinner />}
        {isError && <Error />}
        <div className="flex flex-col items-start gap-4 py-8">
          {}
          {data &&
            businessBlogs.map((value, i) => <Post data={value} key={i} />)}
        </div>
      </div>
      <div className="righ-or-bottom">
        <h2 className="font-semibold text-2xl text-gray-700">Travel</h2>
        <div className="flex flex-col items-start gap-4 py-8 w-full">
          {data && travelBlogs.map((value, i) => <Post data={value} key={i} />)}
        </div>
      </div>
    </section>
  );
};

export default Section4;

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
    <div className="flex rounded-sm shadow-sm bg-rose-50/20 w-full">
      <Link href={`/blogs/${_id}`} className="w-[40%]">
        <div className="relative w-full h-full">
          <Image
            src={img || "/"}
            alt="profile"
            objectFit="cover"
            fill
            className="rounded-md object-cover"
          />
        </div>
      </Link>
      <div className="info flex flex-col px-2">
        <div className="cat">
          <span className="text-xs sm:text-sm text-orange-500 hover:text-orange-900">
            {category || "Unknown"}{" "}
          </span>
          <span className="text-xs sm:text-sm  text-gray-800 hover:text-gray-600">
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
            <a className="text-sm sm:text-sm font-bold text-gray-800 hover:text-gray-600">
              {title || "Unknown"}{" "}
            </a>
          </Link>
        </div>

        {author ? <AuthorSmall {...author} /> : <></>}
      </div>
    </div>
  );
}
