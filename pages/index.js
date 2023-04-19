import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

import Layout from "../layout/Layout";
import Section1 from "../components/Section1";
import Section2 from "../components/Section2";
import Section3 from "../components/Section3";
import Section4 from "../components/Section4";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>RBlog</title>

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full">
        <Layout home >
          <Section1></Section1>
          <Section2></Section2>
          <Section3></Section3>
          <Section4></Section4>
        </Layout>
      </div>
    </>
  );
}
