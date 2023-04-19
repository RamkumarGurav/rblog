import React from "react";
import Image from "next/image";
import Link from "next/link";
import Author from "./_child/Author";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import fetcher from "../lib/fetcher";
import Spinner from "./Spinner";
import Error from "./Error";
import "swiper/css";

const Section1 = () => {
  SwiperCore.use([Autoplay]);

  const bg = {
    background: "url('/images/banner.png') no-repeat",
    backgroundPosition: "right",
  };

  const { data, isLoading, isError, error } = fetcher("/blogs");
  const trendingBlogs = data && data.filter((item) => item.type === "trending");

  return (
    <section className="py-16" style={bg}>
      <div className="container mx-auto md:px-20">
        <h1 className="font-bold mx-auto w-[60%] text-2xl sm:text-4xl text-gray-900 text-center my-12 pb-2  border-b-gray-300 border-b-2">
          Trending
        </h1>
        {isLoading && <Spinner />}
        {isError && <Error />}
        <Swiper loop={true} slidesPerView={1} autoplay={{ delay: 3000 }}>
          {data &&
            trendingBlogs?.map((value, i) => (
              <SwiperSlide key={i}>
                <Slide data={value} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>
  );
};
export default Section1;

function Slide({ data }) {
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
    <div className="grid lg:grid-cols-2 gap-2 mx-5">
      <div className="image ">
        <Link href={`/blogs/${_id}`} legacyBehavior>
          <a>
            <Image src={img || "/"} height={600} width={600} alt="post" />
          </a>
        </Link>
      </div>
      <div className="info flex flex-col justify-center lg:p-5">
        <div className="cat">
          <span className="text-orange-500 hover:text-orange-900">
            {category || "Unknown"}{" "}
          </span>
          <span className="text-gray-800 hover:text-gray-600">
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
            <a className="text-3xl xl:text-5xl font-bold text-gray-800 hover:text-gray-600">
              {title || "Unknown"}
            </a>
          </Link>
        </div>
        <p className="text-gray-500 py-3">{subtitle || "Unknown"}</p>
        {author ? <Author {...author} /> : <></>}
      </div>
    </div>
  );
}
