import { setCookie } from "cookies-next";
import { connect } from "../../../lib/database";
import "../../../lib/passport";
import passport from "passport";

export default async function handler(req, res, next) {
  await connect();
  passport.authenticate("google", {
    
    scope: ["profile", "email"],
    session: false,
  })(req, res, next);
}
