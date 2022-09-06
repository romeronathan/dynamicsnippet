import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from './layout'
import { getCookie, removeCookies } from 'cookies-next';
import jwt from "jsonwebtoken";
import { User } from '../models';
import { Snippet } from '../models/snippet';
import { connect } from '../lib/database';

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <Layout data={data}>
  <Component {...pageProps} />
  </Layout>
    )
}
export async function getServerSideProps({ req, res }) {
  try {
    await connect();

    const token = getCookie("token", { req, res });
    if (!token) return { redirect: { destination: "/" } };
    const verified = await jwt.verify(token, process.env.JWT_SECRET);
    const obj = await User.findOne({ _id: verified.id });
    if (!obj) return { redirect: { destination: "/" } };  
    const data =  { 
      email: obj.email,
      name: obj.name,
      }
    const snippets = await Snippet.find({ user: obj._id });
    return {
      props: {
        data: data
      },
    };
  } catch (error) {
    removeCookies("token", { res });
    return { redirect: { destination: "/" } };
  }
}

export default MyApp
