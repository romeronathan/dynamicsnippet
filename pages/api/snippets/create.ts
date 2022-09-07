
import { check, validationResult } from "express-validator";
import next, { NextApiRequest, NextApiResponse } from "next";

import { connect } from "../../../lib/database";
import { Snippet } from "../../../models/snippet";



export default async function handler(req, res, next) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }

    await check("title", "Title is not valid").run(req);
    await check("description", "Description is not valid").run(req);
    await check("url", "Url is not valid").run(req);
    await check("code", "Code is not valid").run(req);
    await check("userId", "UserId is not valid").run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    await connect();

    const snippet = new Snippet({
        title: req.body.title,
        description: req.body.description,
        url: req.body.url,
        code: req.body.code,
        userId: req.body.userId,
    });

    await snippet.save().then((snippet) => {
        return res.status(200).json({ snippet: snippet });
    }
    ).catch((err) => {
        return res.status(400).json({ message: err });
    }
    );


};