
import { check, validationResult } from "express-validator";
import next, { NextApiRequest, NextApiResponse } from "next";
import { UserDocument } from "../../../models";
import passport from "passport";
import '../../../lib/passport';
import { connect } from "../../../lib/database";



export default async function handler(req, res, next) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
      }
    await check("email", "Email is not valid").isEmail().run(req);
    await check("password", "Password cannot be blank").isLength({ min: 1 }).run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    await connect();
    passport.authenticate("local", (err: Error, user: UserDocument) => {
        if (err) {
            return res.json(err);
        }
        if (!user) {
            return res.status(401);
        }
 
    })(req, res, next);
};