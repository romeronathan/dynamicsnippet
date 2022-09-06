import { setCookie, setCookies } from "cookies-next";
import { connect } from "../../../lib/database";
import "../../../lib/passport";
import passport from "passport";



export default async function handler(req, res, next) {
    await connect();
    passport.authenticate("google", (err, user, info) => {
        if(err || !user) res.redirect('http://localhost:3000?a=auth_fail');
        setCookies('token', info.token, { req, res});
        res.redirect('http://localhost:3000/feature/snippets');
    })(req, res, next);
}
