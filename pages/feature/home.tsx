
import type { AppProps } from 'next/app'
import Dashboard from '../layout';
import { getCookie, removeCookies } from "cookies-next";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { connect } from "../../lib/database";
import jwt from "jsonwebtoken";

import { useRouter } from "next/router";
import { User } from "../../models";
import { Snippet } from "../../models/snippet";
import Snippets from "./snippets";
import Link from "next/link";
import Layout from '../layout';

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
  return (<Layout data={data}>
    <Component {...pageProps} />
  </Layout>)
}
export async function getServerSideProps({ req, res }) {
    try {
      await connect();
  
      const token = getCookie("token", { req, res });
      if (!token) return { redirect: { destination: "/" } };
      const verified = await jwt.verify(token, process.env.JWT_SECRET);
      const obj = await User.findOne({ _id: verified.id });
      if (!obj) return { redirect: { destination: "/" } };
  
      const snippets = await Snippet.find({ user: obj._id });
      return {
        props: {
          email: obj.email,
          name: obj.name,
          snippets: JSON.parse(JSON.stringify(snippets)),
        },
      };
    } catch (error) {
      removeCookies("token", { res });
      return { redirect: { destination: "/" } };
    }
  }
export default MyApp;
