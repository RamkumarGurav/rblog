import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";

import "swiper/css";
import Link from "next/link";
import Image from "next/image";
import AuthorSmall from "./_child/AuthorSmall";
import fetcher from "../lib/fetcher";
import Spinner from "./Spinner";
import Error from "./Error";

const Section3 = () => {
  const { data, isLoading, isError, error } = fetcher("/blogs");
  SwiperCore.use([Autoplay]);
  return (
    <section id="popular_posts" className="container mx-auto md:px-5 py-16">
      <h1 className="font-bold mx-auto w-[60%] text-2xl sm:text-4xl text-gray-900 text-center my-12 pb-2  border-b-gray-300 border-b-2">
        Most Popular
      </h1>

      {isLoading && <Spinner />}
      {isError && <Error />}
      <Swiper
        loop={true}
        breakpoints={{
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
        }}
        autoplay={{ delay: 3000 }}
      >
        {data &&
          data.map((value, i) => (
            <SwiperSlide key={i}>
              <Post data={value} />
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

export default Section3;

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
        <div className="relative w-full h-[210px] md:h-[350px]">
          <Image
            src={img || "/"}
            alt="profile"
            objectFit="cover"
            fill
            className="rounded-md object-cover"
          />
        </div>
      </Link>
      <div className="info flex flex-col justify-center px-2 bg-gray-50">
        <div className="cat mt-3">
          <span className="text-sm text-orange-500 hover:text-orange-900">
            {category || "Unknown"}{" "}
          </span>
          <span className="text-sm  text-gray-800 hover:text-gray-600">
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
            <a className="text md:text-xl font-bold text-gray-800 hover:text-gray-600">
              {title || "Unknown"}
            </a>
          </Link>
        </div>
        <p className="text-xs  text-gray-500 py-2">{subtitle || "Unknown"}</p>
        {author ? <AuthorSmall {...author} /> : <></>}
      </div>
    </div>
  );
}
