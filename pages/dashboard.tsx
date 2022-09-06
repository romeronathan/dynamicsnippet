import { getCookie, removeCookies } from 'cookies-next'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { connect } from '../lib/database'
import jwt from 'jsonwebtoken'

import { useRouter } from 'next/router'
import { User } from '../models'



function Dashboard({ email, name }) {
    console.log("HEEEY!");
    const router = useRouter();
    const logout = () => {
        removeCookies('token');
        router.replace('/');
    }
    return (
        <div>
            <h2>{  name } { email} </h2>
            <button onClick={logout}></button>
        </div>
    )
}

export async function getServerSideProps({ req, res }) {
    try {
        await connect();
        const token = getCookie('token', {req, res });
        if(!token) return { redirect: { destination: '/' } }
        const verified = await jwt.verify(token, process.env.JWT_SECRET);
        const obj = await User.findOne({ _id: verified.id });
        if(!obj) return { redirect: { destination: '/' } }
        return { props: {
            email: obj.email,
            name: obj.name,
         }};


    }
    catch (error) {
        removeCookies('token', {res});
        return {  redirect: { destination: '/' } };
    }
}

export default Dashboard;