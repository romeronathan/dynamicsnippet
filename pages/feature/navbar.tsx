import { getCookie, getCookies, removeCookies } from "cookies-next";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { connect } from "../../lib/database";
import jwt from "jsonwebtoken";

import { useRouter } from "next/router";

import { Snippet } from "../../models/snippet";
import Snippets from "./snippets";
import Link from "next/link";
import { useEffect, useState } from "react";
import { User } from "../../models/user";
import { userAgent } from "next/server";


function Navbar({ ...props }) {
    // create a state variable for the user with a default value of  object
    const [user, setUser] = useState({
        name: "",
        email: "",
    });
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
   

        const fetchData = async () => {

            try {

                const token = getCookie("token");


                if (!token) {
                    setIsAuthenticated(false);
                    return { redirect: { destination: "/" } };

                }

                await jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
                    if (err) {

                        removeCookies("token");
                        return { redirect: { destination: "/" } };
                    }

                    await fetch('http://localhost:3000/api/getuser', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(decoded),
                    }).then(async (res) => {


                        let obj = await res.json();


                        if (!obj) return { redirect: { destination: "/" } };


                        setUser(obj.user);
                        setIsAuthenticated(true);

                    }).catch((err) => {
                        console.log(err);
                        setIsAuthenticated(false);
                    });
                });

            } catch (error) {

                return { redirect: { destination: "/" } };
            }
        };
        fetchData();

    }, [])
    const router = useRouter();
    const logout = () => {
        setIsAuthenticated(false);
        removeCookies("token");
        router.replace("/");
    };

    return (
        <div>
            {isAuthenticated && <header>
                <div className="w-full shadow-md ">
                    <div className="px-4 py-8 mx-auto max-w-screen-xl sm:py-12 sm:px-6 lg:px-8">
                        <div className="sm:justify-between sm:items-center sm:flex">
                            <div className="text-center sm:text-left">
                                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                                    Welcome Back, {user.name}
                                </h1>

                                <p className="mt-1.5 text-sm text-gray-500">
                                    Let's write a new snippet 🎉
                                </p>
                            </div>

                            <div className="flex flex-col mt-4 gap-4 sm:flex-row sm:mt-0 sm:items-center">
                                {" "}

                                <Link href={"/feature/create"}>

                                    <button
                                        className="block px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg transition hover:bg-indigo-700 focus:outline-none focus:ring"
                                        type="button"
                                    >
                                        Create Snippet
                                    </button>
                                </Link>

                                <Link href={"/feature/snippets"}>

                                    <button
                                        className="block px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg transition hover:bg-indigo-700 focus:outline-none focus:ring"
                                        type="button"
                                    >
                                        View Snippets
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
                                            strokeLinejoin="round"
                                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                                        />
                                    </svg>
                                </button>

                            </div>
                        </div>
                    </div>
                </div>


            </header>}
        </div>

    );
}


export default Navbar;
