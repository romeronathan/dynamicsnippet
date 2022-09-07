
import { check, validationResult } from "express-validator";
import next, { NextApiRequest, NextApiResponse } from "next";
import { User, UserDocument } from "../../models";
import passport from "passport";

import { connect } from "../../lib/database";



export default async function handler(req, res, next) {
    console.log("get");

    try {
        await connect();

        await User.findOne({ _id: req.body.id }).then((user) => {
            console.log("User" + user);
            if (user) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ user: user }));

            }
            else {
                res.statusCode = 401;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: "User not found" }));
            }

        });


    }
    catch (err) {
        return res.status(err);
        console.log(err);
    }


};