import { getCookie, removeCookies } from "cookies-next";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { connect } from "../../lib/database";
import jwt from "jsonwebtoken";

import { useRouter } from "next/router";
import { User } from "../../models";
import { Snippet } from "../../models/snippet";
import Link from "next/link";

function Snippets({ snippets }) {
  return (
    <div>
      <div className="pt-10 max-w-xl mx-auto text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">Create a Snippet</h2>

        <p className="mx-auto mt-4 text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente
          modi suscipit est ipsum qui nulla.
        </p>

        <Link href="/features/create">
        <a
          className="flex items-center justify-between px-5 py-3 mt-8 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 group"
        >
          <span className="text-lg font-medium group-hover:text-white">
            Create a snippet
          </span>

          <span className="flex-shrink-0 p-2 ml-4 bg-white border border-blue-600 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </a>
        </Link>
      </div>
    </div>
  );
}



export default Snippets;
