import passport from "passport";

import { Strategy as GoogleStrategy } from "passport-google-oauth2";

import jwt from "jsonwebtoken";
import { User } from '../models'

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const obj = await User.findOne({ email: profile.email });
        if (!obj) {
          const newUser = new User({
            name: profile.displayName,
            email: profile.email,
            accessToken: accessToken,
          });
          await newUser.save();
          const token = await jwt.sign(
            { id: newUser._id, created: Date.now().toString() },
            process.env.JWT_SECRET
          );
          newUser.tokens.push(token);
          await newUser.save();
          done(null, newUser, { message: "Auth Successful", token });
        } else {
          const token = await jwt.sign(
            { id: obj._id, created: Date.now().toString() },
            process.env.JWT_SECRET
          );
          obj.tokens.push(token);
          await obj.save();
          done(null, obj, { message: "Auth Successful", token });
        }
      } catch (err) {
        console.log(err);
        done(err, false, {
          message: "Something went wrong with Google Strategy",
        });
      }
    }
  )
);
