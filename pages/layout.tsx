import { getCookie, removeCookies } from "cookies-next";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { connect } from "../lib/database";
import jwt from "jsonwebtoken";

import { useRouter } from "next/router";
import { User } from "../models";
import { Snippet } from "../models/snippet";
import Snippets from "./feature/snippets";
import Link from "next/link";

function Layout({ children, data}) {
  const router = useRouter();
  const logout = () => {
    removeCookies("token");
    router.replace("/");
  };
  return (
    <div>

    <header>
      <div className="w-full shadow-md ">
        <div className="px-4 py-8 mx-auto max-w-screen-xl sm:py-12 sm:px-6 lg:px-8">
          <div className="sm:justify-between sm:items-center sm:flex">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Welcome Back, {data.name}
              </h1>

              <p className="mt-1.5 text-sm text-gray-500">
                Let's write a new snippet 🎉
              </p>
            </div>

            <div className="flex flex-col mt-4 gap-4 sm:flex-row sm:mt-0 sm:items-center">
              {" "}
            
            <Link href={"create"}>
       
              <button
                className="block px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg transition hover:bg-indigo-700 focus:outline-none focus:ring"
                type="button"
              >
                Create Snippet
              </button>
              </Link>
         
              <button
                className="inline-flex items-center justify-center px-5 py-3 text-gray-500 border border-gray-200 rounded-lg transition hover:text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring"
                type="button"
                onClick={logout}
              >
                <span className="text-sm font-medium"> Logout </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
              </button>
        
            </div>
          </div>
        </div>
      </div>

      
    </header>
    {children}
    
    
    </div>
  );
}


export default Layout;
