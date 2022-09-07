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
import Navbar from "./navbar";

function Layout({ ...props }) {
  const router = useRouter();
  const logout = () => {
    removeCookies("token");
    router.replace("/");
  };
  
  return (
    <div>

      <Navbar />
      {props.children}


    </div>
  );
}


export default Layout;
