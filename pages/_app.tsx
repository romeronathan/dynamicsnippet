import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from './feature/layout'
import { getCookie, removeCookies } from 'cookies-next';
import jwt from "jsonwebtoken";
import { User } from '../models';
import { Snippet } from '../models/snippet';
import { connect } from '../lib/database';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}


export default MyApp
