
import { check, validationResult } from "express-validator";
import next, { NextApiRequest, NextApiResponse } from "next";
import { getCookie, getCookies, removeCookies } from "cookies-next";
import { connect } from "../../../lib/database";
import { UserDocument } from "../../../models";
import { Snippet } from "../../../models/snippet";

import nextSession from "next-session";
const getSession = nextSession({ autoCommit: false });

export default async function handler(req, res, next) {
    const session = await getSession(req, res);
    console.log(session);
    //get user id from cookies

    // remove j:""
    const userId = req.cookies.user.replace('j:"', '').replace('"', '');



    await connect();

    await Snippet.find({ userId: userId }).then((snippets) => {
        return res.status(200).json({ snippets: snippets });
    }).catch((err) => {
        return res.status(400).json({ message: err });
    });


};